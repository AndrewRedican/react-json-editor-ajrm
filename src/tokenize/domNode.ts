/* DOM Node || OnBlue or Update */
import { isFunction } from 'util';
import {
  DomNodeTokenize, ErrorMsg, TokenType, SimpleToken, BaseToken, FallbackToken, MergeToken
} from './interfaces';
import JSONInput from '../index';
import { ColorProps } from '../interfaces';
import { format } from '../locale';
import defaultLocale from '../locale/en';
import { safeGet } from '../utils';
import {
  formatDomNodeTokens, followedBySymbol, followsSymbol, newSpan, precedingToken, typeFollowed, mergeObjects
} from './utils';


type TokenFormat = (tokens: Array<MergeToken>, colors: ColorProps) => [number, string];
// Interfaces
interface PrimaryBuffer {
  tokens_unknown: Array<SimpleToken>;
  tokens_proto: Array<BaseToken>;
  tokens_split: Array<BaseToken>;
  tokens_fallback: Array<FallbackToken>;
  tokens_normalize: Array<SimpleToken>;
  tokens_merge: Array<MergeToken>;
  tokens_plainText: string;
  indented: string;
  json: string;
  jsObject: Record<string, any>;
  markup: string;
}

interface SecondaryBuffer {
  brackets: Array<string>;
  isValue: boolean;
  stringOpen: boolean|string;
}

interface Bracket {
  i: number;
  line: number;
  string: string;
}

type QuarkType = 'delimiter'|'number'|'space'|'string'|'symbol';

interface QuarkBuffer {
  active?: QuarkType;
  string: string;
  number: string;
  symbol: string;
  space: string;
  delimiter: string;
  quarks: Array<BaseToken>;
}

// Helper Functions
function pushAndStore(buffer: QuarkBuffer, char: string, type: QuarkType, prefix = ''): void {
  switch (type) {
    case 'symbol':
    case 'delimiter':
      if (buffer.active) {
        buffer.quarks.push({
          string: buffer[buffer.active],
          type: `${prefix}-${buffer.active}`
        });
      }
      // buffer[buffer.active] = '';
      buffer.active = type;
      buffer[buffer.active] = char;
      break;
    default:
      if (type !== buffer.active || [buffer.string, char].includes('\n')) {
        if (buffer.active) {
          buffer.quarks.push({
            string: buffer[buffer.active],
            type: `${prefix}-${buffer.active}`
          });
        }
        // buffer[buffer.active] = '';
        buffer.active = type;
        buffer[buffer.active] = char;
      } else {
        buffer[type] += char;
      }
  }
}

function quarkize(text: string, prefix = '') {
  const buffer: QuarkBuffer = {
    active: undefined,
    string: '',
    number: '',
    symbol: '',
    space: '',
    delimiter: '',
    quarks: []
  };

  text.split('').forEach((char, i) => {
    let charType: QuarkType = 'string';
    switch (char) {
      case '"':
      case "'":
        charType = 'delimiter';
        break;
      case ' ':
      case '\u00A0':
        charType = 'space';
        break;
      case '{':
      case '}':
      case '[':
      case ']':
      case ':':
      case ',':
        charType = 'symbol';
        break;
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        charType = buffer.active === 'string' ? 'string' : 'number';
        break;
      case '-':
        charType = (i < text.length - 1 && '0123456789'.includes(text.charAt(i + 1))) ? 'number' : 'string';
        break;
      case '.':
        charType = (i < text.length - 1 && i > 0 && '0123456789'.includes(text.charAt(i + 1)) && '0123456789'.includes(text.charAt(i - 1))) ? 'number' : 'string';
        break;
      default:
        charType = 'string';
    }
    pushAndStore(buffer, char, charType, prefix);
  });

  if (buffer.active) {
    buffer.quarks.push({
      string: buffer[buffer.active],
      type: `${prefix}-${buffer.active}`
    });
    // buffer[buffer.active] = '';
    buffer.active = undefined;
  }
  return buffer.quarks;
}

function validToken(str: string, type: TokenType): boolean {
  const quotes = ["'", '"'];
  const firstChar = str.charAt(0);
  const lastChar = str.charAt(str.length - 1) || '';
  const quoteType = quotes.indexOf(firstChar);
  const nonAlphanumeric = '\'"`.,:;{}[]&<>=~*%\\|/-+!?@^ \xa0';

  switch (type) {
    case 'primitive':
      return ['true', 'false', 'null', 'undefined'].includes(str);
    case 'string':
      if (str.length < 2) {
        return false;
      }
      if (quoteType === -1 || firstChar !== lastChar) {
        return false;
      }
      for (let i = 0; i < str.length; i++) {
        if (i > 0 && i < str.length - 1 && str.charAt(i) === quotes[quoteType] && str.charAt(i - 1) !== '\\') {
          return false;
        }
      }
      break;
    case 'key':
      if (str.length === 0) {
        return false;
      }
      if (quoteType > -1) {
        if (str.length === 1 || firstChar !== lastChar) {
          return false;
        }
        for (let i = 0; i < str.length; i++) {
          if (i > 0 && i < str.length - 1 && str.charAt(i) === quotes[quoteType] && str.charAt(i - 1) !== '\\') {
            return false;
          }
        }
      } else {
        for (let i = 0; i < nonAlphanumeric.length; i++) {
          const nonAlpha = nonAlphanumeric.charAt(i);
          if (!str.includes(nonAlpha)) {
            return false;
          }
        }
      }
      break;
    case 'number':
      for (let i = 0; i < str.length; i++) {
        if (!'0123456789'.includes(str.charAt(i)) && i === 0) {
          if (!str.startsWith('-')) {
            return false;
          }
        } else if (!str.startsWith('.')) {
          return false;
        }
      }
      break;
    case 'symbol':
      if (str.length > 1 || !'{[:]},'.includes(str)) {
        return false;
      }
      break;
    case 'colon':
      if (str.length > 1 || str !== ':') {
        return false;
      }
      break;
    // no default
  }
  return true;
}

function tokenFollowed(tokens: Array<SimpleToken>): null|SimpleToken {
  const last = tokens.length - 1;
  if (last < 1) {
    return null;
  }

  for (let i = last; i >= 0; i--) {
    const previousToken = tokens[i];
    switch (previousToken.type) {
      case 'space':
      case 'linebreak':
        break;
      default:
        return previousToken;
    }
  }
  return null;
}

// Main Function
export default function DomNodeUpdate(this: JSONInput, obj: HTMLElement, locale = defaultLocale): null|DomNodeTokenize {
  const formatTokens: TokenFormat = this.formatDomNodeUpdate && isFunction(this.formatDomNodeUpdate) ? this.formatDomNodeUpdate : formatDomNodeTokens;
  const rootNode = obj.cloneNode(true);
  if (!rootNode.hasChildNodes()) {
    return null;
  }

  const children = rootNode.childNodes;
  const buffer: PrimaryBuffer = {
    tokens_unknown: [],
    tokens_proto: [],
    tokens_split: [],
    tokens_fallback: [],
    tokens_normalize: [],
    tokens_merge: [],
    tokens_plainText: '',
    indented: '',
    json: '',
    jsObject: {},
    markup: ''
  };

  children.forEach(child => {
    switch (child.nodeName) {
      case 'SPAN':
        buffer.tokens_unknown.push({
          string: child.textContent || '',
          type: 'unknown'  // child.textContent // .attributes.type.textContent
        });
        break;
      case 'DIV':
        buffer.tokens_unknown.push({
          string: child.textContent || '',
          type: 'unknown'
        });
        break;
      case 'BR':
        if (child.textContent === '') {
          buffer.tokens_unknown.push({
            string: '\n',
            type: 'unknown'
          });
        }
        break;
      case '#text':
        buffer.tokens_unknown.push({
          string: child.textContent || '', // wholeText,
          type: 'unknown'
        });
        break;
      case 'FONT':
        buffer.tokens_unknown.push({
          string: child.textContent || '',
          type: 'unknown'
        });
        break;
      default:
        console.error('Unrecognized node:', {
          child
        });
    }
  });

  buffer.tokens_proto = buffer.tokens_unknown.map(token => quarkize(token.string, 'proto')).reduce((all, quarks) => all.concat(quarks));

  buffer.tokens_proto.forEach(token => {
    if (!token.type.includes('proto')) {
      if (!validToken(token.string, token.type as TokenType)) {
        buffer.tokens_split = buffer.tokens_split.concat(quarkize(token.string, 'split'));
      } else {
        buffer.tokens_split.push(token);
      }
    } else {
      buffer.tokens_split.push(token);
    }
  });

  buffer.tokens_fallback = buffer.tokens_split.map<FallbackToken>(token => {
    let { type } = token;
    const fallback = [];

    if (type.includes('-')) {
      type = type.slice(type.indexOf('-') + 1);
      if (type !== 'string') {
        fallback.push('string');
      }
      fallback.push('key');
      fallback.push('error');
    }

    return {
      string: token.string,
      length: token.string.length,
      type,
      fallback
    } as FallbackToken;
  });

  const buffer2: SecondaryBuffer = {
    brackets: [],
    isValue: false,
    stringOpen: false
  };

  // Sort tokens for push -> buffer.tokens_normalize
  for (let i = 0; i < buffer.tokens_fallback.length; i++) {
    const token = buffer.tokens_fallback[i];
    const lastIndex = buffer.tokens_normalize.length - 1;
    const lastType = safeGet(tokenFollowed(buffer.tokens_normalize) || {}, 'type', '') as TokenType;
    const normalToken = {
      string: token.string,
      type: token.type
    };

    switch (normalToken.type) {
      case 'symbol':
      case 'colon':
        if (buffer2.stringOpen) {
          normalToken.type = buffer2.isValue ? 'string' : 'key';
          break;
        }
        switch (normalToken.string) {
          case '[':
          case '{':
            buffer2.brackets.push(normalToken.string);
            buffer2.isValue = buffer2.brackets[buffer2.brackets.length - 1] === '[';
            break;
          case ']':
          case '}':
            buffer2.brackets.pop();
            buffer2.isValue = buffer2.brackets[buffer2.brackets.length - 1] === '[';
            break;
          case ',':
            if (lastType === 'colon') {
              break;
            }
            buffer2.isValue = buffer2.brackets[buffer2.brackets.length - 1] === '[';
            break;
          case ':':
            normalToken.type = 'colon';
            buffer2.isValue = true;
            break;
          // no default
        }
        break;
      case 'delimiter':
        normalToken.type = buffer2.isValue ? 'string' : 'key';
        if (!buffer2.stringOpen) {
          buffer2.stringOpen = normalToken.string;
          break;
        }
        if (i > 0) {
          const prevToken = precedingToken(buffer.tokens_fallback, i) || {};
          const tokenType = safeGet(prevToken, 'type', '') as TokenType;
          const tokenString = safeGet(prevToken, 'string', '') as string;
          const tokenChar = tokenString.charAt(tokenString.length - 1);
          if (tokenType === 'string' && tokenChar === '\\') {
            break;
          }
        }
        if (buffer2.stringOpen === normalToken.string) {
          buffer2.stringOpen = false;
          break;
        }
        break;
      case 'primitive':
      case 'string':
        if (['false', 'true', 'null', 'undefined'].includes(normalToken.string)) {
          if (lastIndex >= 0) {
            if (buffer.tokens_normalize[lastIndex].type !== 'string') {
              normalToken.type = 'primitive';
              break;
            }
            normalToken.type = 'string';
            break;
          }
          normalToken.type = 'primitive';
          break;
        }
        if (normalToken.string === '\n') {
          if (!buffer2.stringOpen) {
            normalToken.type = 'linebreak';
            break;
          }
        }
        normalToken.type = buffer2.isValue ? 'string' : 'key';
        break;
      case 'space':
        case 'number':
        if (buffer2.stringOpen) {
          normalToken.type = buffer2.isValue ? 'string' : 'key';
        }
        break;
      // no default
    }
    buffer.tokens_normalize.push(normalToken);
  }

  // Sort tokens for push -> buffer.tokens_merge
  for (let i = 0; i < buffer.tokens_normalize.length; i++) {
    const token = buffer.tokens_normalize[i];
    const mergedToken = {
      string: token.string,
      tokens: [i],
      type: token.type
    };

    if (!['symbol', 'colon'].includes(token.type) && i + 1 < buffer.tokens_normalize.length) {
      let count = 0;
      for (let u = i + 1; u < buffer.tokens_normalize.length; u++) {
        const nextToken = buffer.tokens_normalize[u];
        if (token.type !== nextToken.type) {
          break;
        }
        mergedToken.string += nextToken.string;
        mergedToken.tokens.push(u);
        count += 1;
      }
      i += count;
    }
    buffer.tokens_merge.push(mergedToken);
  }

  const quotes = '\'"';
  const alphanumeric = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$';
  let error: undefined|ErrorMsg;
  let line = buffer.tokens_merge.length > 0 ? 1 : 0;
  const bracketList: Array<Bracket> = [];

  // Reset Buffer2
  buffer2.brackets = [];
  buffer2.isValue = false;
  buffer2.stringOpen = false;

  const setError = (tokenID: number, reason: string, offset=0) => {
    error = {
      token: tokenID,
      line,
      reason
    };
    buffer.tokens_merge[tokenID + offset].type = 'error';
  };

  // TODO: Break apart loop
  buffer.tokens_merge.forEach((token, i) => {
    if (error) {
      return;
    }
    let { string, type } = token;
    let found = false;

    switch (type) {
      case 'space':
        break;
      case 'linebreak':
        line += 1;
        break;
      case 'symbol':
        switch (string) {
          case '{':
          case '[':
            found = followsSymbol(buffer.tokens_merge, i, ['}', ']']);
            if (found) {
              setError(i, format(locale.invalidToken.tokenSequence.prohibited, {
                firstToken: buffer.tokens_merge[i].string, // TODO: should i be found as original?
                secondToken: string
              }));
              break;
            }
            if (string === '[' && i > 0) {
              if (!followsSymbol(buffer.tokens_merge, i, [':', '[', ','])) {
                setError(i, format(locale.invalidToken.tokenSequence.permitted, {
                  firstToken: '[',
                  secondToken: [':', '[', ',']
                }));
                break;
              }
            }
            if (string === '{') {
              if (followsSymbol(buffer.tokens_merge, i, ['{'])) {
                setError(i, format(locale.invalidToken.double, {
                  token: '{'
                }));
                break;
              }
            }
            buffer2.brackets.push(string);
            buffer2.isValue = buffer2.brackets[buffer2.brackets.length - 1] === '[';
            bracketList.push({ i, line, string });
            break;
          case '}':
          case ']':
            if (string === '}') {
              if (buffer2.brackets[buffer2.brackets.length - 1] !== '{') {
                setError(i, format(locale.brace.curly.missingOpen));
                break;
              }
              if (followsSymbol(buffer.tokens_merge, i, [','])) {
                setError(i, format(locale.invalidToken.tokenSequence.prohibited, {
                  firstToken: ',',
                  secondToken: '}'
                }));
                break;
              }
            }
            if (string === ']') {
              if (buffer2.brackets[buffer2.brackets.length - 1] !== '[') {
                setError(i, format(locale.brace.square.missingOpen));
                break;
              }
              if (followsSymbol(buffer.tokens_merge, i, [':'])) {
                setError(i, format(locale.invalidToken.tokenSequence.prohibited, {
                  firstToken: ':',
                  secondToken: ']'
                }));
                break;
              }
            }
            buffer2.brackets.pop();
            buffer2.isValue = buffer2.brackets[buffer2.brackets.length - 1] === '[';
            bracketList.push({ i, line, string });
            break;
          case ',':
            found = followsSymbol(buffer.tokens_merge, i, ['{']);
            if (found) {
              if (followedBySymbol(buffer.tokens_merge, i, ['}'])) {
                setError(i, format(locale.brace.curly.cannotWrap, {
                  token: ','
                }));
                break;
              }
              setError(i, format(locale.invalidToken.tokenSequence.prohibited, {
                firstToken: '{',
                secondToken: ','
              }));
              break;
            }
            if (followedBySymbol(buffer.tokens_merge, i, ['}', ',', ']'])) {
              setError(i, format(locale.noTrailingOrLeadingComma));
              break;
            }
            const typeFollow = typeFollowed(buffer.tokens_merge, i);
            switch (typeFollow) {
              case 'key':
              case 'colon':
                setError(i, format(locale.invalidToken.termSequence.prohibited, {
                  firstTerm: typeFollow === 'key' ? locale.types.key : locale.symbols.colon,
                  secondTerm: locale.symbols.comma
                }));
                break;
              case 'symbol':
                if (followsSymbol(buffer.tokens_merge, i, ['{'])) {
                  setError(i, format(locale.invalidToken.tokenSequence.prohibited, {
                    firstToken: '{',
                    secondToken: ','
                  }));
                  break;
                }
                break;
              // no default
            }
            buffer2.isValue = buffer2.brackets[buffer2.brackets.length - 1] === '[';
            break;
          // no default
        }
        buffer.json += string;
        break;
      case 'colon':
        found = followsSymbol(buffer.tokens_merge, i, ['[']);
        if (found && followedBySymbol(buffer.tokens_merge, i, [']'])) {
          setError(i, format(locale.brace.square.cannotWrap, {
            token: ':'
          }));
          break;
        }
        if (found) {
          setError(i, format(locale.invalidToken.tokenSequence.prohibited, {
            firstToken: '[',
            secondToken: ':'
          }));
          break;
        }
        if (typeFollowed(buffer.tokens_merge, i) !== 'key') {
          setError(i, format(locale.invalidToken.termSequence.permitted, {
            firstTerm: locale.symbols.colon,
            secondTerm: locale.types.key
          }));
          break;
        }
        if (followedBySymbol(buffer.tokens_merge, i, ['}', ']'])) {
          setError(i, format(locale.invalidToken.termSequence.permitted, {
            firstTerm: locale.symbols.colon,
            secondTerm: locale.types.value
          }));
          break;
        }
        buffer2.isValue = true;
        buffer.json += string;
        break;
      case 'key':
      case 'string':
        const firstChar = string.charAt(0);
        const lastChar = string.charAt(string.length - 1);
        if (!quotes.includes(firstChar) && quotes.includes(lastChar)) {
          setError(i, format(locale.string.missingOpen, {
            quote: firstChar
          }));
          break;
        }
        if (!quotes.includes(lastChar) && quotes.includes(firstChar)) {
          setError(i, format(locale.string.missingClose, {
            quote: firstChar
          }));
          break;
        }
        if (quotes.includes(firstChar) && firstChar !== lastChar) {
          setError(i, format(locale.string.missingClose, {
            quote: firstChar
          }));
          break;
        }
        if (type === 'string' && !quotes.includes(firstChar) && !quotes.includes(lastChar)) {
          setError(i, format(locale.string.mustBeWrappedByQuotes));
          break;
        }
        if (type === 'key' && followedBySymbol(buffer.tokens_merge, i, ['}', ']'])) {
          setError(i, format(locale.invalidToken.termSequence.permitted, {
            firstTerm: locale.types.key,
            secondTerm: locale.symbols.colon
          }));
        }
        if (!quotes.includes(firstChar) && !quotes.includes(lastChar)) {
          for (let h = 0; h < string.length; h++) {
            if (error) {
              break;
            }
            const c = string.charAt(h);
            if (!alphanumeric.includes(c)) {
              setError(i, format(locale.string.nonAlphanumeric, {
                token: c
              }));
              break;
            }
          }
        }

        const tmpStr = `"${firstChar === "'" ? string.slice(1, -1) : string}"`;
        if (type === 'key') {
          if (typeFollowed(buffer.tokens_merge, i) === 'key') {
            if (i > 0 && !Number.isNaN(Number(buffer.tokens_merge[i - 1]))) {
              mergeObjects(buffer.tokens_merge[i - 1], buffer.tokens_merge[i]);
              setError(i, format(locale.key.numberAndLetterMissingQuotes));
              break;
            }
            setError(i, format(locale.key.spaceMissingQuotes));
            break;
          }
          if (!followsSymbol(buffer.tokens_merge, i, ['{', ','])) {
            setError(i, format(locale.invalidToken.tokenSequence.permitted, {
              firstToken: type,
              secondToken: ['{', ',']
            }));
            break;
          }
          if (buffer2.isValue) {
            setError(i, format(locale.string.unexpectedKey));
            break;
          }
        }
        if (type === 'string') {
          if (!followsSymbol(buffer.tokens_merge, i, ['[', ':', ','])) {
            setError(i, format(locale.invalidToken.tokenSequence.permitted, {
              firstToken: type,
              secondToken: ['[', ':', ',']
            }));
            break;
          }
          if (!buffer2.isValue) {
            setError(i, format(locale.key.unexpectedString));
            break;
          }
        }
        buffer.json += tmpStr;
        break;
      case 'number':
      case 'primitive':
        if (followsSymbol(buffer.tokens_merge, i, ['{'])) {
          buffer.tokens_merge[i].type = 'key';
          type = buffer.tokens_merge[i].type;
          string = `"${string}"`;
        } else if (typeFollowed(buffer.tokens_merge, i) === 'key') {
          buffer.tokens_merge[i].type = 'key';
          type = buffer.tokens_merge[i].type;
        } else if (!followsSymbol(buffer.tokens_merge, i, ['[', ':', ','])) {
          setError(i, format(locale.invalidToken.tokenSequence.permitted, {
            firstToken: type,
            secondToken: ['[', ':', ',']
          }));
          break;
        }
        if (type !== 'key' && !buffer2.isValue) {
          buffer.tokens_merge[i].type = 'key';
          type = buffer.tokens_merge[i].type;
          string = `"${string}"`;
        }
        if (type === 'primitive' && string === 'undefined') {
          setError(i, format(locale.invalidToken.useInstead, {
            badToken: 'undefined',
            goodToken: 'null'
          }));
        }
        buffer.json += string;
        break;
      // no default
    }
  });

  let noEscapedSingleQuote = '';
  for (let i = 0; i < buffer.json.length; i++) {
    const current = buffer.json.charAt(i);
    const next = buffer.json.charAt(i + 1) || '';

    if (i + 1 < buffer.json.length) {
      if (current === '\\' && next === "'") {
        noEscapedSingleQuote += next;
        i += 1;
        // eslint-disable-next-line no-continue
        continue;
      }
    }
    noEscapedSingleQuote += current;
  }

  buffer.json = noEscapedSingleQuote;
  if (error === undefined) {
    const maxIterations = Math.ceil(bracketList.length / 2);
    let round = 0;
    let delta = false;

    const removePair = (idx: number) => {
      bracketList.splice(idx + 1, 1);
      bracketList.splice(idx, 1);
      if (!delta) {
        delta = true;
      }
    };

    while (bracketList.length > 0) {
      delta = false;
      for (let tokenCount = 0; tokenCount < bracketList.length - 1; tokenCount++) {
        const pair = bracketList[tokenCount].string + bracketList[tokenCount + 1].string;
        if (['[]', '{}'].includes(pair)) {
          removePair(tokenCount);
        }
      }
      round += 1;
      if (!delta) {
        break;
      }
      if (round >= maxIterations) {
        break;
      }
    }

    if (bracketList.length > 0) {
      const tokenString = bracketList[0].string;
      const tokenPosition = bracketList[0].i;
      const closingBracketType = tokenString === '[' ? ']' : '}';
      line = bracketList[0].line;
      setError(tokenPosition, format(locale.brace[closingBracketType === ']' ? 'square' : 'curly'].missingClose));
    }

    if (![undefined, ''].includes(buffer.json)) {
      try {
        buffer.jsObject = JSON.parse(buffer.json) as Record<string, any>;
      } catch (err) {
        const errorMessage = (err as Error).message;
        const subsMark = errorMessage.indexOf('position');

        if (subsMark === -1) {
          throw new Error('Error parsing failed');
        }

        const errPositionStr = errorMessage.substring(subsMark + 9, errorMessage.length);
        const errPosition = parseInt(errPositionStr, 10);
        let charTotal = 0;
        let tokenIndex = 0;
        let token: MergeToken = buffer.tokens_merge[tokenIndex];
        let lineCount = 1;
        let exitWhile = false;

        while (charTotal < errPosition && !exitWhile) {
          token = buffer.tokens_merge[tokenIndex];
          if (token.type === 'linebreak') {
            lineCount += 1;
          }
          if (!['space', 'linebreak'].includes(token.type)) {
            charTotal += token.string.length;
          }
          if (charTotal >= errPosition) {
            break;
          }
          tokenIndex += 1;
          if (!buffer.tokens_merge[tokenIndex + 1]) {
            exitWhile = true;
          }
        }

        line = lineCount;
        let backslashCount = 0;

        for (let i = 0; i < token.string.length; i++) {
          const char = token.string.charAt(i);
          if (char === '\\') {
            backslashCount = backslashCount > 0 ? backslashCount + 1 : 1;
          } else {
            if (backslashCount % 2 !== 0 || backslashCount === 0) {
              if (!'\'"bfnrt'.includes(char)) {
                setError(tokenIndex, format(locale.invalidToken.unexpected, {
                  token: '\\'
                }));
              }
            }
            backslashCount = 0;
          }
        }
        if (!error) {
          setError(tokenIndex, format(locale.invalidToken.unexpected, {
            token: token.string
          }));
        }
      }
    }
  }

  let lines = 1;

  if (error !== undefined) {
    let lineFallback = 1;
    const countCarrigeReturn = (str: string) => {
      let count = 0;
      for (let i = 0; i < str.length; i++) {
        if (['\n', '\r'].includes(str[i])) {
          count += 1;
        }
      }
      return count;
    };

    lines = 1;
    for (let i = 0; i < buffer.tokens_merge.length; i++) {
      const token = buffer.tokens_merge[i];
      const { string, type } = token;
      if (type === 'linebreak') {
        lines += 1;
      }

      buffer.markup += newSpan(i, token, 0, this.colors);
      lineFallback += countCarrigeReturn(string);
    }

    lines += 1;
    lineFallback += 1;
    if (lines < lineFallback) {
      lines = lineFallback;
    }
  } else {
    const [ tokenLines, markup ] = formatTokens(buffer.tokens_merge, this.colors);
    lines += tokenLines;
    buffer.markup += markup;
  }

  buffer.tokens_merge.forEach(token => {
    buffer.indented += token.string;
    if (!['space', 'linebreak'].includes(token.type)) {
      buffer.tokens_plainText += token.string;
    }
  });

  if (error !== undefined) {
    const { modifyErrorText } = this.props;

    if (modifyErrorText && isFunction(modifyErrorText)) {
      setError(error.token, modifyErrorText(error.reason), error.offset);
    }
  }

  return {
    tokens: buffer.tokens_merge,
    noSpaces: buffer.tokens_plainText,
    indented: buffer.indented,
    json: buffer.json,
    jsObject: buffer.jsObject,
    markup: buffer.markup,
    lines,
    error
  };
}
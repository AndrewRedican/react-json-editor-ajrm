/* DOM Node || OnBlue or Update */
import {
  BaseToken, FallbackToken, MergeToken, SimpleToken, Tokenize, TokenType
} from './tokens';

// Interfaces
export interface PrimaryBuffer {
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

export interface SecondaryBuffer {
  brackets: Array<string>;
  isValue: boolean;
  stringOpen: boolean|string;
}

export interface Bracket {
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

// Return Interface
export interface DomNodeTokenize extends Tokenize {
  tokens: Array<MergeToken>;
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

export function quarkize(text: string, prefix = ''): Array<BaseToken> {
  const buffer: QuarkBuffer = {
    active: undefined,
    string: '',
    number: '',
    symbol: '',
    space: '',
    delimiter: '',
    quarks: []
  };

  const lastIdx = text.length - 1;
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
        charType = (i < lastIdx && '0123456789'.includes(text.charAt(i + 1))) ? 'number' : charType;
        break;
      case '.':
        charType = (i < lastIdx && i > 0 && '0123456789'.includes(text.charAt(i + 1)) && '0123456789'.includes(text.charAt(i - 1))) ? 'number' : charType;
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
    buffer[buffer.active] = '';
    buffer.active = undefined;
  }
  return buffer.quarks;
}

export function validToken(str: string, type: TokenType): boolean {
  const quotes = ["'", '"'];
  const firstChar = str.charAt(0);
  const lastChar = str.charAt(str.length - 1) || '';
  const quoteType = quotes.indexOf(firstChar);
  const nonAlphanumeric = '\'"`.,:;{}[]&<>=~*%\\|/-+!?@^ \xa0';

  switch (type) {
    case 'primitive':
      return ['true', 'false', 'null', 'undefined'].includes(str);
    case 'string':
      if (str.length < 2 || quoteType === -1 || firstChar !== lastChar) {
        return false;
      }
      for (let i = 0; i < str.length; i++) {
        if (i > 0 && i < str.length - 1 && str.charAt(i) === quotes[quoteType] && str.charAt(i-1) !== '\\') {
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
          if (i > 0 && i < str.length - 1 && str.charAt(i) === quotes[quoteType] && str.charAt(i-1) !== '\\') {
            return false;
          }
        }
      } else {
        for (let i = 0; i < nonAlphanumeric.length; i++) {
          const nonAlpha = nonAlphanumeric.charAt(i);
          if (str.includes(nonAlpha)) {
            return false;
          }
        }
      }
      break;
    case 'number':
      for (let i = 0; i < str.length; i++) {
        if (!'0123456789'.includes(str.charAt(i))) {
          if (i === 0) {
            if (!str.startsWith('-')) {
              return false;
            }
          } else if (str.charAt(i) !== '.') {
            return false;
          }
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

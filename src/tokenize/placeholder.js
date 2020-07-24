/* JS OBJECTS || PLACEHOLDER */
import { newSpan, surroundingTokens } from './utils';

// Helper Functions
function stringMayRemoveQuotes(nonAlphaNumeric, text) {
  let numberAndLetter = false;

  for (let i = 0; i < text.length; i++) {
    const num = Number.isNaN(Number(text.charAt(i)));
    if (i === 0 && num) {
      break;
    }
    if (num) {
      numberAndLetter = true;
      break;
    }
  }
  return !(nonAlphaNumeric.length > 0 || numberAndLetter);
}

function stripQuotesFromKey(text) {
  if (text.length === 0) {
    return text;
  }
  if (['""', "''"].includes(text)) {
    return "''";
  }
  let val = /^['"].*["']$/.test(text) && text.length >= 2 ? text.slice(1, -1) : text;
  const nonAlphaNumeric = val.replace(/\w/g, '');
  const mayRemoveQuotes = stringMayRemoveQuotes(nonAlphaNumeric, val);
  const hasQuotes = nonAlphaNumeric.includes('\'"');

  if (hasQuotes) {
    val = val.split('').map(char => {
      if (['"', "'"].includes(char)) {
        return `\\${char}`;
      }
      return char;
    }).join('');
  }
  return mayRemoveQuotes ? val : `'${val}'`;
}

function addTokenPrimary(buffer, value) {
  if (value.length === 0) {
    return false;
  }
  buffer.tokens.push(value);
  return true;
}

function addTokenSecondary(buffer) {
  if (buffer.tokenSecondary.length === 0) {
    return false;
  }
  buffer.tokens.push(buffer.tokenSecondary);
  buffer.tokenSecondary = '';
  return true;
}

function escapeCharacter(buffer) {
  if (buffer.currentChar !== '\\') {
    return false;
  }
  const str = buffer.inputText;
  const idx = buffer.position;
  buffer.inputText = str.slice(0, idx) + str.slice(idx + 1);
  return true;
}

function determineString(buffer) {
  if ('\'"'.includes(buffer.currentChar)) {
    if (!buffer.stringOpen) {
      addTokenSecondary(buffer);
      buffer.stringStart = buffer.position;
      buffer.stringOpen = buffer.currentChar;
      return true;
    }
    if (buffer.stringOpen === buffer.currentChar) {
      addTokenSecondary(buffer);
      addTokenPrimary(buffer, buffer.inputText.substring(buffer.stringStart, buffer.position + 1));
      buffer.stringOpen = false;
      return true;
    }
  }
  return false;
}

function determineValue(buffer) {
  if (!':,{}[]'.includes(buffer.currentChar) || buffer.stringOpen) {
    return false;
  }
  addTokenSecondary(buffer);
  addTokenPrimary(buffer, buffer.currentChar);

  switch (buffer.currentChar) {
    case ':':
      buffer.isValue = true;
      return true;
    case '{':
    case '[':
      buffer.brackets.push(buffer.currentChar);
      break;
    case '}':
    case ']':
      buffer.brackets.pop();
      break;
    // no default
  }

  if (buffer.currentChar !== ':') {
    buffer.isValue = buffer.brackets[buffer.brackets.length - 1] === '[';
  }
  return true;
}

// Main Function
function PlaceholderJSON(obj) {
  const buffer = {
    inputText: JSON.stringify(obj),
    position: 0,
    currentChar: '',
    tokenPrimary: '',
    tokenSecondary: '',
    brackets: [],
    isValue: false,
    stringOpen: false,
    stringStart: 0,
    tokens: []
  };

  for (let i = 0; i < buffer.inputText.length; i++) {
    buffer.position = i;
    buffer.currentChar = buffer.inputText.charAt(buffer.position);

    if (!determineValue(buffer) && !determineString(buffer) && !escapeCharacter(buffer)) {
      if (!buffer.stringOpen) {
        buffer.tokenSecondary += buffer.currentChar;
      }
    }
  }

  const buffer2 = {
    brackets: [],
    isValue: false,
    tokens: []
  };

  buffer2.tokens = buffer.tokens.map(token => {
    const rtnToken = {
      type: '',
      string: '',
      value: '',
      depth: 0
    };

    switch (token) {
      case ',':
        buffer2.isValue = buffer2.brackets[buffer2.brackets.length - 1] === '[';
        rtnToken.type = 'symbol';
        rtnToken.string = token;
        rtnToken.value = token;
        break;
      case ':':
        buffer2.isValue = true;
        rtnToken.type = 'symbol';
        rtnToken.string = token;
        rtnToken.value = token;
        break;
      case '{':
      case '[':
        buffer2.brackets.push(token);
        buffer2.isValue = buffer2.brackets[buffer2.brackets.length - 1] === '[';
        rtnToken.type = 'symbol';
        rtnToken.string = token;
        rtnToken.value = token;
        break;
      case '}':
      case ']':
        buffer2.brackets.pop();
        buffer2.isValue = buffer2.brackets[buffer2.brackets.length - 1] === '[';
        rtnToken.type = 'symbol';
        rtnToken.string = token;
        rtnToken.value = token;
        break;
      case 'undefined':
        rtnToken.type = 'primitive';
        rtnToken.string = token;
        rtnToken.value = undefined;
        break;
      case 'null':
        rtnToken.type = 'primitive';
        rtnToken.string = token;
        rtnToken.value = null;
        break;
      case 'false':
        rtnToken.type = 'primitive';
        rtnToken.string = token;
        rtnToken.value = false;
        break;
      case 'true':
        rtnToken.type = 'primitive';
        rtnToken.string = token;
        rtnToken.value = true;
        break;
      default:
        if ('\'"'.includes(token.charAt(0))) {
          rtnToken.type = buffer2.isValue ? 'string' : 'key';
          if (rtnToken.type === 'string') {
            rtnToken.string = '';
            const charList2 = token.slice(1, -1).split('');
            for (let ii = 0; ii < charList2.length; ii++) {
              const char = charList2[ii];
              rtnToken.string += '\'"'.includes(char) ? `\\${char}` : char;
            }
            rtnToken.string = `'${rtnToken.string}'`;
          } else {
            rtnToken.string = stripQuotesFromKey(token);
          }
          rtnToken.value = rtnToken.string;
        } else if (!Number.isNaN(Number(token))) {
          rtnToken.type = 'number';
          rtnToken.string = token;
          rtnToken.value = Number(token);
        } else if (token.length > 0 && !buffer2.isValue) {
          rtnToken.type = 'key';
          rtnToken.string = rtnToken.string.includes(' ') ? `'${rtnToken.string}'` : token;
          rtnToken.value = rtnToken.string;
        }
    }
    rtnToken.depth = buffer2.brackets.length;
    return rtnToken;
  });

  const clean = buffer2.tokens.map(t => t.string).join('');
  const lastIndex = buffer2.tokens.length - 1;
  let lines = 1;
  let indentation = '';
  let markup = '';

  const indent = (num) => `${num > 0 ? '\n' : ''}${Array(num * 2).fill(' ').join('')}`;
  const indentII = (num) => {
    lines += num > 0 ? 1 : 0;
    return `${num > 0 ? '</br>' : ''}${Array(num * 2).fill('&nbsp;').join('')}`;
  };

  // FORMAT BY TOKEN!!
  buffer2.tokens.forEach((token, idx) => {
    const { depth, string } = token;
    const span = newSpan(idx, token, token.depth, this.colors);
    const [prevToken, nextToken] = surroundingTokens(buffer2.tokens, idx);
    const nextString = nextToken ? nextToken.string : '';
    const prevString = prevToken ? prevToken.string : '';

    switch (string) {
      case '{':
      case '[':
        indentation += '}]'.includes(nextString) ? token.string : `${string}${indent(depth)}`;
        markup += '}]'.includes(nextString) ? span : `${span}${indentII(depth)}`;
        break;
      case '}':
      case ']':
        indentation += '[{'.includes(prevString) ? string : `${indent(depth)}${string}`;
        markup += '[{'.includes(prevString) ? span : `${indentII(depth)}${lastIndex === idx ? '<br>' : ''}${span}`;
        break;
      case ':':
        indentation += `${string} `;
        markup += `${span} `;
        break;
      case ',':
        indentation += `${string}${indent(depth)}`;
        markup += `${span}${indentII(depth)}`;
        break;
      default:
        indentation += string;
        markup += span;
    }
  });

  lines += 2;
  return {
    tokens: buffer2.tokens,
    noSpaces: clean,
    indented: indentation,
    json: JSON.stringify(obj),
    jsObject: obj,
    markup,
    lines
  };
}

export default PlaceholderJSON;
/* Tokenize utility functions */
import {
  SimpleToken, TokenType, MarkupToken, MergeToken
} from './interfaces';
import { isUndefined } from '../err';
import { ColorProps } from '../interfaces';
import { dark_vscode_tribute } from '../themes';
import { safeGet } from '../utils';

/* Shared */
/**
 * Create a new span string for use within the JSON Editor
 * @param {number} i - Index
 * @param {Token} token - Token to crean the span based on
 * @param {number} depth - Indentation
 * @param {Colors} colors - Color object
 * @returns {string} - formatted span string
 */
export function newSpan(i: number, token: SimpleToken, depth: number, colors: ColorProps = dark_vscode_tribute) {
  const { string, type } = token;
  let color = '';

  switch (type) {
    case 'string':
    case 'number':
    case 'primitive':
    case 'error':
      color = safeGet(colors, token.type, '') as string;
      break;
    case 'key':
      color = string === ' ' ? colors.keys_whiteSpace : colors.keys;
      break;
    case 'symbol':
      color = string === ':' ? colors.colon : colors.default;
      break;
    default:
      color = colors.default;
      break;
  }
  let val = string;
  if (string.length !== string.replace(/</g, '').replace(/>/g, '').length) {
    val = `<xmp style=display:inline;>${val}</xmp>`;
  }

  return `<span key="${i}" type="${type}" value="${val}" depth="${depth}" style="color: ${color}">${val}</span>`;
}

// Token related
/**
 * Get the precededing token
 * @param {Array<Token>} tokens - Array of tokens
 * @param {number} tokenID - ID of the token to get preceding
 * @returns {null|Token}
 */
export function precedingToken(tokens: Array<SimpleToken>, tokenID: number): null|SimpleToken {
  isUndefined('tokens', tokens, 'tokens argument must be an array');
  isUndefined('tokenID', tokenID, 'tokenID argument must be an integer.');
  if (tokenID > 0 && tokenID < tokens.length) {
    return tokens[tokenID - 1];
  }
  return null;
}

/**
 * Get the following token
 * @param {Array<Token>} tokens - Array of tokens
 * @param {number} tokenID - ID of the token to get preceding
 * @returns {null|Token}
 */
export function followingToken(tokens: Array<SimpleToken>, tokenID: number): null|SimpleToken {
  isUndefined('tokens', tokens, 'tokens argument must be an array');
  isUndefined('tokenID', tokenID, 'tokenID argument must be an integer.');
  if (tokenID >= 0 && tokenID < tokens.length - 2) {
    return tokens[tokenID + 1];
  }
  return null;
}

/**
 * Get the surrounding tokens
 * @param {Array<Token>} tokens - Array of tokens
 * @param {number} tokenID - ID of the token to get preceding
 * @returns {[null|Token, null|Token]} - [preceding token, following token]
 */
export function surroundingTokens(tokens: Array<SimpleToken>, tokenID: number): [null|SimpleToken, null|SimpleToken] {
  isUndefined('tokens', tokens, 'tokens argument must be an array');
  isUndefined('tokenID', tokenID, 'tokenID argument must be an integer.');
  return [
    precedingToken(tokens, tokenID),
    followingToken(tokens, tokenID)
  ];
}

// Token Symbols
/**
 * Determine if the given options follow the given token
 * @param {Array<Token>} tokens - Array of tokens
 * @param {number} tokenID - ID of the token to determine if the given options follow
 * @param {Array<string>} options - Array of string symbols to validate follow the given token
 * @returns {boolean} - any of the given symbol options precede the given token
 */
export function followedBySymbol(tokens: Array<SimpleToken>, tokenID: number, options: Array<string>): boolean {
  isUndefined('tokens', tokens, 'tokens argument must be an array');
  isUndefined('tokenID', tokenID, 'tokenID argument must be an integer.');
  isUndefined('options', options, 'options argument must be an array.');
    for (let i = tokenID; i < tokens.length; i++) {
      const nextToken = followingToken(tokens, i);
      if (nextToken) {
        switch (nextToken.type) {
          case 'space':
          case 'linebreak':
            break;
          case 'symbol':
          case 'colon':
            return options.includes(nextToken.string);
          default:
            return false;
        }
      }
    }
  return false;
}

/**
 * Determine if the given options are precede the given token
 * @param {Array<Token>} tokens - Array of tokens
 * @param {number} tokenID - ID of the token to determine if the given options precede
 * @param {Array<string>} options - Array of string symbols to validate preced the given token
 * @returns {boolean} - any of the given symbol options precede the given token
 */
export function followsSymbol(tokens: Array<SimpleToken>, tokenID: number, options: Array<string>): boolean {
  isUndefined('tokens', tokens, 'tokens argument must be an array');
  isUndefined('tokenID', tokenID, 'tokenID argument must be an integer.');
  isUndefined('options', options, 'options argument must be an array.');
  for (let i = tokenID; i >= 0; i--) {
    const prevToken = precedingToken(tokens, i);
    if (prevToken) {
      switch (prevToken.type) {
        case 'space':
        case 'linebreak':
          break;
        case 'symbol':
        case 'colon':
          return options.includes(prevToken.string);
        default:
          return false;
      }
    }
  }
  return false;
}

/**
 * Determine the given token's preceded type
 * @param {Array<Token>} tokens - Array of tokens
 * @param {number} tokenID - ID of the token to find the previous type
 * @returns {null|TokenType} - Preceding token's type, if available (excluding space & linebreak)
 */
export function typeFollowed(tokens: Array<SimpleToken>, tokenID: number): TokenType {
  isUndefined('tokens', tokens, 'tokens argument must be an array');
  isUndefined('tokenID', tokenID, 'tokenID argument must be an integer.');
  for (let i = tokenID; i > 0; i--) {
    const prevToken = precedingToken(tokens, i);
    if (prevToken) {
      switch (prevToken.type) {
        case 'space':
        case 'linebreak':
          break;
        default:
          return prevToken.type;
      }
    }
  }
  return 'undefined';
}

/* Formatting */
/**
  * Format the given tokens from the DomNode updates
  * @param {Array<MarkupToken>} tokens - Tokens to format
  * @param {Colors} colors - Colors to use as the theme
  * @returns {[number, string]} - [Lines, Markup (HTML String)]
  */
export function formatDomNodeTokens(tokens: Array<MergeToken>, colors: ColorProps = dark_vscode_tribute): [number, string] {
  const lastIndex = tokens.length - 1;
  let lines = 0;
  let depth = 0;
  let markup = '';
  const newIndent = () => Array(depth * 2).fill('&nbsp;').join('');
  const newLineBreak = (byPass = false) => {
    lines += 1;
    return (depth > 0 || byPass) ? '<br>' : '';
  };
  const newLineBreakAndIndent = (byPass = false) => `${newLineBreak(byPass)}${newIndent()}`;

  tokens.forEach((token, idx) => {
    const { string, type } = token;
    const span = newSpan(idx, token, depth, colors);
    const islastToken = idx === lastIndex;
    const prevToken = precedingToken(tokens, idx);
    const lineAdjust = prevToken && ['[', '{'].includes(prevToken.string) ? newLineBreakAndIndent(islastToken) : '';

    switch (type) {
      case 'space':
      case 'linebreak':
        break;
      case 'string':
      case 'number':
      case 'primitive':
      case 'error':
        markup += `${followsSymbol(tokens, idx, [',', '[']) ? newLineBreakAndIndent() : ''}${span}`;
        break;
      case 'key':
        markup += `${newLineBreakAndIndent()}${span}`;
        break;
      case 'colon':
        markup += `${span}&nbsp;`;
        break;
      case 'symbol':
        switch (string) {
          case '[':
          case '{':
            markup += `${!followsSymbol(tokens, idx, [':']) ? newLineBreakAndIndent() : ''}${span}`;
            depth += 1;
            break;
          case ']':
          case '}':
            depth -= 1;
            markup += `${lineAdjust}${newSpan(idx, token, depth, colors)}`;
            break;
          case ',':
            markup += span;
            break;
          // no default
        }
        break;
      // no default
    }
  });

  return [
    lines,
    markup
  ];
}

/**
  * Format the given tokens from the placeholder for display
  * @param {Array<MarkupToken>} tokens - Tokens to format
  * @param {Colors} colors - Colors to use as the theme
  * @returns {[number, string, string]} - [Lines, Indentation (JSON String), Markup (HTML String)]
  */
export function formatPlaceholderTokens(tokens: Array<MarkupToken>, colors: ColorProps = dark_vscode_tribute): [number, string, string] {
  const lastIndex = tokens.length - 1;
  let lines = 1;
  let indentation = '';
  let markup = '';

  const indent = (num: number) => `${num > 0 ? '\n' : ''}${Array(num * 2).fill(' ').join('')}`;
  const indentII = (num: number) => {
    lines += num > 0 ? 1 : 0;
    return `${num > 0 ? '</br>' : ''}${Array(num * 2).fill('&nbsp;').join('')}`;
  };

  // FORMAT BY TOKEN!!
  tokens.forEach((token, idx) => {
    const { depth, string } = token;
    const span = newSpan(idx, token, token.depth, colors);
    const [prevToken, nextToken] = surroundingTokens(tokens, idx);
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

  return [
    lines,
    indentation,
    markup
  ];
}

/* General */
/**
  * Merge the given objects into the target
  * @param {Record<string, any>} target - Target of the merged objects
  * @param {Array<Record<string, any>>} params - Objects to merge into the target
  * @returns {Record<string, any>} - Merged object
  */
 export function mergeObjects(target: Record<string, any>, ...params: Array<Record<string, any>>): Record<string, any> {
  params.forEach((param, i) => {
    Object.keys(param).forEach(key => {
      if (key in target) {
        if (typeof param[key] === typeof target[key]) {
          switch (true) {
            case typeof param[key] === 'string':
              target[key] += param[key];
              break;
            case param[key] instanceof Array:
              target[key].push(...param[key]);
              break;
            default:
              console.warn(`unknown merge type ${typeof target[key]}`);
          }
        } else {
          throw new TypeError(`Target key of ${key}(${typeof target[key]}) is not the same type as param[${i}] key of ${key}(${typeof param[key]})`);
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        target[key] = param[key];
      }
    });
  });
  return target;
 }

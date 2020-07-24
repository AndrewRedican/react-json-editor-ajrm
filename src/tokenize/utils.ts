/* Tokenize utility functions */
import { Token, TokenType } from './interfaces';
import { isUndefined } from '../err';

type Colors = Record<string, any>;

/* Shared */
/**
 * Create a new span string for use within the JSON Editor
 * @param {number} i - Index
 * @param {Token} token - Token to crean the span based on
 * @param {number} depth - Indentation
 * @param {Colors} colors - Color object
 * @returns {string} - formatted span string
 */
export function newSpan(i: number, token: Token, depth: Number, colors: Colors = {}) {
  const { string, type } = token;
  let color = '';

  switch (type) {
    case 'string':
    case 'number':
    case 'primitive':
    case 'error':
      color = colors[token.type];
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

  return (
    `<span key="${i}" type="${type}" value="${val}" depth="${depth}" style="color: ${color}">${val}</span>`
  );
}

// Token related
/**
 * Get the precededing token
 * @param {Array<Token>} tokens - Array of tokens
 * @param {number} tokenID - ID of the token to get preceding
 * @returns {null|Token}
 */
export function precedingToken(tokens: Array<Token>, tokenID: number): null|Token {
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
export function followingToken(tokens: Array<Token>, tokenID: number): null|Token {
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
export function surroundingTokens(tokens: Array<Token>, tokenID: number): [null|Token, null|Token] {
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
export function followedBySymbol(tokens: Array<Token>, tokenID: number, options: Array<string>): boolean {
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
export function followsSymbol(tokens: Array<Token>, tokenID: number, options: Array<string>): boolean {
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
export function typeFollowed(tokens: Array<Token>, tokenID: number): TokenType {
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

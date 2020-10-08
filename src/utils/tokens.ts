/* Token Interfaces & Helpers */
import Err from '../err';

// Interfaces
export type TokenType = 'colon'|'delimiter'|'error'|'linebreak'|'key'|'null'|'number'|'primitive'|'space'|'string'|'symbol'|'undefined'|'unknown';

export interface BaseToken {
  string: string;
  type: string;
}

export interface SimpleToken extends BaseToken {
  type: TokenType
}

export interface FallbackToken extends SimpleToken {
  fallback: Array<TokenType>;
  length: number;
}

export interface MarkupToken extends SimpleToken {
  value: boolean|number|null|string|undefined;
  depth: number;
}

export interface MergeToken extends SimpleToken {
  tokens: Array<number>;
}

// ??
export interface ErrorMsg {
  token: number;
  line: number;
  reason: string;
}

// Return Interface
export interface Tokenize {
  noSpaces: string,
  indented: string,
  json: string,
  jsObject: Record<string, any>,
  markup: string
  lines: number,
  error?: ErrorMsg
}

// Helper Functions
export function tokenFollowed(tokens: Array<SimpleToken>): null|SimpleToken {
  Err.isUndefined('tokens', tokens, 'tokens argument must be an array');
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

/**
 * Get the preceding token
 * @param {Array<SimpleToken>} tokens - Array of tokens
 * @param {number} tokenID - ID of the token to get preceding
 * @returns {null|SimpleToken}
 */
export function precedingToken(tokens: Array<SimpleToken>, tokenID: number): null|SimpleToken {
  Err.isUndefined('tokens', tokens, 'tokens argument must be an array');
  Err.isUndefined('tokenID', tokenID, 'tokenID argument must be an integer.');
  if (tokenID > 0 && tokenID < tokens.length) {
    return tokens[tokenID - 1];
  }
  return null;
}

/**
 * Get the following token
 * @param {Array<SimpleToken>} tokens - Array of tokens
 * @param {number} tokenID - ID of the token to get preceding
 * @returns {null|SimpleToken}
 */
export function followingToken(tokens: Array<SimpleToken>, tokenID: number): null|SimpleToken {
  Err.isUndefined('tokens', tokens, 'tokens argument must be an array');
  Err.isUndefined('tokenID', tokenID, 'tokenID argument must be an integer.');
  if (tokenID >= 0 && tokenID < tokens.length - 2) {
    return tokens[tokenID + 1];
  }
  return null;
}

/**
 * Get the surrounding tokens
 * @param {Array<SimpleToken>} tokens - Array of tokens
 * @param {number} tokenID - ID of the token to get preceding
 * @returns {[null|SimpleToken, null|SimpleToken]} - [preceding token, following token]
 */
export function surroundingTokens(tokens: Array<SimpleToken>, tokenID: number): [null|SimpleToken, null|SimpleToken] {
  Err.isUndefined('tokens', tokens, 'tokens argument must be an array');
  Err.isUndefined('tokenID', tokenID, 'tokenID argument must be an integer.');
  return [
    precedingToken(tokens, tokenID),
    followingToken(tokens, tokenID)
  ];
}

/**
 * Determine if the given options follow the given token
 * @param {Array<SimpleToken>} tokens - Array of tokens
 * @param {number} tokenID - ID of the token to determine if the given options follow
 * @param {Array<string>} options - Array of string symbols to validate follow the given token
 * @returns {boolean} - any of the given symbol options precede the given token
 */
export function followedBySymbol(tokens: Array<SimpleToken>, tokenID: number, options: Array<string>): boolean {
  Err.isUndefined('tokens', tokens, 'tokens argument must be an array');
  Err.isUndefined('tokenID', tokenID, 'tokenID argument must be an integer.');
  Err.isUndefined('options', options, 'options argument must be an array.');
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
 * @param {Array<SimpleToken>} tokens - Array of tokens
 * @param {number} tokenID - ID of the token to determine if the given options precede
 * @param {Array<string>} options - Array of string symbols to validate precede the given token
 * @returns {boolean} - any of the given symbol options precede the given token
 */
export function followsSymbol(tokens: Array<SimpleToken>, tokenID: number, options: Array<string>): boolean {
  Err.isUndefined('tokens', tokens, 'tokens argument must be an array');
  Err.isUndefined('tokenID', tokenID, 'tokenID argument must be an integer.');
  Err.isUndefined('options', options, 'options argument must be an array.');
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
 * @param {Array<SimpleToken>} tokens - Array of tokens
 * @param {number} tokenID - ID of the token to find the previous type
 * @returns {null|TokenType} - Preceding token's type, if available (excluding space & linebreak)
 */
export function typeFollowed(tokens: Array<SimpleToken>, tokenID: number): null|TokenType {
  Err.isUndefined('tokens', tokens, 'tokens argument must be an array');
  Err.isUndefined('tokenID', tokenID, 'tokenID argument must be an integer.');
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
  return null;
}

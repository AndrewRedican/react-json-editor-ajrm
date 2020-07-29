/* Tokenize Shared Interfaces */

/* Token Interfaces */
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

/* Tokenize Return Types */
export interface ErrorMsg {
  token: number;
  line: number;
  reason: string;
  offset?: number;
}

export interface Tokenize {
  noSpaces: string,
  indented: string,
  json: string,
  jsObject: Record<string, any>,
  markup: string
  lines: number,
  error?: ErrorMsg
}

// DomNode
export interface DomNodeTokenize extends Tokenize {
  tokens: Array<MergeToken>;
}

// PlaceHolder
export interface PlaceholderTokenize extends Tokenize {
  tokens: Array<MarkupToken>;
}

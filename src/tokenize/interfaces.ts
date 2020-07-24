/* Tokenize Shared Interfaces */

export type TokenType = 'colon'|'delimiter'|'error'|'linebreak'|'key'|'null'|'number'|'primitive'|'space'|'string'|'symbol'|'undefined'|'unknown';

export interface Token {
  type: TokenType;
  string: string;
  value: boolean|number|null|string|undefined;
  depth: number;
}

export interface ErrorMsg {
  token: number;
  line: number;
  reason: string;
}

export interface Tokenize {
  tokens: Array<Token>,
  noSpaces: string,
  indented: string,
  json: string,
  jsObject: Record<string, any>,
  markup: string
  lines: number,
  error?: ErrorMsg
}
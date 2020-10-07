/* JS OBJECTS || PLACEHOLDER */
import { MarkupToken, Tokenize } from './tokens';

// Interfaces
export interface PrimaryBuffer {
  inputText: string;
  position: number;
  currentChar: string;
  tokenPrimary: string;
  tokenSecondary: string;
  brackets: Array<string>;
  isValue: boolean;
  stringOpen: null|string;
  stringStart: number;
  tokens: Array<string>;
}

export interface SecondaryBuffer {
  brackets: Array<string>;
  isValue: boolean;
  tokens: Array<MarkupToken>;
}

// Return Interface
export interface PlaceholderTokenize extends Tokenize {
  tokens: Array<MarkupToken>;
}

// Helper Functions
function stringMayRemoveQuotes(quotable: string, text: string): boolean {
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
  return !(quotable.length > 0 || numberAndLetter);
}

export function stripQuotesFromKey(text: string): string {
  if (text.length === 0) {
    return text;
  }
  if (['""', "''"].includes(text)) {
    return "''";
  }
  // simplify original loop to check for quote wrapped string
  let val = /^['"].*["']$/.test(text) && text.length >= 2 ? text.slice(1, -1) : text;
  const nonAlphaNumeric = val.replace(/\w/g, '');
  const mayRemoveQuotes = stringMayRemoveQuotes(nonAlphaNumeric, val);
  // simplify original loop to check for quotes
  const hasQuotes = /['"]/.test(nonAlphaNumeric);

  if (hasQuotes) {
    val = val.split('').map(char => ["'", '"'].includes(char) ? `\\${char}` : char ).join('');
  }
  return mayRemoveQuotes ? val : `'${val}'`;
}

function addTokenPrimary(buffer: PrimaryBuffer, value: string): boolean {
  if (value.length === 0) {
    return false;
  }
  buffer.tokens.push(value);
  return true;
}

function addTokenSecondary(buffer: PrimaryBuffer): boolean {
  if (buffer.tokenSecondary.length === 0) {
    return false;
  }
  buffer.tokens.push(buffer.tokenSecondary);
  buffer.tokenSecondary = '';
  return true;
}

export function escapeCharacter(buffer: PrimaryBuffer): boolean {
  if (buffer.currentChar !== '\\') {
    return false;
  }
  return true;
}

export function determineString(buffer: PrimaryBuffer): boolean {
  if ('\'"'.includes(buffer.currentChar)) {
    if (!buffer.stringOpen) {
      addTokenSecondary(buffer);
      buffer.stringStart = buffer.position;
      buffer.stringOpen = buffer.currentChar;
      return true;
    }
    if (buffer.stringOpen === buffer.currentChar) {
      addTokenSecondary(buffer);
      const stringToken = buffer.inputText.substring(buffer.stringStart, buffer.position + 1);
      addTokenPrimary(buffer, stringToken);
      buffer.stringOpen = null;
      return true;
    }
  }
  return false;
}

export function determineValue(buffer: PrimaryBuffer): boolean {
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

// TODO: Remove dead code??
export function extract(str: string, position: number): string {
  return str.slice(0, position) + str.slice(position + 1);
}

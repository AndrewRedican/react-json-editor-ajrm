/* Main Interfaces */
import { CSSProperties } from 'react';
import Locale from './locale/interface';
import { ErrorMsg } from './tokenize/interfaces';

export interface ColorProps {
  background: string;
  background_warning: string;
  colon: string;
  default: string;
  error?: string;
  keys: string;
  keys_whiteSpace: string;
  number: string;
  primitive: string;
  string: string;
}

export type ObjectCSS = Record<string, CSSProperties>;

export interface StyleProps {
  body?: ObjectCSS;
  container?: ObjectCSS;
  contentBox?: ObjectCSS;
  errorMessage?: ObjectCSS;
  labels?: ObjectCSS;
  labelColumn?: ObjectCSS;
  outerBox?: ObjectCSS;
  warningBox?: ObjectCSS;
}

export interface ChangeProps {
  plainText: string;
  markupText: string;
  json: string;
  jsObject: Record<string, any>,
  lines: number;
  error?: ErrorMsg;
}

type ChangeFun = (changes: ChangeProps) => void;
type ModifyErrorFun = (err: string) => string;

export interface JSONInputProps {
  locale: Locale,
  id?: string;
  placeholder?: Record<string, any>;
  reset?: boolean;
  viewOnly?: boolean;
  onChange?: ChangeFun;
  modifyErrorText?: ModifyErrorFun;
  confirmGood?: boolean;
  height?: string;
  width?: string;
  onKeyPressUpdate?: boolean;
  waitAfterKeyPress?: number;
  theme?: string;
  colors?: ColorProps;
  style?: StyleProps;
}

export interface JSONInputState {
  prevPlaceholder: Record<string, any>;
  markupText: string;
  plainText: string;
  json: string;
  jsObject: Record<string, any>;
  lines: number;
  error?: ErrorMsg;
}
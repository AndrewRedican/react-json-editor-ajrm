/* global JSX, NodeJS */
/* eslint react/no-unused-state: 0, @typescript-eslint/lines-between-class-members: 1 */
import React, {
  ClipboardEvent, Component, CSSProperties, KeyboardEvent, SyntheticEvent
} from 'react';
import { css } from 'emotion';
import Err from './err';
import Themes, { ThemeColors } from './themes';
import { format, Locale } from './locale';
import defaultLocale from './locale/en';
import { getType, identical } from './mitsuketa';
import {
  // Helpers
  countCarrigeReturn, isFunction, mergeObjects, safeGet,
  // Helper/Interfaces
  DomNode, Placeholder, Tokens
} from './utils';

// Interfaces
type ObjectCSS = Record<string, CSSProperties>;

interface InputStyles {
  body: ObjectCSS;
  container: ObjectCSS;
  contentBox: ObjectCSS;
  errorMessage: ObjectCSS;
  labels: ObjectCSS;
  labelColumn: ObjectCSS;
  outerBox: ObjectCSS;
  warningBox: ObjectCSS;
}

interface ChangeProps {
  plainText: string;
  markupText: string;
  json: string;
  jsObject: Record<string, any>,
  lines: number;
  error?: Tokens.ErrorMsg;
}

interface JSONInputProps {
  locale: Locale,
  id?: string;
  placeholder?: Record<string, any>;
  reset?: boolean;
  viewOnly?: boolean;
  onBlur?: (tokens: ChangeProps) => void;
  onChange?: (changes: ChangeProps) => void;
  modifyErrorText?: (msg: string) => string;
  confirmGood?: boolean;
  height?: string;
  width?: string;
  onKeyPressUpdate?: boolean;
  waitAfterKeyPress?: number;
  theme?: string;
  colors?: Partial<ThemeColors>;
  style?: Partial<InputStyles>;
  error?: Tokens.ErrorMsg;
}

interface JSONInputState {
  prevPlaceholder: undefined|Record<string, any>;
  markupText: string;
  plainText: string;
  json: string;
  jsObject: Record<string, any>;
  lines: number;
  error?: Tokens.ErrorMsg;
}

interface Chars {
  count: number
}

// Defaults
const defaultProps = {
  // Required
  locale: defaultLocale,
  // Optional with defaults
  id: 'JSON-Input',
  reset: false,
  viewOnly: false,
  confirmGood: true,
  onKeyPressUpdate: true
};

const defaultStyles: InputStyles = {
  body: {},
  container: {},
  contentBox: {},
  errorMessage: {},
  labels: {},
  labelColumn: {},
  outerBox: {},
  warningBox: {}
};

class JSONInput extends Component<JSONInputProps, JSONInputState> {
  // eslint-disable-next-line react/static-property-placement
  static defaultProps: JSONInputProps = defaultProps;

  // Properties with default
  colors: ThemeColors = Themes.dark_vscode_tribute;
  confirmGood = true;
  style = defaultStyles;
  totalHeight = '100%';
  totalWidth = '100%';
  resetConfiguration = false;
  waitAfterKeyPress = 1000;

  // Properties without default
  renderCount: number;
  refContent?: HTMLDivElement;
  timer?: NodeJS.Timer;
  updateTime?: number;

  constructor(props: JSONInputProps) {
    super(props);
    this.onBlur              = this.onBlur.bind(this);
    this.onClick             = this.onClick.bind(this);
    this.onKeyDown           = this.onKeyDown.bind(this);
    this.onKeyPress          = this.onKeyPress.bind(this);
    this.onPaste             = this.onPaste.bind(this);
    this.setCursorPosition   = this.setCursorPosition.bind(this);
    this.setUpdateTime       = this.setUpdateTime.bind(this);
    this.getCursorPosition   = this.getCursorPosition.bind(this);
    this.getEditProps        = this.getEditProps.bind(this);
    this.getEditStyles       = this.getEditStyles.bind(this);
    this.updateInternalProps = this.updateInternalProps.bind(this);
    this.update              = this.update.bind(this);
    this.createMarkup        = this.createMarkup.bind(this);
    this.newSpan             = this.newSpan.bind(this);
    this.scheduledUpdate     = this.scheduledUpdate.bind(this);
    this.showPlaceholder     = this.showPlaceholder.bind(this);
    this.stopEvent           = this.stopEvent.bind(this);
    this.tokenize            = this.tokenize.bind(this);
    this.tokenizeDomNode     = this.tokenizeDomNode.bind(this);
    this.tokenizePlaceholder = this.tokenizePlaceholder.bind(this);
    this.renderErrorMessage  = this.renderErrorMessage.bind(this);
    this.updateInternalProps();
    this.renderCount = 1;
    this.state = {
      prevPlaceholder: undefined,
      markupText: '',
      plainText: '',
      json: '',
      jsObject: {},
      lines: 0
    };

    const { locale } = this.props;
    if (!locale) {
      console.warn("[react-json-editor-ajrm - Deprecation Warning] You did not provide a 'locale' prop for your JSON input - This will be required in a future version. English has been set as a default.");
    }
  }

  componentDidMount() {
    this.showPlaceholder();
  }

  componentDidUpdate() {
    this.updateInternalProps();
    this.showPlaceholder();
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  onBlur() {
    const { onBlur, viewOnly } = this.props;
    if (viewOnly !== undefined && viewOnly) {
      return;
    }
    if (onBlur && isFunction(onBlur)) {
      const container = this.refContent;
      if (container) {
        const data = this.tokenize(container);
        if (data) {
          onBlur({
            plainText: data.indented,
            markupText: data.markup,
            json: data.json,
            jsObject: data.jsObject,
            lines: data.lines,
            error: data.error
          });
        }
      }
    }
  }

  onClick() {
    const { viewOnly } = this.props;
    if (viewOnly !== undefined && viewOnly) {
      // eslint-disable-next-line no-useless-return
      return;
    }
  }

  onKeyDown(event: KeyboardEvent) {
    const { viewOnly } = this.props;
    const viewer = !!viewOnly;
    const ctrlOrMetaIsPressed = event.ctrlKey || event.metaKey;

    switch (event.key) {
      case 'Tab':
        this.stopEvent(event);
        if (viewer) {
          break;
        }
        document.execCommand('insertText', false, '  ');
        this.setUpdateTime();
        break;
      case 'Backspace':
      case 'Delete':
        if (viewer) {
          this.stopEvent(event);
        }
        this.setUpdateTime();
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'ArrowUp':
      case 'ArrowDown':
        this.setUpdateTime();
        break;
      case 'a':
      case 'c':
        if (viewer && !ctrlOrMetaIsPressed) {
          this.stopEvent(event);
        }
        break;
      default:
        if (viewer) {
          this.stopEvent(event);
        }
    }
  }

  onKeyPress(event: KeyboardEvent) {
    const { viewOnly } = this.props;
    const ctrlOrMetaIsPressed = event.ctrlKey || event.metaKey;
    if (viewOnly !== undefined && viewOnly && !ctrlOrMetaIsPressed) {
      this.stopEvent(event);
    }
    if (!ctrlOrMetaIsPressed) {
      this.setUpdateTime();
    }
  }

  onPaste(event: ClipboardEvent) {
    const { viewOnly } = this.props;
    if (viewOnly !== undefined && viewOnly) {
      this.stopEvent(event);
    } else {
      event.preventDefault();
      const text = event.clipboardData.getData('text/plain');
      document.execCommand('insertText', false, text);
    }
    this.update();
  }

  setCursorPosition(nextPosition: any) {
    // TODO: Fix the typing of nextPosition
    if ([false, null, undefined].includes(nextPosition)) {
      return;
    }

    const createRange = (node: Node, chars: Chars, range?: Range): Range => {
      let rtnRange = range;
      if (!rtnRange) {
        rtnRange = document.createRange();
        rtnRange.selectNode(node);
        rtnRange.setStart(node, 0);
      }
      if (chars.count === 0) {
        rtnRange.setEnd(node, chars.count);
      } else if (node && chars.count > 0) {
        if (node.nodeType === Node.TEXT_NODE) {
          const contents = node.textContent || '';
          if (contents.length < chars.count) {
            chars.count -= contents.length;
          } else {
            rtnRange.setEnd(node, chars.count);
            chars.count = 0;
          }
        } else {
          for (let lp = 0; lp < node.childNodes.length; lp++) {
            rtnRange = createRange(node.childNodes[lp], chars, rtnRange);
            if (chars.count === 0) {
              break;
            }
          }
        }
      }
      return rtnRange;
    };

    const setPosition = (chars: number) => {
      if (chars >= 0) {
        const range = createRange(this.refContent as Node, { count: chars });
        if (range) {
          range.collapse(false);
          const selection = window.getSelection();
          if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
          }
        }
      }
    };

    if (nextPosition > 0) {
      setPosition(nextPosition);
    } else {
      const contents = this.refContent;
      if (contents) {
        contents.focus();
      }
    }
  }

  setUpdateTime() {
    const { onKeyPressUpdate } = this.props;
    if (onKeyPressUpdate !== undefined && onKeyPressUpdate) {
      this.updateTime = new Date().getTime() + this.waitAfterKeyPress;
    }
  }

  getCursorPosition(countBR?: Tokens.ErrorMsg) {
    /**
      * Need to deprecate countBR
      * It is used to differenciate between good markup render, and aux render when error found
      * Adjustments based on coundBR account for usage of <br> instead of <span> for linebreaks to determine acurate cursor position
      * Find a way to consolidate render styles
      */
    const isChildOf = (node: Node): boolean => {
      let n: null|Node = node;
      while (n !== null) {
        if (n === this.refContent) {
          return true;
        }
        n = n.parentNode;
      }
      return false;
    };

    const selection = window.getSelection();
    let charCount = -1;
    let linebreakCount = 0;
    let node;
    if (selection && selection.focusNode && isChildOf(selection.focusNode)) {
      node = selection.focusNode;
      charCount = selection.focusOffset;
      while (node) {
        if (node === this.refContent) {
          break;
        }
        if (node.previousSibling) {
          node = node.previousSibling;
          if (countBR && node.nodeName === 'BR') {
            linebreakCount += 1;
          }
          charCount += (node.textContent || '').length;
        } else {
          node = node.parentNode;
          if (node === null) {
            break;
          }
        }
      }
    }
    return charCount + linebreakCount;
  }

  getEditProps() {
    /**
      * Props for if the JSON Input is editable
      */
    const { viewOnly } = this.props;
    if (viewOnly !== undefined && viewOnly === true) {
      return {};
    }

    return {
      autoCapitalize: 'off',
      autoComplete: 'off',
      autoCorrect: 'off',
      contentEditable: true,
      onBlur: this.onBlur,
      onClick: this.onClick,
      onKeyDown: this.onKeyDown,
      onKeyPress: this.onKeyPress,
      onPaste: this.onPaste,
      spellCheck: false
    };
  }

  getEditStyles() {
    const { labelColumn } = this.style;
    return css({
      counterReset: 'line',
      '> div': {
        counterIncrement: 'line',
        paddingLeft: '3.75em',
        position: 'relative',
        '&:before': {
          content: 'counter(line)',
          display: 'inline-block',
          boxSizing: 'border-box',
          borderRight: '1px solid #D4D4D4',
          verticalAlign: 'top',
          height: '100%',
          width: '3.5em',
          margin: 0,
          overflow: 'hidden',
          color: '#D4D4D4',
          position: 'absolute',
          left: 0,
          ...labelColumn
        }
      }
    });
  }

  updateInternalProps() {
    const {
      colors, confirmGood, height, onKeyPressUpdate, reset, style, theme, waitAfterKeyPress, width
    } = this.props;

    let colorMix: ThemeColors;
    let styleMix: InputStyles = {
      outerBox: {},
      container: {},
      warningBox: {},
      errorMessage: {},
      body: {},
      labelColumn: {},
      labels: {},
      contentBox: {}
    };
    let themeMix = Themes.dark_vscode_tribute;

    if (theme !== undefined && typeof theme === 'string' && theme in Themes) {
      themeMix = safeGet(Themes, theme, themeMix) as ThemeColors;
    }

    colorMix = themeMix;
    if (colors !== undefined) {
      colorMix = {
        default:            safeGet(colors, 'default', colorMix.default) as string,
        string:             safeGet(colors, 'string', colorMix.string) as string,
        number:             safeGet(colors, 'number', colorMix.number) as string,
        colon:              safeGet(colors, 'colon', colorMix.colon) as string,
        keys:               safeGet(colors, 'keys', colorMix.keys) as string,
        keys_whiteSpace:    safeGet(colors, 'keys_whiteSpace', colorMix.keys_whiteSpace) as string,
        primitive:          safeGet(colors, 'primitive', colorMix.primitive) as string,
        error:              safeGet(colors, 'error', colorMix.error) as string,
        background:         safeGet(colors, 'background', colorMix.background) as string,
        background_warning: safeGet(colors, 'background_warning', colorMix.background_warning) as string
      };
    }
    this.colors = colorMix;

    if (style !== undefined) {
      styleMix = {
        outerBox:     safeGet(style, 'outerBox', {}) as ObjectCSS,
        container:    safeGet(style, 'container', {}) as ObjectCSS,
        warningBox:   safeGet(style, 'warningBox', {}) as ObjectCSS,
        errorMessage: safeGet(style, 'errorMessage', {}) as ObjectCSS,
        body:         safeGet(style, 'body', {}) as ObjectCSS,
        labelColumn:  safeGet(style, 'labelColumn', {}) as ObjectCSS,
        labels:       safeGet(style, 'labels', {}) as ObjectCSS,
        contentBox:   safeGet(style, 'contentBox', {}) as ObjectCSS
      };
    }
    this.style = styleMix;

    this.confirmGood = typeof confirmGood === 'boolean' ? confirmGood : true;
    this.totalHeight = height || '610px';
    this.totalWidth = width || '479px';
    if (onKeyPressUpdate === undefined || onKeyPressUpdate) {
      if (!this.timer) {
        this.timer = setInterval(this.scheduledUpdate, 100);
      }
    } else if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
    this.updateTime = undefined;
    this.waitAfterKeyPress = typeof waitAfterKeyPress === 'number' ? waitAfterKeyPress : 1000;
    this.resetConfiguration = typeof reset === 'boolean' ? reset : false;
  }

  update(cursorOffset = 0, updateCursorPosition = true) {
    const { onChange } = this.props;
    const container = this.refContent;
    if (container) {
      const data = this.tokenize(container);

      if (data) {
        if (onChange && isFunction(onChange)) {
          onChange({
            plainText: data.indented,
            markupText: data.markup,
            json: data.json,
            jsObject: data.jsObject,
            lines: data.lines,
            error: data.error
          });
        }
        this.setState({
          plainText: data.indented,
          markupText: data.markup,
          json: data.json,
          jsObject: data.jsObject,
          lines: data.lines,
          error: data.error
        });
        this.updateTime = undefined;
        if (updateCursorPosition) {
          const cursorPosition = this.getCursorPosition(data.error) + cursorOffset;
          this.setCursorPosition(cursorPosition);
        }
      }
    }
  }

  createMarkup() {
    const { markupText } = this.state;
    return {
      __html: markupText === undefined ? '' : `${markupText}`
    };
  }

  newSpan(key: number, token: Tokens.SimpleToken, depth: number) {
    const { string, type } = token;
    let color = this.colors.default;

    switch (type) {
      case 'string':
      case 'number':
      case 'primitive':
      case 'error':
        color = safeGet(this.colors, token.type, color) as string;
        break;
      case 'key':
        color = string === ' ' ? this.colors.keys_whiteSpace : this.colors.keys;
        break;
      case 'symbol':
        color = string === ':' ? this.colors.colon : color;
        break;
      // no default
    }

    let val = string;
    if (val.length !== val.replace(/</g, '').replace(/>/g, '').length) {
      val = `<xmp style=display:inline;>${val}</xmp>`;
    }
    return `<span data-key="${key}" data-type="${type}" data-value="${val}" data-depth="${depth}" style="color: ${color}">${val}</span>`;
  }

  scheduledUpdate() {
    const { onKeyPressUpdate } = this.props;
    if (onKeyPressUpdate !== undefined && onKeyPressUpdate === false) {
      return;
    }
    if (this.updateTime === undefined) {
      return;
    }
    if (this.updateTime > new Date().getTime()) {
      return;
    }
    this.update();
  }

  showPlaceholder() {
    const { placeholder } = this.props;
    if (placeholder === null || placeholder === undefined) {
      return;
    }

    const placeholderDataType = getType(placeholder);
    const unexpectedDataType = !['object', 'array'].includes(placeholderDataType);
    if (unexpectedDataType) {
      Err.throwError('showPlaceholder', 'placeholder', 'either an object or an array');
    }

    const { jsObject, prevPlaceholder } = this.state;
    // Component will always re-render when new placeholder value is any different from previous placeholder value.
    let componentShouldUpdate = !identical(placeholder, prevPlaceholder);

    if (!componentShouldUpdate && this.resetConfiguration) {
      /**
        * If 'reset' property is set true or is truthy,
        * any difference between placeholder and current value
        * should trigger component re-render
        */
      if (jsObject !== undefined) {
        componentShouldUpdate = !identical(placeholder, jsObject);
      }
    }

    if (componentShouldUpdate) {
      const data = this.tokenize(placeholder);
      if (data) {
        this.setState({
          prevPlaceholder: placeholder,
          plainText: data.indented,
          markupText: data.markup,
          lines: data.lines,
          error: data.error
        });
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  stopEvent(event: SyntheticEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  tokenize(obj: Record<string, any>|HTMLDivElement): null|DomNode.DomNodeTokenize|Placeholder.PlaceholderTokenize {
    if (typeof obj !== 'object') {
      throw new TypeError(`tokenize() expects object type properties only. Got '${typeof obj}' type instead.`);
    }

    // DOM NODE || ONBLUR OR UPDATE
    if (obj instanceof HTMLDivElement) {
      return this.tokenizeDomNode(obj);
    }

    // JS OBJECTS || PLACEHOLDER
    if (!('nodeType' in obj)) {
      return this.tokenizePlaceholder(obj);
    }

    console.error('Tokenize Error: Oops....');
    return null;
  }

  tokenizeDomNode(obj: HTMLDivElement): null|DomNode.DomNodeTokenize {
    const { locale } = this.props;
    const lang = locale || defaultLocale;
    const containerNode = obj.cloneNode(true);
    if (!containerNode.hasChildNodes()) {
      return null;
    }

    const children = containerNode.childNodes;
    const buffer: DomNode.PrimaryBuffer = {
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

    const setChildToken = (child: ChildNode): void => {
      switch (child.nodeName) {
        case 'SPAN':
          const dataset = (child as HTMLDivElement).dataset;
          buffer.tokens_unknown.push({
            string: child.textContent || '',
            type: dataset.type || 'unknown'  // child.attributes.type.textContent
          } as Tokens.SimpleToken);
          break;
        case 'DIV':
          child.childNodes.forEach(c => setChildToken(c));
          buffer.tokens_unknown.push({
            string: '\n',
            type: 'unknown'
          } as Tokens.SimpleToken);
          break;
        case 'BR':
          if (child.textContent === '') {
            buffer.tokens_unknown.push({
              string: '\n',
              type: 'unknown'
            } as Tokens.SimpleToken);
          }
          break;
        case '#text':
          buffer.tokens_unknown.push({
            string: child.textContent || '',  // child.wholeText,
            type: 'unknown'
          } as Tokens.SimpleToken);
          break;
        case 'FONT':
          buffer.tokens_unknown.push({
            string: child.textContent || '',
            type: 'unknown'
          } as Tokens.SimpleToken);
          break;
        default:
          console.error('Unrecognized node:', {
            child
          });
      }
    };

    children.forEach(child => setChildToken(child));

    buffer.tokens_proto = buffer.tokens_unknown.map(token => DomNode.quarkize(token.string, 'proto')).reduce((all, quarks) => all.concat(quarks));

    buffer.tokens_proto.forEach(token => {
      if (!token.type.includes('proto')) {
        if (!DomNode.validToken(token.string, token.type as Tokens.TokenType)) {
          buffer.tokens_split = buffer.tokens_split.concat(DomNode.quarkize(token.string, 'split'));
        } else {
          buffer.tokens_split.push(token);
        }
      } else {
        buffer.tokens_split.push(token);
      }
    });

    buffer.tokens_fallback = buffer.tokens_split.map<Tokens.FallbackToken>(token => {
      const fallback = [];
      let { type } = token;

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
        fallback,
        type
      } as Tokens.FallbackToken;
    });

    const buffer2: DomNode.SecondaryBuffer = {
      brackets: [],
      isValue: false,
      stringOpen: false
    };

    // Sort tokens for push -> buffer.tokens_normalize
    for (let i = 0; i < buffer.tokens_fallback.length; i++) {
      const token = buffer.tokens_fallback[i];
      const lastIndex = buffer.tokens_normalize.length - 1;
      const lastType = safeGet(Tokens.tokenFollowed(buffer.tokens_normalize) || {}, 'type', 'string') as Tokens.TokenType;
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
              buffer2.isValue = buffer2.brackets[buffer2.brackets.length-1] === '[';
              break;
            case ']':
            case '}':
              buffer2.brackets.pop();
              buffer2.isValue = buffer2.brackets[buffer2.brackets.length-1] === '[';
              break;
            case ',':
              if (lastType === 'colon') {
                break;
              }
              buffer2.isValue = buffer2.brackets[buffer2.brackets.length-1] === '[';
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
            const prevToken = Tokens.precedingToken(buffer.tokens_fallback, i) || {};
            const prevTokenString = safeGet(prevToken, 'string', '') as string;
            const prevTokenType = safeGet(prevToken, 'type', '') as Tokens.TokenType;
            const prevTokenChar = prevTokenString.charAt(prevTokenString.length - 1);
            if (prevTokenType === 'string' && prevTokenChar === '\\') {
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
      const mergedToken: Tokens.MergeToken = {
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

    const alphanumeric = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$';
    const bracketList: Array<DomNode.Bracket> = [];
    const quotes = '\'"';
    let errorMsg: undefined|Tokens.ErrorMsg;
    let line = buffer.tokens_merge.length > 0 ? 1 : 0;

    // Reset Buffer2
    buffer2.brackets = [];
    buffer2.isValue = false;
    buffer2.stringOpen = false;

    const setError = (tokenID: number, reason: string, offset = 0): void => {
      errorMsg = {
        token: tokenID,
        line,
        reason
      };
      buffer.tokens_merge[tokenID+offset].type = 'error';
    };

    // TODO: Simplify loop
    for (let i = 0; i < buffer.tokens_merge.length; i++) {
      if (errorMsg) {
        break;
      }
      const token = buffer.tokens_merge[i];
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
              found = Tokens.followsSymbol(buffer.tokens_merge, i, ['}', ']']);
              if (found) {
                setError(i, format(lang.invalidToken.tokenSequence.prohibited, {
                  firstToken: buffer.tokens_merge[i].string,  // TODO: should `i` be `found`??
                  secondToken: string
                }));
                break;
              }
              if (string === '[' && i > 0) {
                if (!Tokens.followsSymbol(buffer.tokens_merge, i, [':', '[', ','])) {
                  setError(i, format(lang.invalidToken.tokenSequence.permitted, {
                    firstToken: '[',
                    secondToken: [':', '[', ',']
                  }));
                  break;
                }
              }
              if (string === '{') {
                if (Tokens.followsSymbol(buffer.tokens_merge, i, ['{'])) {
                  setError(i, format(lang.invalidToken.double, {
                    token: '{'
                  }));
                  break;
                }
              }
              buffer2.brackets.push(string);
              buffer2.isValue = buffer2.brackets[buffer2.brackets.length-1] === '[';
              bracketList.push({ i, line, string });
              break;
            case '}':
            case ']':
              if (string === '}') {
                if (buffer2.brackets[buffer2.brackets.length-1] !== '{') {
                  setError(i, format(lang.brace.curly.missingOpen));
                  break;
                }
                if (Tokens.followsSymbol(buffer.tokens_merge, i, [','])) {
                  setError(i, format(lang.invalidToken.tokenSequence.prohibited, {
                    firstToken: ',',
                    secondToken: '}'
                  }));
                  break;
                }
              }
              if (string === ']') {
                if (buffer2.brackets[buffer2.brackets.length-1] !== '[') {
                  setError(i, format(lang.brace.square.missingOpen));
                  break;
                }
                if (Tokens.followsSymbol(buffer.tokens_merge, i, [':'])) {
                  setError(i, format(lang.invalidToken.tokenSequence.prohibited, {
                    firstToken: ':',
                    secondToken: ']'
                  }));
                  break;
                }
              }
              buffer2.brackets.pop();
              buffer2.isValue = buffer2.brackets[buffer2.brackets.length-1] === '[';
              bracketList.push({ i, line, string });
              break;
            case ',':
              found = Tokens.followsSymbol(buffer.tokens_merge, i, ['{']);
              if (found) {
                if (Tokens.followedBySymbol(buffer.tokens_merge, i, ['}'])) {
                  setError(i, format(lang.brace.curly.cannotWrap, {
                    token: ','
                  }));
                  break;
                }
                setError(i, format(lang.invalidToken.tokenSequence.prohibited, {
                  firstToken: '{',
                  secondToken: ','
                }));
                break;
              }
              if (Tokens.followedBySymbol(buffer.tokens_merge, i, ['}', ',', ']'])) {
                setError(i, format(lang.noTrailingOrLeadingComma));
                break;
              }
              const typeFollow = Tokens.typeFollowed(buffer.tokens_merge, i);
              switch (typeFollow) {
                case 'key':
                case 'colon':
                  setError(i, format(lang.invalidToken.termSequence.prohibited, {
                    firstTerm: typeFollow === 'key' ? lang.types.key : lang.symbols.colon,
                    secondTerm: lang.symbols.comma
                  }));
                  break;
                case 'symbol':
                  if (Tokens.followsSymbol(buffer.tokens_merge, i, ['{'])) {
                    setError(i, format(lang.invalidToken.tokenSequence.prohibited, {
                      firstToken: '{',
                      secondToken: ','
                    }));
                    break;
                  }
                  break;
                // no default
              }
              buffer2.isValue = buffer2.brackets[buffer2.brackets.length-1] === '[';
              break;
            // no default
          }
          buffer.json += string;
          break;
        case 'colon':
          found = Tokens.followsSymbol(buffer.tokens_merge, i, ['[']);
          if (found) {
            if (Tokens.followedBySymbol(buffer.tokens_merge, i, [']'])) {
              setError(i, format(lang.brace.square.cannotWrap, {
                token: ':'
              }));
              break;
            }
            setError(i, format(lang.invalidToken.tokenSequence.prohibited, {
              firstToken: '[',
              secondToken: ':'
            }));
            break;
          }
          if (Tokens.typeFollowed(buffer.tokens_merge, i) !== 'key') {
            setError(i, format(lang.invalidToken.termSequence.permitted, {
              firstTerm: lang.symbols.colon,
              secondTerm: lang.types.key
            }));
            break;
          }
          if (Tokens.followedBySymbol(buffer.tokens_merge, i, ['}', ']'])) {
            setError(i, format(lang.invalidToken.termSequence.permitted, {
              firstTerm: lang.symbols.colon,
              secondTerm: lang.types.value
            }));
            break;
          }
          buffer2.isValue = true;
          buffer.json += string;
          break;
        case 'key':
        case 'string':
          const firstChar = string.charAt(0);
          const lastChar = string.charAt(string.length-1);
          if (!quotes.includes(firstChar)) {
            if (quotes.includes(lastChar)) {
              setError(i, format(lang.string.missingOpen, {
                quote: firstChar
              }));
              break;
            }
          }
          if (!quotes.includes(lastChar)) {
            if (quotes.includes(firstChar)) {
              setError(i, format(lang.string.missingClose, {
                quote: firstChar
              }));
              break;
            }
          }
          if (quotes.includes(firstChar)) {
            if (firstChar !== lastChar) {
              setError(i, format(lang.string.missingClose, {
                quote: firstChar
              }));
              break;
            }
          }
          if (type === 'string') {
            if (!quotes.includes(firstChar) && !quotes.includes(lastChar)) {
              setError(i, format(lang.string.mustBeWrappedByQuotes));
              break;
            }
          }
          if (type === 'key') {
            if (Tokens.followedBySymbol(buffer.tokens_merge, i, ['}', ']'])) {
              setError(i, format(lang.invalidToken.termSequence.permitted, {
                firstTerm: lang.types.key,
                secondTerm: lang.symbols.colon
              }));
            }
          }
          if (!quotes.includes(firstChar) && !quotes.includes(lastChar)) {
            for (let h = 0; h < string.length; h++) {
              if (errorMsg) {
                break;
              }
              const c = string.charAt(h);
              if (!alphanumeric.includes(c)) {
                setError(i, format(lang.string.nonAlphanumeric, {
                  token: c
                }));
                break;
              }
            }
          }
          if (type === 'key') {
            if (Tokens.typeFollowed(buffer.tokens_merge, i) === 'key') {
              if (i > 0) {
                if (!Number.isNaN(Number(buffer.tokens_merge[i-1]))) {
                  mergeObjects(buffer.tokens_merge[i-1], buffer.tokens_merge[i]);
                  setError(i, format(lang.key.numberAndLetterMissingQuotes));
                  break;
                }
              }
              setError(i, format(lang.key.spaceMissingQuotes));
              break;
            }
            if (!Tokens.followsSymbol(buffer.tokens_merge, i, ['{', ','])) {
              setError(i, format(lang.invalidToken.tokenSequence.permitted, {
                firstToken: type,
                secondToken: ['{', ',']
              }));
              break;
            }
            if (buffer2.isValue) {
              setError(i, format(lang.string.unexpectedKey));
              break;
            }
          }
          if (type === 'string') {
            if (!Tokens.followsSymbol(buffer.tokens_merge, i, ['[', ':', ','])) {
              setError(i, format(lang.invalidToken.tokenSequence.permitted, {
                firstToken: type,
                secondToken: ['[', ':', ',']
              }));
              break;
            }
            if (!buffer2.isValue) {
              setError(i, format(lang.key.unexpectedString));
              break;
            }
          }
          if (firstChar === "'") {
            buffer.json += `"${string.slice(1, -1)}"`;
          } else if (firstChar !== '"') {
            buffer.json += `"${string}"`;
          } else {
            buffer.json += string;
          }
          break;
        case 'number':
        case 'primitive':
          if (Tokens.followsSymbol(buffer.tokens_merge, i, ['{'])) {
            buffer.tokens_merge[i].type = 'key';
            type = buffer.tokens_merge[i].type;
            string = `"${string}"`;
          } else if (Tokens.typeFollowed(buffer.tokens_merge, i) === 'key') {
            buffer.tokens_merge[i].type = 'key';
            type = buffer.tokens_merge[i].type;
          } else if (!Tokens.followsSymbol(buffer.tokens_merge, i, ['[', ':', ','])) {
            setError(i, format(lang.invalidToken.tokenSequence.permitted, {
              firstToken: type,
              secondToken: ['[', ':', ',']
            }));
            break;
          }
          if (type !== 'key') {
            if (!buffer2.isValue) {
              buffer.tokens_merge[i].type = 'key';
              type = buffer.tokens_merge[i].type;
              string = `"${string}"`;
            }
          }
          if (type === 'primitive') {
            if (string === 'undefined') {
              setError(i, format(lang.invalidToken.useInstead, {
                badToken: 'undefined',
                goodToken: 'null'
              }));
            }
          }
          buffer.json += string;
          break;
        // no default
      }
    }

    let noEscapedSingleQuote = '';
    for (let i = 0; i < buffer.json.length; i++) {
      const current = buffer.json.charAt(i);
      const next = buffer.json.charAt(i+1) || '';
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
    if (errorMsg === undefined) {
      const maxIterations = Math.ceil(bracketList.length / 2);
      let round = 0;
      let delta = false;

      const removePair = (index: number) => {
        bracketList.splice(index+1, 1);
        bracketList.splice(index, 1);
        if (!delta) {
          delta = true;
        }
      };

      while (bracketList.length > 0) {
        delta = false;
        for (let tokenCount = 0; tokenCount < bracketList.length-1; tokenCount++) {
          const pair = bracketList[tokenCount].string + bracketList[tokenCount+1].string;
          if (['[]', '{}'].includes(pair)) {
            removePair(tokenCount);
          }
        }
        round += 1;
        if (!delta || round >= maxIterations) {
          break;
        }
      }

      if (bracketList.length > 0) {
        const bracketString = bracketList[0].string;
        const bracketPosition = bracketList[0].i;
        const closingBracketType = bracketString === '[' ? ']' : '}';
        line = bracketList[0].line;
        setError(bracketPosition, format(lang.brace[closingBracketType === ']' ? 'square' : 'curly'].missingClose));
      }
    }

    if (errorMsg === undefined) {
      if (![undefined, ''].includes(buffer.json)) {
        try {
          buffer.jsObject = JSON.parse(buffer.json) as Record<string, any>;
        } catch (err) {
          const errorMessage = err.message as string;
          const subsMark = errorMessage.indexOf('position');
          if (subsMark === -1) {
            throw new Error('Error parsing failed');
          }

          const errPositionStr = errorMessage.substring(subsMark + 9, errorMessage.length);
          const errPosition = parseInt(errPositionStr, 10);
          let charTotal = 0;
          let tokenIndex = 0;
          let token: Tokens.MergeToken = buffer.tokens_merge[tokenIndex];
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
            if (!buffer.tokens_merge[tokenIndex+1]) {
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
                  setError(tokenIndex, format(lang.invalidToken.unexpected, {
                    token: '\\'
                  }));
                }
              }
              backslashCount = 0;
            }
          }
          if (!errorMsg) {
            setError(tokenIndex, format(lang.invalidToken.unexpected, {
              token: token.string
            }));
          }
        }
      }
    }

    let lines = 1;
    let depth = 0;
    const newIndent = () => Array(depth * 2).fill('&nbsp;').join('');
    const newLineBreak = (byPass = false) => {
      lines += 1;
      return (depth > 0 || byPass) ? '</div><div>' : '';
    };
    const newLineBreakAndIndent = (byPass = false) => `${newLineBreak(byPass)}${newIndent()}`;

    if (errorMsg === undefined) {
      const lastMergeIdx = buffer.tokens_merge.length - 1;
      buffer.markup += '<div>';

      // Format by Token
      buffer.tokens_merge.forEach((token, i) => {
        const { string, type } = token;
        const span = this.newSpan(i, token, depth);
        const islastToken = i === lastMergeIdx;

        switch (type) {
          case 'space':
          case 'linebreak':
            break;
          case 'string':
          case 'number':
          case 'primitive':
          case 'error':
            buffer.markup += `${Tokens.followsSymbol(buffer.tokens_merge, i, [',', '[']) ? newLineBreakAndIndent() : ''}${span}`;
            break;
          case 'key':
            buffer.markup += `${newLineBreakAndIndent()}${span}`;
            break;
          case 'colon':
            buffer.markup += `${span}&nbsp;`;
            break;
          case 'symbol':
            switch (string) {
              case '[':
              case '{':
                buffer.markup += `${!Tokens.followsSymbol(buffer.tokens_merge, i, [':']) ? newLineBreakAndIndent() : ''}${span}`;
                depth += 1;
                break;
              case ']':
              case '}':
                depth -= 1;
                const prevToken = Tokens.precedingToken(buffer.tokens_merge, i);
                const lineAdjust = i > 0 && prevToken && ['[', '{'].includes(prevToken.string) ? '' : newLineBreakAndIndent(islastToken);
                buffer.markup += `${lineAdjust}${this.newSpan(i, token, depth)}`;
                break;
              case ',':
                buffer.markup += span;
                break;
              // no default
            }
            break;
          // no default
        }
      });
      buffer.markup += '</div>';
      // TODO: update line count logic
      // lnes += (markup.match(/<\/div><div>/g) || []).length
    }

    if (errorMsg) {
      let lineFallback = 1;
      lines = 1;
      buffer.markup += '<div>';

      buffer.tokens_merge.forEach((token, i) => {
        const { string, type } = token;
        if (type === 'linebreak') {
          lines += 1;
          buffer.markup += '</div><div>';
        } else {
          buffer.markup += this.newSpan(i, token, depth);
        }
        lineFallback += countCarrigeReturn(string);
      });

      buffer.markup += '</div>';
      lines += 1;
      // TODO: update line count logic
      // lnes += (markup.match(/<\/div><div>/g) || []).length
      lineFallback += 1;
      if (lines < lineFallback) {
        lines = lineFallback;
      }
    }

    buffer.tokens_merge.forEach(token => {
      buffer.indented += token.string;
      if (!['space', 'linebreak'].includes(token.type)) {
        buffer.tokens_plainText += token.string;
      }
    });

    if (errorMsg) {
      const { modifyErrorText } = this.props;
      if (modifyErrorText && isFunction(modifyErrorText)) {
        errorMsg.reason = modifyErrorText(errorMsg.reason);
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
      error: errorMsg
    };
  }

  tokenizePlaceholder(obj: Record<string, any>): null|Placeholder.PlaceholderTokenize {
    const buffer: Placeholder.PrimaryBuffer = {
      inputText: JSON.stringify(obj),
      position: 0,
      currentChar: '',
      tokenPrimary: '',
      tokenSecondary: '',
      brackets: [],
      isValue: false,
      stringOpen: null,
      stringStart: 0,
      tokens: []
    };

    for (let i = 0; i < buffer.inputText.length; i++) {
      buffer.position = i;
      buffer.currentChar = buffer.inputText.charAt(buffer.position);
      const a = Placeholder.determineValue(buffer);
      const b = Placeholder.determineString(buffer);
      const c = Placeholder.escapeCharacter(buffer);
      if (!a && !b && !c) {
        if (!buffer.stringOpen) {
          buffer.tokenSecondary += buffer.currentChar;
        }
      }
    }

    const buffer2: Placeholder.SecondaryBuffer = {
      brackets: [],
      isValue: false,
      tokens: []
    };

    buffer2.tokens = buffer.tokens.map<Tokens.MarkupToken>(token => {
      const rtnToken: Tokens.MarkupToken = {
        depth: 0,
        string: '',
        type: 'undefined',
        value: ''
      };

      switch (token) {
        case ',':
          rtnToken.type = 'symbol';
          rtnToken.string = token;
          rtnToken.value = token;
          buffer2.isValue = buffer2.brackets[buffer2.brackets.length-1] === '[';
          break;
        case ':':
          rtnToken.type = 'symbol';
          rtnToken.string = token;
          rtnToken.value = token;
          buffer2.isValue = true;
          break;
        case '{':
        case '[':
          rtnToken.type = 'symbol';
          rtnToken.string = token;
          rtnToken.value = token;
          buffer2.brackets.push(token);
          buffer2.isValue = buffer2.brackets[buffer2.brackets.length-1] === '[';
          break;
        case '}':
        case ']':
          rtnToken.type = 'symbol';
          rtnToken.string = token;
          rtnToken.value = token;
          buffer2.brackets.pop();
          buffer2.isValue = buffer2.brackets[buffer2.brackets.length-1] === '[';
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
            }
            if (rtnToken.type === 'key') {
              rtnToken.string = Placeholder.stripQuotesFromKey(token);
            }
            rtnToken.value = rtnToken.string;
          } else if (!Number.isNaN(Number(token))) {
            rtnToken.type = 'number';
            rtnToken.string = token;
            rtnToken.value = Number(token);
          } else if (token.length > 0 && !buffer2.isValue) {
            rtnToken.type = 'key';
            rtnToken.string = token.includes(' ') ? `'${token}'` : token;
            rtnToken.value = rtnToken.string;
          }
      }
      rtnToken.depth = buffer2.brackets.length;
      return rtnToken;
    });

    const clean = buffer2.tokens.map(t => t.string).join('');
    const lastIndex = buffer2.tokens.length - 1;
    let indentation = '';
    let lines = 1;
    let markup = '<div>';

    const indent = (num: number) => `${num > 0 ? '\n' : ''}${Array(num * 2).fill(' ').join('')}`;
    const indentII = (num: number) => {
      lines += num > 0 ? 1 : 0;
      return `${num > 0 ? '</div><div>' : ''}${Array(num * 2).fill('&nbsp;').join('')}`;
    };

    // Format by Token
    buffer2.tokens.forEach((token, i) => {
      const { depth, string } = token;
      const span = this.newSpan(i, token, depth);
      const [prevToken, nextToken] = Tokens.surroundingTokens(buffer2.tokens, i);
      const nextString = nextToken ? nextToken.string : '';
      const prevString = prevToken ? prevToken.string : '';

      switch (string) {
        case '{':
        case '[':
          if ('}]'.includes(nextString)) {
            indentation += string;
            markup += span;
          } else {
            indentation += `${string}${indent(depth)}`;
            markup += `${span}${indentII(depth)}`;
          }
          break;
        case '}':
        case ']':
          if ('[{'.includes(prevString)) {
            indentation += string;
            markup += span;
          } else {
            indentation += `${indent(depth)}${string}`;
            markup += `${indentII(depth)}${lastIndex === i ? '</div><div>' : ''}${span}`;
          }
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
    // TODO: update line count logic
    // lnes += (markup.match(/<\/div><div>/g) || []).length
    markup += '</div>';

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

  renderErrorMessage() {
    const { locale } = this.props;
    const { errorMessage } = this.style;
    // eslint-disable-next-line react/destructuring-assignment
    const errorMsg = this.props.error || this.state.error;
    const lang = locale || defaultLocale;

    if (errorMsg === undefined) {
      return '';
    }
    return (
      <p
        style={{
          color: 'red',
          fontSize: '12px',
          position: 'absolute',
          width: 'calc(100% - 60px)',
          height: '60px',
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
          paddingRight: '10px',
          overflowWrap: 'break-word',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          ...errorMessage
        }}
      >
        { format(lang.format, errorMsg) }
      </p>
    );
  }

  render() {
    const { id, error } = this.props;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { background, background_warning } = this.colors;
    const {
      body, container, contentBox, outerBox, warningBox
    } = this.style;
    // eslint-disable-next-line react/destructuring-assignment
    const errorMsg = error || this.state.error;
    const hasError = !!error || (errorMsg ? 'token' in errorMsg : false);
    this.renderCount += 1;

    const renderStyles: ObjectCSS = {
      body: {
        display: 'flex',
        overflow: 'none',
        height: hasError ? 'calc(100% - 60px)' : '100%',
        width: '',
        margin: 0,
        resize: 'none',
        fontFamily: 'Roboto Mono, Monaco, monospace',
        fontSize: '11px',
        backgroundColor: background,
        transitionDuration: '0.2s',
        transitionTimingFunction: 'cubic-bezier(0, 1, 0.5, 1)',
        ...body
      },
      confirmation: {
        opacity: hasError ? 0 : 1,
        height: '30px',
        width: '30px',
        position: 'absolute',
        top: 0,
        right: 0,
        transform: 'translate(-25%,25%)',
        pointerEvents: 'none',
        transitionDuration: '0.2s',
        transitionTimingFunction: 'cubic-bezier(0, 1, 0.5, 1)'
      },
      container: {
        display: 'block',
        height: this.totalHeight,
        width: this.totalWidth,
        margin: 0,
        boxSizing: 'border-box',
        overflow: 'hidden',
        fontFamily: 'Roboto, sans-serif',
        ...container
      },
      contentBox: {
        display: 'inline-block',
        boxSizing: 'border-box',
        verticalAlign: 'top',
        height: '100%',
        width: '',
        flex: 1,
        margin: 0,
        padding: '5px',
        overflowX: 'hidden',
        overflowY: 'auto',
        wordWrap: 'break-word',
        whiteSpace: 'pre-line',
        color: '#D4D4D4',
        outline: 'none',
        ...contentBox
      },
      outerBox: {
        display: 'block',
        overflow: 'none',
        height: this.totalHeight,
        width: this.totalWidth,
        margin: 0,
        boxSizing: 'border-box',
        position: 'relative',
        ...outerBox
      },
      warningBox: {
        display: 'block',
        overflow: 'hidden',
        height: hasError ? '60px' : '0px',
        width: '100%',
        margin: 0,
        backgroundColor: background_warning,
        transitionDuration: '0.2s',
        transitionTimingFunction: 'cubic-bezier(0, 1, 0.5, 1)',
        ...warningBox
      }
    };

    let confirmation: null|JSX.Element = null;
    if (this.confirmGood) {
      confirmation = (
        <div
          style={ renderStyles.confirmation }
        >
          <svg
            height='30px'
            width='30px'
            viewBox='0 0 100 100'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              fill='green'
              opacity='0.85'
              d='M39.363,79L16,55.49l11.347-11.419L39.694,56.49L72.983,23L84,34.085L39.363,79z'
            />
          </svg>
        </div>
      );
    }

    return (
      <div
        // name='outer-box'
        id={ id && `${id}-outer-box` }
        style={ renderStyles.outerBox }
      >
        { confirmation }
        <div
          // name='container'
          id={ id && `${id}-container` }
          style={ renderStyles.container }
          onClick={ this.onClick }
        >
          <div
            // name='warning-box'
            id={ id && `${id}-warning-box` }
            style={ renderStyles.warningBox }
            onClick={ this.onClick }
          >
            <div
              style={{
                display: 'inline-block',
                height: '60px',
                width: '60px',
                margin: 0,
                boxSizing: 'border-box',
                overflow: 'hidden',
                verticalAlign: 'top',
                pointerEvents: 'none'
              }}
              onClick={ this.onClick }
            >
              <div
                style={{
                  position: 'relative',
                  top: 0,
                  left: 0,
                  height: '60px',
                  width: '60px',
                  margin: 0,
                  pointerEvents: 'none'
                }}
                onClick={ this.onClick }
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none'
                  }}
                  onClick={ this.onClick }
                >
                  <svg
                    height='25px'
                    width='25px'
                    viewBox='0 0 100 100'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      fill='red'
                      d='M73.9,5.75c0.467-0.467,1.067-0.7,1.8-0.7c0.7,0,1.283,0.233,1.75,0.7l16.8,16.8  c0.467,0.5,0.7,1.084,0.7,1.75c0,0.733-0.233,1.334-0.7,1.801L70.35,50l23.9,23.95c0.5,0.467,0.75,1.066,0.75,1.8  c0,0.667-0.25,1.25-0.75,1.75l-16.8,16.75c-0.534,0.467-1.117,0.7-1.75,0.7s-1.233-0.233-1.8-0.7L50,70.351L26.1,94.25  c-0.567,0.467-1.167,0.7-1.8,0.7c-0.667,0-1.283-0.233-1.85-0.7L5.75,77.5C5.25,77,5,76.417,5,75.75c0-0.733,0.25-1.333,0.75-1.8  L29.65,50L5.75,26.101C5.25,25.667,5,25.066,5,24.3c0-0.666,0.25-1.25,0.75-1.75l16.8-16.8c0.467-0.467,1.05-0.7,1.75-0.7  c0.733,0,1.333,0.233,1.8,0.7L50,29.65L73.9,5.75z'
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'inline-block',
                height: '60px',
                width: 'calc(100% - 60px)',
                margin: 0,
                overflow: 'hidden',
                verticalAlign: 'top',
                position: 'absolute',
                pointerEvents: 'none'
              }}
              onClick={ this.onClick }
            >
              { this.renderErrorMessage() }
            </div>
          </div>

          <div
            // name='body'
            id={ id && `${id}-body` }
            style={ renderStyles.body }
            onClick={ this.onClick }
          >
            <div
              id={ id }
              ref={ ref => { this.refContent = ref || undefined; } }
              className={ this.getEditStyles() }
              style={ renderStyles.contentBox }
              dangerouslySetInnerHTML={ this.createMarkup() }
              // eslint-disable-next-line react/jsx-props-no-spreading
              { ...this.getEditProps() }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default JSONInput;

/* eslint react/no-unused-state: 0, @typescript-eslint/lines-between-class-members: 1 */
import React, {
  Component, ClipboardEvent, KeyboardEvent, SyntheticEvent, UIEvent
} from 'react';
import { getType, identical } from 'mitsuketa';
import * as err from './err';
import * as themes from './themes';
import { safeGet } from './utils';

// Locale/Language
import { format } from './locale';
import defaultLocale from './locale/en';

// Tokenize
import { DomNodeUpdate, PlaceholderJSON } from './tokenize';
import { formatDomNodeTokens, formatPlaceholderTokens } from './tokenize/utils';
import { ErrorMsg, DomNodeTokenize, PlaceholderTokenize } from './tokenize/interfaces';

// Interfaces
import {
  ColorProps, JSONInputProps, JSONInputState, StyleProps, ObjectCSS
} from './interfaces';

interface Chars {
  count: number
}

// Default Props
const defaultProps = {
  locale: defaultLocale,
  id: '',
  placeholder: {},
  reset: false,
  viewOnly: false,
  // onChange: (changes: ChangeProps) => { console.log(`Input Change - [${Object.keys(changes).join(', ')}]`); },
  confirmGood: true,
  height: '610px',
  width: '479px',
  onKeyPressUpdate: true,
  waitAfterKeyPress: 1000,
  theme: 'light_mitsuketa_tribute',
  colors: themes.light_mitsuketa_tribute,
  style: {}
};

class JSONInput extends Component<JSONInputProps, JSONInputState> {
  // eslint-disable-next-line react/static-property-placement
  static defaultProps: JSONInputProps = defaultProps;

  // Properties with default
  colors = defaultProps.colors;
  confirmGood = defaultProps.confirmGood;
  style: StyleProps = defaultProps.style;
  totalHeight = defaultProps.height;
  totalWidth = defaultProps.width;
  resetConfiguration = defaultProps.reset;
  waitAfterKeyPress = defaultProps.waitAfterKeyPress;

  // Properties without default
  renderCount: number;
  refContent = React.createRef<HTMLSpanElement>();
  refLabels = React.createRef<HTMLSpanElement>();
  timer?: NodeJS.Timeout;
  updateTime?: number;

  // Tokenize Functions
  tokenizeDomNodeUpdate = DomNodeUpdate;
  tokenizePlaceholderJSON = PlaceholderJSON;
  formatDomNodeUpdate?: typeof formatDomNodeTokens;
  formatPlaceholderJSON?: typeof formatPlaceholderTokens;

  constructor(props: JSONInputProps) {
    super(props);
    this.updateInternalProps = this.updateInternalProps.bind(this);
    this.createMarkup = this.createMarkup.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.update = this.update.bind(this);
    this.getCursorPosition = this.getCursorPosition.bind(this);
    this.setCursorPosition = this.setCursorPosition.bind(this);
    this.scheduledUpdate = this.scheduledUpdate.bind(this);
    this.setUpdateTime = this.setUpdateTime.bind(this);
    this.renderLabels = this.renderLabels.bind(this);
    this.renderErrorMessage = this.renderErrorMessage.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.showPlaceholder = this.showPlaceholder.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onPaste = this.onPaste.bind(this);
    this.stopEvent = this.stopEvent.bind(this);
    // Tokenize Functions
    this.tokenize = this.tokenize.bind(this);
    this.tokenizeDomNodeUpdate = this.tokenizeDomNodeUpdate.bind(this);
    this.tokenizePlaceholderJSON = this.tokenizePlaceholderJSON.bind(this);

    this.updateInternalProps();

    this.renderCount = 1;
    this.state = {
      prevPlaceholder: {},
      markupText: '',
      plainText: '',
      json: '',
      jsObject: {},
      lines: 2
    };

    const { locale } = this.props;
    if (!locale) {
      console.warn("[Deprecation Warning] You did not provide a 'locale' prop for your JSON input - This will be required in a future version. English has been set as a default.");
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
    const { viewOnly } = this.props;
    if (viewOnly) {
      return;
    }
    this.update(0, false);
  }

  onClick() {
    const { viewOnly } = this.props;
    if (viewOnly) {
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
    if (viewOnly && !ctrlOrMetaIsPressed) {
      this.stopEvent(event);
    }
    if (!ctrlOrMetaIsPressed) {
      this.setUpdateTime();
    }
  }

  onPaste(event: ClipboardEvent) {
    const { viewOnly } = this.props;
    if (viewOnly) {
      this.stopEvent(event);
    } else {
      event.preventDefault();
      const text = event.clipboardData.getData('text/plain');
      document.execCommand('insertText', false, text);
    }
    this.update();
  }

  onScroll(event: UIEvent) {
    const { target } = event;
    const { current } = this.refLabels;
    if (target && current) {
      // current.scrollTop = target.scrollTop;
    }
  }

  setCursorPosition(nextPosition: any) {
    console.log(nextPosition);
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
        const range = createRange(this.refContent.current as Node, { count: chars });

        if (!range) {
          return;
        }
        range.collapse(false);
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    };

    if (nextPosition > 0) {
      setPosition(nextPosition);
    } else {
      const contents = this.refContent.current;
      if (contents) {
        contents.focus();
      }
    }
  }

  setUpdateTime() {
    const { onKeyPressUpdate } = this.props;
    if (onKeyPressUpdate !== undefined && !onKeyPressUpdate) {
      return;
    }
    this.updateTime = new Date().getTime() + this.waitAfterKeyPress;
  }

  getCursorPosition(countBR?: ErrorMsg) {
    /**
      * Need to deprecate countBR
      * It is used to differenciate between good markup render, and aux render when error found
      * Adjustments based on coundBR account for usage of <br> instead of <span> for linebreaks to determine acurate cursor position
      * Find a way to consolidate render styles
      */
    const isChildOf = (node: Node) => {
      let n: null|Node = node;
      while (n !== null) {
        if (n === this.refContent.current) {
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
        if (node === this.refContent.current) {
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
    const { viewOnly } = this.props;
    if (viewOnly) {
      return {};
    }

    return {
      contentEditable: true,
      onKeyPress: this.onKeyPress,
      onKeyDown: this.onKeyDown,
      onClick: this.onClick,
      onBlur: this.onBlur,
      onScroll: this.onScroll,
      onPaste: this.onPaste,
      autoComplete: 'off',
      autoCorrect: 'off',
      autoCapitalize: 'off',
      spellCheck: false
    };
  }

  updateInternalProps() {
    const {
      colors, confirmGood, height, onKeyPressUpdate, reset, style, theme, waitAfterKeyPress, width
    } = this.props;

    let colorsMix: ColorProps;
    let styleMix: StyleProps = {
      outerBox: {},
      container: {},
      warningBox: {},
      errorMessage: {},
      body: {},
      labelColumn: {},
      labels: {},
      contentBox: {}
    };
    let themeMix = themes.light_mitsuketa_tribute;

    if (theme && typeof theme === 'string' && theme in themes) {
      themeMix = safeGet(themes, theme, themes.light_mitsuketa_tribute) as ColorProps;
    }

    colorsMix = themeMix;
    if (colors) {
      colorsMix = {
        default: safeGet(colors, 'default', colorsMix.default) as string,
        string: safeGet(colors, 'string', colorsMix.string) as string,
        number: safeGet(colors, 'number', colorsMix.number) as string,
        colon: safeGet(colors, 'colon', colorsMix.colon) as string,
        keys: safeGet(colors, 'keys', colorsMix.keys) as string,
        keys_whiteSpace: safeGet(colors, 'keys_whiteSpace', colorsMix.keys_whiteSpace) as string,
        primitive: safeGet(colors, 'primitive', colorsMix.primitive) as string,
        error: safeGet(colors, 'error', colorsMix.error) as string,
        background: safeGet(colors, 'background', colorsMix.background) as string,
        background_warning: safeGet(colors, 'background_warning', colorsMix.background_warning) as string
      };
    }
    this.colors = colorsMix;

    if (style) {
      styleMix = {
        outerBox: safeGet(style, 'outerBox', {}) as ObjectCSS,
        container: safeGet(style, 'container', {}) as ObjectCSS,
        warningBox: safeGet(style, 'warningBox', {}) as ObjectCSS,
        errorMessage: safeGet(style, 'errorMessage', {}) as ObjectCSS,
        body: safeGet(style, 'body', {}) as ObjectCSS,
        labelColumn: safeGet(style, 'labelColumn', {}) as ObjectCSS,
        labels: safeGet(style, 'labels', {}) as ObjectCSS,
        contentBox: safeGet(style, 'contentBox', {}) as ObjectCSS
      };
    }
    this.style = styleMix;

    this.confirmGood = confirmGood || true;
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
    this.waitAfterKeyPress = waitAfterKeyPress || 1000;
    this.resetConfiguration = reset || false;
  }

  createMarkup() {
    const { markupText } = this.state;
    if (markupText === undefined) {
      return {
        __html: ''
      };
    }
    return {
      __html: `${markupText}`
    };
  }

  update(cursorOffset = 0, updateCursorPosition = true) {
    const { onChange } = this.props;
    const container = this.refContent;
    const data = this.tokenize(container);

    if (data) {
      if (onChange) {
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

  scheduledUpdate() {
    const { onKeyPressUpdate } = this.props;
    if (onKeyPressUpdate !== undefined && !onKeyPressUpdate) {
      return;
    }
    if (this.updateTime === undefined || this.updateTime > new Date().getTime()) {
      return;
    }
    this.update();
  }

  // eslint-disable-next-line class-methods-use-this
  stopEvent(event: SyntheticEvent) {
    if (!event) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
  }

  showPlaceholder() {
    const { placeholder } = this.props;
    if (!placeholder) {
      return;
    }

    // const placeholderHasEmptyValues = [undefined, null].includes(placeholder);
    const placeholderHasEmptyValues = Object.keys(placeholder).some(key => [undefined, null].includes(placeholder[key]));
    if (placeholderHasEmptyValues) {
      return;
    }

    const { jsObject, prevPlaceholder } = this.state;
    const placeholderDataType = getType(placeholder);
    const unexpectedDataType = !['object', 'array'].includes(placeholderDataType);
    if (unexpectedDataType) {
      err.throwError('showPlaceholder', 'placeholder', 'either an object or an array');
    }

    // Component will always re-render when new placeholder value is any different from previous placeholder value.
    let componentShouldUpdate = !identical(placeholder, prevPlaceholder);

    if (!componentShouldUpdate) {
      if (this.resetConfiguration) {
        /**
          * If 'reset' property is set true or is truthy,
          * any difference between placeholder and current value
          * should trigger component re-render
          */
        if (jsObject !== undefined) {
          componentShouldUpdate = !identical(placeholder, jsObject);
        }
      }
    }

    if (!componentShouldUpdate) {
      return;
    }

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

  tokenize(obj: Record<string, any>|React.RefObject<HTMLSpanElement>): null|DomNodeTokenize|PlaceholderTokenize {
    if (typeof obj !== 'object') {
      throw new TypeError(`tokenize() expects object type properties only. Got '${typeof obj}' type instead.`);
    }
    const { locale } = this.props;
    const lang = locale || defaultLocale;

    // DOM NODE || ONBLUR OR UPDATE
    if ('nodeType' in obj) {
      return this.tokenizeDomNodeUpdate(obj as HTMLElement, lang);
    }

    // JS OBJECTS || PLACEHOLDER
    if (!('nodeType' in obj)) {
      return this.tokenizePlaceholderJSON(obj);
    }

    console.error('Tokenize Error: Oops....');
    return null;
  }

  renderErrorMessage() {
    const { locale } = this.props;
    const { error } = this.state;
    const { errorMessage } = this.style;
    const lang = locale || defaultLocale;

    if (error) {
      return (
        <p
          style={
            {
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
            }
          }
        >
          { format(lang.format, error) }
        </p>
      );
    }
    return '';
  }

  renderLabels() {
    const { error, lines } = this.state;
    const { labels } = this.style;
    const errorLine = error ? error.line : -1;
    const lineCount = lines || 1;
    const lineNumbers = Array.from<number, number>({length: lineCount-1}, Number.call, (i: number) => i);

    return lineNumbers.map(line => {
      const number = line + 1;
      const color = number !== errorLine ? this.colors.default : 'red';
      return (
        <div
          key={ number }
          style={
            {
              ...labels,
              color
            }
          }
        >
          { number }
        </div>
      );
    });
  }

  render() {
    const { id } = this.props;
    const { error } = this.state;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { background, background_warning } = this.colors;
    const {
      body, container, contentBox, labelColumn, outerBox, warningBox
    } = this.style;
    const hasError = error ? 'token' in error : false;
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
      labels: {
        display: 'inline-block',
        boxSizing: 'border-box',
        verticalAlign: 'top',
        height: '100%',
        width: '44px',
        margin: 0,
        padding: '5px 0px 5px 10px',
        overflow: 'hidden',
        color: '#D4D4D4',
        ...labelColumn
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
          // onClick={ this.onClick }
        >
          <div
            // name='warning-box'
            id={ id && `${id}-warning-box` }
            style={ renderStyles.warningBox }
            // onClick={ this.onClick }
          >
            <span
              style={
                {
                  display: 'inline-block',
                  height: '60px',
                  width: '60px',
                  margin: 0,
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                  verticalAlign: 'top',
                  pointerEvents: 'none'
                }
              }
              // onClick={ this.onClick }
            >
              <div
                style={
                  {
                    position: 'relative',
                    top: 0,
                    left: 0,
                    height: '60px',
                    width: '60px',
                    margin: 0,
                    pointerEvents: 'none'
                  }
                }
                // onClick={ this.onClick }
              >
                <div
                  style={
                    {
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      pointerEvents: 'none'
                    }
                  }
                  // onClick={ this.onClick }
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
            </span>

            <span
              style={
                {
                  display: 'inline-block',
                  height: '60px',
                  width: 'calc(100% - 60px)',
                  margin: 0,
                  overflow: 'hidden',
                  verticalAlign: 'top',
                  position: 'absolute',
                  pointerEvents: 'none'
                }
              }
              // onClick={ this.onClick }
            >
              { this.renderErrorMessage() }
            </span>
          </div>

          <div
            // name='body'
            id={ id && `${id}-body` }
            style={ renderStyles.body }
            // onClick={ this.onClick }
          >
            <span
              // name='labels'
              id={ id && `${id}-labels` }
              ref={ this.refLabels }
              style={ renderStyles.labels }
              // onClick={ this.onClick }
            >
              { this.renderLabels() }
            </span>

            <span
              id={ id }
              ref={ this.refContent }
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
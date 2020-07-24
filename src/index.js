/* eslint react/no-unused-state: 0, @typescript-eslint/lines-between-class-members: 1 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import themes from './themes';
import { getType, identical } from './mitsuketa';
import * as err from './err';
import { safeGet } from './utils';

// Locale/Language
import { format } from './locale';
import defaultLocale from './locale/en';

// Tokenize
import { DomNodeUpdate, PlaceholderJSON } from './tokenize';

class JSONInput extends Component {
  // Tokenize Functions
  tokenizeDomNodeUpdate = DomNodeUpdate;
  tokenizePlaceholderJSON = PlaceholderJSON;

  constructor(props, context) {
    super(props, context);
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

    this.refContent = null;
    this.refLabels = null;

    this.updateInternalProps();

    this.renderCount = 1;
    this.state = {
      prevPlaceholder: '',
      markupText: '',
      plainText: '',
      json: '',
      jsObject: undefined,
      lines: false,
      error: false
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

  onKeyDown(e) {
    const { viewOnly } = this.props;
    const viewer = !!viewOnly;
    const ctrlOrMetaIsPressed = e.ctrlKey || e.metaKey;

    switch (e.key) {
      case 'Tab':
        this.stopEvent(e);
        if (viewer) {
          break;
        }
        document.execCommand('insertText', false, '  ');
        this.setUpdateTime();
        break;
      case 'Backspace':
      case 'Delete':
        if (viewer) {
          this.stopEvent(e);
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
          this.stopEvent(e);
        }
        break;
      default:
        if (viewer) {
          this.stopEvent(e);
        }
    }
  }

  onKeyPress(e) {
    const { viewOnly } = this.props;
    const ctrlOrMetaIsPressed = e.ctrlKey || e.metaKey;
    if (viewOnly && !ctrlOrMetaIsPressed) {
      this.stopEvent(e);
    }
    if (!ctrlOrMetaIsPressed) {
      this.setUpdateTime();
    }
  }

  onPaste(e) {
    const { viewOnly } = this.props;
    if (viewOnly) {
      this.stopEvent(e);
    } else {
      e.preventDefault();
      const text = e.clipboardData.getData('text/plain');
      document.execCommand('insertText', false, text);
    }
    this.update();
  }

  onScroll(e) {
    this.refLabels.scrollTop = e.target.scrollTop;
  }

  setCursorPosition(nextPosition) {
    if ([false, null, undefined].includes(nextPosition)) {
      return;
    }

    const createRange = (node, chars, range) => {
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
          if (node.textContent.length < chars.count) {
            chars.count -= node.textContent.length;
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

    const setPosition = chars => {
      if (chars >= 0) {
        const selection = window.getSelection();
        const range = createRange(this.refContent, { count: chars });

        if (!range) {
          return;
        }
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    };

    if (nextPosition > 0) {
      setPosition(nextPosition);
    } else {
      this.refContent.focus();
    }
  }

  setUpdateTime() {
    const { onKeyPressUpdate } = this.props;
    if (onKeyPressUpdate && onKeyPressUpdate === false) {
      return;
    }
    this.updateTime = new Date().getTime() + this.waitAfterKeyPress;
  }

  getCursorPosition(countBR) {
    /**
      * Need to deprecate countBR
      * It is used to differenciate between good markup render, and aux render when error found
      * Adjustments based on coundBR account for usage of <br> instead of <span> for linebreaks to determine acurate cursor position
      * Find a way to consolidate render styles
      */
    const isChildOf = node => {
      while (node !== null) {
        if (node === this.refContent) {
          return true;
        }
        // eslint-disable-next-line no-param-reassign
        node = node.parentNode;
      }
      return false;
    };

    const selection = window.getSelection();
    let charCount = -1;
    let linebreakCount = 0;
    let node;

    if (selection.focusNode && isChildOf(selection.focusNode)) {
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
          charCount += node.textContent.length;
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
    let themeMix = themes.dark_vscode_tribute;

    if (theme && typeof theme === 'string' && theme in themes) {
      themeMix = themes[theme];
    }

    this.colors = {
      default: safeGet(colors, 'default', themeMix.default),
      string: safeGet(colors, 'string', themeMix.string),
      number: safeGet(colors, 'number', themeMix.number),
      colon: safeGet(colors, 'colon', themeMix.colon),
      keys: safeGet(colors, 'keys', themeMix.keys),
      keys_whiteSpace: safeGet(colors, 'keys_whiteSpace', themeMix.keys_whiteSpace),
      primitive: safeGet(colors, 'primitive', themeMix.primitive),
      error: safeGet(colors, 'error', themeMix.error),
      background: safeGet(colors, 'background', themeMix.background),
      background_warning: safeGet(colors, 'background_warning', themeMix.background_warning),
    };

    this.style = {
      outerBox: safeGet(style, 'outerBox', {}),
      container: safeGet(style, 'container', {}),
      warningBox: safeGet(style, 'warningBox', {}),
      errorMessage: safeGet(style, 'errorMessage', {}),
      body: safeGet(style, 'body', {}),
      labelColumn: safeGet(style, 'labelColumn', {}),
      labels: safeGet(style, 'labels', {}),
      contentBox: safeGet(style, 'contentBox', {})
    };

    this.confirmGood = confirmGood || true;
    this.totalHeight = height || '610px';
    this.totalWidth = width || '479px';

    if (!('onKeyPressUpdate' in this.props) || onKeyPressUpdate) {
      if (!this.timer) {
        this.timer = setInterval(this.scheduledUpdate, 100);
      }
    } else if (this.timer) {
      clearInterval(this.timer);
      this.timer = false;
    }
    this.updateTime = false;
    this.waitAfterKeyPress = 'waitAfterKeyPress' in this.props ? waitAfterKeyPress : 1000;
    this.resetConfiguration = 'reset' in this.props ? reset : false;
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
    this.updateTime = false;
    if (updateCursorPosition) {
      const cursorPosition = this.getCursorPosition(data.error) + cursorOffset;
      this.setCursorPosition(cursorPosition);
    }
  }

  scheduledUpdate() {
    const { onKeyPressUpdate } = this.props;
    if (onKeyPressUpdate && onKeyPressUpdate === false) {
      return;
    }
    if (this.updateTime === false || this.updateTime > new Date().getTime()) {
      return;
    }
    this.update();
  }

  // eslint-disable-next-line class-methods-use-this
  stopEvent(e) {
    if (!e) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
  }

  showPlaceholder() {
    const { placeholder } = this.props;
    if (!placeholder) {
      return;
    }

    const placeholderHasEmptyValues = [undefined, null].includes(placeholder);
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
    this.setState({
      prevPlaceholder: placeholder,
      plainText: data.indentation,
      markupText: data.markup,
      lines: data.lines,
      error: data.error
    });
  }

  tokenize(obj) {
    if (typeof obj !== 'object') {
      return console.error(`tokenize() expects object type properties only. Got '${typeof obj}' type instead.`);
    }
    const { locale } = this.props;
    const lang = locale || defaultLocale;

    // DOM NODE || ONBLUR OR UPDATE
    if ('nodeType' in obj) {
      return this.tokenizeDomNodeUpdate(obj, lang);
    };

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
    const lineNumbers = Array.from({length: lineCount-1}, Number.call, i => i);

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

    const renderStyles = {
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

    let confirmation = '';
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
              opacity ='0.85'
              d='M39.363,79L16,55.49l11.347-11.419L39.694,56.49L72.983,23L84,34.085L39.363,79z'
            />
          </svg>
        </div>
      );
    }

    return (
      <div
        name='outer-box'
        id={ id && `${id}-outer-box` }
        style={ renderStyles.outerBox }
      >
        { confirmation }
        <div
          name='container'
          id={ id && `${id}-container` }
          style={ renderStyles.container }
          // onClick={ this.onClick }
        >
          <div
            name='warning-box'
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
                      d= 'M73.9,5.75c0.467-0.467,1.067-0.7,1.8-0.7c0.7,0,1.283,0.233,1.75,0.7l16.8,16.8  c0.467,0.5,0.7,1.084,0.7,1.75c0,0.733-0.233,1.334-0.7,1.801L70.35,50l23.9,23.95c0.5,0.467,0.75,1.066,0.75,1.8  c0,0.667-0.25,1.25-0.75,1.75l-16.8,16.75c-0.534,0.467-1.117,0.7-1.75,0.7s-1.233-0.233-1.8-0.7L50,70.351L26.1,94.25  c-0.567,0.467-1.167,0.7-1.8,0.7c-0.667,0-1.283-0.233-1.85-0.7L5.75,77.5C5.25,77,5,76.417,5,75.75c0-0.733,0.25-1.333,0.75-1.8  L29.65,50L5.75,26.101C5.25,25.667,5,25.066,5,24.3c0-0.666,0.25-1.25,0.75-1.75l16.8-16.8c0.467-0.467,1.05-0.7,1.75-0.7  c0.733,0,1.333,0.233,1.8,0.7L50,29.65L73.9,5.75z'
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
            name='body'
            id={ id && `${id}-body` }
            style={ renderStyles.body }
            // onClick={ this.onClick }
          >
            <span
              name='labels'
              id={ id && `${id}-labels` }
              ref={ ref => { this.refLabels = ref; } }
              style={ renderStyles.labels }
              // onClick={ this.onClick }
            >
              { this.renderLabels() }
            </span>

            <span
              id={ id }
              ref={ ref => { this.refContent = ref; } }
              style={ renderStyles.contentBox }
              dangerouslySetInnerHTML={ this.createMarkup() }
              { ...this.getEditProps() }
            />
          </div>
        </div>
      </div>
    );
  }
}

JSONInput.propTypes = {
  locale: PropTypes.object.isRequired,
  id: PropTypes.string,
  placeholder: PropTypes.object,
  reset: PropTypes.bool,
  viewOnly: PropTypes.bool,
  onChange: PropTypes.func,
  confirmGood: PropTypes.bool,
  height: PropTypes.string,
  width: PropTypes.string,
  onKeyPressUpdate: PropTypes.bool,
  waitAfterKeyPress: PropTypes.number,
  theme: PropTypes.string,
  colors: PropTypes.shape({
    default: PropTypes.string,
    string: PropTypes.string,
    number: PropTypes.string,
    colon: PropTypes.string,
    keys: PropTypes.string,
    keys_whiteSpace: PropTypes.string,
    primitive: PropTypes.string,
    error: PropTypes.string,
    background: PropTypes.string,
    background_warning: PropTypes.string
  }),
  style: PropTypes.shape({
    outerBox: PropTypes.object,
    container: PropTypes.object,
    warningBox: PropTypes.object,
    errorMessage: PropTypes.object,
    body: PropTypes.object,
    labelColumn: PropTypes.object,
    labels: PropTypes.object,
    contentBox: PropTypes.object
  })
};

JSONInput.defaultProps = {
  id: '',
  placeholder: {},
  reset: false,
  viewOnly: false,
  onChange: () => {},
  confirmGood: true,
  height: '',
  width: '',
  onKeyPressUpdate: true,
  waitAfterKeyPress: 1000,
  theme: 'light_mitsuketa_tribute',
  colors: {},
  style: {}
};

export default JSONInput;
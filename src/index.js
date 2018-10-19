import React, { Component } from 'react';
import PropTypes from 'prop-types';
import themes from './themes';
import { identical, getType } from './mitsuketa';
import err from './err';
import { format } from './locale';
import defaultLocale from './locale/en';

function quarkize (text, prefix = '') {
  let buffer = {
    active: false,
    string: '',
    number: '',
    symbol: '',
    space: '',
    delimiter: '',
    quarks: []
  };

  function pushAndStore (char, type) {
    switch (type) {
      case 'symbol':
      case 'delimiter':
        if (buffer.active) {
          buffer.quarks.push({
            string: buffer[buffer.active],
            type: prefix + '-' + buffer.active
          });
        }
        buffer[buffer.active] = '';
        buffer.active = type;
        buffer[buffer.active] = char;
        break;

      default :
        if (type !== buffer.active || ([buffer.string, char].indexOf('\n') > -1)) {
          if (buffer.active) {
            buffer.quarks.push({
              string: buffer[buffer.active],
              type: prefix + '-' + buffer.active
            });
          }

          buffer[buffer.active] = '';
          buffer.active = type;
          buffer[buffer.active] = char;
        } else {
          buffer[type] += char;
        }

        break;
    }
  }

  function finalPush () {
    if (buffer.active) {
      buffer.quarks.push({
        string: buffer[buffer.active],
        type: prefix + '-' + buffer.active
      });

      buffer[buffer.active] = '';
      buffer.active = false;
    }
  }

  for (var i = 0; i < text.length; i++) {
    const char = text.charAt(i);

    switch (char) {
      case '"':
      case "'":
        pushAndStore(char, 'delimiter');

        break;

      case ' ':
      case '\u00A0':
        pushAndStore(char, 'space');

        break;

      case '{':
      case '}':
      case '[':
      case ']':
      case ':':
      case ',':
        pushAndStore(char, 'symbol');

        break;

      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        if (buffer.active === 'string') {
          pushAndStore(char, 'string');
        } else {
          pushAndStore(char, 'number');
        }

        break;

      case '-':
        if (i < text.length - 1) {
          if ('0123456789'.indexOf(text.charAt(i + 1)) > -1) {
            pushAndStore(char, 'number');
          }
        }

        break;
      case '.':
        if (i < text.length - 1 && i > 0) {
          if (
            '0123456789'.indexOf(text.charAt(i + 1)) > -1 &&
            '0123456789'.indexOf(text.charAt(i - 1)) > -1
          ) {
            pushAndStore(char, 'number');
          }
        }

        break;
      default:
        pushAndStore(char, 'string');

        break;
    }
  }

  finalPush();

  return buffer.quarks;
}

function validToken (string, type) {
  const quotes = '\'"';
  let firstChar = '';

  let lastChar = '';

  let quoteType = false;

  switch (type) {
    case 'primitive':
      if (['true', 'false', 'null', 'undefined'].indexOf(string) === -1) {
        return false;
      }

      break;
    case 'string':
      if (string.length < 2) {
        return false;
      }

      firstChar = string.charAt(0)

      lastChar = string.charAt(string.length - 1)

      quoteType = quotes.indexOf(firstChar)

      if (quoteType === -1) {
        return false;
      }

      if (firstChar !== lastChar) {
        return false;
      }

      for (let i = 0; i < string.length; i++) {
        if (i > 0 && i < string.length - 1) {
          if (string.charAt(i) === quotes[quoteType]) {
            if (string.charAt(i - 1) !== '\\') {
              return false;
            }
          }
        }
      }

      break;

    case 'key':
      if (string.length === 0) {
        return false;
      }

      firstChar = string.charAt(0)

      lastChar = string.charAt(string.length - 1)

      quoteType = quotes.indexOf(firstChar)

      if (quoteType > -1) {
        if (string.length === 1) {
          return false;
        }

        if (firstChar !== lastChar) {
          return false;
        }

        for (let i = 0; i < string.length; i++) {
          if (i > 0 && i < string.length - 1) {
            if (string.charAt(i) === quotes[quoteType]) {
              if (string.charAt(i - 1) !== '\\') {
                return false;
              }
            }
          }
        }
      } else {
        const nonAlphanumeric = '\'"`.,:;{}[]&<>=~*%\\|/-+!?@^ \xa0';

        for (let i = 0; i < nonAlphanumeric.length; i++) {
          const nonAlpha = nonAlphanumeric.charAt(i);

          if (string.indexOf(nonAlpha) > -1) {
            return false;
          }
        }
      }

      break;

    case 'number':
      for (let i = 0; i < string.length; i++) {
        if ('0123456789'.indexOf(string.charAt(i)) === -1) {
          if (i === 0) {
            if (string.charAt(0) !== '-') {
              return false;
            }
          } else if (string.charAt(i) !== '.') {
            return false;
          }
        }
      }

      break;

    case 'symbol':
      if (string.length > 1) {
        return false;
      }

      if ('{[:]},'.indexOf(string) === -1) {
        return false;
      }

      break;

    case 'colon':
      if (string.length > 1) {
        return false;
      }

      if (string !== ':') {
        return false;
      }

      break;

    default:
      return true;
  }

  return true;
}

function tokenFollowed (buffer) {
  const last = buffer.tokens_normalize.length - 1;

  if (last < 1) {
    return false;
  }

  for (let i = last; i >= 0; i--) {
    const previousToken = buffer.tokens_normalize[i];

    switch (previousToken.type) {
      case 'space':
      case 'linebreak':
        break;

      default:
        return previousToken;
    }
  }

  return false;
}

function countCarrigeReturn (string) {
  let count = 0;

  for (let i = 0; i < string.length; i++) {
    if (['\n', '\r'].indexOf(string[i]) > -1) {
      count++;
    }
  }

  return count;
}

function isFunction (functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

function deleteCharAt (string, position) {
  return string.slice(0, position) + string.slice(position + 1);
}

function add_tokenPrimary (value, buffer) {
  if (value.length === 0) {
    return false;
  }

  buffer.tokens.push(value);

  return true;
}

function add_tokenSecondary (buffer) {
  if (buffer.tokenSecondary.length === 0) {
    return false;
  }

  buffer.tokens.push(buffer.tokenSecondary);

  buffer.tokenSecondary = '';

  return true;
}

function determine_string (buffer) {
  if ('\'"'.indexOf(buffer.currentChar) === -1) {
    return false;
  }

  if (!buffer.stringOpen) {
    add_tokenSecondary(buffer);

    buffer.stringStart = buffer.position;

    buffer.stringOpen = buffer.currentChar;

    return true;
  }

  if (buffer.stringOpen === buffer.currentChar) {
    add_tokenSecondary(buffer);

    const stringToken = buffer.inputText.substring(buffer.stringStart, buffer.position + 1);

    add_tokenPrimary(stringToken, buffer);

    buffer.stringOpen = false;

    return true;
  }

  return false;
}

function indent (number) {
  const space = [];

  for (let i = 0; i < number * 2; i++) {
    space.push(' ');
  }

  return (number > 0 ? '\n' : '') + space.join('');
}

function indentII (number, lines) {
  const space = [];

  if (number > 0) {
    lines++;
  }

  for (let i = 0; i < number * 2; i++) {
    space.push('&nbsp;');
  }

  return (number > 0 ? '<br>' : '') + space.join('');
}

function newIndent (_depth) {
  const space = [];

  for (let i = 0; i < _depth * 2; i++) {
    space.push('&nbsp;');
  }

  return space.join('');
}

function newLineBreak (byPass = false, _line, _depth) {
  _line++;

  if (_depth > 0 || byPass) {
    return '<br>';
  }

  return '';
}

function newLineBreakAndIndent (byPass = false, _line, _depth) {
  return newLineBreak(byPass, _line, _depth) + newIndent(_depth);
}

function escape_character (buffer) {
  if (buffer.currentChar !== '\\') {
    return false;
  }

  buffer.inputText = deleteCharAt(buffer.inputText, buffer.position);

  return true;
}

function determine_value (buffer) {
  if (':,{}[]'.indexOf(buffer.currentChar) === -1) {
    return false;
  }

  if (buffer.stringOpen) {
    return false;
  }

  add_tokenSecondary(buffer);

  add_tokenPrimary(buffer.currentChar, buffer);

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
  }

  if (buffer.currentChar !== ':') {
    buffer.isValue = (buffer.brackets[buffer.brackets.length - 1] === '[');
  }

  return true;
}

function stripQuotesFromKey (text) {
  if (text.length === 0) {
    return text;
  }

  if (['""', "''"].indexOf(text) > -1) {
    return "''";
  }

  let wrappedInQuotes = false;

  for (let i = 0; i < 2; i++) {
    if ([text.charAt(0), text.charAt(text.length - 1)].indexOf(['"', "'"][i]) > -1) {
      wrappedInQuotes = true;

      break;
    }
  }

  if (wrappedInQuotes && text.length >= 2) {
    text = text.slice(1, -1);
  }

  const nonAlphaNumeric = text.replace(/\w/g, '');

  // const alphaNumeric = text.replace(/\W+/g, '');

  const mayRemoveQuotes = ((nonAlphaNumeric, text) => {
    let numberAndLetter = false;

    for (let i = 0; i < text.length; i++) {
      if (i === 0) {
        if (isNaN(text.charAt(i))) {
          break;
        }
      }

      if (isNaN(text.charAt(i))) {
        numberAndLetter = true;
        break;
      }
    }

    return !(nonAlphaNumeric.length > 0 || numberAndLetter);
  })(nonAlphaNumeric, text);

  const hasQuotes = (string => {
    for (let i = 0; i < string.length; i++) {
      if (["'", '"'].indexOf(string.charAt(i)) > -1) return true;
    }

    return false;
  })(nonAlphaNumeric);

  if (hasQuotes) {
    let newText = '';

    const charList = text.split('');

    for (let ii = 0; ii < charList.length; ii++) {
      let char = charList[ii];

      if (["'", '"'].indexOf(char) > -1) char = '\\' + char;

      newText += char;
    }

    text = newText;
  }

  if (!mayRemoveQuotes) {
    return "'" + text + "'";
  } else {
    return text;
  }
}

function typeFollowed (tokenID, buffer) {
  if (tokenID === undefined) {
    console.error('tokenID argument must be an integer.');
  }

  if (tokenID === 0) {
    return false;
  }

  for (let i = tokenID - 1; i >= 0; i--) {
    const previousToken = buffer.tokens_merge[i];

    switch (previousToken.type) {
      case 'space':
      case 'linebreak':
        break;

      default:
        return previousToken.type;
    }
  }

  return false;
}

function removePair (index, bracketList, delta) {
  bracketList.splice(index + 1, 1);

  bracketList.splice(index, 1);

  if (!delta) {
    delta = true;
  }
}

function followsSymbol (tokenID, options, buffer) {
  if (tokenID === undefined) {
    console.error('tokenID argument must be an integer.');
  }

  if (options === undefined) {
    console.error('options argument must be an array.');
  }

  if (tokenID === 0) {
    return false;
  }

  for (let i = tokenID - 1; i >= 0; i--) {
    const previousToken = buffer.tokens_merge[i];

    switch (previousToken.type) {
      case 'space':
      case 'linebreak':
        break;
      case 'symbol':
      case 'colon':
        if (options.indexOf(previousToken.string) > -1) {
          return true;
        }

        return false;

      default:
        return false;
    }
  }
  return false;
}

function followedBySymbol (tokenID, options, buffer) {
  if (tokenID === undefined) {
    console.error('tokenID argument must be an integer.');
  }

  if (options === undefined) {
    console.error('options argument must be an array.');
  }

  if (tokenID === buffer.tokens_merge.length - 1) {
    return false;
  }

  for (let i = tokenID + 1; i < buffer.tokens_merge.length; i++) {
    const nextToken = buffer.tokens_merge[i];

    switch (nextToken.type) {
      case 'space':
      case 'linebreak':
        break;

      case 'symbol':
      case 'colon':
        if (options.indexOf(nextToken.string) > -1) {
          return i;
        } else {
          return false;
        }

      default :
        return false;
    }
  }

  return false;
}

function setError (buffer, error, line, tokenID, reason, offset = 0) {
  error = {
    token: tokenID,
    line: line,
    reason: reason
  };

  buffer.tokens_merge[tokenID + offset].type = 'error';
}

class JSONInput extends Component {
  static propTypes = {
    locale: PropTypes.object,
    theme: PropTypes.string,
    colors: PropTypes.shape({
      default: PropTypes.string,
      string: PropTypes.string,
      number: PropTypes.string,
      colon: PropTypes.string,
      keys: PropTypes.string,
      keys_whiteSpace: PropTypes.string,
      primitive: PropTypes.string,
      background: PropTypes.string,
      error: PropTypes.string,
      background_warning: PropTypes.string
    }),
    style: PropTypes.shape({
      outerBox: PropTypes.object,
      container: PropTypes.object,
      warningBox: PropTypes.object,
      body: PropTypes.object,
      errorMessage: PropTypes.object,
      labelColumn: PropTypes.object,
      labels: PropTypes.object,
      contentBox: PropTypes.object
    }),
    confirmGood: PropTypes.bool,
    onKeyPressUpdate: PropTypes.bool,
    waitAfterKeyPress: PropTypes.number,
    width: PropTypes.string,
    height: PropTypes.string,
    reset: PropTypes.bool,

    id: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    viewOnly: PropTypes.bool,
    placeholder: PropTypes.object,
    modifyErrorText: PropTypes.func
  }

  constructor (props) {
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
    this.newSpan = this.newSpan.bind(this);
    this.renderErrorMessage = this.renderErrorMessage.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.showPlaceholder = this.showPlaceholder.bind(this);
    this.tokenize = this.tokenize.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onPaste = this.onPaste.bind(this);
    this.stopEvent = this.stopEvent.bind(this);

    this.getRefLabels = this.getRefLabels.bind(this);
    this.getRefContent = this.getRefContent.bind(this);

    this.refContent = null;
    this.refLabels = null;
    this.updateInternalProps();
    this.renderCount = 1;

    if (!props.locale) {
      console.warn("[react-json-editor-ajrm - Deprecation Warning] You did not provide a 'locale' prop for your JSON input - This will be required in a future version. English has been set as a default.");
    }
  }

  state = {
    prevPlaceholder: '',
    markupText: '',
    plainText: '',
    json: '',
    jsObject: undefined,
    lines: false,
    error: false
  }

  updateInternalProps () {
    let colors = {};
    let style = {};

    let theme = themes.dark_vscode_tribute;

    if ('theme' in this.props) {
      if (typeof this.props.theme === 'string') {
        if (this.props.theme in themes) {
          theme = themes[this.props.theme];
        }
      }
    }

    colors = theme;

    if ('colors' in this.props) {
      colors = {
        default: 'default' in this.props.colors
          ? this.props.colors.default
          : colors.default,
        string: 'string' in this.props.colors
          ? this.props.colors.string
          : colors.string,
        number: 'number' in this.props.colors
          ? this.props.colors.number
          : colors.number,
        colon: 'colon' in this.props.colors
          ? this.props.colors.colon
          : colors.colon,
        keys: 'keys' in this.props.colors
          ? this.props.colors.keys
          : colors.keys,
        keys_whiteSpace: 'keys_whiteSpace' in this.props.colors
          ? this.props.colors.keys_whiteSpace
          : colors.keys_whiteSpace,
        primitive: 'primitive' in this.props.colors
          ? this.props.colors.primitive
          : colors.primitive,
        error: 'error' in this.props.colors
          ? this.props.colors.error
          : colors.error,
        background: 'background' in this.props.colors
          ? this.props.colors.background
          : colors.background,
        background_warning: 'background_warning' in this.props.colors
          ? this.props.colors.background_warning
          : colors.background_warning
      };
    }

    this.colors = colors;

    if ('style' in this.props) {
      style = {
        outerBox: 'outerBox' in this.props.style
          ? this.props.style.outerBox
          : {},
        container: 'container' in this.props.style
          ? this.props.style.container
          : {},
        warningBox: 'warningBox' in this.props.style
          ? this.props.style.warningBox
          : {},
        errorMessage: 'errorMessage' in this.props.style
          ? this.props.style.errorMessage
          : {},
        body: 'body' in this.props.style
          ? this.props.style.body
          : {},
        labelColumn: 'labelColumn' in this.props.style
          ? this.props.style.labelColumn
          : {},
        labels: 'labels' in this.props.style
          ? this.props.style.labels
          : {},
        contentBox: 'contentBox' in this.props.style
          ? this.props.style.contentBox
          : {}
      };
    } else {
      style = {
        outerBox: {},
        container: {},
        warningBox: {},
        errorMessage: {},
        body: {},
        labelColumn: {},
        labels: {},
        contentBox: {}
      };
    }

    this.style = style;

    this.confirmGood = 'confirmGood' in this.props
      ? this.props.confirmGood
      : true;

    const totalHeight = (this.props.height || '610px');

    const totalWidth = (this.props.width || '479px');

    this.totalHeight = totalHeight;
    this.totalWidth = totalWidth;

    if (
      !('onKeyPressUpdate' in this.props) || // ???
      this.props.onKeyPressUpdate // ???
    ) {
      if (!this.timer) {
        this.timer = setInterval(this.scheduledUpdate, 100);
      }
    } else if (this.timer) {
      clearInterval(this.timer);
      this.timer = false;
    }

    this.updateTime = false;

    this.waitAfterKeyPress = 'waitAfterKeyPress' in this.props
      ? this.props.waitAfterKeyPress
      : 1000;

    this.resetConfiguration = 'reset' in this.props
      ? this.props.reset
      : false;
  }

  getRefLabels (ref) {
    this.refLabels = ref
  }

  getRefContent (ref) {
    this.refContent = ref
  }

  render () {
    const markupText = this.state.markupText;

    const error = this.state.error;

    const colors = this.colors;

    const style = this.style;

    const confirmGood = this.confirmGood;

    const totalHeight = this.totalHeight;

    const totalWidth = this.totalWidth;

    const hasError = error ? 'token' in error : false;

    this.renderCount++;

    return (
      <div
        name='outer-box'
        id={`${this.props.id}-outer-box`}
        style={{
          display: 'block',
          overflow: 'none',
          height: totalHeight,
          width: totalWidth,
          margin: 0,
          boxSizing: 'border-box',
          position: 'relative',
          ...style.outerBox
        }}
      >
        {
          confirmGood
            ? (
              <div
                style={{
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
                }}
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
            )
            : null
        }

        <div
          name='container'
          id={`${this.props.id}-container`}
          style={{
            display: 'block',
            height: totalHeight,
            width: totalWidth,
            margin: 0,
            boxSizing: 'border-box',
            overflow: 'hidden',
            fontFamily: 'Roboto, sans-serif',
            pointerEvents: 'none',
            ...style.container
          }}
        >
          <div
            name='warning-box'
            id={`${this.props.id}-warning-box`}
            style={{
              display: 'block',
              overflow: 'hidden',
              height: hasError ? '60px' : '0px',
              width: '100%',
              margin: 0,
              backgroundColor: colors.background_warning,
              transitionDuration: '0.2s',
              transitionTimingFunction: 'cubic-bezier(0, 1, 0.5, 1)',
              pointerEvents: 'none',
              ...style.warningBox
            }}
          >
            <span
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
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none'
                  }}
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
            >
              { this.renderErrorMessage() }
            </span>
          </div>

          <div
            name='body'
            id={`${this.props.id}-body`}
            style={{
              display: 'flex',
              overflow: 'none',
              height: hasError ? 'calc(100% - 60px)' : '100%',
              width: '',
              margin: 0,
              resize: 'none',
              fontFamily: 'Roboto Mono, Monaco, monospace',
              fontSize: '11px',
              backgroundColor: colors.background,
              transitionDuration: '0.2s',
              transitionTimingFunction: 'cubic-bezier(0, 1, 0.5, 1)',
              ...style.body
            }}
          >
            <span
              name='labels'
              id={`${this.props.id}-labels`}
              ref={this.getRefLabels}
              style={{
                display: 'inline-block',
                boxSizing: 'border-box',
                verticalAlign: 'top',
                height: '100%',
                width: '44px',
                margin: 0,
                padding: '5px 0px 5px 10px',
                overflow: 'hidden',
                color: '#D4D4D4',
                ...style.labelColumn
              }}
            >
              {this.renderLabels()}
            </span>

            <span
              tabIndex='0'
              role='textbox'
              id={this.props.id}
              ref={this.getRefContent}
              contentEditable
              style={{
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
                ...style.contentBox
              }}
              dangerouslySetInnerHTML={this.createMarkup(markupText)}
              onKeyPress={this.onKeyPress}
              onKeyDown={this.onKeyDown}
              onClick={this.onClick}
              onBlur={this.onBlur}
              onScroll={this.onScroll}
              onPaste={this.onPaste}
              autoComplete='off'
              autoCorrect='off'
              autoCapitalize='off'
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    );
  }

  renderErrorMessage () {
    const locale = this.props.locale || defaultLocale;

    if (!this.state.error) {
      return;
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
          ...this.style.errorMessage
        }}
      >
        { format(locale.format, this.state.error) }
      </p>
    );
  }

  renderLabels () {
    const lines = this.state.lines
      ? this.state.lines
      : 1;

    let labels = new Array(lines);

    for (let i = 0; i < lines - 1; i++) {
      labels[i] = i + 1;
    }

    return labels.map(number => (
      <div
        key={number}
        style={{
          ...this.style.labels,
          color: number !== (this.state.error ? this.state.error.line : -1)
            ? this.colors.default
            : 'red'
        }}
      >
        {number}
      </div>
    ));
  }

  createMarkup (markupText) {
    if (markupText === undefined) {
      return { __html: '' }
    }

    return { __html: '' + markupText };
  }

  newSpan (i, token, depth) {
    let colors = this.colors;

    let type = token.type;

    let string = token.string;

    let color = '';

    switch (type) {
      case 'string':
      case 'number':
      case 'primitive':
      case 'error':
        color = colors[token.type];
        break;

      case 'key' :
        if (string === ' ') {
          color = colors.keys_whiteSpace;
        } else {
          color = colors.keys;
        }
        break;

      case 'symbol':
        if (string === ':') {
          color = colors.colon;
        } else {
          color = colors.default;
        }
        break;

      default :
        color = colors.default;
        break;
    }

    if (string.length !== string.replace(/</g, '').replace(/>/g, '').length) {
      string = '<xmp style=display:inline;>' + string + '</xmp>';
    }

    return (
      '<span' +
      ' type="' + type + '"' +
      ' value="' + string + '"' +
      ' depth="' + depth + '"' +
      ' style="color:' + color + '"' +
      '>' + string +
      '</span>'
    );
  }

  getCursorPosition (countBR) {
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

        node = node.parentNode;
      }

      return false;
    };

    let selection = window.getSelection();

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

          if (countBR) if (node.nodeName === 'BR') linebreakCount++;

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

  setCursorPosition (nextPosition) {
    if ([false, null, undefined].indexOf(nextPosition) > -1) {
      return;
    }

    const createRange = (node, chars, range) => {
      if (!range) {
        range = document.createRange();
        range.selectNode(node);
        range.setStart(node, 0);
      }

      if (chars.count === 0) {
        range.setEnd(node, chars.count);
      } else if (node && chars.count > 0) {
        if (node.nodeType === Node.TEXT_NODE) {
          if (node.textContent.length < chars.count) {
            chars.count -= node.textContent.length;
          } else {
            range.setEnd(node, chars.count); chars.count = 0;
          }
        } else {
          for (var lp = 0; lp < node.childNodes.length; lp++) {
            range = createRange(node.childNodes[lp], chars, range);

            if (chars.count === 0) {
              break;
            }
          }
        }
      }

      return range;
    };

    const setPosition = chars => {
      if (chars < 0) {
        return;
      }

      let selection = window.getSelection();

      let range = createRange(this.refContent, { count: chars });

      if (!range) {
        return;
      }

      range.collapse(false);

      selection.removeAllRanges();

      selection.addRange(range);
    };

    if (nextPosition > 0) {
      setPosition(nextPosition);
    } else {
      this.refContent.focus();
    }
  }

  update (cursorOffset = 0, updateCursorPosition = true) {
    const container = this.refContent;

    const data = this.tokenize(container);

    if ('onChange' in this.props) {
      this.props.onChange({
        plainText: data.indented,
        markupText: data.markup,
        json: data.json,
        jsObject: data.jsObject,
        lines: data.lines,
        error: data.error
      });
    }

    let cursorPosition = this.getCursorPosition(data.error) + cursorOffset;

    this.setState(
      () => ({
        plainText: data.indented,
        markupText: data.markup,
        json: data.json,
        jsObject: data.jsObject,
        lines: data.lines,
        error: data.error
      })
    );

    this.updateTime = false;

    if (updateCursorPosition) {
      this.setCursorPosition(cursorPosition);
    }
  }

  scheduledUpdate () {
    if ('onKeyPressUpdate' in this.props) {
      if (this.props.onKeyPressUpdate === false) {
        return;
      }
    }

    const { updateTime } = this;

    if (updateTime === false) return;

    if (updateTime > new Date().getTime()) return;

    this.update();
  }

  setUpdateTime () {
    if ('onKeyPressUpdate' in this.props) {
      if (this.props.onKeyPressUpdate === false) {
        return;
      }
    }

    this.updateTime = new Date().getTime() + this.waitAfterKeyPress;
  }

  stopEvent (event) {
    if (!event) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
  }

  onKeyPress (event) {
    const ctrlOrMetaIsPressed = event.ctrlKey || event.metaKey;

    if (this.props.viewOnly && !ctrlOrMetaIsPressed) {
      this.stopEvent(event);
    }

    if (!ctrlOrMetaIsPressed) {
      this.setUpdateTime();
    }
  }

  onKeyDown (event) {
    const viewOnly = !!this.props.viewOnly;
    const ctrlOrMetaIsPressed = event.ctrlKey || event.metaKey;

    switch (event.key) {
      case 'Tab':
        this.stopEvent(event);

        if (viewOnly) break;

        document.execCommand('insertText', false, '  ');

        this.setUpdateTime();

        break;

      case 'Backspace':
      case 'Delete':
        if (viewOnly) this.stopEvent(event);

        this.setUpdateTime();

        break;

      case 'ArrowLeft':
      case 'ArrowRight':
      case 'ArrowUp':
      case 'ArrowDown':
        this.setUpdateTime();

        break;

      case 'a' : case 'c' :
        if (viewOnly && !ctrlOrMetaIsPressed) {
          this.stopEvent(event);
        }

        break;

      default :
        if (viewOnly) this.stopEvent(event);

        break;
    }
  }

  onPaste (event) {
    if (this.props.viewOnly) {
      this.stopEvent(event);
    } else {
      event.preventDefault();

      var text = event.clipboardData.getData('text/plain');

      document.execCommand('insertHTML', false, text);
    }

    this.update();
  }

  onClick () {
    if ('viewOnly' in this.props) {
      if (this.props.viewOnly) {
        return false;
      }
    }
  }

  onBlur () {
    if ('viewOnly' in this.props) {
      if (this.props.viewOnly) {
        return;
      }
    }

    this.update(0, false);
  }

  onScroll (event) {
    this.refLabels.scrollTop = event.target.scrollTop;
  }

  componentDidUpdate () {
    this.updateInternalProps();

    this.showPlaceholder();
  }

  componentDidMount () {
    this.showPlaceholder();
  }

  componentWillUnmount () {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  showPlaceholder () {
    const placeholderDoesNotExist = !('placeholder' in this.props);

    if (placeholderDoesNotExist) {
      return;
    }

    const { placeholder } = this.props;

    const placeholderHasEmptyValues = [undefined, null].indexOf(placeholder) > -1;
    if (placeholderHasEmptyValues) return;

    const { prevPlaceholder, jsObject } = this.state;

    const { resetConfiguration } = this;

    const placeholderDataType = getType(placeholder);

    const unexpectedDataType = ['object', 'array'].indexOf(placeholderDataType) === -1;

    if (unexpectedDataType) {
      err.throwError('showPlaceholder', 'placeholder', 'either an object or an array');
    }

    const samePlaceholderValues = identical(placeholder, prevPlaceholder);

    // Component will always re-render when new placeholder value is any different from previous placeholder value.
    let componentShouldUpdate = !samePlaceholderValues;

    if (!componentShouldUpdate) {
      if (resetConfiguration) {
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

    this.setState(
      () => ({
        prevPlaceholder: placeholder,
        plainText: data.indentation,
        markupText: data.markup,
        lines: data.lines,
        error: data.error
      })
    );
  }

  tokenize (something) {
    if (typeof something !== 'object') {
      return console.error('tokenize() expects object type properties only. Got \'' + typeof something + '\' type instead.');
    }

    const locale = this.props.locale || defaultLocale;
    const newSpan = this.newSpan;
    /**
     *     DOM NODE || ONBLUR OR UPDATE
     */

    if ('nodeType' in something) {
      const containerNode = something.cloneNode(true);

      const hasChildren = containerNode.hasChildNodes();

      if (!hasChildren) {
        return '';
      }

      const children = containerNode.childNodes;

      let buffer = {
        tokens_unknown: [],
        tokens_proto: [],
        tokens_split: [],
        tokens_fallback: [],
        tokens_normalize: [],
        tokens_merge: [],
        tokens_plainText: '',
        indented: '',
        json: '',
        jsObject: undefined,
        markup: ''
      }

      for (let i = 0; i < children.length; i++) {
        let child = children[i];

        let info = {};

        switch (child.nodeName) {
          case 'SPAN' :
            info = {
              string: child.textContent,
              type: child.attributes.type.textContent
            };

            buffer.tokens_unknown.push(info);

            break;

          case 'DIV' :
            buffer.tokens_unknown.push({ string: child.textContent, type: 'unknown' });

            break;

          case 'BR' :
            if (child.textContent === '') {
              buffer.tokens_unknown.push({ string: '\n', type: 'unknown' });
            }

            break;

          case '#text' :
            buffer.tokens_unknown.push({ string: child.wholeText, type: 'unknown' });

            break;

          case 'FONT' :
            buffer.tokens_unknown.push({ string: child.textContent, type: 'unknown' });

            break;

          default :
            console.error('Unrecognized node:', { child })

            break;
        }
      }

      for (var i = 0; i < buffer.tokens_unknown.length; i++) {
        let token = buffer.tokens_unknown[i];
        buffer.tokens_proto = buffer.tokens_proto.concat(quarkize(token.string, 'proto'));
      }

      for (let i = 0; i < buffer.tokens_proto.length; i++) {
        let token = buffer.tokens_proto[i];

        if (token.type.indexOf('proto') === -1) {
          if (!validToken(token.string, token.type)) {
            buffer.tokens_split = buffer.tokens_split.concat(quarkize(token.string, 'split'));
          } else {
            buffer.tokens_split.push(token);
          }
        } else {
          buffer.tokens_split.push(token);
        }
      }

      for (let i = 0; i < buffer.tokens_split.length; i++) {
        let token = buffer.tokens_split[i];

        let type = token.type;

        let string = token.string;

        let length = string.length;

        let fallback = [];

        if (type.indexOf('-') > -1) {
          type = type.slice(type.indexOf('-') + 1);

          if (type !== 'string') {
            fallback.push('string');
          }

          fallback.push('key');
          fallback.push('error');
        }

        let tokul = {
          string: string,
          length: length,
          type: type,
          fallback: fallback
        };

        buffer.tokens_fallback.push(tokul);
      }

      let buffer2 = {
        brackets: [],
        stringOpen: false,
        isValue: false
      };

      for (let i = 0; i < buffer.tokens_fallback.length; i++) {
        let token = buffer.tokens_fallback[i];

        const type = token.type;

        const string = token.string;

        let normalToken = {
          type: type,
          string: string
        };

        switch (type) {
          case 'symbol':
          case 'colon':
            if (buffer2.stringOpen) {
              if (buffer2.isValue) {
                normalToken.type = 'string';
              } else {
                normalToken.type = 'key';
              }

              break;
            }

            switch (string) {
              case '[':
              case '{':
                buffer2.brackets.push(string);

                buffer2.isValue = buffer2.brackets[buffer2.brackets.length - 1] === '[';

                break;

              case ']':
              case '}':
                buffer2.brackets.pop();

                buffer2.isValue = buffer2.brackets[buffer2.brackets.length - 1] === '[';

                break;

              case ',':
                if (tokenFollowed(buffer).type === 'colon') {
                  break;
                }

                buffer2.isValue = buffer2.brackets[buffer2.brackets.length - 1] === '[';

                break;

              case ':':
                normalToken.type = 'colon';

                buffer2.isValue = true;

                break;
            }

            break;

          case 'delimiter':
            if (buffer2.isValue) {
              normalToken.type = 'string';
            } else {
              normalToken.type = 'key';
            }

            if (!buffer2.stringOpen) {
              buffer2.stringOpen = string;
              break;
            }

            if (i > 0) {
              const previousToken = buffer.tokens_fallback[i - 1];

              const _string = previousToken.string;

              const _type = previousToken.type;

              const _char = _string.charAt(_string.length - 1);

              if (_type === 'string' && _char === '\\') {
                break;
              }
            }

            if (buffer2.stringOpen === string) {
              buffer2.stringOpen = false;

              break;
            }

            break;

          case 'primitive':
          case 'string':
            if (['false', 'true', 'null', 'undefined'].indexOf(string) > -1) {
              const lastIndex = buffer.tokens_normalize.length - 1;

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

            if (string === '\n') {
              if (!buffer2.stringOpen) {
                normalToken.type = 'linebreak';

                break;
              }
            }

            if (buffer2.isValue) {
              normalToken.type = 'string';
            } else {
              normalToken.type = 'key';
            }

            break;

          case 'space':
            if (buffer2.stringOpen) {
              if (buffer2.isValue) {
                normalToken.type = 'string';
              } else {
                normalToken.type = 'key';
              }
            }

            break;

          case 'number':
            if (buffer2.stringOpen) {
              if (buffer2.isValue) {
                normalToken.type = 'string';
              } else {
                normalToken.type = 'key';
              }
            }

            break;
          default :

            break;
        }

        buffer.tokens_normalize.push(normalToken);
      }

      for (let i = 0; i < buffer.tokens_normalize.length; i++) {
        const token = buffer.tokens_normalize[i];

        let mergedToken = {
          string: token.string,
          type: token.type,
          tokens: [i]
        };

        if (['symbol', 'colon'].indexOf(token.type) === -1) {
          if (i + 1 < buffer.tokens_normalize.length) {
            let count = 0;

            for (let u = i + 1; u < buffer.tokens_normalize.length; u++) {
              const nextToken = buffer.tokens_normalize[u];

              if (token.type !== nextToken.type) {
                break;
              }

              mergedToken.string += nextToken.string;

              mergedToken.tokens.push(u);

              count++;
            }

            i += count;
          }
        }

        buffer.tokens_merge.push(mergedToken);
      }

      const quotes = '\'"';

      const alphanumeric = (
        'abcdefghijklmnopqrstuvwxyz' +
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        '0123456789' +
        '_$'
      );

      let error = false;

      let line = buffer.tokens_merge.length > 0 ? 1 : 0;

      buffer2 = {
        brackets: [],
        stringOpen: false,
        isValue: false
      };

      let bracketList = [];

      for (let i = 0; i < buffer.tokens_merge.length; i++) {
        if (error) {
          break;
        }

        let token = buffer.tokens_merge[i];

        let string = token.string;

        let type = token.type;

        let found = false;

        switch (type) {
          case 'space':
            break;
          case 'linebreak':
            line++;
            break;

          case 'symbol':
            switch (string) {
              case '{':
              case '[':
                found = followsSymbol(i, ['}', ']'], buffer);

                if (found) {
                  setError(buffer, error, line, i, format(locale.invalidToken.tokenSequence.prohibited, {
                    firstToken: buffer.tokens_merge[found].string,
                    secondToken: string
                  }));

                  break;
                }

                if (string === '[' && i > 0) {
                  if (!followsSymbol(i, [':', '[', ','], buffer)) {
                    setError(buffer, error, line, i, format(locale.invalidToken.tokenSequence.permitted, {
                      firstToken: '[',
                      secondToken: [':', '[', ',']
                    }));

                    break;
                  }
                }

                if (string === '{') {
                  if (followsSymbol(i, ['{'], buffer)) {
                    setError(buffer, error, line, i, format(locale.invalidToken.double, {
                      token: '{'
                    }));

                    break;
                  }
                }

                buffer2.brackets.push(string);

                buffer2.isValue = buffer2.brackets[buffer2.brackets.length - 1] === '[';

                bracketList.push({
                  i: i,
                  line: line,
                  string: string
                });

                break;

              case '}':
              case ']':
                if (string === '}') {
                  if (buffer2.brackets[buffer2.brackets.length - 1] !== '{') {
                    setError(buffer, error, line, i, format(locale.brace.curly.missingOpen));

                    break;
                  }
                }

                if (string === '}') {
                  if (followsSymbol(i, [','], buffer)) {
                    setError(buffer, error, line, i, format(locale.invalidToken.tokenSequence.prohibited, {
                      firstToken: ',',
                      secondToken: '}'
                    }));

                    break;
                  }
                }

                if (string === ']') {
                  if (buffer2.brackets[buffer2.brackets.length - 1] !== '[') {
                    setError(buffer, error, line, i, format(locale.brace.square.missingOpen));

                    break;
                  }
                }

                if (string === ']') {
                  if (followsSymbol(i, [':'], buffer)) {
                    setError(buffer, error, line, i, format(locale.invalidToken.tokenSequence.prohibited, {
                      firstToken: ':',
                      secondToken: ']'
                    }));

                    break;
                  }
                }

                buffer2.brackets.pop();

                buffer2.isValue = buffer2.brackets[buffer2.brackets.length - 1] === '[';

                bracketList.push({
                  i: i,
                  line: line,
                  string: string
                });

                break;

              case ',':
                found = followsSymbol(i, ['{'], buffer);

                if (found) {
                  if (followedBySymbol(i, ['}'], buffer)) {
                    setError(buffer, error, line, i, format(locale.brace.curly.cannotWrap, {
                      token: ','
                    }));

                    break;
                  }

                  setError(buffer, error, line, i, format(locale.invalidToken.tokenSequence.prohibited, {
                    firstToken: '{',
                    secondToken: ','
                  }));

                  break;
                }

                if (followedBySymbol(i, ['}', ',', ']'], buffer)) {
                  setError(buffer, error, line, i, format(locale.noTrailingOrLeadingComma));

                  break;
                }

                found = typeFollowed(i, buffer);

                switch (found) {
                  case 'key':
                  case 'colon':
                    setError(buffer, error, line, i, format(locale.invalidToken.termSequence.prohibited, {
                      firstTerm: found === 'key' ? locale.types.key : locale.symbols.colon,
                      secondTerm: locale.symbols.comma
                    }));

                    break;

                  case 'symbol':
                    if (followsSymbol(i, ['{'], buffer)) {
                      setError(buffer, error, line, i, format(locale.invalidToken.tokenSequence.prohibited, {
                        firstToken: '{',
                        secondToken: ','
                      }));

                      break;
                    }

                    break;

                  default:
                    break;
                }

                buffer2.isValue = buffer2.brackets[buffer2.brackets.length - 1] === '[';

                break;

              default:
                break;
            }

            buffer.json += string;

            break;

          case 'colon':
            found = followsSymbol(i, ['['], buffer);

            if (found && followedBySymbol(i, [']'], buffer)) {
              setError(buffer, error, line, i, format(locale.brace.square.cannotWrap, {
                token: ':'
              }));

              break;
            }

            if (found) {
              setError(buffer, error, line, i, format(locale.invalidToken.tokenSequence.prohibited, {
                firstToken: '[',
                secondToken: ':'
              }));

              break;
            }

            if (typeFollowed(i, buffer) !== 'key') {
              setError(buffer, error, line, i, format(locale.invalidToken.termSequence.permitted, {
                firstTerm: locale.symbols.colon,
                secondTerm: locale.types.key
              }));

              break;
            }

            if (followedBySymbol(i, ['}', ']'], buffer)) {
              setError(buffer, error, line, i, format(locale.invalidToken.termSequence.permitted, {
                firstTerm: locale.symbols.colon,
                secondTerm: locale.types.value
              }));

              break;
            }

            buffer2.isValue = true;

            buffer.json += string;

            break;

          case 'key':
          case 'string': {
            let firstChar = string.charAt(0);

            let lastChar = string.charAt(string.length - 1);

            // let quote_primary = quotes.indexOf(firstChar);

            if (quotes.indexOf(firstChar) === -1) {
              if (quotes.indexOf(lastChar) !== -1) {
                setError(buffer, error, line, i, format(locale.string.missingOpen, {
                  quote: firstChar
                }));
                break;
              }
            }

            if (quotes.indexOf(lastChar) === -1) {
              if (quotes.indexOf(firstChar) !== -1) {
                setError(buffer, error, line, i, format(locale.string.missingClose, {
                  quote: firstChar
                }));
                break;
              }
            }

            if (quotes.indexOf(firstChar) > -1) {
              if (firstChar !== lastChar) {
                setError(buffer, error, line, i, format(locale.string.missingClose, {
                  quote: firstChar
                }));
                break;
              }
            }

            if (type === 'string') {
              if (quotes.indexOf(firstChar) === -1 && quotes.indexOf(lastChar) === -1) {
                setError(buffer, error, line, i, format(locale.string.mustBeWrappedByQuotes));
                break;
              }
            }

            if (type === 'key') {
              if (followedBySymbol(i, ['}', ']'], buffer)) {
                setError(buffer, error, line, i, format(locale.invalidToken.termSequence.permitted, {
                  firstTerm: locale.types.key,
                  secondTerm: locale.symbols.colon
                }));
              }
            }

            if (quotes.indexOf(firstChar) === -1 && quotes.indexOf(lastChar) === -1) {
              for (let h = 0; h < string.length; h++) {
                if (error) {
                  break;
                }

                const c = string.charAt(h);

                if (alphanumeric.indexOf(c) === -1) {
                  setError(buffer, error, line, i, format(locale.string.nonAlphanumeric, {
                    token: c
                  }));
                  break;
                }
              }
            }

            if (firstChar === "'") {
              string = '"' + string.slice(1, -1) + '"';
            } else if (firstChar !== '"') {
              string = '"' + string + '"';
            }

            if (type === 'key') {
              if (typeFollowed(i, buffer) === 'key') {
                if (i > 0) {
                  if (!isNaN(buffer.tokens_merge[i - 1])) {
                    buffer.tokens_merge[i - 1] += buffer.tokens_merge[i];

                    setError(buffer, error, line, i, format(locale.key.numberAndLetterMissingQuotes));

                    break;
                  }
                }

                setError(buffer, error, line, i, format(locale.key.spaceMissingQuotes));

                break;
              }
            }

            if (type === 'key') {
              if (!followsSymbol(i, ['{', ','], buffer)) {
                setError(buffer, error, line, i, format(locale.invalidToken.tokenSequence.permitted, {
                  firstToken: type,
                  secondToken: ['{', ',']
                }));
                break;
              }
            }

            if (type === 'string') {
              if (!followsSymbol(i, ['[', ':', ','], buffer)) {
                setError(buffer, error, line, i, format(locale.invalidToken.tokenSequence.permitted, {
                  firstToken: type,
                  secondToken: ['[', ':', ',']
                }));
                break;
              }
            }

            if (type === 'key') {
              if (buffer2.isValue) {
                setError(buffer, error, line, i, format(locale.string.unexpectedKey));
                break;
              }
            }

            if (type === 'string') {
              if (!buffer2.isValue) {
                setError(buffer, error, line, i, format(locale.key.unexpectedString));
                break;
              }
            }

            buffer.json += string;

            break;
          }

          case 'number':
          case 'primitive':
            if (followsSymbol(i, ['{'], buffer)) {
              buffer.tokens_merge[i].type = 'key';

              type = buffer.tokens_merge[i].type;

              string = '"' + string + '"';
            } else if (typeFollowed(i, buffer) === 'key') {
              buffer.tokens_merge[i].type = 'key';

              type = buffer.tokens_merge[i].type;
            } else if (!followsSymbol(i, ['[', ':', ','], buffer)) {
              setError(buffer, error, line, i, format(locale.invalidToken.tokenSequence.permitted, {
                firstToken: type,
                secondToken: ['[', ':', ',']
              }));

              break;
            }

            if (type !== 'key') {
              if (!buffer2.isValue) {
                buffer.tokens_merge[i].type = 'key';

                type = buffer.tokens_merge[i].type;

                string = '"' + string + '"';
              }
            }

            if (type === 'primitive') {
              if (string === 'undefined') {
                setError(buffer, error, line, i, format(locale.invalidToken.useInstead, {
                  badToken: 'undefined',
                  goodToken: 'null'
                }));
              }
            }
            buffer.json += string;

            break;
        }
      }

      let noEscapedSingleQuote = '';

      for (let i = 0; i < buffer.json.length; i++) {
        let current = buffer.json.charAt(i);

        let next = '';

        if (i + 1 < buffer.json.length) {
          next = buffer.json.charAt(i + 1);

          if (current === '\\' && next === "'") {
            noEscapedSingleQuote += next;

            i++;

            continue;
          }
        }

        noEscapedSingleQuote += current;
      }

      buffer.json = noEscapedSingleQuote;

      if (!error) {
        const maxIterations = Math.ceil(bracketList.length / 2);

        let round = 0;

        let delta = false;

        while (bracketList.length > 0) {
          delta = false;

          for (let tokenCount = 0; tokenCount < bracketList.length - 1; tokenCount++) {
            const pair = bracketList[tokenCount].string + bracketList[tokenCount + 1].string;

            if (['[]', '{}'].indexOf(pair) > -1) {
              removePair(tokenCount, bracketList, delta);
            }
          }

          round++;

          if (!delta) {
            break;
          }

          if (round >= maxIterations) {
            break;
          }
        }

        if (bracketList.length > 0) {
          const _tokenString = bracketList[0].string;

          const _tokenPosition = bracketList[0].i;

          const _closingBracketType = _tokenString === '[' ? ']' : '}';

          line = bracketList[0].line;

          setError(
            buffer, error, line,
            _tokenPosition,
            format(locale.brace[_closingBracketType === ']' ? 'square' : 'curly'].missingClose)
          );
        }
      }

      if (!error) {
        if ([undefined, ''].indexOf(buffer.json) === -1) {
          try {
            buffer.jsObject = JSON.parse(buffer.json);
          } catch (err) {
            const errorMessage = err.message;

            const subsMark = errorMessage.indexOf('position');

            if (subsMark === -1) throw new Error('Error parsing failed');

            const errPositionStr = errorMessage.substring(subsMark + 9, errorMessage.length);

            const errPosition = parseInt(errPositionStr);

            let charTotal = 0;

            let tokenIndex = 0;

            let token = false;

            let _line = 1;

            let exitWhile = false;

            while (charTotal < errPosition && !exitWhile) {
              token = buffer.tokens_merge[tokenIndex];

              if (token.type === 'linebreak') _line++;

              if (['space', 'linebreak'].indexOf(token.type) === -1) charTotal += token.string.length;

              if (charTotal >= errPosition) {
                break;
              }

              tokenIndex++;

              if (!buffer.tokens_merge[tokenIndex + 1]) {
                exitWhile = true;
              }
            }

            line = _line;

            let backslashCount = 0;

            for (let i = 0; i < token.string.length; i++) {
              const char = token.string.charAt(i);

              if (char === '\\') {
                backslashCount = backslashCount > 0
                  ? backslashCount + 1
                  : 1;
              } else {
                if (backslashCount % 2 !== 0 || backslashCount === 0) {
                  if ('\'"bfnrt'.indexOf(char) === -1) {
                    setError(buffer, error, line, tokenIndex, format(locale.invalidToken.unexpected, {
                      token: '\\'
                    }));
                  }
                }

                backslashCount = 0;
              }
            }

            if (!error) {
              setError(buffer, error, line, tokenIndex, format(locale.invalidToken.unexpected, {
                token: token.string
              }));
            }
          }
        }
      }

      let _line = 1;

      let _depth = 0;

      if (!error) {
        for (let i = 0; i < buffer.tokens_merge.length; i++) {
          const token = buffer.tokens_merge[i];

          const string = token.string;

          const type = token.type;

          switch (type) {
            case 'space':
            case 'linebreak':
              break;

            case 'string':
            case 'number':
            case 'primitive':
            case 'error':
              buffer.markup += ((followsSymbol(i, [',', '['], buffer) ? newLineBreakAndIndent(false, _line, _depth) : '') + newSpan(i, token, _depth));

              break;

            case 'key':
              buffer.markup += (newLineBreakAndIndent(false, _line, _depth) + newSpan(i, token, _depth));

              break;

            case 'colon':
              buffer.markup += (newSpan(i, token, _depth) + '&nbsp;');

              break;

            case 'symbol':
              switch (string) {
                case '[':
                case '{':
                  buffer.markup += ((!followsSymbol(i, [':'], buffer) ? newLineBreakAndIndent(false, _line, _depth) : '') + newSpan(i, token, _depth)); _depth++;

                  break;

                case ']':
                case '}': {
                  _depth--;

                  const islastToken = i === buffer.tokens_merge.length - 1;

                  const _adjustment = i > 0 ? ['[', '{'].indexOf(buffer.tokens_merge[i - 1].string) > -1 ? '' : newLineBreakAndIndent(islastToken, _line, _depth) : '';

                  buffer.markup += (_adjustment + newSpan(i, token, _depth));

                  break;
                }

                case ',' :
                  buffer.markup += newSpan(i, token, _depth);

                  break;
              }
              break;
          }
        }
      }

      if (error) {
        let _line_fallback = 1;

        _line = 1;

        for (let i = 0; i < buffer.tokens_merge.length; i++) {
          const token = buffer.tokens_merge[i];

          const type = token.type;

          const string = token.string;

          if (type === 'linebreak') _line++;

          buffer.markup += newSpan(i, token, _depth);

          _line_fallback += countCarrigeReturn(string);
        }

        _line++;

        _line_fallback++;

        if (_line < _line_fallback) {
          _line = _line_fallback;
        }
      }

      for (let i = 0; i < buffer.tokens_merge.length; i++) {
        let token = buffer.tokens_merge[i];

        buffer.indented += token.string;

        if (['space', 'linebreak'].indexOf(token.type) === -1) {
          buffer.tokens_plainText += token.string;
        }
      }

      if (error) {
        if ('modifyErrorText' in this.props) {
          if (isFunction(this.props.modifyErrorText)) {
            error.reason = this.props.modifyErrorText(error.reason);
          }
        }
      }

      return {
        tokens: buffer.tokens_merge,
        noSpaces: buffer.tokens_plainText,
        indented: buffer.indented,
        json: buffer.json,
        jsObject: buffer.jsObject,
        markup: buffer.markup,
        lines: _line,
        error: error
      };
    }

    /**
     *     JS OBJECTS || PLACEHOLDER
     */

    if (!('nodeType' in something)) {
      let buffer = {
        inputText: JSON.stringify(something),
        position: 0,
        currentChar: '',
        tokenPrimary: '',
        tokenSecondary: '',
        brackets: [],
        isValue: false,
        stringOpen: false,
        stringStart: 0,
        tokens: []
      };

      for (let i = 0; i < buffer.inputText.length; i++) {
        buffer.position = i;

        buffer.currentChar = buffer.inputText.charAt(buffer.position);

        const a = determine_value(buffer);

        const b = determine_string(buffer);

        const c = escape_character(buffer);

        if (!a && !b && !c) {
          if (!buffer.stringOpen) {
            buffer.tokenSecondary += buffer.currentChar;
          }
        }
      }

      let buffer2 = {
        brackets: [],
        isValue: false,
        tokens: []
      };

      buffer2.tokens = buffer.tokens.map(token => {
        let type = '';

        let string = '';

        let value = '';

        switch (token) {
          case ',':
            type = 'symbol';

            string = token;

            value = token;

            buffer2.isValue = (buffer2.brackets[buffer2.brackets.length - 1] === '[');

            break;

          case ':':
            type = 'symbol';

            string = token;

            value = token;

            buffer2.isValue = true;

            break;

          case '{':
          case '[':
            type = 'symbol';

            string = token;

            value = token;

            buffer2.brackets.push(token);

            buffer2.isValue = (buffer2.brackets[buffer2.brackets.length - 1] === '[');

            break;

          case '}':
          case ']':
            type = 'symbol';

            string = token;

            value = token;

            buffer2.brackets.pop();

            buffer2.isValue = (buffer2.brackets[buffer2.brackets.length - 1] === '[');

            break;

          case 'undefined':
            type = 'primitive';

            string = token;

            value = undefined;

            break;

          case 'null':
            type = 'primitive';
            string = token;
            value = null;
            break;

          case 'false':
            type = 'primitive';
            string = token;
            value = false;
            break;

          case 'true':
            type = 'primitive';
            string = token;
            value = true;
            break;

          default : {
            const C = token.charAt(0);

            if ('\'"'.indexOf(C) > -1) {
              if (buffer2.isValue) {
                type = 'string';
              } else {
                type = 'key';
              }

              if (type === 'key') {
                string = stripQuotesFromKey(token);
              }

              if (type === 'string') {
                string = '';

                const charList2 = token.slice(1, -1).split('');

                for (let ii = 0; ii < charList2.length; ii++) {
                  let char = charList2[ii];

                  if ('\'"'.indexOf(char) > -1) char = '\\' + char;

                  string += char;
                }

                string = "'" + string + "'";
              }

              value = string;

              break;
            }

            if (!isNaN(token)) {
              type = 'number';

              string = token;

              value = Number(token);

              break;
            }

            if (token.length > 0) {
              if (!buffer2.isValue) {
                type = 'key';

                string = token;

                if (string.indexOf(' ') > -1) {
                  string = "'" + string + "'";
                }

                value = string;

                break;
              }
            }
          }
        }

        return {
          type: type,
          string: string,
          value: value,
          depth: buffer2.brackets.length
        }
      });

      let clean = '';

      for (let i = 0; i < buffer2.tokens.length; i++) {
        let token = buffer2.tokens[i];

        clean += token.string;
      }

      let indentation = '';

      for (let i = 0; i < buffer2.tokens.length; i++) {
        let token = buffer2.tokens[i];

        switch (token.string) {
          case '[':
          case '{': {
            const nextToken = i < (buffer2.tokens.length - 1) - 1 ? buffer2.tokens[i + 1] : '';

            if ('}]'.indexOf(nextToken.string) === -1) {
              indentation += token.string + indent(token.depth);
            } else {
              indentation += token.string;
            }

            break;
          }

          case ']':
          case '}': {
            const prevToken = i > 0 ? buffer2.tokens[i - 1] : '';

            if ('[{'.indexOf(prevToken.string) === -1) {
              indentation += indent(token.depth) + token.string;
            } else {
              indentation += token.string;
            }

            break;
          }

          case ':':
            indentation += token.string + ' ';

            break;

          case ',':
            indentation += token.string + indent(token.depth);

            break;

          default:
            indentation += token.string;

            break;
        }
      }

      let lines = 1;

      let markup = '';

      const lastIndex = buffer2.tokens.length - 1;

      for (let i = 0; i < buffer2.tokens.length; i++) {
        let token = buffer2.tokens[i];

        let span = newSpan(i, token, token.depth);

        switch (token.string) {
          case '{':
          case '[': {
            const nextToken = i < (buffer2.tokens.length - 1) - 1 ? buffer2.tokens[i + 1] : '';

            if ('}]'.indexOf(nextToken.string) === -1) {
              markup += span + indentII(token.depth, lines);
            } else {
              markup += span;
            }
            break;
          }

          case '}':
          case ']': {
            const prevToken = i > 0 ? buffer2.tokens[i - 1] : '';

            if ('[{'.indexOf(prevToken.string) === -1) {
              markup += indentII(token.depth, lines) + (lastIndex === i ? '<br>' : '') + span;
            } else {
              markup += span;
            }

            break;
          }
          case ':':
            markup += span + ' ';

            break;

          case ',':
            markup += span + indentII(token.depth, lines);

            break;

          default:
            markup += span;

            break;
        }
      }

      lines += 2;

      return {
        tokens: buffer2.tokens,
        noSpaces: clean,
        indented: indentation,
        json: JSON.stringify(something),
        jsObject: something,
        markup: markup,
        lines: lines
      };
    }
  }
}

export default JSONInput;

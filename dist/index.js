/** @license react-json-editor-ajrm v2.5.1
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import _typeof from "@babel/runtime/helpers/builtin/typeof";
import _objectSpread from "@babel/runtime/helpers/builtin/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/builtin/classCallCheck";
import _createClass from "@babel/runtime/helpers/builtin/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/builtin/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/builtin/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/builtin/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/builtin/assertThisInitialized";
import React, { Component } from 'react';
import themes from './themes';
import { format } from "./locale";
import defaultLocale from "./locale/en";

var _ref = React.createElement("svg", {
  height: "30px",
  width: "30px",
  viewBox: "0 0 100 100"
}, React.createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  fill: "green",
  opacity: "0.85",
  d: "M39.363,79L16,55.49l11.347-11.419L39.694,56.49L72.983,23L84,34.085L39.363,79z"
}));

var _ref2 = React.createElement("svg", {
  height: "25px",
  width: "25px",
  viewBox: "0 0 100 100"
}, React.createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  fill: "red",
  d: "M73.9,5.75c0.467-0.467,1.067-0.7,1.8-0.7c0.7,0,1.283,0.233,1.75,0.7l16.8,16.8  c0.467,0.5,0.7,1.084,0.7,1.75c0,0.733-0.233,1.334-0.7,1.801L70.35,50l23.9,23.95c0.5,0.467,0.75,1.066,0.75,1.8  c0,0.667-0.25,1.25-0.75,1.75l-16.8,16.75c-0.534,0.467-1.117,0.7-1.75,0.7s-1.233-0.233-1.8-0.7L50,70.351L26.1,94.25  c-0.567,0.467-1.167,0.7-1.8,0.7c-0.667,0-1.283-0.233-1.85-0.7L5.75,77.5C5.25,77,5,76.417,5,75.75c0-0.733,0.25-1.333,0.75-1.8  L29.65,50L5.75,26.101C5.25,25.667,5,25.066,5,24.3c0-0.666,0.25-1.25,0.75-1.75l16.8-16.8c0.467-0.467,1.05-0.7,1.75-0.7  c0.733,0,1.333,0.233,1.8,0.7L50,29.65L73.9,5.75z"
}));

var JSONInput =
/*#__PURE__*/
function (_Component) {
  _inherits(JSONInput, _Component);

  function JSONInput(props) {
    var _this;

    _classCallCheck(this, JSONInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(JSONInput).call(this, props));
    if (!('id' in _this.props)) throw 'An \'id\' property must be specified. Must be unique.';
    _this.updateInternalProps = _this.updateInternalProps.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.randomString = _this.randomString.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.createMarkup = _this.createMarkup.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.update = _this.update.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getCursorPosition = _this.getCursorPosition.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setCursorPosition = _this.setCursorPosition.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.scheduledUpdate = _this.scheduledUpdate.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setUpdateTime = _this.setUpdateTime.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.renderLabels = _this.renderLabels.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.newSpan = _this.newSpan.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.renderErrorMessage = _this.renderErrorMessage.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onScroll = _this.onScroll.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.showPlaceholder = _this.showPlaceholder.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.tokenize = _this.tokenize.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onKeyPress = _this.onKeyPress.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onPaste = _this.onPaste.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.stopEvent = _this.stopEvent.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.uniqueID = 'AJRM-JSON-EDITOR-' + ('test' in _this.props ? '<RANDOM_NUMBER>' : _this.randomString(10)) + '-' + _this.props.id;
    _this.contentID = _this.uniqueID + '-content-box';

    _this.updateInternalProps();

    _this.renderCount = 1;
    _this.state = {
      preText: '',
      markupText: '',
      plainText: '',
      json: '',
      jsObject: undefined,
      lines: false,
      error: false
    };

    if (!_this.props.locale) {
      console.warn("[react-json-editor-ajrm - Deprecation Warning] You did not provide a 'locale' prop for your JSON input - This will be required in a future version. English has been set as a default.");
    }

    return _this;
  }

  _createClass(JSONInput, [{
    key: "updateInternalProps",
    value: function updateInternalProps() {
      var colors = {},
          style = {},
          theme = themes.dark_vscode_tribute;
      if ('theme' in this.props) if (typeof this.props.theme === 'string') if (this.props.theme in themes) theme = themes[this.props.theme];
      colors = theme;
      if ('colors' in this.props) colors = {
        default: 'default' in this.props.colors ? this.props.colors.default : colors.default,
        string: 'string' in this.props.colors ? this.props.colors.string : colors.string,
        number: 'number' in this.props.colors ? this.props.colors.number : colors.number,
        colon: 'colon' in this.props.colors ? this.props.colors.colon : colors.colon,
        keys: 'keys' in this.props.colors ? this.props.colors.keys : colors.keys,
        keys_whiteSpace: 'keys_whiteSpace' in this.props.colors ? this.props.colors.keys_whiteSpace : colors.keys_whiteSpace,
        primitive: 'primitive' in this.props.colors ? this.props.colors.primitive : colors.primitive,
        error: 'error' in this.props.colors ? this.props.colors.error : colors.error,
        background: 'background' in this.props.colors ? this.props.colors.background : colors.background,
        background_warning: 'background_warning' in this.props.colors ? this.props.colors.background_warning : colors.background_warning
      };
      this.colors = colors;
      if ('style' in this.props) style = {
        outerBox: 'outerBox' in this.props.style ? this.props.style.outerBox : {},
        container: 'container' in this.props.style ? this.props.style.container : {},
        warningBox: 'warningBox' in this.props.style ? this.props.style.warningBox : {},
        errorMessage: 'errorMessage' in this.props.style ? this.props.style.errorMessage : {},
        body: 'body' in this.props.style ? this.props.style.body : {},
        labelColumn: 'labelColumn' in this.props.style ? this.props.style.labelColumn : {},
        labels: 'labels' in this.props.style ? this.props.style.labels : {},
        contentBox: 'contentBox' in this.props.style ? this.props.style.contentBox : {}
      };else style = {
        outerBox: {},
        container: {},
        warningBox: {},
        errorMessage: {},
        body: {},
        labelColumn: {},
        labels: {},
        contentBox: {}
      };
      this.style = style;
      this.confirmGood = 'confirmGood' in this.props ? this.props.confirmGood : true;
      var totalHeight = this.props.height || '610px',
          totalWidth = this.props.width || '479px';
      this.totalHeight = totalHeight;
      this.totalWidth = totalWidth;

      if (!('onKeyPressUpdate' in this.props) || this.props.onKeyPressUpdate) {
        if (!this.timer) this.timer = setInterval(this.scheduledUpdate, 100);
      } else if (this.timer) {
        clearInterval(this.timer);
        this.timer = false;
      }

      this.updateTime = false;
      this.waitAfterKeyPress = 'waitAfterKeyPress' in this.props ? this.props.waitAfterKeyPress : 1000;
    }
  }, {
    key: "render",
    value: function render() {
      var markupText = this.state.markupText,
          error = this.state.error,
          uniqueID = this.uniqueID,
          contentID = this.contentID,
          colors = this.colors,
          style = this.style,
          confirmGood = this.confirmGood,
          totalHeight = this.totalHeight,
          totalWidth = this.totalWidth,
          hasError = error ? 'token' in error : false;
      this.renderCount++;
      return React.createElement("div", {
        name: "outer-box",
        id: uniqueID + '-outer-box',
        style: _objectSpread({
          display: 'block',
          overflow: 'none',
          height: totalHeight,
          width: totalWidth,
          margin: 0,
          boxSizing: 'border-box',
          position: 'relative'
        }, style.outerBox)
      }, confirmGood ? React.createElement("div", {
        style: {
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
        }
      }, _ref) : void 0, React.createElement("div", {
        name: "container",
        id: uniqueID + '-container',
        style: _objectSpread({
          display: 'block',
          height: totalHeight,
          width: totalWidth,
          margin: 0,
          boxSizing: 'border-box',
          overflow: 'hidden',
          fontFamily: 'Roboto, sans-serif'
        }, style.container),
        onClick: this.onClick
      }, React.createElement("div", {
        name: "warning-box",
        id: uniqueID + '-warning-box',
        style: _objectSpread({
          display: 'block',
          overflow: 'hidden',
          height: hasError ? '60px' : '0px',
          width: '100%',
          margin: 0,
          backgroundColor: colors.background_warning,
          transitionDuration: '0.2s',
          transitionTimingFunction: 'cubic-bezier(0, 1, 0.5, 1)'
        }, style.warningBox),
        onClick: this.onClick
      }, React.createElement("span", {
        style: {
          display: 'inline-block',
          height: '60px',
          width: '60px',
          margin: 0,
          boxSizing: 'border-box',
          overflow: 'hidden',
          verticalAlign: 'top',
          pointerEvents: 'none'
        },
        onClick: this.onClick
      }, React.createElement("div", {
        style: {
          position: 'relative',
          top: 0,
          left: 0,
          height: '60px',
          width: '60px',
          margin: 0,
          pointerEvents: 'none'
        },
        onClick: this.onClick
      }, React.createElement("div", {
        style: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none'
        },
        onClick: this.onClick
      }, _ref2))), React.createElement("span", {
        style: {
          display: 'inline-block',
          height: '60px',
          width: 'calc(100% - 60px)',
          margin: 0,
          overflow: 'hidden',
          verticalAlign: 'top',
          position: 'absolute',
          pointerEvents: 'none'
        },
        onClick: this.onClick
      }, this.renderErrorMessage())), React.createElement("div", {
        name: "body",
        id: uniqueID + '-body',
        style: _objectSpread({
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
          transitionTimingFunction: 'cubic-bezier(0, 1, 0.5, 1)'
        }, style.body),
        onClick: this.onClick
      }, React.createElement("span", {
        name: "labels",
        id: uniqueID + '-labels',
        style: _objectSpread({
          display: 'inline-block',
          boxSizing: 'border-box',
          verticalAlign: 'top',
          height: '100%',
          width: '44px',
          margin: 0,
          padding: '5px 0px 5px 10px',
          overflow: 'hidden',
          color: '#D4D4D4'
        }, style.labelColumn),
        onClick: this.onClick
      }, this.renderLabels()), React.createElement("span", {
        id: contentID,
        contentEditable: true,
        style: _objectSpread({
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
          outline: 'none'
        }, style.contentBox),
        dangerouslySetInnerHTML: this.createMarkup(markupText),
        onKeyPress: this.onKeyPress,
        onKeyDown: this.onKeyDown,
        onClick: this.onClick,
        onBlur: this.onBlur,
        onScroll: this.onScroll,
        onPaste: this.onPaste,
        autoComplete: "off",
        autoCorrect: "off",
        autoCapitalize: "off",
        spellCheck: false
      }))));
    }
  }, {
    key: "renderErrorMessage",
    value: function renderErrorMessage() {
      var locale = this.props.locale || defaultLocale,
          error = this.state.error,
          style = this.style;
      if (!error) return void 0;
      return React.createElement("p", {
        style: _objectSpread({
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
          justifyContent: 'center'
        }, style.errorMessage)
      }, format(locale.format, error));
    }
  }, {
    key: "renderLabels",
    value: function renderLabels() {
      var uniqueID = this.uniqueID + '-line-',
          colors = this.colors,
          style = this.style,
          errorLine = this.state.error ? this.state.error.line : -1,
          lines = this.state.lines ? this.state.lines : 1;
      var labels = new Array(lines);

      for (var i = 0; i < lines - 1; i++) {
        labels[i] = i + 1;
      }

      return labels.map(function (number) {
        var color = number !== errorLine ? colors.default : 'red';
        return React.createElement("div", {
          key: uniqueID + number,
          id: uniqueID + number,
          style: _objectSpread({}, style.labels, {
            color: color
          })
        }, number);
      });
    }
  }, {
    key: "createMarkup",
    value: function createMarkup(markupText) {
      if (markupText === undefined) return {
        __html: ''
      };
      return {
        __html: '' + markupText
      };
    }
  }, {
    key: "newSpan",
    value: function newSpan(i, token, depth) {
      var uniqueID = this.uniqueID + '-token-' + i + '-rc-' + this.renderCount,
          colors = this.colors,
          type = token.type,
          string = token.string;
      var color = '';

      switch (type) {
        case 'string':
        case 'number':
        case 'primitive':
        case 'error':
          color = colors[token.type];
          break;

        case 'key':
          if (string === ' ') color = colors.keys_whiteSpace;else color = colors.keys;
          break;

        case 'symbol':
          if (string === ':') color = colors.colon;else color = colors.default;
          break;

        default:
          color = colors.default;
          break;
      }

      if (string.length !== string.replace(/</g, '').replace(/>/g, '').length) string = '<xmp style=display:inline;>' + string + '</xmp>';
      return '<span' + ' id="' + uniqueID + '" key="' + uniqueID + '" type="' + type + '" value="' + string + '" depth="' + depth + '" style="color:' + color + '">' + string + '</span>';
    }
  }, {
    key: "randomString",
    value: function randomString(length) {
      if (typeof length !== 'number') throw '@randomString: Expected \'length\' to be a number';
      var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var result = '';

      for (var i = length; i > 0; --i) {
        result += chars[Math.floor(Math.random() * chars.length)];
      }

      return result;
    }
  }, {
    key: "getCursorPosition",
    value: function getCursorPosition() {
      var contentID = this.contentID;

      function isChildOf(node) {
        while (node !== null) {
          if (node.id === contentID) return true;
          node = node.parentNode;
        }

        return false;
      }

      ;
      var selection = window.getSelection(),
          charCount = -1,
          node;
      if (selection.focusNode) if (isChildOf(selection.focusNode)) {
        node = selection.focusNode;
        charCount = selection.focusOffset;

        while (node) {
          if (node.id === contentID) break;

          if (node.previousSibling) {
            node = node.previousSibling;
            charCount += node.textContent.length;
          } else {
            node = node.parentNode;
            if (node === null) break;
          }
        }
      }
      return charCount;
    }
  }, {
    key: "setCursorPosition",
    value: function setCursorPosition(nextPosition) {
      if ([false, null, undefined].indexOf(nextPosition) > -1) return;
      var contentID = this.contentID;

      function createRange(node, chars, range) {
        if (!range) {
          range = document.createRange();
          range.selectNode(node);
          range.setStart(node, 0);
        }

        if (chars.count === 0) {
          range.setEnd(node, chars.count);
        } else if (node && chars.count > 0) {
          if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent.length < chars.count) chars.count -= node.textContent.length;else {
              range.setEnd(node, chars.count);
              chars.count = 0;
            }
          } else for (var lp = 0; lp < node.childNodes.length; lp++) {
            range = createRange(node.childNodes[lp], chars, range);
            if (chars.count === 0) break;
          }
        }

        return range;
      }

      ;

      function setPosition(chars) {
        if (chars < 0) return;
        var selection = window.getSelection(),
            range = createRange(document.getElementById(contentID), {
          count: chars
        });
        if (!range) return;
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }

      ;
      if (nextPosition > 0) setPosition(nextPosition);else document.getElementById(contentID).focus();
    }
  }, {
    key: "update",
    value: function update() {
      var cursorOffset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var updateCursorPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var cursorPosition = this.getCursorPosition() + cursorOffset;
      var contentID = this.contentID,
          container = document.getElementById(contentID),
          data = this.tokenize(container);
      if ('onChange' in this.props) this.props.onChange({
        plainText: data.indented,
        markupText: data.markup,
        json: data.json,
        jsObject: data.jsObject,
        lines: data.lines,
        error: data.error
      });
      this.setState({
        plainText: data.indented,
        markupText: data.markup,
        json: data.json,
        jsObject: data.jsObject,
        lines: data.lines,
        error: data.error
      });
      this.updateTime = false;
      if (updateCursorPosition) this.setCursorPosition(cursorPosition);
    }
  }, {
    key: "scheduledUpdate",
    value: function scheduledUpdate() {
      if ('onKeyPressUpdate' in this.props) if (this.props.onKeyPressUpdate === false) return;
      var updateTime = this.updateTime;
      if (updateTime === false) return;
      if (updateTime > new Date().getTime()) return;
      this.update();
    }
  }, {
    key: "setUpdateTime",
    value: function setUpdateTime() {
      if ('onKeyPressUpdate' in this.props) if (this.props.onKeyPressUpdate === false) return;
      this.updateTime = new Date().getTime() + this.waitAfterKeyPress;
    }
  }, {
    key: "stopEvent",
    value: function stopEvent(event) {
      if (!event) return;
      event.preventDefault();
      event.stopPropagation();
    }
  }, {
    key: "onKeyPress",
    value: function onKeyPress(event) {
      if ('viewOnly' in this.props) if (this.props.viewOnly) this.stopEvent(event);
      this.setUpdateTime();
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      if ('viewOnly' in this.props) if (this.props.viewOnly) this.stopEvent(event);

      switch (event.key) {
        case 'Backspace':
        case 'Delete':
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'ArrowUp':
        case 'ArrowDown':
          this.setUpdateTime();
          return;
          break;

        default:
          break;
      }
    }
  }, {
    key: "onPaste",
    value: function onPaste(event) {
      if ('viewOnly' in this.props) if (this.props.viewOnly) this.stopEvent(event);
      this.update();
    }
  }, {
    key: "onClick",
    value: function onClick() {
      if ('viewOnly' in this.props) if (this.props.viewOnly) return;
    }
  }, {
    key: "onBlur",
    value: function onBlur() {
      if ('viewOnly' in this.props) if (this.props.viewOnly) return;
      this.update(0, false);
    }
  }, {
    key: "onScroll",
    value: function onScroll(event) {
      var uniqueID = this.uniqueID;
      var labels = document.getElementById(uniqueID + '-labels');
      labels.scrollTop = event.target.scrollTop;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.updateInternalProps();
      this.showPlaceholder();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var contentID = this.contentID;
      document.getElementById(contentID).addEventListener('paste', function (e) {
        e.preventDefault();
        var text = e.clipboardData.getData('text/plain');
        document.execCommand('insertHTML', false, text);
      });
      this.showPlaceholder();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.timer) clearInterval(this.timer);
    }
  }, {
    key: "showPlaceholder",
    value: function showPlaceholder() {
      var preText = this.state.preText;
      if (!('placeholder' in this.props)) return;
      var placeholder = this.props.placeholder;
      if ([preText, undefined, null].indexOf(placeholder) > -1) return;
      if (_typeof(placeholder) !== 'object') return;
      var data = this.tokenize(placeholder);
      this.setState({
        preText: placeholder,
        plainText: data.indentation,
        markupText: data.markup,
        lines: data.lines,
        error: data.error
      });
    }
  }, {
    key: "tokenize",
    value: function tokenize(something) {
      if (_typeof(something) !== 'object') return console.error('tokenize() expects object type properties only. Got \'' + _typeof(something) + '\' type instead.');
      var locale = this.props.locale || defaultLocale;
      var newSpan = this.newSpan;
      /**
       *     DOM NODE || ONBLUR OR UPDATE
       */

      if ('nodeType' in something) {
        var quarkize = function quarkize(text) {
          var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
          var buffer = {
            active: false,
            string: '',
            number: '',
            symbol: '',
            space: '',
            delimiter: '',
            quarks: []
          };

          function pushAndStore(char, type) {
            switch (type) {
              case 'symbol':
              case 'delimiter':
                if (buffer.active) buffer.quarks.push({
                  string: buffer[buffer.active],
                  type: prefix + '-' + buffer.active
                });
                buffer[buffer.active] = '';
                buffer.active = type;
                buffer[buffer.active] = char;
                break;

              default:
                if (type !== buffer.active || [buffer.string, char].indexOf('\n') > -1) {
                  if (buffer.active) buffer.quarks.push({
                    string: buffer[buffer.active],
                    type: prefix + '-' + buffer.active
                  });
                  buffer[buffer.active] = '';
                  buffer.active = type;
                  buffer[buffer.active] = char;
                } else buffer[type] += char;

                break;
            }
          }

          function finalPush() {
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
            var char = text.charAt(i);

            switch (char) {
              case '"':
              case "'":
                pushAndStore(char, 'delimiter');
                break;

              case ' ':
              case "\xA0":
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
                if (buffer.active === 'string') pushAndStore(char, 'string');else pushAndStore(char, 'number');
                break;

              case '-':
                if (i < text.length - 1) if ('0123456789'.indexOf(text.charAt(i + 1)) > -1) {
                  pushAndStore(char, 'number');
                  break;
                }

              case '.':
                if (i < text.length - 1 && i > 0) if ('0123456789'.indexOf(text.charAt(i + 1)) > -1 && '0123456789'.indexOf(text.charAt(i - 1)) > -1) {
                  pushAndStore(char, 'number');
                  break;
                }

              default:
                pushAndStore(char, 'string');
                break;
            }
          }

          finalPush();
          return buffer.quarks;
        };

        var validToken = function validToken(string, type) {
          var quotes = '\'"';
          var firstChar = '',
              lastChar = '',
              quoteType = false;

          switch (type) {
            case 'primitive':
              if (['true', 'false', 'null', 'undefined'].indexOf(string) === -1) return false;
              break;

            case 'string':
              if (string.length < 2) return false;
              firstChar = string.charAt(0), lastChar = string.charAt(string.length - 1), quoteType = quotes.indexOf(firstChar);
              if (quoteType === -1) return false;
              if (firstChar !== lastChar) return false;

              for (var i = 0; i < string.length; i++) {
                if (i > 0 && i < string.length - 1) if (string.charAt(i) === quotes[quoteType]) if (string.charAt(i - 1) !== '\\') return false;
              }

              break;

            case 'key':
              if (string.length === 0) return false;
              firstChar = string.charAt(0), lastChar = string.charAt(string.length - 1), quoteType = quotes.indexOf(firstChar);

              if (quoteType > -1) {
                if (string.length === 1) return false;
                if (firstChar !== lastChar) return false;

                for (var i = 0; i < string.length; i++) {
                  if (i > 0 && i < string.length - 1) if (string.charAt(i) === quotes[quoteType]) if (string.charAt(i - 1) !== '\\') return false;
                }
              } else {
                var nonAlphanumeric = '\'"`.,:;{}[]&<>=~*%\\|/-+!?@^ \xa0';

                for (var i = 0; i < nonAlphanumeric.length; i++) {
                  var nonAlpha = nonAlphanumeric.charAt(i);
                  if (string.indexOf(nonAlpha) > -1) return false;
                }
              }

              break;

            case 'number':
              for (var i = 0; i < string.length; i++) {
                if ('0123456789'.indexOf(string.charAt(i)) === -1) if (i === 0) {
                  if ('-' !== string.charAt(0)) return false;
                } else if ('.' !== string.charAt(i)) return false;
              }

              break;

            case 'symbol':
              if (string.length > 1) return false;
              if ('{[:]},'.indexOf(string) === -1) return false;
              break;

            case 'colon':
              if (string.length > 1) return false;
              if (':' !== string) return false;
              break;

            default:
              return true;
              break;
          }

          return true;
        };

        var tokenFollowed = function tokenFollowed() {
          var last = buffer.tokens_normalize.length - 1;
          if (last < 1) return false;

          for (var i = last; i >= 0; i--) {
            var previousToken = buffer.tokens_normalize[i];

            switch (previousToken.type) {
              case 'space':
              case 'linebreak':
                break;

              default:
                return previousToken;
                break;
            }
          }

          return false;
        };

        var setError = function setError(tokenID, reason) {
          var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          error = {
            token: tokenID,
            line: line,
            reason: reason
          };
          buffer.tokens_merge[tokenID + offset].type = 'error';
        };

        var followedBySymbol = function followedBySymbol(tokenID, options) {
          if (tokenID === undefined) console.error('tokenID argument must be an integer.');
          if (options === undefined) console.error('options argument must be an array.');
          if (tokenID === buffer.tokens_merge.length - 1) return false;

          for (var i = tokenID + 1; i < buffer.tokens_merge.length; i++) {
            var _nextToken = buffer.tokens_merge[i];

            switch (_nextToken.type) {
              case 'space':
              case 'linebreak':
                break;

              case 'symbol':
              case 'colon':
                if (options.indexOf(_nextToken.string) > -1) return i;else return false;
                break;

              default:
                return false;
                break;
            }
          }

          return false;
        };

        var followsSymbol = function followsSymbol(tokenID, options) {
          if (tokenID === undefined) console.error('tokenID argument must be an integer.');
          if (options === undefined) console.error('options argument must be an array.');
          if (tokenID === 0) return false;

          for (var i = tokenID - 1; i >= 0; i--) {
            var previousToken = buffer.tokens_merge[i];

            switch (previousToken.type) {
              case 'space':
              case 'linebreak':
                break;

              case 'symbol':
              case 'colon':
                if (options.indexOf(previousToken.string) > -1) return true;
                return false;
                break;

              default:
                return false;
                break;
            }
          }

          return false;
        };

        var typeFollowed = function typeFollowed(tokenID) {
          if (tokenID === undefined) console.error('tokenID argument must be an integer.');
          if (tokenID === 0) return false;

          for (var i = tokenID - 1; i >= 0; i--) {
            var previousToken = buffer.tokens_merge[i];

            switch (previousToken.type) {
              case 'space':
              case 'linebreak':
                break;

              default:
                return previousToken.type;
                break;
            }
          }

          return false;
        };

        var newIndent = function newIndent() {
          var space = [];

          for (var i = 0; i < _depth * 2; i++) {
            space.push('&nbsp;');
          }

          return space.join('');
        };

        var newLineBreak = function newLineBreak() {
          var byPass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
          _line++;

          if (_depth > 0 || byPass) {
            return '<br>';
          }

          return '';
        };

        var newLineBreakAndIndent = function newLineBreakAndIndent() {
          var byPass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
          return newLineBreak(byPass) + newIndent();
        };

        var containerNode = something.cloneNode(true),
            hasChildren = containerNode.hasChildNodes();
        if (!hasChildren) return '';
        var children = containerNode.childNodes;
        var buffer = {
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
        };
        children.forEach(function (child, i) {
          var info = {};

          switch (child.nodeName) {
            case 'SPAN':
              info = {
                string: child.textContent,
                type: child.attributes.type.textContent
              };
              buffer.tokens_unknown.push(info);
              break;

            case 'DIV':
              buffer.tokens_unknown.push({
                string: child.textContent,
                type: 'unknown'
              });
              break;

            case 'BR':
              if (child.textContent === '') buffer.tokens_unknown.push({
                string: '\n',
                type: 'unknown'
              });
              break;

            case '#text':
              buffer.tokens_unknown.push({
                string: child.wholeText,
                type: 'unknown'
              });
              break;

            case 'FONT':
              buffer.tokens_unknown.push({
                string: child.textContent,
                type: 'unknown'
              });
              break;

            default:
              console.error('Unrecognized node:', {
                child: child
              });
              break;
          }
        });
        buffer.tokens_unknown.forEach(function (token, i) {
          buffer.tokens_proto = buffer.tokens_proto.concat(quarkize(token.string, 'proto'));
        });
        buffer.tokens_proto.forEach(function (token, i) {
          if (token.type.indexOf('proto') === -1) {
            if (!validToken(token.string, token.type)) {
              buffer.tokens_split = buffer.tokens_split.concat(quarkize(token.string, 'split'));
            } else buffer.tokens_split.push(token);
          } else buffer.tokens_split.push(token);
        });
        buffer.tokens_split.forEach(function (token) {
          var type = token.type,
              string = token.string,
              length = string.length,
              fallback = [];

          if (type.indexOf('-') > -1) {
            type = type.slice(type.indexOf('-') + 1);
            if (type !== 'string') fallback.push('string');
            fallback.push('key');
            fallback.push('error');
          }

          var tokul = {
            string: string,
            length: length,
            type: type,
            fallback: fallback
          };
          buffer.tokens_fallback.push(tokul);
        });
        var buffer2 = {
          brackets: [],
          stringOpen: false,
          isValue: false
        };
        buffer.tokens_fallback.forEach(function (token, i) {
          var type = token.type,
              string = token.string;
          var normalToken = {
            type: type,
            string: string
          };

          switch (type) {
            case 'symbol':
            case 'colon':
              if (buffer2.stringOpen) {
                if (buffer2.isValue) normalToken.type = 'string';else normalToken.type = 'key';
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
                  if (tokenFollowed().type === 'colon') break;
                  buffer2.isValue = buffer2.brackets[buffer2.brackets.length - 1] === '[';
                  break;

                case ':':
                  normalToken.type = 'colon';
                  buffer2.isValue = true;
                  break;
              }

              break;

            case 'delimiter':
              if (buffer2.isValue) normalToken.type = 'string';else normalToken.type = 'key';

              if (!buffer2.stringOpen) {
                buffer2.stringOpen = string;
                break;
              }

              if (i > 0) {
                var previousToken = buffer.tokens_fallback[i - 1],
                    _string = previousToken.string,
                    _type = previousToken.type,
                    _char = _string.charAt(_string.length - 1);

                if (_type === 'string' && _char === '\\') break;
              }

              if (buffer2.stringOpen === string) {
                buffer2.stringOpen = false;
                break;
              }

              break;

            case 'primitive':
            case 'string':
              if (['false', 'true', 'null', 'undefined'].indexOf(string) > -1) {
                var lastIndex = buffer.tokens_normalize.length - 1;

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

              if (string === '\n') if (!buffer2.stringOpen) {
                normalToken.type = 'linebreak';
                break;
              }
              if (buffer2.isValue) normalToken.type = 'string';else normalToken.type = 'key';
              break;

            case 'space':
              if (buffer2.stringOpen) if (buffer2.isValue) normalToken.type = 'string';else normalToken.type = 'key';
              break;

            case 'number':
              if (buffer2.stringOpen) if (buffer2.isValue) normalToken.type = 'string';else normalToken.type = 'key';
              break;

            default:
              break;
          }

          buffer.tokens_normalize.push(normalToken);
        });

        for (var i = 0; i < buffer.tokens_normalize.length; i++) {
          var token = buffer.tokens_normalize[i];
          var mergedToken = {
            string: token.string,
            type: token.type,
            tokens: [i]
          };
          if (['symbol', 'colon'].indexOf(token.type) === -1) if (i + 1 < buffer.tokens_normalize.length) {
            var count = 0;

            for (var u = i + 1; u < buffer.tokens_normalize.length; u++) {
              var nextToken = buffer.tokens_normalize[u];
              if (token.type !== nextToken.type) break;
              mergedToken.string += nextToken.string;
              mergedToken.tokens.push(u);
              count++;
            }

            i += count;
          }
          buffer.tokens_merge.push(mergedToken);
        }

        var quotes = '\'"',
            alphanumeric = 'abcdefghijklmnopqrstuvwxyz' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + '0123456789' + '_$';
        var error = false,
            line = buffer.tokens_merge.length > 0 ? 1 : 0;
        buffer2 = {
          brackets: [],
          stringOpen: false,
          isValue: false
        };
        var bracketList = [];

        for (var i = 0; i < buffer.tokens_merge.length; i++) {
          if (error) break;
          var _token = buffer.tokens_merge[i],
              string = _token.string,
              type = _token.type,
              found = false;

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
                  found = followsSymbol(i, ['}', ']']);

                  if (found) {
                    setError(i, format(locale.invalidToken.sequence, {
                      firstToken: buffer.tokens_merge[found].string,
                      secondToken: string
                    }));
                    break;
                  }

                  if (string === '[' && i > 0) if (!followsSymbol(i, [':', '[', ','])) {
                    setError(i, format(locale.invalidToken.whitelist, {
                      firstToken: "[",
                      secondToken: [":", "[", ","]
                    }));
                    break;
                  }
                  if (string === '{') if (followsSymbol(i, ['{'])) {
                    setError(i, format(locale.invalidToken.double, {
                      token: "{"
                    }));
                    break;
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
                  if (string === '}') if (buffer2.brackets[buffer2.brackets.length - 1] !== '{') {
                    setError(i, format(locale.brace.curly.missingOpen));
                    break;
                  }
                  if (string === '}') if (followsSymbol(i, [','])) {
                    setError(i, format(locale.invalidToken.sequence, {
                      firstToken: ",",
                      secondToken: "}"
                    }));
                    break;
                  }
                  if (string === ']') if (buffer2.brackets[buffer2.brackets.length - 1] !== '[') {
                    setError(i, format(locale.brace.square.missingOpen));
                    break;
                  }
                  if (string === ']') if (followsSymbol(i, [':'])) {
                    setError(i, format(locale.invalidToken.sequence, {
                      firstToken: ":",
                      secondToken: "]"
                    }));
                    break;
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
                  found = followsSymbol(i, ['{']);

                  if (found) {
                    if (followedBySymbol(i, ['}'])) {
                      setError(i, format(locale.brace.curly.cannotWrap, {
                        token: ","
                      }));
                      break;
                    }

                    setError(i, format(locale.invalidToken.sequence, {
                      firstToken: "{",
                      secondToken: ","
                    }));
                    break;
                  }

                  if (followedBySymbol(i, ['}', ',', ']'])) {
                    setError(i, format(locale.noTrailingOrLeadingComma));
                    break;
                  }

                  found = typeFollowed(i);

                  switch (found) {
                    case 'key':
                    case 'colon':
                      setError(i, format(locale.invalidToken.sequence, {
                        firstToken: found,
                        secondToken: ","
                      }));
                      break;

                    case 'symbol':
                      if (followsSymbol(i, ['{'])) {
                        setError(i, format(locale.invalidToken.sequence, {
                          firstToken: "{",
                          secondToken: ","
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
              found = followsSymbol(i, ['[']);

              if (found && followedBySymbol(i, [']'])) {
                setError(i, format(locale.brace.square.cannotWrap, {
                  token: ":"
                }));
                break;
              }

              if (found) {
                setError(i, format(locale.invalidToken.sequence, {
                  firstToken: "[",
                  secondToken: ":"
                }));
                break;
              }

              if (typeFollowed(i) !== 'key') {
                setError(i, format(locale.invalidToken.whitelist, {
                  firstToken: ":",
                  secondToken: "key"
                }));
                break;
              }

              buffer2.isValue = true;
              buffer.json += string;
              break;

            case 'key':
            case 'string':
              var firstChar = string.charAt(0),
                  lastChar = string.charAt(string.length - 1),
                  quote_primary = quotes.indexOf(firstChar);
              if (quotes.indexOf(firstChar) === -1) if (quotes.indexOf(lastChar) !== -1) {
                setError(i, format(locale.string.missingOpen, {
                  quote: firstChar
                }));
                break;
              }
              if (quotes.indexOf(lastChar) === -1) if (quotes.indexOf(firstChar) !== -1) {
                setError(i, format(locale.string.missingClose, {
                  quote: firstChar
                }));
                break;
              }
              if (quotes.indexOf(firstChar) > -1) if (firstChar !== lastChar) {
                setError(i, format(locale.string.missingClose, {
                  quote: firstChar
                }));
                break;
              }
              if ('string' === type) if (quotes.indexOf(firstChar) === -1 && quotes.indexOf(lastChar) === -1) {
                setError(i, format(locale.string.mustBeWrappedByQuotes));
                break;
              }
              if ('key' === type) if (quotes.indexOf(firstChar) === -1 && quotes.indexOf(lastChar) === -1) for (var h = 0; h < string.length; h++) {
                if (error) break;
                var c = string.charAt(h);

                if (alphanumeric.indexOf(c) === -1) {
                  setError(i, format(locale.string.nonAlphanumeric, {
                    token: c
                  }));
                  break;
                }
              }
              if (firstChar === "'") string = '"' + string.slice(1, -1) + '"';else if (firstChar !== '"') string = '"' + string + '"';
              if ('key' === type) if ('key' === typeFollowed(i)) {
                if (i > 0) if (!isNaN(buffer.tokens_merge[i - 1])) {
                  buffer.tokens_merge[i - 1] += buffer.tokens_merge[i];
                  setError(i, format(locale.key.numberAndLetterMissingQuotes));
                  break;
                }
                setError(i, format(locale.key.spaceMissingQuotes));
                break;
              }
              if ('key' === type) if (!followsSymbol(i, ['{', ','])) {
                setError(i, format(locale.invalidToken.whitelist, {
                  firstToken: type,
                  secondToken: ["{", ","]
                }));
                break;
              }
              if ('string' === type) if (!followsSymbol(i, ['[', ':', ','])) {
                setError(i, format(locale.invalidToken.whitelist, {
                  firstToken: type,
                  secondToken: ["[", ":", ","]
                }));
                break;
              }
              if ('key' === type) if (buffer2.isValue) {
                setError(i, format(locale.string.unexpectedKey));
                break;
              }
              if ('string' === type) if (!buffer2.isValue) {
                setError(i, format(locale.key.unexpectedString));
                break;
              }
              buffer.json += string;
              break;

            case 'number':
            case 'primitive':
              if (followsSymbol(i, ['{'])) {
                buffer.tokens_merge[i].type = 'key';
                type = buffer.tokens_merge[i].type;
                string = '"' + string + '"';
                ;
              } else if (typeFollowed(i) === 'key') {
                buffer.tokens_merge[i].type = 'key';
                type = buffer.tokens_merge[i].type;
              } else if (!followsSymbol(i, ['[', ':', ','])) {
                setError(i, format(locale.invalidToken.whitelist, {
                  firstToken: type,
                  secondToken: ["[", ":", ","]
                }));
                break;
              }

              if (type !== 'key') if (!buffer2.isValue) {
                buffer.tokens_merge[i].type = 'key';
                type = buffer.tokens_merge[i].type;
                break;
              }
              if (type === 'primitive') if (string === 'undefined') setError(i, format(locale.invalidToken.useInstead, {
                badToken: "undefined",
                goodToken: "null"
              }));
              buffer.json += string;
              break;
          }
        }

        var noEscapedSingleQuote = '';

        for (var i = 0; i < buffer.json.length; i++) {
          var current = buffer.json.charAt(i),
              next = '';

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
          var removePair = function removePair(index) {
            bracketList.splice(index + 1, 1);
            bracketList.splice(index, 1);
            if (!delta) delta = true;
          };

          var maxIterations = Math.ceil(bracketList.length / 2);
          var round = 0,
              delta = false;

          while (bracketList.length > 0) {
            delta = false;

            for (var tokenCount = 0; tokenCount < bracketList.length - 1; tokenCount++) {
              var pair = bracketList[tokenCount].string + bracketList[tokenCount + 1].string;
              if (['[]', '{}'].indexOf(pair) > -1) removePair(tokenCount);
            }

            round++;
            if (!delta) break;
            if (round >= maxIterations) break;
          }

          if (bracketList.length > 0) {
            var _tokenString = bracketList[0].string,
                _tokenPosition = bracketList[0].i,
                _closingBracketType = _tokenString === '[' ? ']' : '}';

            line = bracketList[0].line;
            setError(_tokenPosition, format(locale.brace[_closingBracketType === ']' ? 'square' : 'curly'].missingClose));
          }
        }

        if (!error) if ([undefined, ''].indexOf(buffer.json) === -1) try {
          buffer.jsObject = JSON.parse(buffer.json);
        } catch (err) {
          var errorMessage = err.message,
              subsMark = errorMessage.indexOf('position');
          if (subsMark === -1) throw new Error('Error parsing failed');
          var errPositionStr = errorMessage.substring(subsMark + 9, errorMessage.length),
              errPosition = parseInt(errPositionStr);
          var charTotal = 0,
              tokenIndex = 0,
              _token2 = false,
              _line2 = 1,
              exitWhile = false;

          while (charTotal < errPosition && !exitWhile) {
            _token2 = buffer.tokens_merge[tokenIndex];
            if ('linebreak' === _token2.type) _line2++;
            if (['space', 'linebreak'].indexOf(_token2.type) === -1) charTotal += _token2.string.length;
            if (charTotal >= errPosition) break;
            tokenIndex++;
            if (!buffer.tokens_merge[tokenIndex + 1]) exitWhile = true;
          }

          line = _line2;
          setError(tokenIndex, format(locale.invalidToken.unexpected, {
            token: _token2.string
          }));
        }
        var _line = 1,
            _depth = 0;
        ;
        if (!error) for (var i = 0; i < buffer.tokens_merge.length; i++) {
          var _token3 = buffer.tokens_merge[i],
              _string2 = _token3.string,
              _type2 = _token3.type;

          switch (_type2) {
            case 'space':
            case 'linebreak':
              break;

            case 'string':
            case 'number':
            case 'primitive':
            case 'error':
              buffer.markup += (followsSymbol(i, [',', '[']) ? newLineBreakAndIndent() : '') + newSpan(i, _token3, _depth);
              break;

            case 'key':
              buffer.markup += newLineBreakAndIndent() + newSpan(i, _token3, _depth);
              break;

            case 'colon':
              buffer.markup += newSpan(i, _token3, _depth) + '&nbsp;';
              break;

            case 'symbol':
              switch (_string2) {
                case '[':
                case '{':
                  buffer.markup += (!followsSymbol(i, [':']) ? newLineBreakAndIndent() : '') + newSpan(i, _token3, _depth);
                  _depth++;
                  break;

                case ']':
                case '}':
                  _depth--;

                  var islastToken = i === buffer.tokens_merge.length - 1,
                      _adjustment = i > 0 ? ['[', '{'].indexOf(buffer.tokens_merge[i - 1].string) > -1 ? '' : newLineBreakAndIndent(islastToken) : '';

                  buffer.markup += _adjustment + newSpan(i, _token3, _depth);
                  break;

                case ',':
                  buffer.markup += newSpan(i, _token3, _depth);
                  break;
              }

              break;
          }
        }

        if (error) {
          var countCarrigeReturn = function countCarrigeReturn(string) {
            var count = 0;

            for (var i = 0; i < string.length; i++) {
              if (['\n', '\r'].indexOf(string[i]) > -1) count++;
            }

            return count;
          };

          var _line_fallback = 1;
          _line = 1;

          for (var i = 0; i < buffer.tokens_merge.length; i++) {
            var _token4 = buffer.tokens_merge[i],
                _type3 = _token4.type,
                _string3 = _token4.string;
            if (_type3 === 'linebreak') _line++;
            buffer.markup += newSpan(i, _token4, _depth);
            _line_fallback += countCarrigeReturn(_string3);
          }

          _line++;
          _line_fallback++;
          if (_line < _line_fallback) _line = _line_fallback;
        }

        buffer.tokens_merge.forEach(function (token) {
          buffer.indented += token.string;
        });

        if (error) {
          var isFunction = function isFunction(functionToCheck) {
            return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
          };

          if ('modifyErrorText' in this.props) if (isFunction(this.props.modifyErrorText)) error.reason = this.props.modifyErrorText(error.reason);
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

      ;
      /**
       *     JS OBJECTS || PLACEHOLDER
       */

      if (!('nodeType' in something)) {
        var escape_character = function escape_character() {
          if (_buffer.currentChar !== '\\') return false;
          _buffer.inputText = deleteCharAt(_buffer.inputText, _buffer.position);
          return true;
        };

        var deleteCharAt = function deleteCharAt(string, position) {
          return string.slice(0, position) + string.slice(position + 1);
        };

        var determine_string = function determine_string() {
          if ('\'"'.indexOf(_buffer.currentChar) === -1) return false;

          if (!_buffer.stringOpen) {
            add_tokenSecondary();
            _buffer.stringStart = _buffer.position;
            _buffer.stringOpen = _buffer.currentChar;
            return true;
          }

          if (_buffer.stringOpen === _buffer.currentChar) {
            add_tokenSecondary();

            var stringToken = _buffer.inputText.substring(_buffer.stringStart, _buffer.position + 1);

            add_tokenPrimary(stringToken);
            _buffer.stringOpen = false;
            return true;
          }

          return false;
        };

        var determine_value = function determine_value() {
          if (':,{}[]'.indexOf(_buffer.currentChar) === -1) return false;
          if (_buffer.stringOpen) return false;
          add_tokenSecondary();
          add_tokenPrimary(_buffer.currentChar);

          switch (_buffer.currentChar) {
            case ':':
              _buffer.isValue = true;
              return true;
              break;

            case '{':
            case '[':
              _buffer.brackets.push(_buffer.currentChar);

              break;

            case '}':
            case ']':
              _buffer.brackets.pop();

              break;
          }

          if (_buffer.currentChar !== ':') _buffer.isValue = _buffer.brackets[_buffer.brackets.length - 1] === '[';
          return true;
        };

        var add_tokenSecondary = function add_tokenSecondary() {
          if (_buffer.tokenSecondary.length === 0) return false;

          _buffer.tokens.push(_buffer.tokenSecondary);

          _buffer.tokenSecondary = '';
          return true;
        };

        var add_tokenPrimary = function add_tokenPrimary(value) {
          if (value.length === 0) return false;

          _buffer.tokens.push(value);

          return true;
        };

        var indent = function indent(number) {
          var space = [];

          for (var i = 0; i < number * 2; i++) {
            space.push(' ');
          }

          return (number > 0 ? '\n' : '') + space.join('');
        };

        var indentII = function indentII(number) {
          var space = [];
          if (number > 0) lines++;

          for (var i = 0; i < number * 2; i++) {
            space.push('&nbsp;');
          }

          return (number > 0 ? '<br>' : '') + space.join('');
        };

        var _buffer = {
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

        for (var i = 0; i < _buffer.inputText.length; i++) {
          _buffer.position = i;
          _buffer.currentChar = _buffer.inputText.charAt(_buffer.position);

          var a = determine_value(),
              b = determine_string(),
              _c = escape_character();

          if (!a && !b && !_c) if (!_buffer.stringOpen) _buffer.tokenSecondary += _buffer.currentChar;
        }

        var _buffer2 = {
          brackets: [],
          isValue: false,
          tokens: []
        };
        _buffer2.tokens = _buffer.tokens.map(function (token) {
          var type = '',
              string = '',
              value = '';

          switch (token) {
            case ',':
              type = 'symbol';
              string = token;
              value = token;
              _buffer2.isValue = _buffer2.brackets[_buffer2.brackets.length - 1] === '[';
              break;

            case ':':
              type = 'symbol';
              string = token;
              value = token;
              _buffer2.isValue = true;
              break;

            case '{':
            case '[':
              type = 'symbol';
              string = token;
              value = token;

              _buffer2.brackets.push(token);

              _buffer2.isValue = _buffer2.brackets[_buffer2.brackets.length - 1] === '[';
              break;

            case '}':
            case ']':
              type = 'symbol';
              string = token;
              value = token;

              _buffer2.brackets.pop();

              _buffer2.isValue = _buffer2.brackets[_buffer2.brackets.length - 1] === '[';
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

            default:
              var C = token.charAt(0);

              var stripQuotesFromKey = function stripQuotesFromKey(text) {
                if (text.length === 0) return text;
                if (['""', "''"].indexOf(text) > -1) return "''";
                var wrappedInQuotes = false;

                for (var i = 0; i < 2; i++) {
                  if ([text.charAt(0), text.charAt(text.length - 1)].indexOf(['"', "'"][i]) > -1) {
                    wrappedInQuotes = true;
                    break;
                  }
                }

                if (wrappedInQuotes && text.length >= 2) text = text.slice(1, -1);

                var nonAlphaNumeric = text.replace(/\w/g, ''),
                    alphaNumeric = text.replace(/\W+/g, ''),
                    mayRemoveQuotes = function (nonAlphaNumeric, text) {
                  var numberAndLetter = false;

                  for (var i = 0; i < text.length; i++) {
                    if (i === 0) if (isNaN(text.charAt(i))) break;

                    if (isNaN(text.charAt(i))) {
                      numberAndLetter = true;
                      break;
                    }
                  }

                  return !(nonAlphaNumeric.length > 0 || numberAndLetter);
                }(nonAlphaNumeric, text),
                    hasQuotes = function (string) {
                  for (var i = 0; i < string.length; i++) {
                    if (["'", '"'].indexOf(string.charAt(i)) > -1) return true;
                  }

                  return false;
                }(nonAlphaNumeric);

                if (hasQuotes) {
                  var newText = '';
                  text.split('').forEach(function (char) {
                    if (["'", '"'].indexOf(char) > -1) char = '\\' + char;
                    newText += char;
                  });
                  text = newText;
                }

                if (!mayRemoveQuotes) return "'" + text + "'";else return text;
              };

              if ('\'"'.indexOf(C) > -1) {
                if (_buffer2.isValue) type = 'string';else type = 'key';
                if (type === 'key') string = stripQuotesFromKey(token);

                if (type === 'string') {
                  string = '';
                  token.slice(1, -1).split('').forEach(function (char) {
                    if ('\'\"'.indexOf(char) > -1) char = '\\' + char;
                    string += char;
                  });
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

              if (token.length > 0) if (!_buffer2.isValue) {
                type = 'key';
                string = token;
                if (string.indexOf(' ') > -1) string = "'" + string + "'";
                value = string;
                break;
              }
          }

          return {
            type: type,
            string: string,
            value: value,
            depth: _buffer2.brackets.length
          };
        });
        var clean = '';

        _buffer2.tokens.forEach(function (token) {
          clean += token.string;
        });

        ;
        var indentation = '';

        _buffer2.tokens.forEach(function (token, i) {
          switch (token.string) {
            case '[':
            case '{':
              var _nextToken2 = i < _buffer2.tokens.length - 1 - 1 ? _buffer2.tokens[i + 1] : '';

              if ('}]'.indexOf(_nextToken2.string) === -1) indentation += token.string + indent(token.depth);else indentation += token.string;
              break;

            case ']':
            case '}':
              var prevToken = i > 0 ? _buffer2.tokens[i - 1] : '';
              if ('[{'.indexOf(prevToken.string) === -1) indentation += indent(token.depth) + token.string;else indentation += token.string;
              break;

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
        });

        var lines = 1;
        ;
        var markup = '';
        var lastIndex = _buffer2.tokens.length - 1;

        _buffer2.tokens.forEach(function (token, i) {
          var span = newSpan(i, token, token.depth);

          switch (token.string) {
            case '{':
            case '[':
              var _nextToken3 = i < _buffer2.tokens.length - 1 - 1 ? _buffer2.tokens[i + 1] : '';

              if ('}]'.indexOf(_nextToken3.string) === -1) markup += span + indentII(token.depth);else markup += span;
              break;

            case '}':
            case ']':
              var prevToken = i > 0 ? _buffer2.tokens[i - 1] : '';
              if ('[{'.indexOf(prevToken.string) === -1) markup += indentII(token.depth) + (lastIndex === i ? '<br>' : '') + span;else markup += span;
              break;

            case ':':
              markup += span + ' ';
              break;

            case ',':
              markup += span + indentII(token.depth);
              break;

            default:
              markup += span;
              break;
          }
        });

        lines += 2;
        return {
          tokens: _buffer2.tokens,
          noSpaces: clean,
          indented: indentation,
          json: JSON.stringify(something),
          jsObject: something,
          markup: markup,
          lines: lines
        };
      }
    }
  }]);

  return JSONInput;
}(Component);

export default JSONInput;
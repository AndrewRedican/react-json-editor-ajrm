"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.format = void 0;

var _keys = _interopRequireDefault(require("@babel/runtime/core-js/object/keys"));

// Allows us to pass arrays and numbers instead of just strings to the format function.
var stringify = function stringify(arg) {
  return Array.isArray(arg) ? arg.join(", ") : typeof arg === "string" ? arg : "" + arg;
}; // Replaces a string with the values of an object. Google "format unicorn" on an explanation of how to use.


var format = function format(str, args) {
  return args ? (0, _keys.default)(args).reduce(function (str, arg) {
    return str.replace(new RegExp("\\{".concat(arg, "\\}"), 'gi'), stringify(args[arg]));
  }, str) : str;
};

exports.format = format;
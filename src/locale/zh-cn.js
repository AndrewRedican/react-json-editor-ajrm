export default {
  format: "{reason} 位于第 {line} 行",
  symbols: {
    colon: "冒号",            // :
    comma: "逗号",            // ,  ،  、
    semicolon: "分号",        // ;
    slash: "反斜杠",          // /  relevant for comment syntax support
    backslash: "正斜杠",      // \  relevant for escaping character
    brackets: {
      round: "圆括号",   	  // ( )
      square: "方括号", 	    // [ ]
      curly: "大括号",   	  // { }
      angle: "尖括号"    	  // < >
    },
    period: "句号",           // . Also known as full point, full stop, or dot
    quotes: {
      single: "单引号", 	// '
      double: "双引号", 	// "
      grave: "反引号"   	// ` used on Javascript ES6 Syntax for String Templates
    },
    space: "空格",           //       
    ampersand: "符号&",      //	&
    asterisk: "符号*",       //	*  relevant for some comment sytanx
    at: "符号@",             //	@  multiple uses in other coding languages including certain data types
    equals: "符号=",         //	=
    hash: "符号#",           //	#
    percent: "百分号",       //	% 
    plus: "加号",            //	+
    minus: "减号",           //	−
    dash: "破折号",          //	−
    hyphen: "连字符",        //	−
    tilde: "波浪号",         //	~
    underscore: "下划线", 	  //	_
    bar: "竖线",      		   //	|
  },
  types: {
      key: "key",
      value: "value",
      number: "number",
      string: "string",
      primitive: "primitive",
      boolean: "boolean",
      character: "character",
      integer: "integer",
      array: "array",
      float: "float"
    //... Reference: https://en.wikipedia.org/wiki/List_of_data_structures
  },
  invalidToken: {
    tokenSequence: {
      prohibited: "'{firstToken}' 不能位于 '{secondToken}'之后",
      permitted: "'{firstToken}' 只能位于 '{secondToken}'之后"
    },
    termSequence: {
      prohibited: " {firstTerm} 不能位于{secondTerm} 之后",
      permitted: " {firstTerm} 只能位于{secondTerm} 之后"
    },
    double: "'{token}' 不能位于另一个 '{token}' 之后",
    useInstead: "'{badToken}' 不被接受. 使用 '{goodToken}' 替代",
    unexpected: "出乎意料的 '{token}' "
  },
  brace: {
    curly: {
      missingOpen: "无法找到 '{' ",
      missingClose: "无法找到 '}' ",
      cannotWrap: "'{token}' 无法被包含在 '{}' 中"
    },
    square: { 
      missingOpen: "无法找到 '[' ", 
      missingClose: "无法找到 ']' ",
      cannotWrap: "'{token}' 无法被包含在 '[]' 中"
    }
  },
  string: {
    missingOpen: "无法找到/无效的 前缀 '{quote}' ",
    missingClose: "无法找到/无效的 后缀 '{quote}' ",
    mustBeWrappedByQuotes: "字符串必须用引号括起来",
    nonAlphanumeric: "非数字字符 '{token}' 无法使用外部字符串表示法",
    unexpectedKey: "在字符串位置找到意外键"
  },
  key: {
    numberAndLetterMissingQuotes: "用数字和字母包含的开头必须用引号括起来.",
    spaceMissingQuotes: "包含关键字的空间必须用引号括起来.",
    unexpectedString: "在关键位置发现意外字符串."
  },
  noTrailingOrLeadingComma: "不允许在数组和对象中拖尾或引导逗号."
};

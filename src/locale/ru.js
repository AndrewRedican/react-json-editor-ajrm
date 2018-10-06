export default {
  format: "{reason} на строке {line}",
  symbols: {
    colon: "двоеточие",           // :
    comma: "запятая",           // ,  ،  、
    semicolon: "точка с запятой",   // ;
    slash: "косая черта",           // /  relevant for comment syntax support
    backslash: "обратная косая черта",   // \  relevant for escaping character
    brackets: {
      round: "круглые скобки",   // ( )
      square: "квадратные скобки", // [ ]
      curly: "фигурные скобки",   // { }
      angle: "угловые скобки"    // < >
    },
    period: "точка",            // . Also known as full point, full stop, or dot
    quotes: {
      single: "одинарная кавычка", // '
      double: "двойная кавычка", // "
      grave: "косая кавычка"   // ` used on Javascript ES6 Syntax for String Templates
    },
    space: "пробел",           //       
    ampersand: "амперсанд",   //	&
    asterisk: "астериск",     //	*  relevant for some comment sytanx
    at: "коммерческое at ",            //	@  multiple uses in other coding languages including certain data types
    equals: "знак равенства",    //	=
    hash: "октоторп",             //	#
    percent: "процент",       //	%
    plus: "плюс",             //	+
    minus: "минус",           //	−
    dash: "тире",             //	−
    hyphen: "дефис",         //	−
    tilde: "тильда",           //	~
    underscore: "нижнее подчеркивание", //	_
    bar: "вертикальная черта",      //	|
  },
  types: {
      key: "ключ",
      value: "значение",
      number: "число",
      string: "строка",
      primitive: "примитивный",
      boolean: "логический",
      character: "знак",
      integer: "целое число",
      array: "массив",
      float: "число с плавающей точкой"
    //... Reference: https://en.wikipedia.org/wiki/List_of_data_structures
  },
  invalidToken: {
    tokenSequence: {
      prohibited: "'{firstToken}' знак не может следовать за '{secondToken}' знаком(-ами)",
      permitted: "'{firstToken}' знак может следовать только за '{secondToken}' знаком(-ами)"
    },
    termSequence: {
      prohibited: "{firstTerm} не может следовать за {secondTerm}",
      permitted: "{firstTerm} может следовать только за {secondTerm}"
    },
    double: "'{token}' знак не может следовать за другим '{token}' знаком",
    useInstead: "'{badToken}' знак не разрешен. Используйте '{goodToken}'",
    unexpected: "Неожиданный '{token}' знак"
  },
  brace: {
    curly: {
      missingOpen: "Пропущена '{' открывающая фигурная скобка",
      missingClose: "Открывающая '{' фигурная скобка не имеет закрывающей '}' фигурной скобки",
      cannotWrap: "'{token}' не может быть обернут в '{}' фигурные скобки"
    },
    square: {
      missingOpen: "Пропущена '[' открывающая квадратная скобка",
      missingClose: "Открыавающая '[' квадратная скобка не имеет закрывающей ']' квадратной скобки",
      cannotWrap: "'{token}' не может быть обернут в '[]' квадратные скобки"
    }
  },
  string: {
    missingOpen: "Пропущенный/недопустимый '{quote}' знак начала строки",
    missingClose: "Недостающий/недопустимый '{quote}' знак закрытия строки",
    mustBeWrappedByQuotes: "Строки должны быть обернуты в кавычки",
    nonAlphanumeric: "Не буквенно-численный знак '{token}' не разрешен вне строки",
    unexpectedKey: "В качестве строки найден неожиданный ключ"
  },
  key: {
    numberAndLetterMissingQuotes: "Ключ, начинающийся с цифры и содержащий буквы, должен быть обернут в кавычки",
    spaceMissingQuotes: "Ключ, содержащий пробел, должен быть обернут в кавычки",
    unexpectedString: "В качестве ключа найдена неожиданная строка"
  },
  noTrailingOrLeadingComma: "Начальные или конечные запятые в массивах и объектах не разрешены"
};

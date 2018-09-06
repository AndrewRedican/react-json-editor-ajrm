export default {
  format: "{reason} en la línea {line}",
  symbols: {
    colon: "dos puntos",
    comma: "coma",
    semicolon: "punto y coma",
    slash: "barra oblicua",
    backslash: "barra invertida",
    brackets: {
      round: "paréntesis",
      square: "corchetes",
      curly: "llaves",
      angle: "paréntesis angulares"
    },
    period: "punto",
    quotes: {
      single: "comillas simples",
      double: "comillas dobles",
      grave: "acento grave"
    },
    space: "espacio",   
    ampersand: "et",
    asterisk: "asterisco",
    at: "arroba",
    equals: "signo igual",
    hash: "almohadilla",
    percent: "porcentaje",
    plus: "signo más",
    minus: "signo menos",
    dash: "raya",
    hyphen: "guion",
    tilde: "tilde",
    underscore: "guion bajo",
    bar: "pleca",
  },
  types: {
      key: "llave",
      value: "valor",
      number: "número",
      string: "cedena",
      primitive: "dato primitivo",
      boolean: "booleano",
      character: "carácter",
      integer: "número entero",
      array: "colección",
      float: "número flotante"
  },
  invalidToken: {
    tokenSequence: {
      prohibited: "La ficha '{firstToken}' no puede ser seguida por fichas '{secondToken}'",
      permitted: "'La ficha {firstToken}' solo puede ser seguida por fichas '{secondToken}'"
    },
    termSequence: {
      prohibited: "A {firstTerm} cannot be followed by a {secondTerm}",
      permitted: "A {firstTerm} can only be followed by a {secondTerm}"
    },
    double: "'La ficha {token}' no puede ser seguida por otra ficha '{token}'",
    useInstead: "La ficha '{badToken}' no se permite. Utiliza '{goodToken}' en su lugar",
    unexpected: "Ficha inesperada '{token}'"
  },
  brace: {
    curly: {
      missingOpen: "Falta llave de apertura '{'",
      missingClose: "Llave de apertura '{' carece de una llave de cierre '}'",
      cannotWrap: "La ficha '{token}' no puede ser envuelta por llaves '{}'"
    },
    square: { 
      missingOpen: "Falta corchete de apertura '['", 
      missingClose: "Corchete de apertura '[' carece de un corchete de cierre ']'",
      cannotWrap: "La ficha '{token}' no puede ser envuelta por corchetes '[]'"
    }
  },
  string: {
    missingOpen: "Faltan comillas de apertura para valor string, o carácter invalido '{quote}'",
    missingClose: "Faltan comillas de cierre para valor string, o carácter invalido '{quote}'",
    mustBeWrappedByQuotes: "Strings deben estar entre comillas",
    nonAlphanumeric: "Ficha no-alphanemerica '{token}' no esta permitida fuera de un string",
    unexpectedKey: "Ficha inesperada en la posición de un valor string"
  },
  key: {
    numberAndLetterMissingQuotes: "Los nombres de propiedad que comienzan con números y contienen letras deben estar entre comillas",
    spaceMissingQuotes: "Los nombres de propiedad que contienen espacios deben estar entre comillas",
    unexpectedString: "Ficha inesperada de tipo string en la posicion de un nombre de propiedad"
  },
  noTrailingOrLeadingComma: "No se permiten comas contiguas dentro de listas u objetos"
};
export default {
  format: "{reason} en la línea {line}",
  invalidToken: {
    sequence: "La ficha '{firstToken}' no puede ser seguida por la ficha '{secondToken}'",
    double: "'La ficha {token}' no puede ser seguida por otra ficha '{token}'",
    whitelist: "La ficha '{firstToken}' solamente puede seguir las fichas '{secondToken}'",
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
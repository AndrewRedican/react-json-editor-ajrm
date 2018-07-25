module.exports = {
  format: "{reason} en la linea {line}",
  invalidToken: {
    sequence: "La ficha '{firstToken}' no puede ser seguida por la ficha '{secondToken}'",
    double: "'La ficha {token}' no puede ser seguida por otra ficha '{token}'",
    whitelist: "La ficha '{firstToken}' solamente puede seguir las fichas '{secondToken}'",
    useInstead: "La ficha '{badToken}' no se permite. Utilza '{goodToken}' en su lugar",
    unexpected: "Ficha inesperada '{token}'"
  },
  brace: {
    missingOpenCurly: "Llave '{' faltante",
    missingOpenSquare: "Corchete '[' faltante",
    missingClose: "Ficha de apertura '{open}' le hace falta una ficha de cierre '{close}'",
    cannotWrap: "La ficha '{token}' no puede puede ser envuelta por '{brace}' braces" // Need to differentiate {brace} case, cannot translate "'{brace}' braces" directly
  },
  string: {
    missingOpen: "Faltan comillas iniciales en ficha de tipo string '{quote}' quote", // Need to differentiate {quote} case, cannot translate "'{quote}' quote" directly
    missingClose: "Faltan comillas finales en ficha de tipo string '{quote}' quote",  // Need to differentiate {quote} case, cannot translate "'{quote}' quote" directly
    mustBeWrappedByQuotes: "Strings deben ser envueltas por comillas",
    nonAlphanumeric: "Ficha no-alphanemerica '{token}' no esta permitida fuera de un string",
    unexpectedKey: "Ficha inesperada en la posicion de un string"
  },
  key: {
    numberAndLetterMissingQuotes: "Nombres de propiedades que comienzan con numeros y contenienen letras deben ser envueltas por comillas",
    spaceMissingQuotes: "Nombres de propiedades que conteinen espacios deben ser envueltas por comillas",
    unexpectedString: "Ficha tipo string inesperada en la posicion de un nombre de propiedad"
  },
  noTrailingOrLeadingComma: "No se permiten comas contiguas dentro de listas u objetos"
};

/**
 * Legend - TO DO:
 * 
 * {curly} braces/brackets = {llaves}
 * {} braces/brackets      = corchetes
 * {single} quotes         = comillas {simples}
 * {double} quotes         = comillas {inglesas} 
 */
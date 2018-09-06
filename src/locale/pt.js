export default {
  format: "{reason} na linha {line}",
  //Requires Translation - Delete Me After This is Done
  symbols: {
    colon: "colon",
    comma: "comma",
    semicolon: "semicolon",
    slash: "slash",
    backslash: "backslash",
    brackets: {
      round: "round brackets",
      square: "square brackets",
      curly: "curly brackets",
      angle: "angle brackets"
    },
    period: "period",
    quotes: {
      single: "single quote",
      double: "double quote",
      grave: "grave accent"
    },
    space: "space",   
    ampersand: "ampersand",
    asterisk: "asterisk",
    at: "at sign",
    equals: "equals sign",
    hash: "hash",
    percent: "percent",
    plus: "plus",
    minus: "minus",
    dash: "dash",
    hyphen: "hyphen",
    tilde: "tilde",
    underscore: "underscore",
    bar: "vertical bar",
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
  },
  // ^------ End of Section. Delete Me After Translation is Complete
  invalidToken: {
    //Requires Translation - Delete Me After This is Done
    sequence: {
      prohibited: "'{firstToken}' token cannot be followed by '{secondToken}' token(s)",
      permitted: "'{firstToken}' token can only be followed by '{secondToken}' token(s)"
    },
    typesSequence: {
      prohibited: "A {firstType} cannot be followed by a {secondType}.",
      permitted: "A {firstType} can only be followed by a {secondType}."
    },
    // ^------ End of Section. Delete Me After Translation is Complete
    double: "O token '{token}' não pode ser seguido por outro token '{token}'",
    useInstead: "O token '{badToken}' não é permitido. Use o token '{goodToken}' em seu lugar",
    unexpected: "O token '{token}' não foi encontrado"
  },
  brace: {
    curly: {
      missingOpen: "Falta a chave de abrir '{'",
      missingClose: "A chave de abrir '{' não contém a chave de fechar '}'",
      cannotWrap: "O token '{token}' não pode estar dentro de '{}' chaves"
    },
    square: { 
      missingOpen: "Falta o colchete de abrir '['", 
      missingClose: "O colchete de abrir '[' não contém o colchete de fechar ']'",
      cannotWrap: "O token '{token}' não pode estar dentro de '[]' colchetes"
    }
  },
  string: {
    missingOpen: "Citação de abertura ausente/inválida na string' {quote}'",
    missingClose: "Citação de fechar ausente/inválida na string' {quote}'",
    mustBeWrappedByQuotes: "Strings devem estar entre citações",
    nonAlphanumeric: "O token não-alfanumerico '{token}' não é permitido fora de uma string",
    unexpectedKey: "Chave inesperada encontrada na posição de um valor de string"
  },
  key: {
    numberAndLetterMissingQuotes: "A chave que começa com o número e contém letras deve estar entre citações",
    spaceMissingQuotes: "A chave contendo espaço deve estar entre citações",
    unexpectedString: "String inesperada encontrada na posição de uma chave"
  },
  noTrailingOrLeadingComma: "Vírgulas adjacentes não são permitidas em listas ou objetos"
};
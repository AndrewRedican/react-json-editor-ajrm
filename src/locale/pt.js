export default {
  format: "{reason} na linha {line}",
  //Requires Translation - Delete Me After This is Done
  symbols: {
    colon: "dois-pontos",
    comma: "vírgula",
    semicolon: "ponto e vírgula",
    slash: "barra",
    backslash: "barra inversa",
    brackets: {
      round: "parênteses",
      square: "colchetes",
      curly: "chaves",
      angle: "colchetes angulares"
    },
    period: "ponto",
    quotes: {
      single: "single quote",
      double: "double quote",
      grave: "grave accent"
    },
    space: "espaço",   
    ampersand: "ampersand",
    asterisk: "asterisco",
    at: "arroba",
    equals: "sinal de igual",
    hash: "cerquilha",
    percent: "porcentagem",
    plus: "sinal de mais",
    minus: "sinal de menos",
    dash: "meia-risca",
    hyphen: "hífen",
    tilde: "til",
    underscore: "traço inferior",
    bar: "barra vertical",
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
    tokenSequence: {
      prohibited: "'{firstToken}' token cannot be followed by '{secondToken}' token(s)",
      permitted: "'{firstToken}' token can only be followed by '{secondToken}' token(s)"
    },
    termSequence: {
      prohibited: "A {firstTerm} cannot be followed by a {secondTerm}",
      permitted: "A {firstTerm} can only be followed by a {secondTerm}"
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
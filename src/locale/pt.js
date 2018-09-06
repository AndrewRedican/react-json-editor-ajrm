export default {
  format: "{reason} na linha {line}",
  symbols: {
    colon: "dois pontos",
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
      single: "aspas simples",
      double: "aspas duplas",
      grave: "acento agudo"
    },
    space: "espaço",   
    ampersand: "e comercial",
    asterisk: "asterisco",
    at: "arroba",
    equals: "sinal de igual",
    hash: "jogo da velha",
    percent: "porcentagem",
    plus: "sinal de mais",
    minus: "sinal de menos",
    dash: "traço",
    hyphen: "hífen",
    tilde: "acento til",
    underscore: "travessão",
    bar: "barra vertical",
  },
  types: {
      key: "chave",
      value: "valor",
      number: "número",
      string: "sequência de caracteres",
      primitive: "primitivo",
      boolean: "booleano",
      character: "caracter",
      integer: "inteiro",
      array: "vetor",
      float: "decimal"
  },
  invalidToken: {
    tokenSequence: {
      prohibited: "O token '{firstToken}' não pode ser seguido do token '{secondToken}'",
      permitted: "O token '{firstToken}' apenas pode ser seguido pelo token '{secondToken}'"
    },
    termSequence: {
      prohibited: "O termo '{firstTerm}' não pode ser seguido do termo '{secondTerm}'",
      permitted: "O termo '{firstTerm}' apenas pode ser seguido pelo termo '{secondTerm}'"
    },
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
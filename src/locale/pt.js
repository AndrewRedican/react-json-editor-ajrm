export default {
  format: "{reason} na linha {line}",
  invalidToken: {
    sequence: "O token '{firstToken}' não pode ser seguido por um token '{secondToken}'",
    double: "O token '{token}' não pode ser seguido por outro token '{token}'",
    whitelist: "O token '{firstToken}' apenas pode seguir o token '{secondToken}'",
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
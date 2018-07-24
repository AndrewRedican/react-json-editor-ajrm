module.exports = {
  format: "{reason} at line {line}",
  invalidToken: {
    sequence: "'{firstToken}' token cannot be followed by a '{secondToken}' token",
    double: "'{token}' token cannot be followed by another '{token}' token",
    whitelist: "'{firstToken}' token can only follow '{secondToken}' token",
    useInstead: "'{badToken}' token is not accepted. Use '{goodToken}' instead",
    unexpected: "Unexpected '{token}' token found"
  },
  brace: {
    missingOpenCurly: "Missing '{' open curly brace",
    missingOpenSquare: "Missing '[' open brace",
    missingClose: "Open '{open}' brace is missing closing '{close}' brace",
    cannotWrap: "'{token}' token cannot be wrapped in '{brace}' braces"
  },
  string: {
    missingOpen: "Missing opening string '{quote}' quote",
    missingClose: "Missing closing string '{quote}' quote",
    mustBeWrappedByQuotes: "Strings must be wrapped by quotes",
    nonAlphanumeric: "Non-alphanemeric token '{token}' is not allowed outside string notation",
    unexpectedKey: "Unexpected key found at string position"
  },
  key: {
    numberAndLetterMissingQuotes: "Key beginning with number and containing letters must be wrapped by quotes",
    spaceMissingQuotes: "Key containing space must be wrapped by quotes",
    unexpectedString: "Unexpected string found at key position"
  },
  noTrailingOrLeadingComma: "Trailing or leading commas in arrays and objects are not permitted"
};
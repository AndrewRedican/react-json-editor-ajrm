export default {
  format: "{reason} à la ligne {line}",
  symbols: {
    colon: "deux points",
    comma: "virgule",
    semicolon: "point-virgule",
    slash: "barre oblique",
    backslash: "barra oblique inversée",
    brackets: {
      round: "parenthèses",
      square: "crochets",
      curly: "accolades",
      angle: "chevrons"
    },
    period: "point",
    quotes: {
      single: "guillemets simples",
      double: "guillemets doubles",
      grave: "accent grave"
    },
    space: "espace",   
    ampersand: "esperluette",
    asterisk: "astérisque",
    at: "arobase",
    equals: "signe égal",
    hash: "croisillon",
    percent: "pourcentage",
    plus: "signe plus",
    minus: "signe moins",
    dash: "tiret",
    hyphen: "trait d'union",
    tilde: "tilde",
    underscore: "tiret bas",
    bar: "barre verticale",
  },
  types: {
      key: "clé",
      value: "valeur",
      number: "nombre",
      string: "chaine de caractères",
      primitive: "donnée primitive",
      boolean: "booléen",
      character: "caractère",
      integer: "entier",
      array: "collection",
      float: "nombre flottant"
  },
  invalidToken: {
    tokenSequence: {
      prohibited: " Le signe '{firstToken}' ne peut être suivi par le(s) signe(s) '{secondToken}'",
      permitted: "Le signe '{firstToken}' peut seulement être suivi du(des) signe(s) '{secondToken}'"
    },
    termSequence: {
      prohibited: "Un {firstTerm} ne peut pas être suivi d'un {secondTerm}",
      permitted: "Un {firstTerm} peut seulement être suivi d'un {secondTerm}"
    },
    double: "Le signe '{token}' ne peut être suivi par un autre signe '{token}'",
    useInstead: "Le signe '{badToken}' n'est pas accepté. Utilisez '{goodToken}' à la place", // Using polite "you" (Utilisez/Use)
    unexpected: "Signe '{token}' inattendu trouvé"
  },
  brace: {
    curly: {
      missingOpen: "Accolade ouvrante '{' manquante",
      missingClose: "Accolade fermante '}' manquant à une accolade ouvrante '{'",
      cannotWrap: "Le signe '{token}' ne peut être entouré par des '{}' accolades"
    },
    square: {
      missingOpen: "Crochets ouvrants '[' manquants",
      missingClose: "Crochets fermants ']' manquant à des crochets ouvrants '['",
      cannotWrap: "Le signe '{token}' ne peut être entouré par des '[]' crochets"
    }
  },
  string: {
    missingOpen: "Signe ouvrant la chaine de caractères '{quote}' manquant/invalide",
    missingClose: "Signe fermant la chaine de caractères '{quote}' manquant/invalide",
    mustBeWrappedByQuotes: "Les chaine de caractères doivent être entourées par des guillemets",
    nonAlphanumeric: "Le signe non-alphanumerique '{token}' n'est pas autorisé en dehors des chaines de caractères",
    unexpectedKey: "Clé inattendue trouvée à la place d'une chaine de caractère"
  },
  key: {
    numberAndLetterMissingQuotes: "Les clés commençant avec un nombre et contenant des lettres doivent être entourées par des guillemets",
    spaceMissingQuotes: "Les clés contenant des espaces doivent être entourées par des guillemets",
    unexpectedString: "Chaine de caractère inattendue trouvée à la place d'une clé"
  },
  noTrailingOrLeadingComma: "Les virgules initiales ou finales ne sont pas autorisées dans les collections et objets"
};

export default {
  format: "{reason} in Zeile {line}",
  symbols: {
    colon: "Doppelpunkt",
    comma: "Komma",
    semicolon: "Semikolon",
    slash: "Schrägstrich",
    backslash: "Backslash",
    brackets: {
      round: "runde Klammern",
      square: "eckige Klammern",
      curly: "geschweifte Klammern",
      angle: "spitze Klammern"
    },
    period: "Punkt",
    quotes: {
      single: "einfache Anführungszeichen",
      double: "doppelte Anführungszeichen",
      grave: "Gravis-Akzente"
    },
    space: "Leerzeichen",   
    ampersand: "Et-Zeichen",
    asterisk: "Sternchen",
    at: "At-Zeichen",
    equals: "Gleichheitszeichen",
    hash: "Doppelkreuz",
    percent: "Prozentzeichen",
    plus: "Pluszeichen",
    minus: "Minuszeichen",
    dash: "Halbgeviertstrich",
    hyphen: "Viertelgeviertstrich",
    tilde: "Tilde",
    underscore: "Unterstrich",
    bar: "senkrechter Strich",
  },
  types: {
      key: "Zeichenerklärung",
      value: "Wert",
      number: "Zahl",
      string: "Zeichenkette",
      primitive: "primitiver Wert",
      boolean: "boolescher Wert",
      character: "Schriftzeichen",
      integer: "ganze Zahl",
      array: "Feld",  // <- This translation is the Java term, there is probably a better translation
      float: "Kommazahl"
  },
  invalidToken: {
    tokenSequence: {
      prohibited: "'{firstToken}' Zeichen kann nicht von '{secondToken}' Zeichen gefolgt werden",
      permitted: "'{firstToken}' Zeichen kann nur von '{secondToken}' Zeichen gefolgt werden"
    },
    termSequence: {
      prohibited: "'{firstTerm}' kann nicht nicht von '{secondTerm}' gefolgt werden",
      permitted: "'{firstTerm}' kann nur von '{secondTerm}' gefolgt werden"
    },
    double: "'{token}' Zeichen kann nicht von einem weiteren '{token}' Zeichen gefolgt werden",
    useInstead: "'{badToken}' Zeichen ist nicht akzeptiert. '{goodToken}' ist stattdessen zu verwenden",
    unexpected: "Unerwartetes '{token}' Zeichen gefunden"
  },
  brace: {
    curly: {
      missingOpen: "Fehlende '{' geöffnete geschweifte Klammer",
      missingClose: "Geöffneter '{' geschweifte Klammer fehlt schließende '}' geschweifte Klammer",
      cannotWrap: "'{token}' Zeichen kann nicht von '{}' geschweiften Klammern umschlossen werden"
    },
    square: { 
      missingOpen: "Fehlende '[' geöffnete eckige Klammer", 
      missingClose: "Geöffneter '[' eckige Klammer fehlt schließende ']' eckige Klammer",
      cannotWrap: "'{token}' Zeichen kann nicht von '[]' eckigen Klammern umschlossen werden"
    }
  },
  string: {
    missingOpen: "Fehlendes/Ungültiges '{quote}' Zeichen um Zeichenkette zu starten",
    missingClose: "Fehlendes/Ungültiges '{quote}' Zeichen um Zeichenkette zu schließen",
    mustBeWrappedByQuotes: "Zeichenketten müssen von Anführungszeichen umschlossen sein",
    nonAlphanumeric: "Nicht-Alphanumerische Zeichen '{token}' sind nicht außerhalb der Zeichenketten-Notation erlaubt",
    unexpectedKey: "Unerwarteter Schlüssel in Zeichenkette gefunden"
  },
  key: {
    numberAndLetterMissingQuotes: "Schlüssel welche mit Zahlen anfangen und andere Alphanumerische Zeichen beinhalten müssen von Anführungszeichen umschlossen sein",
    spaceMissingQuotes: "Schlüssel mit Leerzeichen müssen von Anführungszeichen umschlossen sein",
    unexpectedString: "Unerwartete Zeichenkette in Schlüssel gefunden"
  },
  noTrailingOrLeadingComma: "Anführende oder Anschließende Kommas sind in Arrays und Objekten nicht erlaubt"
};
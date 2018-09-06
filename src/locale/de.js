export default {
  format: "{reason} in Zeile {line}",
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
    tokenSequence: {
      prohibited: "'{firstToken}' token cannot be followed by '{secondToken}' token(s)",
      permitted: "'{firstToken}' token can only be followed by '{secondToken}' token(s)"
    },
    typesSequence: {
      prohibited: "A {firstType} cannot be followed by a {secondType}.",
      permitted: "A {firstType} can only be followed by a {secondType}."
    },
    // ^------ End of Section. Delete Me After Translation
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
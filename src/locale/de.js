export default {
  format: "{reason} in Zeile {line}",
  invalidToken: {
    sequence: "'{firstToken}' Zeichen kann nicht von einem '{secondToken}' Zeichen gefolgt werden",
    double: "'{token}' Zeichen kann nicht von einem weiteren '{token}' Zeichen gefolgt werden",
    whitelist: "'{firstToken}' Zeichen kann nur '{secondToken}' Zeichen folgen",
    useInstead: "'{badToken}' Zeichen ist nicht akzeptiert. '{goodToken}' ist stattdessen zu verwenden",
    unexpected: "Unerwartetes '{token}' Zeichen gefunden"
  },
  brace: {
    missingOpenCurly: "Fehlende '{' geöffnete geschweifte Klammer",
    missingOpenSquare: "Fehlende '[' geöffnete eckige Klammer",
    missingClose: "Geöffneter '{open}' Klammer fehlt schließende '{close}' Klammer",
    cannotWrap: "'{token}' Zeichen kann nicht von '{brace}' Klammern umschlossen werden"
  },
  string: {
    missingOpen: "Fehlende '{quote}' Anführungszeichen um String zu starten",
    missingClose: "Fehlende '{quote}' Anführungszeichen um String zu schließen",
    mustBeWrappedByQuotes: "Strings müssen von Anführungszeichen umschlossen sein",
    nonAlphanumeric: "Nicht-Alphanumerische Zeichen '{token}' sind nicht außerhalb der String Notation erlaubt",
    unexpectedKey: "Unerwarteter Key in String gefunden"
  },
  key: {
    numberAndLetterMissingQuotes: "Keys welche mit Zahlen anfangen und andere Alphanumerische Zeichen beinhalten müssen von Anführungszeichen umschlossen sein",
    spaceMissingQuotes: "Keys mit Leerzeichen müssen von Anführungszeichen umschlossen sein",
    unexpectedString: "Unerwarteter String in Key gefunden"
  },
  noTrailingOrLeadingComma: "Anführende oder Anschließende Kommas sind in Arrays und Objekten nicht erlaubt"
};
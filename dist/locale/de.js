module.exports = {
  format: "{reason} in Zeile {line}",
  invalidToken: {
    sequence: "'{firstToken}' Zeichen kann nicht von einem '{secondToken}' Zeichen gefolgt werden",
    double: "'{token}' Zeichen kann nicht von einem weiteren '{token}' Zeichen gefolgt werden",
    whitelist: "'{firstToken}' Zeichen kann nur '{secondToken}' Zeichen folgen",
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
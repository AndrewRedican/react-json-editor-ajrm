export default {
  format: "{reason} pada baris {line}",
  symbols: {
    colon: "kolon",           // :
    comma: "koma",           // ,  ،  、
    semicolon: "titik dua",   // ;
    slash: "garis miring",           // /  relevant for comment syntax support
    backslash: "garis miring terbalik",   // \  relevant for escaping character
    brackets: {
      round: "kurung buka",   // ( )
      square: "kurung besar", // [ ]
      curly: "kurung keriting",   // { }
      angle: "kurung sudut"    // < >
    },
    period: "titik",            // . Also known as full point, full stop, or dot
    quotes: {
      single: "tanda kutip tunggal", // '
      double: "tanda kutip ganda", // "
      grave: "tanda kutip satu"   // ` used on Javascript ES6 Syntax for String Templates
    },
    space: "spasi",           //       
    ampersand: "dan",   //	&
    asterisk: "asterisk",     //	*  relevant for some comment sytanx
    at: "at sign",            //	@  multiple uses in other coding languages including certain data types
    equals: "sama dengan",    //	=
    hash: "pagar",             //	#
    percent: "persen",       //	%
    plus: "tambah",             //	+
    minus: "kurang",           //	−
    dash: "hubung",             //	−
    hyphen: "pisah",         //	−
    tilde: "tilde",           //	~
    underscore: "garis miring", //	_
    bar: "garis vertikal",      //	|
  },
  types: {
    key: "key",
    value: "value",
    number: "angka",
    string: "string",
    primitive: "primitif",
    boolean: "boolean",
    character: "karakter",
    integer: "integer",
    array: "array",
    float: "float"
    //... Reference: https://en.wikipedia.org/wiki/List_of_data_structures
  },
  invalidToken: {
    tokenSequence: {
      prohibited: "'Token {firstToken}' tidak dapat diikuti oleh token '{secondToken}' lainnya",
      permitted: "'Token {firstToken}' hanya dapat diikuti oleh token '{secondToken}' lainnya"
    },
    termSequence: {
      prohibited: "Token {firstTerm} tidak dapat diikuti oleh {secondTerm}",
      permitted: "Token {firstTerm} hanya dapat diikuti oleh {secondTerm}"
    },
    double: "'Token {token}' tidak dapat diikuti oleh token '{token}'",
    useInstead: "Token '{badToken}' tidak dapat diterima. Gunakan token '{goodToken}' ini",
    unexpected: "Token '{token}' tak terduga ditemukan"
  },
  brace: {
    curly: {
      missingOpen: "Kurang '{' kurung kurawal terbuka",
      missingClose: "Kurung kurawal terbuka '{' kehilangan kurung '}' kurawal tertutup",
      cannotWrap: "Token '{token}' tidak dapat dibungkus di '{}' kurung kurawal"
    },
    square: {
      missingOpen: "Kurang '[' kurung besar terbuka",
      missingClose: "Kurung besar terbuka '[' kekurangan ']' kurung besar tertutup",
      cannotWrap: "'Token {token}' tidak dapat dibungkus di '[]' kurung besar"
    }
  },
  string: {
    missingOpen: "Token kekurangan/invalid string pembuka '{quote}'",
    missingClose: "Token kekurangan/invalid string penutup '{quote}'",
    mustBeWrappedByQuotes: "String harus dibungkus dengan tanda kutip",
    nonAlphanumeric: "Token non-alphanumeric '{token}' tidak diizinkan diluar notasi string",
    unexpectedKey: "Key tak terduga ditemukan di posisi string"
  },
  key: {
    numberAndLetterMissingQuotes: "Key yang diawali dengan nomor dan berisi huruf harus dibungkus dengan tanda kutip",
    spaceMissingQuotes: "Key yang mengandung spasi harus dibungkus dengan tanda kutip",
    unexpectedString: "String tak terduga ditemukan pada posisi key"

  },
  noTrailingOrLeadingComma: "Trailing atau koma utama dalam array dan objek tidak diizinkan"
};

export default {
    format: "{reason} ラインで {line}",
    symbols: {
      colon: "結腸",           // :
      comma: "コンマ",           // ,
      semicolon: "セミコロン",   // ;
      slash: "スラッシュ",           // /  relevant for comment syntax support
      backslash: "バックスラッシュ",   // \  relevant for escaping character
      brackets: {
        round: "丸括弧",   // ( )
        square: "角括弧", // [ ]
        curly: "中括弧",   // { }
        angle: "アングルブラケット"    // < >
      },
      period: "期間",            // . Also known as full point, full stop, or dot
      quotes: {
        single: "一重引用符", // '
        double: "二重引用符", // "
        grave: "深刻な引用"   // ` used on Javascript ES6 Syntax for String Templates
      },
      space: "スペース",           //       
      ampersand: "アンパサンド",   //	&
      asterisk: "アスタリスク",     //	*  relevant for some comment sytanx
      at: "〜で",            //	@  multiple uses in other coding languages including certain data types
      equals: "等しい",    //	=
      hash: "ハッシュ",             //	#
      percent: "パーセント",       //	%
      plus: "プラス",             //	+
      minus: "マイナス",           //	−
      dash: "ダッシュ",             //	-
      hyphen: "ハイフン",         //	−
      tilde: "チルダ",           //	~
      underscore: "アンダースコア", //	_
      bar: "バー",      //	|
    },
    types: {
      key: "キー",
      value: "値",
      number: "数",
      string: "文字列",
      primitive: "プリミティブ",
      boolean: "ブール値",
      character: "キャラクター",
      integer: "整数",
      array: "アレイ",
      float: "浮く"
      //... Reference: https://en.wikipedia.org/wiki/List_of_data_structures
    },
    invalidToken: {
      tokenSequence: {
        prohibited: "'{firstToken}'トークンの後に '{secondToken}'トークンを続けることはできません",
        permitted: "'{firstToken}'トークンの後には '{secondToken}'トークンしか続けることができません"
      },
      termSequence: {
        prohibited: "{firstTerm}の後に{secondTerm}を続けることはできません。",
        permitted: "{firstTerm}には必ず{secondTerm}が続かなければなりません。"
      },
      double: "'{token}'トークンの後に別の '{token}'トークンを続けることはできません",
      useInstead: "'{badToken}'トークンは受け入れられません。 代わりに '{goodToken}'を使用してください",
      unexpected: "予期しない '{token}'トークンが見つかりました"
    },
    brace: {
      curly: {
        missingOpen: "行方不明の '{' 開いた中かっこ",
        missingClose: "'{'中括弧は閉じた中括弧で閉じられていません '}'",
        cannotWrap: "'{token}'トークンを '{}'の中括弧で囲むことはできません"
      },
      square: {
        missingOpen: "行方不明の '['角かっこ ",
        missingClose: "開く '['角括弧が欠けています ']'角括弧",
        cannotWrap: "'{token}'トークンを '[]'角カッコで囲むことはできません"
      }
    },
    string: {
      missingOpen: "開始文字列 '{quote}'トークンがない/無効です",
      missingClose: "閉じた文字列 '{quote}'トークンがないか無効です",
      mustBeWrappedByQuotes: "文字列は引用符で囲む必要があります",
      nonAlphanumeric: "英数字以外のトークン '{token}'は文字列表記の外側では使用できません",
      unexpectedKey: "文字列の位置で予期しないキーが見つかり"
    },
    key: {
      numberAndLetterMissingQuotes: "数字で始まり、文字を含むキーは引用符で囲む必要があります",
      spaceMissingQuotes: "スペースを含むキーは引用符で囲む必要があります",
      unexpectedString: "キー位置で予期しない文字列が見つかりました"
  
    },
    noTrailingOrLeadingComma: "配列やオブジェクトの先頭や末尾にコンマをつけることはできません"
  };
  
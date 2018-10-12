export default {
    format: "{reason} रेखा पर {line}",
    symbols: {
      colon: "विरामचिह्न",           // :
      comma: "अल्पविराम",           // ,  ،  、
      semicolon: "अर्द्धविराम",   // ;
      slash: "स्लैश",           // /  relevant for comment syntax support
      backslash: "बैकस्लैश",   // \  relevant for escaping character
      brackets: {
        round: "गोलाकार कोष्ठक",   // ( )
        square: "वर्गाकार कोष्ठक", // [ ]
        curly: "कुंचित कोष्ठक",   // { }
        angle: "कोणीय कोष्ठक"    // < >
      },
      period: "पूर्ण विराम",            // . Also known as full point, full stop, or dot
      quotes: {
        single: "एक उद्धरण चिह्न", // '
        double: "दोहरा उद्धरण चिह्न", // "
        grave: "गंभीर लहजा"   // ` used on Javascript ES6 Syntax for String Templates
      },
      space: "जगह",           //       
      ampersand: "ऐंपरसेंड",   //	&
      asterisk: "तारक चिह्न",     //	*  relevant for some comment sytanx
      at: "ऐट् चिह्न",            //	@  multiple uses in other coding languages including certain data types
      equals: "समान चिह्न",    //	=
      hash: "हैश्",             //	#
      percent: "प्रतिशत",       //	%
      plus: "मिलाकर",             //	+
      minus: "घटाव",           //	−
      dash: "एक चिह्न",             //	−
      hyphen: "हाइफन",         //	−
      tilde: "टिल्ड",           //	~
      underscore: "अधोरेखा", //	_
      bar: "खड़ा बार",      //	|
    },
    types: {
        key: "बार",
        value: "मूल्य",
        number: "अंक",
        string: "क़तार",
        primitive: "साधारण",
        boolean: "बूलियन",
        character: "अक्षर",
        integer: "पूर्णांक",
        array: "श्रृंखला",
        float: "फ्लोट"
      //... Reference: https://en.wikipedia.org/wiki/List_of_data_structures
    },
    invalidToken: {
      tokenSequence: {
        prohibited: "'{firstToken}' टोकन '{secondToken}' टोकन के बाद नहीं हो सकता है",
        permitted: "'{firstToken}' टोकन केवल '{secondToken}' टोकन के बाद ही हो सकता है"
      },
      termSequence: {
        prohibited: "{firstTerm} {secondTerm} के बाद नहीं हो सकता है",
        permitted: "{firstTerm} केवल {secondTerm} के बाद हो सकता है"
      },
      double: "'{token}' एक और '{token}' के बाद नहीं हो सकता है",
      useInstead: "'{badToken}' स्वीकार नहीं किया जाता है। इसके बजाए '{goodToken}' का प्रयोग करें",
      unexpected: "अप्रत्याशित '{token}' टोकन मिला"
    },
    brace: {
      curly: {
        missingOpen: "गुम '{' खुली घुंघराले ब्रेस",
        missingClose: "खुले '{' घुंघराले ब्रेस के पास बंद  होने वाली '}' ब्रेस नहीं है",
        cannotWrap: "'{}' घुंघराले ब्रेसिज़ में '{token}' टोकन संलग्न नहीं किया जा सकता है"
      },
      square: {
        missingOpen: "'[' खुली वर्ग ब्रेस नहीं है",
        missingClose: "खुले '[' वर्ग ब्रेस के पास बंद होने वाली ']' ब्रेस नहीं है",
        cannotWrap: "'[]' वर्ग ब्रेसिज़ में '{token}' टोकन संलग्न नहीं किया जा सकता है"
      }
    },
    string: {
      missingOpen: "गुम / अमान्य खोलने वाली स्ट्रिंग '{quote}' टोकन",
      missingClose: "गुम / अमान्य समापन स्ट्रिंग '{quote}' टोकन",
      mustBeWrappedByQuotes: "स्ट्रिंग्स उद्धरण द्वारा लपेटा जाना चाहिए",
      nonAlphanumeric: "स्ट्रिंग नोटेशन के बाहर गैर-अल्फान्यूमेरिक टोकन '{token}' की अनुमति नहीं है",
      unexpectedKey: "स्ट्रिंग स्थिति पर अनपेक्षित कुंजी मिली"
    },
    key: {
      numberAndLetterMissingQuotes: "संख्या और युक्त अक्षरों से शुरू होने वाली कुंजी उद्धरणों द्वारा लिपटा जाना चाहिए",
      spaceMissingQuotes: "कुंजी जिसमें स्पेस है उद्धरण द्वारा लपेटा जाना चाहिए",
      unexpectedString: "कुंजी स्थिति पर अनपेक्षित स्ट्रिंग मिली"
    },
    noTrailingOrLeadingComma: "सरणी और ऑब्जेक्ट्स में पीछे या अग्रणी कॉमा की अनुमति नहीं है"
  };
  
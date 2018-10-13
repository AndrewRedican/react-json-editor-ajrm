export default {
    format: "{reason} வரிசையில் {line}",
    symbols: {
      colon: "முழுப்புள்ளி",           // :
      comma: "கமா",           // ,  ،  、
      semicolon: "அரைப்புள்ளி",   // ;
      slash: "வெட்டி",           // /  relevant for comment syntax support
      backslash: "பின்சாய்வு",   // \  relevant for escaping character
      brackets: {
        round: "சுற்று அடைப்புக்குறி",   // ( )
        square: "சதுர அடைப்புக்குறி", // [ ]
        curly: "சுருள் அடைப்புக்குறி",   // { }
        angle: "கோண அடைப்புக்குறி"    // < >
      },
      period: "காலம்",            // . Also known as full point, full stop, or dot
      quotes: {
        single: "ஒற்றை மேற்கோள்", // '
        double: "இரட்டை மேற்கோள்", // "
        grave: "கடுமையான உச்சரிப்பு"   // ` used on Javascript ES6 Syntax for String Templates
      },
      space: "இடம்",           //       
      ampersand: "உம்மைக்குறி",   //	&
      asterisk: "நட்சத்திர குறி",     //	*  relevant for some comment sytanx
      at: "அடையாளம்",            //	@  multiple uses in other coding languages including certain data types
      equals: " சமஅடையாளம்",    //	=
      hash: "ஹாஷ்",             //	#
      percent: "சதவீதம்",       //	%
      plus: "பிளஸ்",             //	+
      minus: "குறை",           //	−
      dash: "கோடு",             //	−
      hyphen: "ஹைபன்",         //	−
      tilde: "டில்டு",           //	~
      underscore: "அடிக்கோடு", //	_
      bar: "செங்குத்துப் பட்டை",      //	|
    },
    types: {
        key: "திறவுகோல்",
        value: "மதிப்பு",
        number: "எண்",
        string: "கோவை",
        primitive: "அடிப்படை",
        boolean: "பூலியன்",
        character: "எழுத்து",
        integer: "முழு",
        array: "படை",
        float: "மிதவை"
      //... Reference: https://en.wikipedia.org/wiki/List_of_data_structures
    },
    invalidToken: {
      tokenSequence: {
        prohibited: "'{firstToken}' டோக்கனை மற்றொரு டோக்கன் '{secondToken}' தொடர்ந்து பின்பற்ற முடியாது",
        permitted: "'{firstToken}' டோக்கனை மற்றொரு டோக்கன் '{secondToken}' தொடர்ந்து பின்பற்ற முடியும்",
      },
      termSequence: {
        prohibited: "ஒரு {firstTerm} ஒரு {secondTerm} தொடர முடியாது",
        permitted: "ஒரு {firstTerm} ஒரு {secondTerm} தொடர முடியும்"
      },
      double: "'{token}' டோக்கனை மற்றொரு டோக்கன் '{token}' தொடர்ந்து பின்பற்ற முடியாது",
      useInstead: "'{badToken}' டோக்கன் ஏற்றுக்கொள்ளப்படவில்லை. '{goodToken}' பதிலாக பயன்படுத்தவும்",
      unexpected: "எதிர்பாராத டோக்கன் '{token}' கண்டறியப்பட்டது"
    },
    brace: {
      curly: {
        missingOpen: " '{'  திறந்த வளைகோடு காணவில்லை",
        missingClose: "'{'  திறந்த வளைகோடு உடன் மூடிய வளைகோடு '}' காணவில்லை",
        cannotWrap: "'{token}' டோக்கன் சுருள் பிரேஸ்களில் '{}' மூட முடியாது"
      },
      square: {
        missingOpen: " '['  திறந்த வளைகோடு காணவில்லை",
        missingClose: "'['  திறந்த வளைகோடு உடன் மூடிய வளைகோடு ']' காணவில்லை",
        cannotWrap: "'{token}' டோக்கன் சுருள் பிரேஸ்களில் '[]' மூட முடியாது"
      }
    },
    string: {
      missingOpen: "காணாமற்போன / தவறான தொடக்க சரவு டோக்கன் '{quote}'",
      missingClose: "காணாமற்போன / தவறான இறுதி சரவு டோக்கன் '{quote}'",
      mustBeWrappedByQuotes: "சரங்களை மேற்கோள் மூலம் மூடப்பட்டிருக்க வேண்டும்",
      nonAlphanumeric: "எண்ணெழுத்து அல்லாத டோக்கன் '{token}' சர குறியீட்டு வெளியே அனுமதி இல்லை",
      unexpectedKey: "எதிர்பாராத திறவு இந்த இடத்தில் கண்டறியப்பட்டது"
    },
    key: {
      numberAndLetterMissingQuotes: "எண் மற்றும் எழுத்து தொடக்கம் கொண்ட திறவு மேற்கோள் மூலம் மூடப்பட்டிருக்கும்",
      spaceMissingQuotes: "திறவு இடம் மேற்கோள் மூலம் மூடப்பட்டிருக்கும்",
      unexpectedString: "எதிர்பாராத கோவை இந்த இடத்தில் கண்டறியப்பட்டது"
    },
    noTrailingOrLeadingComma: "வரிசைகள் மற்றும் பொருள்களில் முன்னணி அல்லது பின்னணி கமாக்கள் அனுமதிக்கப்படுவதில்லை"
  };
  
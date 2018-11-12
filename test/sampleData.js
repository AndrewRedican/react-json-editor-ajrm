const sampleData = {
    basic : {
        hello : 'world',
        foo   : 'bar'
    },
    common : {
        strings : [
            'xyz',
            'This is a test',
            '+_)(*&^%$#@!~/|}{:?/.,;][=-`',
            'This is a test with a newline\n'
        ],
        numbers : [ 0, 1, -100, -7.5, 500, 1.823 ],
        primitives : [false,true],
        escape : ['\n', '\r']
    },
    uncommonKeys : {
        true            : true,
        false           : false,
        undefined       : 'undefined',
        null            : 'null',
        ''              : 0,
        'compound word' : ['*'],
        '~!@#$%'        : 'non-alphanumeric',
        $               : 'dollar',
        _               : 'underscore',
        '{}'            : 'curly brackets',
        '[]'            : 'square brackets',
        0               : 'number',
        '0'             : 'number-like text',
        A423423         : 'letter-number',
        '0A'            : 'number-letter',
        'A 4'           : 'letter-space-number',
        '0 A'           : 'number-space-letter',
        '0 A,&'         : 'number-space-letter-nonAlphanumeric'
    }
};

export default sampleData;

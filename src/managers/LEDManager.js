//
// [2016-11-02] Challenge #290 [Intermediate] Blinking LEDs
// https://www.reddit.com/r/dailyprogrammer/comments/5as91q/20161102_challenge_290_intermediate_blinking_leds/
//
// By Kory Becker http://primaryobjects.com/kory-becker
//

export var LEDManager = {
  registers: { a: null },

  dec2bin: function(dec) {
    return (dec >>> 0).toString(2);
  },

  padLeft: function(nr, n, str) {
    return Array(n-String(nr).length+1).join(str||'0')+nr;
  },

  compile: function(program) {
    var result = { result: true, diodes: [], errors: [] };

    // Break program into lines.
    var lines = program.split('\n');
    for (var i=0; i < lines.length; i++) {
      var line = lines[i].toLowerCase();
      var lineNum = parseInt(i, 10) + 1;

      if (line.length > 0) {
        // Break line into parts.
        var parts = line.split(/[ ,]/g);
        if (parts.length === 4) {
          var instruction = parts[0];
          var paramName = parts[1];
          var paramValue = parts[2];
          var terminator = parts[3];

          if (terminator === '|') {
            switch (instruction) {
              case 'ld': {
                // ld a,5 |
                LEDManager.registers[paramName] = paramValue;
                break;
              }
              case 'out': {
                // out (0),a |
                var value = LEDManager.registers[paramValue];
                if (value) {
                  var binary = LEDManager.padLeft(LEDManager.dec2bin(value), 8);
                  var bits = binary.split('');
                  var diodes = [];

                  // Set bits to 0 or 1 in diodes array.
                  for (var j=0; j < bits.length; j++) {
                    diodes[j] = parseInt(bits[j], 10);
                  }

                  // Add to output array.
                  result.diodes.push(diodes);
                }
                else {
                  result.result = false;
                  result.errors.push('Error on line ' + lineNum + ': Null parameter \'' + paramValue + '\'.');
                }              
                break;
              }
              default: {
                result.result = false;
                result.errors.push('Error on line ' + lineNum + ': Invalid instruction.');
              }
            };
          }
          else {
            result.result = false;
            result.errors.push('Error on line ' + lineNum + ': Invalid parameter. Use format: a,8');
          }
        }
        else if (line.indexOf('|') === -1) {
          result.result = false;
          result.errors.push('Error on line ' + lineNum + ': Missing line terminator \'|\'.');
        }
        else {
          result.result = false;
          result.errors.push('Error on line ' + lineNum + ': Invalid instruction length.');
        }
      }
    }

    return result;
  }
};
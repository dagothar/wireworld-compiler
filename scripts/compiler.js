var WireworldCompiler = (function() {
  
  function WireworldCompiler(wireworld) {
    var wireworld = wireworld;
    
    var head_locations = [
      [8, 3],
      [2, 3],
      [3, 0],
      [9, 0],
      [15, 0],
      [21, 0],
      [27, 0],
      [33, 0],
      [39, 0],
      [45, 0],
      [44, 4],
      [38, 3],
      [32, 3],
      [26, 3],
      [20, 3],
      [14, 3]
    ];
    
    var tail_locations = [
      [7, 3],
      [1, 3],
      [4, 0],
      [10, 0],
      [16, 0],
      [22, 0],
      [28, 0],
      [34, 0],
      [40, 0],
      [46, 1],
      [43, 3],
      [37, 3],
      [31, 3],
      [25, 3],
      [19, 3],
      [13, 3]
    ];
    
    
    function getRegisterCoordinates(n) {
      return [646-6*(n-1), 29+6*(n-1)];
    };
    
    
    function putBit(reg, n, bit) {
      reg_coord = getRegisterCoordinates(reg);  // upper-left corner of the register
      var x0 = reg_coord[0];
      var y0 = reg_coord[1];
      
      reg_index = (reg-1) % 16;                 // at which position the 0-th bit is located
      
      if (bit) {
        var idx = (n + reg_index) % 16;
        var x = x0 + head_locations[idx][0];
        var y = y0 + head_locations[idx][1];
        wireworld.putState(x, y, 2);
        
        if (n == 0) {                          // additional 'up' bit
          wireworld.putState(x, y-1, 2);
        }
        
        x = x0 + tail_locations[idx][0];
        y = y0 + tail_locations[idx][1];
        wireworld.putState(x, y, 3);
        
       
        
      } else {
        
        /*var idx = (n + reg_index) % 16;
        var x = head_locations[idx][0];
        var y = head_locations[idx][1];
        wireworld.putState(x, y, 1);
        
        x = tail_locations[idx][0];
        y = tail_locations[idx][1];
        wireworld.putState(x, y, 1);*/
      }
      
    };
    
    
    //! Loads n-th register with provided word.
    this.loadRegister = function(reg, word) {
      if (reg < 1 || reg > 52) return;
      
      for (var i = 0; i < 16; ++i) {
        var bit = word & (1 << i);
        putBit(reg, i, bit);
      }
      
    };
    

  };
  
  return WireworldCompiler;
} ());


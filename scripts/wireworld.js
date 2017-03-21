var Wireworld = (function() {
  
  function Wireworld(bitmap, canvas, mirror, colors) {
    var data = bitmap;
    var canvas = canvas;
    var mirror = mirror;
    var colors = colors;
    var width = data.naturalWidth;
    var height = data.naturalHeight;
    
    
    /**
     * Renders the new state of the board.
     */
    this.render = function(c, image) {
      
      var ctx = c.getContext('2d');
      ctx.drawImage(image, 0, 0);     
    };
    
    
    this.render(canvas, data);
    this.render(mirror, data);
    
    
    //! Defines the neighbourhood.
    this.Neighbourhood = [
      [ -1, -1 ], [ 0, -1 ], [ 1, -1 ],
      [ -1, 0 ],             [ 1, 0 ],
      [ -1, 1 ],  [ 0, 1 ],  [ 1, 1 ]
    ];
    
    
    //! Converts color to state.
    function colorToState(color) {
      var col_string = '#';
      var r = color[0].toString(16);
      r = r.length < 2 ? '0' + r : r;
      var g = color[1].toString(16);
      g = g.length < 2 ? '0' + g : g;
      var b = color[2].toString(16);
      b = b.length < 2 ? '0' + b : b;
      
      col_string = col_string + r + g + b;
      //console.log(col_string);
      
      switch (col_string) {
        case colors[0]:
          return 0;
        case colors[1]:
          return 1;
        case colors[2]:
          return 2;
        case colors[3]:
          return 3;
        default:
          return 0;
      };
    };
    
    
    //! Returns the state at (x, y).
    function getState(c, x, y) {
      if (x < 0 || y < 0 || x > width || y > height) {
        return 0;
      }
      
      var ctx = c.getContext('2d');
      var pix = ctx.getImageData(x, y, 1, 1).data;
      
      return colorToState(pix);
    };
    
    
    //! Sets state at (x, y).
    function setState(c, x, y, state) {
      var ctx = c.getContext('2d');
      ctx.fillStyle =  colors[state];
      ctx.fillRect(x, y, x+1, y+1);
    };
    
    
    //! Counts the number of neighbouring electron heads.
    function countHeads(c, x, y, neighbourhood) {
      var count = 0;
      
      for (var n = 0; n < neighbourhood.length; ++n) {
        try {
          if (d.get(i + neighbourhood[n][0], j + neighbourhood[n][1]) == 'ALIVE') ++count;
        } catch (err) {
        }
      }
      
      return count;
    }
    
    
    /**
     * Performs a step of the wireworld automaton.
     * 
     * Loops through all of the pixels...
     */
    this.step = function() {
            
      for (var i = 0; i < width; ++i) {
        for (var j = 0; j < height; ++j) {
          
          if (getState(canvas, i, j) == 0) {  // empty -> empty
            continue;
          }
          
          if (getState(canvas, i, j) == 2) {  // head -> tail
            setState(mirror, i, j, 3);
            continue;
          }
          
          
          if (getState(canvas, i, j) == 3) {  // tail -> wire
            //setState(mirror, i, j, 1);
            continue;
          }
          
          var n = countHeads(canvas, i, j, this.Neighbourhood);
          if (getState(canvas, i, j, 1) && n > 0 && n < 3) {
            //setState(mirror, i, j, 2);
          }
          
        }
      }

      this.render(canvas, mirror);
    };
    
    
    this.getCellPos = function(c, mousePos) {
      
      getState(c, mousePos.x, mousePos.y);
    }

  };
  
  return Wireworld;
} ());

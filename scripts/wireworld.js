var Wireworld = (function() {
  
  function Wireworld(width, height, colors) {
    var width = width;
    var height = height;
    var data = new Array2(width, height, 0);
    var colors = colors;
    
    var heads = [];
    var tails = [];
    
    
    //! Defines the neighbourhood.
    this.Neighbourhood = [
      [ -1, -1 ], [ 0, -1 ], [ 1, -1 ],
      [ -1, 0 ],             [ 1, 0 ],
      [ -1, 1 ],  [ 0, 1 ],  [ 1, 1 ]
    ];
    
    
    //! Returns the state at (x, y).
    function getState(d, x, y) {
      try {
        return d.get(x, y);
      } catch (err) {
        return 0;
      }
    };
    
    
    //! Sets state at (x, y).
    function setState(d, x, y, state) {
      try {
        d.set(x, y, state);
      } catch (err) {
      }
    };
    
    
    //! Updates pixel at (x, y).
    function updatePixel(ctx, x, y, state) {
      ctx.fillStyle =  colors[state];
      ctx.fillRect(x, y, 1, 1);
    };
    
    
    //! Loads from CSV.
    this.loadFromCSV = function(csv) {
      csv = csv.split(/, |\r\n|\n/);
      //console.log(csv);
      var idx = 0;
      for (var i = 0; i < height; ++i) {
        for (var j = 0; j < width; ++j) {
          var state = Number(csv[idx++]);
          data.set(j, i, state);
          
          if (state == 2) heads.push([j, i]);
          if (state == 3) tails.push([j, i]);
        }
      }
    };
    
    
    //! Counts the number of neighbouring electron heads.
    function countHeads(d, x, y, neighbourhood) {
      var count = 0;
      
      for (var n = 0; n < neighbourhood.length; ++n) {
       if(getState(d, x + neighbourhood[n][0], y + neighbourhood[n][1]) == 2) ++count;
      }
      
      return count;
    };
    
    
    /**
     * Performs a step of the wireworld automaton.
     * 
     * Loops through all of the pixels...
     */
    this.step = function(canvas) {
      //var mirror = data.clone();
      
      var ctx = canvas.getContext('2d');
            
      /*for (var i = 0; i < width; ++i) {
        for (var j = 0; j < height; ++j) {
          
          if (getState(mirror, i, j) == 0) {    // empty -> empty
            continue;
          }
          
          if (getState(mirror, i, j) == 2) {    // head -> tail
            setState(data, i, j, 3);
            updatePixel(ctx, i, j, 3);
            continue;
          }
          
          if (getState(mirror, i, j) == 3) {  // tail -> wire
            setState(data, i, j, 1);
            updatePixel(ctx, i, j, 1);
            continue;
          }
          
          // wire -> head
          var n = countHeads(mirror, i, j, this.Neighbourhood);
          if (getState(mirror, i, j, 1) && ((n == 1) || (n == 2))) {
            setState(data, i, j, 2);
            updatePixel(ctx, i, j, 2);
          }
          
        }
      }*/
      
      //console.log(heads.length);
      
      var nheads = [];
      var ntails = [];
      
      /* process heads */
      //console.log('heads: ', heads.length);
      for (var i = 0; i < heads.length; ++i) {
        
        var x = heads[i][0]; var y = heads[i][1];
        
        // check neighbourhood for empty wires
        for (var k = 0; k < this.Neighbourhood.length; ++k) {
          var nx = x + this.Neighbourhood[k][0];
          var ny = y + this.Neighbourhood[k][1];
          
          if(getState(data, nx, ny) == 1) { // wire detected
            var h = countHeads(data, nx, ny, this.Neighbourhood);
            //console.log(h);
            if ((h == 1) || (h == 2)) { // add new head
              //console.log('adding new head');
              nheads.push([nx, ny]);
              setState(data, nx, ny, 3); // to avoid multiplicating
            }
          }
        }
        
        // add new tail to replace the head
        ntails.push([x, y]);
      }
      
      /* process tails */
      for (var i = 0; i < tails.length; ++i) {
        
        var x = tails[i][0]; var y = tails[i][1];

        // add new wire to replace the tail
        setState(data, x, y, 1);
        updatePixel(ctx, x, y, 1);
      }
      
      /* update data with heads and tails */
      for (var i = 0; i < nheads.length; ++i) {
        var x = nheads[i][0]; var y = nheads[i][1];
        setState(data, x, y, 2);
        updatePixel(ctx, x, y, 2);
      }
      for (var i = 0; i < ntails.length; ++i) {
        var x = ntails[i][0]; var y = ntails[i][1];
        setState(data, x, y, 3);
        updatePixel(ctx, x, y, 3);
      }
      
      heads = nheads;
      tails = ntails;      

    };
    
    
    //! Renders the computer state onto a canvas.
    this.render = function(canvas) {
      
      var ctx = canvas.getContext('2d');
      
      for (var x = 0; x < width; ++x) { 
        for (var y = 0; y < height; ++y) {
          ctx.fillStyle =  colors[data.get(x, y)];
          ctx.fillRect(x, y, x+1, y+1);
        }
      }
    };

  };
  
  return Wireworld;
} ());

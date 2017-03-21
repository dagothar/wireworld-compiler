var Conway = (function() {
  
  function Conway(width, height) {
    var width = width, height = height, data = new Array2(width, height, 'DEAD');
    
    this.Colors = {
      DEAD: '#000000',
      ALIVE: '#00ff00'
    };
    
    this.Neighbourhood = [
      [ -1, -1 ], [ 0, -1 ], [ 1, -1 ],
      [ -1, 0 ],             [ 1, 0 ],
      [ -1, 1 ],  [ 0, 1 ],  [ 1, 1 ]
    ];
    
    function countAliveNeighbours(d, i, j, neighbourhood) {
      var count = 0;
      
      for (var n = 0; n < neighbourhood.length; ++n) {
        try {
          if (d.get(i + neighbourhood[n][0], j + neighbourhood[n][1]) == 'ALIVE') ++count;
        } catch (err) {
        }
      }
      
      return count;
    }
    
    this.step = function() {
      var old_data = data.clone();
      var changed = false;
      
      for (var i = 0; i < width; ++i) {
        for (var j = 0; j < height; ++j) {
          
          var n = countAliveNeighbours(old_data, i, j, this.Neighbourhood);
          
          if (old_data.get(i, j) == 'ALIVE') {
            if (n < 2 || n > 3) {
              data.set(i, j, 'DEAD');
              changed = true;
            }
          } else { // DEAD
            if (n == 3) {
              data.set(i, j, 'ALIVE');
              changed = true;
            }
          }
        }
      }
      
      return changed;
    }
    
    this.render = function(canvas) {
      
      var dx = canvas.getAttribute('width') / width;
      var dy = canvas.getAttribute('height') / height;
      var ctx = canvas.getContext('2d');
      
      for (var x = 0; x < width; ++x) { 
        for (var y = 0; y < height; ++y) {
          ctx.fillStyle =  this.Colors[data.get(x, y)];
          ctx.fillRect(x * dx, y * dy, dx, dy);
        }
      }
    }
    
    this.getCellPos = function(canvas, mousePos) {
      
      var dx = canvas.getAttribute('width') / width;
      var dy = canvas.getAttribute('height') / height;
      
      return {
        x: Math.floor(mousePos.x / dx),
        y: Math.floor(mousePos.y / dy)
      };
    }
    
    this.toggleCell = function(pos) {

      if (data.get(pos.x, pos.y) == 'DEAD') {
        data.set(pos.x, pos.y, 'ALIVE');
      } else {
        data.set(pos.x, pos.y, 'DEAD');
      }
    }
    
    this.getCell = function(pos) {
      return data.get(pos.x, pos.y) == 'ALIVE';
    }
    
    this.setCell = function(pos, value) {
      data.set(pos.x, pos.y, value ? 'ALIVE' : 'DEAD');
    }
  };
  
  return Conway;
} ());

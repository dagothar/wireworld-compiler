var Array2 = (function() {
  
  function Array2(m, n, value) {
    if (value === undefined) value = 0;
    
    var m = m, n = n, data;
    
    data = [];
    for (var i = 0; i < m; ++i) {
      data[i] = [];
      for (var j = 0; j < n; ++j) {
        data[i].push(value);
      };
    };
    
    function checkDim(i, j) {
      if (i < 0 || i >= m || j < 0 || j >= n) {
        throw "Index exceeds array dimensions";
      }
    };
    
    this.getDimensions = function() {
      return [ m, n ];
    };
    
    this.getData = function() {
      return data;
    };
    
    this.setData = function(_data) {
      data = _data;
    };
    
    this.get = function(i, j) {
      checkDim(i, j);
      return data[i][j];
    };
    
    this.set = function(i, j, value) {
      checkDim(i, j);
      data[i][j] = value;
    };
    
    this.print = function() {
      for (var i = 0; i < m; ++i) {
        console.log(data[i].join(", "));
      };
    };
    
    this.apply = function(cb) {
      for (var i = 0; i < m; ++i) {
        for (var j = 0; j < n; ++j) {
          data[i][j] = cb(i, j, data[i][j]);
        };
      };
    };
    
    this.clone = function() {
      var copy = new Array2(m, n);
      
      var _data = [];
      for (var i = 0; i < m; ++i) {
        _data[i] = data[i].slice();
      }
      copy.setData(_data);
      
      return copy;
    };
  };
  
  return Array2;
} ());

if (typeof define === "function" && define.amd) {
  define("array2", [], function() {
    return Array2;
  });
}

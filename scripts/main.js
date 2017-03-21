$(document).ready(function() {
  
  /* initialize the variables */
  var canvas = $('.board').get(0);
  var mirror = $('.mirror').get(0);
  var computer = undefined;
  var colors = {
    0:    '#000000', // empty
    1:    '#ff8000', // wire
    2:    '#ffffff', // head
    3:    '#0080ff'  // tail
  };
  
  /* setup */
  $('.mirror').hide();
  $('.wireworld-stop').hide();
  
  /* load the computer */
  var bitmap = new Image();
  bitmap.src = 'computer/crop.bmp';
  bitmap.onload = function() {
    computer = new Wireworld(bitmap, canvas, mirror, colors);
    computer.render(canvas);
  };
  
  /* step */
  $('.wireworld-step').click(function() {
    computer.step();
  });

  
  
  function getMousePos(e, client) {
    var rect = client.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };
  
  
  $('.board').mousedown(function(e) {
    var pos = computer.getCellPos(canvas, getMousePos(e, canvas));
  });
});

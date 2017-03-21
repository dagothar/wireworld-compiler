$(document).ready(function() {
  
  /* initialize the variables */
  var canvas = $('.board').get(0);
  
  var stepTimer = undefined;
  
  var running = false;
  
  var colors = {
    0:    '#000000', // empty
    1:    '#ff8000', // wire
    2:    '#ffffff', // head
    3:    '#0080ff'  // tail
  };
  
  var computer = undefined;
  

  /* load the computer */
  function reset() {
    $('.wireworld-start').show();
    $('.wireworld-stop').hide();
    
    clearInterval(stepTimer);
    running = false;
    
    computer = new Wireworld(725, 522, colors);
    
    $.ajax({
      type: "GET",
      url: "data/computer.csv",
      dataType: "text",
      success: function(data) {
        computer.loadFromCSV(data);
        computer.render(canvas);
      }
    });
  };
  
  reset();
  
  /* step function*/
  function step() {
    computer.step(canvas);
  };
  
  
  /* step button clicked */
  $('.wireworld-step').click(function() {
    step();
  });
  
  
  /* start button clicked */
  $('.wireworld-start').click(function() {
    if (!running) {
      stepTimer = setInterval(step, 1);
      running = true;
      $('.wireworld-start').hide();
      $('.wireworld-stop').show();
    }
  });
  
  
  
  /* stop button clicked */
  $('.wireworld-stop').click(function() {
    if (running) {
      clearInterval(stepTimer);
      running = false;
      $('.wireworld-start').show();
      $('.wireworld-stop').hide();
    }
  });
  
  
  /* reset button clicked */
  $('.wireworld-reset').click(function() {
    reset();
  });
  
  
  /* program button clicked */
  $('.wireworld-program').click(function() {
    if (!computer.isSynchronized()) reset();
    
    var programmer = new WireworldCompiler(computer);
    
    programmer.loadRegister(1, 255);
    
    computer.render(canvas);
  });

  
  
  /*function getMousePos(e, client) {
    var rect = client.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };
  
  
  $('.board').mousedown(function(e) {
    var pos = computer.getCellPos(canvas, getMousePos(e, canvas));
  });*/
});

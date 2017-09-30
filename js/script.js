$(document).ready(function() {
  var $icons = $('.icon');
  var count = 1;
  setInterval(function() {
    var className = count % 2 == 0 ? 'flip-iconV' : 'flip-iconH';
    var random = Math.floor(Math.random()*6)
    $($icons[random]).toggleClass(className);
    count++
  }, 3000);

})

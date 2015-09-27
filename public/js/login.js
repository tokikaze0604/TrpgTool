var socket = io();

$('form').submit(function() {
  var name = $('#name').val();
  console.log(name);
  return false;
});

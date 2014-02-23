$(document).ready( function() {



  $(document).tooltip();
  $('.datepicker').datepicker();

  var settingsList = $('.settings li input[type="checkbox"]');
  settingsList.on('click', function(e) {
    $(this).addClass('altered');
  });

});

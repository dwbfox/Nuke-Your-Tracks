$(document).ready( function() {

    $(document).tooltip();

    var settingsList = $('.settings li');
    settingsList.on('click', function(e) {
      alert('test');
      $(this).addClass('altered');
    });

});

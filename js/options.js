$(document).ready( function() {

    $(document).tooltip();

    var settingsList = $('.settings li input[type="checkbox"]');
    settingsList.on('change', function(e) {
      alert('test');
      $(this).addClass('altered');
    });

});

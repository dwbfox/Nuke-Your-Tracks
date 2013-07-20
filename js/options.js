$(document).ready( function() {
  var tour = $('#my-tour-id').tourbus( {} );
  console.log('Tour:',tour);
  tour.trigger('depart.tourbus');

} );
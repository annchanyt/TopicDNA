$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

$(document).ready( function () {
  var $form = $('#mc-embedded-subscribe-form');

  if ( $form.length > 0 ) {
    $('#mc-embedded-subscribe').bind('click', function ( event ) {
      if ( event ) event.preventDefault();
      if ( validate_email($('#mce-EMAIL').val()) ) { 
        $('#registrationValidation').addClass('hidden')
        register($form);
      } else {
        $('#registrationValidation')
          .removeClass('hidden alert-success').addClass('alert-danger')
          .text('Please enter a valid email and try again.')
      }
    });
  }
});

function validate_email(email) {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
  return regex.test(email);
}

function register($form) {
  $.ajax({
    type: $form.attr('method'),
    url: $form.attr('action'),
    data: $form.serialize(),
    cache       : false,
    dataType    : 'json',
    contentType: 'application/json; charset=utf-8',
    error       : function(err) { alert('Could not connect to the registration server. Please try again later.'); },
    success     : function(data) {
      if (data.result != "success") {
        alert("There was an error subscribing your email: " + data.msg);
      } else {
        $('#registrationValidation')
          .removeClass('hidden alert-danger').addClass('alert-success')
          .text('Thanks for signing up! We will send a confirmation email shortly.')
      }
    }
  });
}
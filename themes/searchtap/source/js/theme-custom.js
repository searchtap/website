$(document).scroll(function () {
  var y = $(this).scrollTop();
  if (y > 800) {
    $('.modal-strip').fadeIn();
  } else {
    $('.modal-strip').fadeOut();
  }

});
var input = document.getElementById('emailToStart');

if (input !== undefined && input !== null) {
  input.addEventListener('invalid', function (e) {
    if (input.validity.valueMissing) {
      e.target.setCustomValidity("Please enter an email address.");
    } else if (!input.validity.valid) {
      e.target.setCustomValidity("Please enter a valid email address.");
    }

    // to avoid the 'sticky' invlaid problem when resuming typing after getting a custom invalid message
    input.addEventListener('input', function (e) {
      e.target.setCustomValidity('');
    });
  }, false);
}

$(document).ready(function () {
  var trigger = $('.hamburger'),
    overlay = $('.sdff'),
    isClosed = false;

  trigger.click(function () {
    hamburger_cross();
  });

  function hamburger_cross() {

    if (isClosed === true) {
      overlay.hide();
      trigger.removeClass('is-open');
      trigger.addClass('is-closed');
      isClosed = false;
    } else {
      overlay.show();
      trigger.removeClass('is-closed');
      trigger.addClass('is-open');
      isClosed = true;
    }
  }

  $('[data-toggle="offcanvas"]').click(function () {
    $('#wrapper').toggleClass('toggled');
  });
});

$("#menu-close").click(function (e) {
  e.preventDefault();
  $("#sidebar-wrapper").toggleClass("active");
});
$("#menu-toggle").click(function (e) {
  e.preventDefault();
  $("#sidebar-wrapper").toggleClass("active");
});
/**
 * Created by kavindra on 12/12/16.
 */
$(function () {
  $("#trailSignUpForm").submit(function (event) {
    $("#trailSignUpFormSubmit").prop('disabled', true);
    event.preventDefault();
    var name = $(this).find("#name").val();
    var phone = $(this).find("#number").val();
    var email = $(this).find("#email").val();
    var password = $(this).find("#password").val();

    phone = "(" + $('.selected-dial-code').text() + ") " + phone

    var obj = {};
    obj.properties = [];

    var property = function (property, value) {
      this.property = property;
      this.value = value;
    };

    obj.properties.push(new property("firstname", name));
    obj.properties.push(new property("phone", phone));
    obj.properties.push(new property("source", "Signup form"));

    $.ajax({
        url: 'https://app.searchtap.io/users/siteSignup',
        contentType: 'application/x-www-form-urlencoded',
        xhrFields: {
          withCredentials: true
        },
        type: 'POST',
        data: {"name": name, "phone": phone, "email": email, "password": password, "data": JSON.stringify(obj)},
        error: function (err) {
          if (err.status === 409) {
            $("#signUpFailed").hide();
            $("#accountExistError").show();

          } else {
            $("#accountExistError").hide();
            $("#signUpFailed").show();
          }

        },
        success: function (data) {
          window.location.href = "https://app.searchtap.io/users/sites/urls"
        }

      }
    )
  })

  $("#mainLoginForm").submit(function (event) {
    event.preventDefault();

    $("#mainLoginFormSubmit").prop('disabled', true);

    var email = $(this).find("#email").val();
    var password = $(this).find("#pass").val();

    $.ajax({
        url: 'https://app.searchtap.io/users/siteLogin',
        contentType: 'application/x-www-form-urlencoded',
        xhrFields: {
          withCredentials: true
        },
        type: 'POST',
        data: {"email": email, "password": password},
        error: function (err) {
          if (err.status === 401) {
            $("#loginFailed").hide();
            $("#unAuthorised").show();

          } else {
            $("#unAuthorised").hide();
            $("#loginFailed").show();
          }
          $("#mainLoginFormSubmit").prop('disabled', false);

        },
        success: function (data) {
          window.location.href = "https://app.searchtap.io/users/sites/urls"
        }

      }
    )
  })

  $(document).ready(function () {
    var email = sessionStorage.getItem("emailToStart")
    if (email !== undefined) {
      $("#trailSignUpForm #email").val(sessionStorage.getItem("emailToStart"));
    }
  });

  $("#getStartedForm").submit(function (event) {
    event.preventDefault();
    sessionStorage.setItem("emailToStart", $("#emailToStart").val());
    window.location.href = "free-trial.html";
  });

  $("#requestDemoForm").submit(function (event) {
    event.preventDefault();

    $("#requestDemoFormSubmit").prop('disabled', true);

    var name = $(this).find("#name").val();
    var phone = $(this).find("#number").val();
    var email = $(this).find("#email").val();
    var cc = $('.selected-dial-code').text();

    var fd = {
      name: name,
      phone: phone,
      email: email,
      country: cc
    };


    var $form = $(this);
    $.post($form.attr("action"), $.param(fd))
      .done(function () {
        $("#leadNotCreated").hide();
        // $("#input-hide").hide();
        $("#leadCreated").show();
        $form.trigger('reset');
      })
      .fail(function (err) {
        console.error(err);
        $("#leadCreated").hide();
        $("#leadNotCreated").show();
      })
      .always(function () {
        $("#requestDemoFormSubmit").prop('disabled', false);
      })

    ;

    // phone = "(" + $('.selected-dial-code').text() + ") " + phone;

    // var obj = {};
    // obj.properties = [];
    //
    // var property = function (property, value) {
    //   this.property = property;
    //   this.value = value;
    // };
    //
    // obj.properties.push(new property("firstname", name));
    // obj.properties.push(new property("phone", phone));
    // obj.properties.push(new property("source", "Demo form"));
    //


    // $.ajax({
    //     url: 'https://app.searchtap.io/crm/hubspot?email=' + email,
    //     contentType: 'application/json',
    //     type: 'POST',
    //     data: JSON.stringify(obj),
    //     xhrFields: {
    //       withCredentials: true
    //     },
    //     success: function (data) {
    //       $("#leadNotCreated").hide();
    //       $("#input-hide").hide();
    //       $("#leadCreated").show();
    //       $("#requestDemoFormSubmit").prop('disabled', false);
    //
    //     },
    //     error: function (err) {
    //       console.log(err)
    //       $("#requestDemoFormSubmit").prop('disabled', false);
    //       $("#leadCreated").hide();
    //       $("#leadNotCreated").show();
    //     }
    //
    //   });
  });

  $("#contactUsForm").submit(function (event) {
    event.preventDefault();
    $("#contactUsFormSubmit").prop('disabled', true);
    var name = $(this).find("#name").val();
    var message = $(this).find("#message").val();
    var email = $(this).find("#email").val();
    var phone = $(this).find("#number").val();

    phone = "(" + $('.selected-dial-code').text() + ") " + phone

    var obj = {};
    obj.properties = [];

    var property = function (property, value) {
      this.property = property;
      this.value = value;
    };

    obj.properties.push(new property("firstname", name));
    obj.properties.push(new property("message", message));
    obj.properties.push(new property("phone", phone));
    obj.properties.push(new property("source", "Website Contact form"));

    $.ajax({
        url: 'https://app.searchtap.io/crm/hubspot?email=' + email,
        contentType: 'application/json',
        type: 'POST',
        data: JSON.stringify(obj),
        xhrFields: {
          withCredentials: true
        },
        success: function (data) {
          $("#contactQueryNotCreated").hide();
          $("#input-hide").hide();
          $("#contactQueryCreated").show();
          $("#contactUsFormSubmit").prop('disabled', false);

        },
        error: function (err) {
          console.log(err)
          $("#contactUsFormSubmit").prop('disabled', false);
          $("#contactQueryCreated").hide();
          $("#contactQueryNotCreated").show();
        }

      }
    )
  })

  $("#comingSoonForm").submit(function (event) {
    event.preventDefault();
    $("#comingSoonFormSubmit").prop('disabled', true);
    var email = $(this).find("#email").val();

    var obj = {};
    obj.properties = [];

    var property = function (property, value) {
      this.property = property;
      this.value = value;
    };

    obj.properties.push(new property("source", "Coming Soon form"));

    $.ajax({
        url: 'https://app.searchtap.io/crm/hubspot?email=' + email,
        contentType: 'application/json',
        type: 'POST',
        data: JSON.stringify(obj),
        xhrFields: {
          withCredentials: true
        },
        success: function (data) {
          $("#notificationNotCreated").hide();
          $("#input-hide").hide();
          $("#notificationCreated").show();
          $("#comingSoonFormSubmit").prop('disabled', false);

        },
        error: function (err) {
          console.log(err)
          $("#comingSoonFormSubmit").prop('disabled', false);
          $("#notificationCreated").hide();
          $("#notificationNotCreated").show();
        }

      }
    )
  })

});
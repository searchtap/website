$(function () {
   $("#trailSignUpForm").submit(function (event) {
      $("#trailSignUpFormSubmit").prop('disabled', true);
      event.preventDefault();
      var name = $(this).find("#name").val();
      var phone = $(this).find("#number").val();
      var email = $(this).find("#email").val();
      var password = $(this).find("#password").val();

      phone = "(" + $('.selected-dial-code').text() + ") " + phone;

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
   });

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
      );
   });

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
      var $form = $(this);

      // check if form has country code and assign its value to country code hidden input
      if ($form.find('#country_code') !== undefined) {
         $form.find('#country_code').val($('.selected-dial-code').text());
      }

         $.post($form.attr("action"), $form.serialize())
         .done(function () {

            $("#leadCreated").fadeIn();
            setTimeout(() => {
               $("#leadCreated").fadeOut('slow');
            }, 2000);
            $form.trigger('reset');
         })
         .fail(function (err) {
            console.error(err);
            $("#leadNotCreated").fadeIn();
            setTimeout(() => {
               $("#leadNotCreated").fadeOut('slow');
            }, 5000);
         })
         .always(function () {
            $("#requestDemoFormSubmit").prop('disabled', false);
         });
   });

   $("#contactUsForm").submit(function (event) {

      event.preventDefault();
      $("#contactUsFormSubmit").prop('disabled', true);
      var $form = $(this);

      // check if form has country code and assign its value to country code hidden input
      if ($form.find('#country_code') !== undefined) {
         $form.find('#country_code').val($('.selected-dial-code').text());
      }

      $.post($form.attr("action"), $form.serialize())
         .done(function () {
            $("#contactQueryNotCreated").hide();
            $("#input-hide").hide();
            $("#contactQueryCreated").show();
            $form.trigger('reset');
         })
         .fail(function (err) {
            console.error(err);
            $("#contactUsFormSubmit").prop('disabled', false);
            $("#contactQueryCreated").hide();
         })
         .always(function () {
            $("#contactUsFormSubmit").prop('disabled', false);
         });
   });

   $("#comingSoonForm").submit(function (event) {

      event.preventDefault();
      $("#comingSoonFormSubmit").prop('disabled', true);
      var $form = $(this);

      $.post($form.attr("action"), $form.serialize())
         .done(function () {
            $("#notificationNotCreated").hide();
            $("#input-hide").hide();
            $("#notificationCreated").show();
            $form.trigger('reset');
         })
         .fail(function (err) {
            console.error(err);
            $("#notificationCreated").hide();
            $("#notificationNotCreated").show();
         })
         .always(function () {
            $("#comingSoonFormSubmit").prop('disabled', false);
         });
   })

});
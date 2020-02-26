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

   $("#requestDemoForm, #leaveMessageForm").submit(function (event) {

      event.preventDefault();
      $("#requestDemoFormSubmit").prop('disabled', true);
      var $form = $(this);

      let serializedData = ($form.serialize()).replace('&g-recaptcha-response=', '');

         $.post($form.attr("action"), serializedData)
         .done(function () {

            $form.find("#leadCreated").fadeIn();
            setTimeout(() => {
               $form.find("#leadCreated").fadeOut('slow');
            }, 5000);
            $form.trigger('reset');
         })
         .fail(function (err) {

            console.error(err);
            $form.find("#leadNotCreated").fadeIn();
            setTimeout(() => {
               $form.find("#leadNotCreated").fadeOut('slow');
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

$( document ).ready(function() {

   $('#back-top').on('click', ()=> {
      $('body, html').animate({scrollTop: 0}, 'slow');
   });

   window.addEventListener('scroll', ()=> {

      if(window.scrollY > 500) {
         $('#back-top').show();
      }
      else {
         $('#back-top').hide();
      }

   });

});

$(document).ready(function(){
   $('select').focus(function(){
      $(this).attr("size",$(this).attr("expandto")).css('z-index',2);
   });
   $('select').blur(function(){
      $(this).attr("size",1).css('z-index','1');
   });
   $('select').change(function(){
      $(this).attr("size",1).css('z-index','1');
   });
});
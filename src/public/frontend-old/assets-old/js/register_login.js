$(document).ready(function() {
  // Customer Registration
  $('#customer_register').validate({
    errorElement: "i",
    errorClass: "msg msg-error",
    rules: {
      first_name: {
        required: true,
        lettersonly: true,
        minlength: 2
      },
      last_name: {
        required: true,
        lettersonly: true,
        minlength: 2
      },
      email: {
        singleemail: true,
        required: true,
        remote: {
          url: SITE_URL + "check-unique-value",
          type: "post",
          data: {
            flag: 2 // check unique email or not
          }
        }
      },
      phone: {
        minlength: 10,
        maxlength: 10,
        notEqual: '0000000000',
        remote: {
          url: SITE_URL + "check-unique-value",
          type: "post",
          data: {
            flag: 1 // check unique phone number or not
          }
        }
      }
    },
    messages: {
      first_name: {
        required: "Please enter first name",
        minlength: 'Minimum length should be 2'
      },
      last_name: {
        required: "Please enter last name",
        minlength: 'Minimum length should be 2'
      },
      email: {
        singleemail: "Please enter valid email",
        required: "Please enter valid email",
        remote: "This email has already been taken"
      },
      phone: {
        number:"Please enter only numbers",
        minlength:"Mobile number will be minimum of 10 digits",
        maxlength:"Mobile number will be maximum of 10 digits",
        remote: "This phone number has already been taken",
        notEqual: "Invalid phone number"
      }
    },
    submitHandler: function(form) {
      grecaptcha.ready(function() {
        grecaptcha.execute(SITE_KEY, {action: 'UserRegisterForm'}).then(function(token) {
          $("#register_btn").prop("disabled", true).html('Please Wait..');
          var data = new FormData(form);
          data.append('recaptcha',token);
          $.ajax({
            type: "POST",
            url: SITE_URL + "register",
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
              if (response.success) {
                $('#register_id').val(response.id);
                $('.register_msg').html(response.message).show().addClass('success');
                countdowntimer('countdowntimer');
                setTimeout(function() {
                  $('#customer_register_from').hide();
                  $('#customer_register_otp_from').show();
                  $(".resend_otp").attr("disabled", true);
                  $("#customer_register")[0].reset();
                  $(".form-element").removeClass('has-value');
                  $("#register_btn").prop("disabled", false).html('Register Now');
                }, 3000);
              } else {
                $("#register_btn").prop("disabled", false).html('Register Now');
                $('.register_msg').html(response.message).show().addClass('error');
              }
              setTimeout(function() {
                $('.register_msg').removeClass('error').removeClass('success').hide();
              }, 3000);
            },
            error: function() {
              $("#register_btn").prop("disabled", false).html('Register Now');
            },
          });
        });
      });
    }
  });

  $('#customer_register_otp').validate({
    errorElement: "i",
    errorClass: "msg msg-error",
    rules: {
      otp: {
        required: true,
        minlength: 6,
        maxlength: 6,
        number: true,
      }
    },
    messages: {
      otp: {
        required: "Please enter otp",
        minlength: "Minimum length should be 6",
        maxlength: "Maximum length should be 6",
        number: 'Please enter numbers only'
      },
    },
    submitHandler: function(form) {
      grecaptcha.ready(function() {
        grecaptcha.execute(SITE_KEY, {action: 'UserOTPForm'}).then(function(token) {
          $('#register_otp_btn').prop('disabled', true).html('Please Wait..');
          var data = new FormData(form);
          data.append('recaptcha',token);
          $.ajax({
            type: 'POST',
            url: SITE_URL + 'register-validate-login',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
              if (response.success) {
                $('.register_msg').html(response.message).addClass('success').show();
                setTimeout(function() {
                  closeModal();
                  location.href = SITE_URL;
                }, 3000);
              }else {
                $('.register_msg').html(response.message).addClass('error').show();
                $("#register_otp_btn").prop("disabled", false).html('Submit');
                setTimeout(function() {
                  $('.register_msg').removeClass('error').removeClass('success').hide();
                }, 3000);
              }
            },
            error: function() {
              $("#register_otp_btn").prop("disabled", false).html("Submit");
            },
          });
        });
      });
    }
  });

  // resend OTP
  $(".resend_otp").click(function() {
    var element_id     = $(this).attr("data-id");
    var count_id       = $(this).attr("data-countdowntimer");
    var msg_class      = $(this).attr("data-msg");
    resendOtp(element_id, count_id, msg_class)
  });

  $('#user_login_form').validate({
    errorElement: "i",
    errorClass: "msg msg-error",
    rules: {
      email: {
        required: true,
        customemail: true,
      },
      password: {
        required: true,
        minlength: 8,
        maxlength: 50
      }
    },
    messages: {
      email: {
        required: "Please enter email",
        customemail: "Please enter valid email"
      },
      password: {
        required: 'Please enter password',
        minlength: 'Minimum length should be 8',
        maxlength: 'Maximum length should be 50'
      }
    },
    submitHandler: function(form) {
      grecaptcha.ready(function() {
        grecaptcha.execute(SITE_KEY, {action: 'UserLoginForm'}).then(function(token) {
          $('#login_btn').prop('disabled', true).html('Please Wait..');
          var data = new FormData(form);
          data.append('recaptcha',token);
          $.ajax({
            type: 'POST',
            url: SITE_URL + 'login',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
              if (response.success) {
                $('.login_msg').html(response.message).addClass('success').show();
                $('#login_id').val(response.id);
                countdowntimer('countdowntimer2');
                setTimeout(function() {
                  $('#customer_login_from').hide();
                  $('#customer_login_otp_from').show();
                  $(".resend_otp").attr("disabled", true);
                  $("#user_login_form")[0].reset();
                  $(".form-element").removeClass('has-value');
                  $("#login_btn").prop("disabled", false).html('Login to Your Account');
                }, 3000);
              } else {
                $("#login_btn").prop("disabled", false).html("Login to Your Account");
                $('.login_msg').addClass('error').html(response.message).show();
              }
              setTimeout(function() {
                $('.login_msg').removeClass('error').removeClass('success').hide();
              }, 3000);
            },
            error: function() {
              $("#login_btn").prop("disabled", false).html("Login to Your Account");
            },
          });
        });
      });
    }
  });

  $('#customer_login_otp').validate({
    errorElement: "i",
    errorClass: "msg msg-error",
    rules: {
      otp: {
        required: true,
        minlength: 6,
        maxlength: 6,
        number: true,
      }
    },
    messages: {
      otp: {
        required: "Please enter otp",
        minlength: "Minimum length should be 6",
        maxlength: "Maximum length should be 6",
        number: 'Please enter numbers only'
      },
    },
    submitHandler: function(form) {
      grecaptcha.ready(function() {
        grecaptcha.execute(SITE_KEY, {action: 'UserLoginForm'}).then(function(token) {
          $('#login_otp_btn').prop('disabled', true).html('Please Wait..');
          var data = new FormData(form);
          data.append('recaptcha',token);
          $.ajax({
            type: 'POST',
            url: SITE_URL + 'validate-login',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
              if (response.success) {
                $('.login_msg').html(response.message).addClass('success').show();
                setTimeout(function() {
                  location.href = SITE_URL;
                }, 3000);
              }else {
                $('.login_msg').html(response.message).addClass('error').show();
                $("#login_otp_btn").prop("disabled", false).html('Submit');
                setTimeout(function() {
                  $('.login_msg').removeClass('error').removeClass('success').hide();
                }, 3000);
              }
            },
            error: function() {
              $("#login_otp_btn").prop("disabled", false).html("Submit");
            },
          });
        });
      });
    }
  });

  $('#forgot_password_form').validate({
    errorElement: "i",
    errorClass: "msg msg-error",
    rules: {
      email: {
        singleemail: true,
        required: true
      }
    },
    messages: {
      email: {
        singleemail: "Please enter valid email",
        required: "Please enter valid email"
      }
    },
    submitHandler: function(form) {
      grecaptcha.ready(function() {
        grecaptcha.execute(SITE_KEY, {action: 'UserForgotPasswordForm'}).then(function(token) {
          var data = new FormData(form);
          data.append('recaptcha',token);
          $('#reset_password_btn').prop('disabled', true).html('Please Wait..');
          $.ajax({
            type: "POST",
            url: SITE_URL + "forgot-password",
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
              if (response.success) {
                $('.reset_password_msg').html(response.message).addClass('success').show();
              } else {
                $("#reset_password_btn").html("Reset Password").prop("disabled", false);
                $('.reset_password_msg').html(response.message).addClass('error').show();
              }
              setTimeout(function() {
                $('.reset_password_msg').removeClass('error').removeClass('success').hide();
                $("#reset_password_btn").html("Reset Password").prop("disabled", false);
              }, 3000);
            },
            error: function() {
              $("#reset_password_btn").prop("disabled", false).html("Reset Password");
            },
          });
        });
      });
    }
  });

  $('#reset_password_form').validate({
    errorElement: "i",
    errorClass: "msg msg-error",
    rules: {
      password: {
        required: true,
        minlength: 8,
        maxlength: 50,
        checkalphabet: true,
        checkdigit: true,
        checkspecialcharacter: true
      },
      cnfnewpassword: {
        required: true,
        minlength: 8,
        maxlength: 50,
        equalTo: '#password-2'
      }
    },
    messages: {
      password: {
        required: 'Please enter password',
        minlength: 'Minimum length should be 8',
        maxlength: 'Maximum length should be 50',
        checkalphabet: "Need atleast 1 alphabet",
        checkdigit: "Need atleast 1 digit",
        checkspecialcharacter: "Need atleast 1 special character"
      },
      cnfnewpassword: {
        required: 'Please enter confirm password',
        minlength: 'Minimum length should be 8',
        maxlength: 'Maximum length should be 50',
        equalTo: 'New password and confirm password did not match'
      }
    },
    submitHandler: function(form) {
      grecaptcha.ready(function() {
        grecaptcha.execute(SITE_KEY, {action: 'UserResetPasswordForm'}).then(function(token) {
          $('#forgot_password_btn').prop('disabled', true).html('Please Wait..');
          var data = new FormData(form);
          data.append('recaptcha',token);
          $.ajax({
            type: 'POST',
            url: SITE_URL+'handle-reset-password',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response){
              if (response.success) {
                $('.forgot_password_msg').addClass('success').html(response.message).show();
                setTimeout(function() {
                  window.location.assign(SITE_URL);
                }, 3000);
              } else {
                $('#forgot_password_btn').prop('disabled', false).html('Reset Password');
                $('.forgot_password_msg').addClass('error').html(response.message).show();
              }
              setTimeout(function() {
                $('.forgot_password_msg').removeClass('error').removeClass('success').hide();
              }, 3000);
            },
            error: function() {
              $("#forgot_password_btn").prop("disabled", false).html("Reset Password");
            },
          });
        });
      });
    }
  });
});

function countdowntimer(_id) {
  var timeleft = 10;
  var downloadTimer = setInterval(function(){
    timeleft--;
    document.getElementById(_id).textContent = timeleft;
    if(timeleft <= 0) {
      clearInterval(downloadTimer);
      $(".resend_otp").attr("disabled", false);
    }
  },1000);
}

function resendOtp(element_id, count_id, msg_class) {
  $(".resend_otp").html('Please Wait..');
  grecaptcha.ready(function() {
    grecaptcha.execute(SITE_KEY, {action: 'UserResendOTPForm'}).then(function(token) {
      var id = $('#'+element_id).val();
      $.ajax({
        url: SITE_URL + 'resend-otp',
        type: 'POST',
        data:{ 'id': id, 'recaptcha': token },
        dataType: 'json',
        success: function(response) {
          $(".resend_otp").html('Resend OTP');
          if(response.success == true){
            countdowntimer(count_id);
            $(".resend_otp").attr("disabled", true);
            $('.'+msg_class).html(response.message).addClass('success').show();
          }else {
            $(".resend_otp").attr("disabled", false);
            $('.'+msg_class).html(response.message).addClass('error').show();
          }
          setTimeout(function() {
            $('.'+msg_class).removeClass('error').removeClass('success').hide();
          }, 3000);
        }
      });
    });
  });
}

$(document).ready(function() {
  $(".filterstate, .filtercity").addClass( "disabled" );

  //COUNTRY DROPDOWN CHANGE FUNCTIONALITY
  $(".filterscountry").on("change", function () {
    fetchStateDropdown($(this));
  });
  
  if (b_state_id != '' && s_state_id != '') {
    $('.filterscountry').trigger("change");
    setTimeout(function() {
      $("select[name=billing_state_id]").val(b_state_id);
      $("select[name=shipping_state_id]").val(s_state_id);
      $('.filterstate').trigger("change");
    }, 1000);
  }

  if (b_city_id != '' && s_city_id != '') {
    setTimeout(function() {
      $("select[name=billing_city_id]").val(b_city_id);
      $("select[name=shipping_city_id]").val(s_city_id);
    }, 2000);
  }

  //STATE DROPDOWN CHANGE FUNCTIONALITY
  $(".filterstate").on("change", function () {
    fetchCityDropdown($(this));
  });

  $("#guest_email").on("keyup", function () {
    var _this = $(this);
    if (IsEmail(_this.val())) {
      $.ajax({
        type: "POST",
        url: SITE_URL + "get-checkout-data",
        data: {
          email: $(_this).val(),
        },
        success: function (response) {
          if (response.success) {
            var addresses = response.addresses;
            $.each( addresses, function( key, val ) {
              if (val.type == 1) {
                $('input[name="billing_first_name"]').val(val.first_name);
                $('input[name="billing_last_name"]').val(val.last_name);
                $('input[name="billing_email"]').val(val.email);
                $('input[name="billing_phone"]').val(val.phone);
                $('select[name="billing_country_id"]').val(val.country_id).trigger('change');
                setTimeout(function() {
                  $('select[name="billing_state_id"]').val(val.state_id).trigger('change');
                }, 300);
                setTimeout(function() {
                  $('select[name="billing_city_id"]').val(val.city_id);
                }, 600);
                $('input[name="billing_pin"]').val(val.pin);
                $('input[name="billing_address_1"]').val(val.address_1);
                $('input[name="billing_address_2"]').val(val.address_2);
              }
            });
          }
        },
      });
    }
  });

  $("#same_as_billing").on("change", function () {
    if ($(this).prop('checked')) {
      $('input[name="shipping_first_name"]').val($('input[name="billing_first_name"]').val());
      $('input[name="shipping_last_name"]').val($('input[name="billing_last_name"]').val());
      $('input[name="shipping_email"]').val($('input[name="billing_email"]').val());
      $('input[name="shipping_phone"]').val($('input[name="billing_phone"]').val());
      $("select[name='shipping_country_id']").val($("select[name='billing_country_id']").find(":selected").val());
      var state_options = $("select[name='billing_state_id'] > option").clone();
      $("select[name='shipping_state_id']").html(state_options).removeClass('disabled');
      $("select[name='shipping_state_id']").val($("select[name='billing_state_id']").find(":selected").val());
      var city_options = $("select[name='billing_city_id'] > option").clone();
      $("select[name='shipping_city_id']").html(city_options).removeClass('disabled');
      $("select[name='shipping_city_id']").val($("select[name='billing_city_id']").find(":selected").val());
      $('input[name="shipping_pin"]').val($('input[name="billing_pin"]').val());
      $('input[name="shipping_address_1"]').val($('input[name="billing_address_1"]').val());
      $('input[name="shipping_address_2"]').val($('input[name="billing_address_2"]').val());
    }else {
      $("select[name='shipping_country_id']").val('');
      $('input[name="shipping_first_name"], input[name="shipping_last_name"], input[name="shipping_email"], input[name="shipping_phone"]').val('');
      $("select[name='shipping_state_id']").html('<option value="">Select State</option>').addClass("disabled");
      $("select[name='shipping_city_id']").html('<option value="">Select City</option>').addClass("disabled");
      $('input[name="shipping_pin"], input[name="shipping_address_1"], input[name="shipping_address_2"]').val('');
    }
  });

  $('#customer_checkout_frm').validate({
    errorElement: "i",
    errorClass: "msg msg-error",
    rules: {
      email: {
        singleemail: true,
        required: true
      },
      billing_first_name: {
        required: true,
        lettersonly: true,
        minlength: 2
      },
      billing_last_name: {
        required: true,
        lettersonly: true,
        minlength: 2
      },
      billing_email: {
        singleemail: true,
        required: true
      },
      billing_phone: {
        required: true,
        minlength: 10,
        maxlength: 10,
        notEqual: '0000000000'
      },
      billing_country_id: {
        required: true
      },
      billing_state_id: {
        required: true
      },
      billing_city_id: {
        required: true
      },
      billing_pin: {
        required: true,
        minlength: 6,
        maxlength: 6,
        notEqual: '000000'
      },
      billing_address_1: {
        required: true,
        minlength: 2
      },
      billing_address_2: {
        minlength: 2
      },
      shipping_first_name: {
        required:{
          depends: function(element) {
            if (!$("#same_as_billing").prop('checked')){
              return true;
            }else{
              return false;
            }
          }
        },
        lettersonly: true,
        minlength: 2
      },
      shipping_last_name: {
        required:{
          depends: function(element) {
            if (!$("#same_as_billing").prop('checked')){
              return true;
            }else{
              return false;
            }
          }
        },
        lettersonly: true,
        minlength: 2
      },
      shipping_email: {
        singleemail: true,
        required:{
          depends: function(element) {
            if (!$("#same_as_billing").prop('checked')){
              return true;
            }else{
              return false;
            }
          }
        }
      },
      shipping_phone: {
        required:{
          depends: function(element) {
            if (!$("#same_as_billing").prop('checked')){
              return true;
            }else{
              return false;
            }
          }
        },
        minlength: 10,
        maxlength: 10,
        notEqual: '0000000000'
      },
      shipping_country_id: {
        required:{
          depends: function(element) {
            if (!$("#same_as_billing").prop('checked')){
              return true;
            }else{
              return false;
            }
          }
        }
      },
      shipping_state_id: {
        required:{
          depends: function(element) {
            if (!$("#same_as_billing").prop('checked')){
              return true;
            }else{
              return false;
            }
          }
        }
      },
      shipping_city_id: {
        required:{
          depends: function(element) {
            if (!$("#same_as_billing").prop('checked')){
              return true;
            }else{
              return false;
            }
          }
        }
      },
      shipping_pin: {
        required:{
          depends: function(element) {
            if (!$("#same_as_billing").prop('checked')){
              return true;
            }else{
              return false;
            }
          }
        },
        minlength: 6,
        maxlength: 6,
        notEqual: '000000'
      },
      shipping_address_1: {
        required:{
          depends: function(element) {
            if (!$("#same_as_billing").prop('checked')){
              return true;
            }else{
              return false;
            }
          }
        },
        minlength: 2
      },
      shipping_address_2: {
        minlength: 2
      }
    },
    messages: {
      email: {
        singleemail: "Please enter valid email",
        required: "Please enter valid email"
      },
      billing_first_name: {
        required: "Please enter first name",
        minlength: 'Minimum length should be 2'
      },
      billing_last_name: {
        required: "Please enter last name",
        minlength: 'Minimum length should be 2'
      },
      billing_email: {
        singleemail: "Please enter valid email",
        required: "Please enter valid email"
      },
      billing_phone: {
        required: "Please enter phone no",
        minlength:"Mobile number will be minimum of 10 digits",
        maxlength:"Mobile number will be maximum of 10 digits",
        notEqual: "Invalid phone number"
      },
      billing_country_id: {
        required: "Please select country"
      },
      billing_state_id: {
        required: "Please select state"
      },
      billing_city_id: {
        required: "Please select city"
      },
      billing_pin: {
        required: "Please enter pin",
        minlength:"Pin number will be minimum of 6 digits",
        maxlength:"Pin number will be maximum of 6 digits",
        notEqual: "Invalid pin code"
      },
      billing_address_1: {
        required: "Please enter address 1",
        minlength: 'Minimum length should be 2'
      },
      billing_address_2: {
        minlength: 'Minimum length should be 2'
      },
      shipping_first_name: {
        required: "Please enter first name",
        minlength: 'Minimum length should be 2'
      },
      shipping_last_name: {
        required: "Please enter last name",
        minlength: 'Minimum length should be 2'
      },
      shipping_email: {
        singleemail: "Please enter valid email",
        required: "Please enter valid email"
      },
      shipping_phone: {
        required: "Please enter phone no",
        minlength:"Mobile number will be minimum of 10 digits",
        maxlength:"Mobile number will be maximum of 10 digits",
        notEqual: "Invalid phone number"
      },
      shipping_country_id: {
        required: "Please select country"
      },
      shipping_state_id: {
        required: "Please select state"
      },
      shipping_city_id: {
        required: "Please select city"
      },
      shipping_pin: {
        required: "Please enter pin",
        minlength:"Pin number will be minimum of 6 digits",
        maxlength:"Pin number will be maximum of 6 digits",
        notEqual: "Invalid pin code"
      },
      shipping_address_1: {
        required: "Please enter address 1",
        minlength: 'Minimum length should be 2'
      },
      shipping_address_2: {
        minlength: 'Minimum length should be 2'
      }
    },
    submitHandler: function(form) {
      grecaptcha.ready(function() {
        grecaptcha.execute(SITE_KEY, {action: 'UserCheckoutForm'}).then(function(token) {
          $("#customer_checkout_btn").prop("disabled", true).html('Please Wait..');
          var data = new FormData(form);
          data.append('recaptcha',token);
          $.ajax({
            type: "POST",
            url: SITE_URL + "handle-checkout",
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
              if (response.success) {
                setTimeout(function() {
                  location.href = SITE_URL+'payment';
                }, 1000);
              } else {
                $("#customer_checkout_btn").prop("disabled", false).html('SAVE & CONTINUE');
                $('.customer_checkout_msg').html(response.message).show().addClass('error');
              }
              setTimeout(function() {
                $('.customer_checkout_msg').removeClass('error').removeClass('success').hide();
              }, 5000);
            },
            error: function() {
              $("#customer_checkout_btn").prop("disabled", false).html('SAVE & CONTINUE');
            },
          });
        });
      });
    }
  });

  $('#customer_payment_frm').validate({
    errorElement: "i",
    errorClass: "msg msg-error",
    rules: {
      payment_type: {
        required: true
      }
    },
    messages: {
      payment_type: {
        required: "Please select paymen type"
      }
    },
    submitHandler: function(form) {
      grecaptcha.ready(function() {
        grecaptcha.execute(SITE_KEY, {action: 'UserPaymentForm'}).then(function(token) {
          $("#customer_payment_btn").prop("disabled", true).html('Please Wait..');
          var data = new FormData(form);
          data.append('recaptcha',token);
          $.ajax({
            type: "POST",
            url: SITE_URL + "handle-payment",
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
              if (response.success) {
                setTimeout(function() {
                  location.href = SITE_URL+'order-success';
                }, 1000);
              } else {
                $("#customer_payment_btn").prop("disabled", false).html('PAY NOW');
                $('.customer_payment_msg').html(response.message).show().addClass('error');
              }
              setTimeout(function() {
                $('.customer_payment_msg').removeClass('error').removeClass('success').hide();
              }, 5000);
            },
            error: function() {
              $("#customer_payment_btn").prop("disabled", false).html('PAY NOW');
            },
          });
        });
      });
    }
  });
});

function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!regex.test(email)) {
    return false;
  } else {
    return true;
  }
}

function fetchCityDropdown(_this) {
  $.ajax({
    type: "POST",
    url: SITE_URL + "get-city",
    data: {
      id: $(_this).find(":selected").val(),
    },
    success: function (response) {
      var html = '<option value="">Select City</option>';
      if (response.success) {
        var records = response.data;
        if (records.length > 0) {
          for (var i = 0; i < records.length; i++) {
            html += '<option value="' + records[i].id + '">' + records[i].name + "</option>";
          }
        }
      }
      _this.parents().next().find('.filtercity').html(html).removeClass("disabled");
    },
  });
}

function fetchStateDropdown(_this) {
  $.ajax({
    type: "POST",
    url: SITE_URL + "get-state",
    data: {
      id: $(_this).find(":selected").val(),
    },
    success: function (response) {
      var html = '<option value="">Select State</option>';
      if (response.success) {
        var records = response.data;
        if (records.length > 0) {
          for (var i = 0; i < records.length; i++) {
            html += '<option value="' + records[i].id + '">' +records[i].name + "</option>";
          }
        }
      }
      _this.parents().next().find('.filterstate').html(html).removeClass( "disabled");
    },
  });
}

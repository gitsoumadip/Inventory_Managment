$(document).ready(function() {
  $(".validdate").keyup(function () {
    var yourInput = $(this).val();
    re =
    /[`~!#$%^&*()_|+\=?;:'",123456789ABCDEFGHIJKLMNOPQRSTUVWXabcdefghijklmnopqrst<>\{\}\[\]\\\/]/gi;
    var isSplChar = re.test(yourInput);
    if (isSplChar) {
      var no_spl_char = yourInput.replace(
        /[`~!#$%^&*()_|+\=?;:'",123456789ABCDEFGHIJKLMNOPQRSTUVWXabcdefghijklmnopqrst<>\{\}\[\]\\\/]/gi,
        ""
      );
      $(this).val(no_spl_char);
    }
  });

  $("body").find('#purchase_date').datepicker({
    dateFormat: "mm/dd/yy",
    dayNamesMin: [ "S", "M", "T", "W", "T", "F", "S" ],
    changeMonth: true,
    changeYear: true,
    maxDate: 0,
    yearRange: '1950:2150'
  });

  $('#invoice_attch').change(function () {
    $('#invoice_attch').parent().find("i").remove();
    var ext = this.value.match(/\.(.+)$/)[1];
    switch (ext) {
      case "jpg":
      case "jpeg":
      case "png":
      case "JPG":
      case "JPEG":
      case "PNG":
      case "webp":
      case "WEBP":
      case "pdf":
      break;
      default:
      this.value = '';
      $('#invoice_attch').after('<i id="invoice_attch-error" class="msg msg-error">Invalid image format</i>');
      $('#filename').html('');
      return false;
    }
    var file = document.getElementById('invoice_attch').files[0];
    if (file.size > 1000000) {
      $('#invoice_attch').after('<i id="test-error" class="msg msg-error">Max upload size is 1 mb only</i>');
      document.getElementById('invoice_attch').value = "";
      $('#filename').html('');
      return false;
    }
    $('#filename').html(document.getElementById('invoice_attch').value.split('\\').pop());
  });

  $('#user_warranty_form').validate({
    errorElement: "i",
    errorClass: "msg msg-error",
    rules: {
      name: {
        required: true,
        lettersonly: true,
        minlength: 2
      },
      mobile: {
        required: true,
        minlength: 10,
        maxlength: 10,
        notEqual: '0000000000'
      },
      email: {
        singleemail: true,
        required: true
      },
      purchase_date: {
        required: true
      },
      product_id: {
        required: true
      },
      purchase_source: {
        required: true
      },
      invoice_attch: {
        required: true
      },
      address: {
        required: true
      },
      pin: {
        required: true,
        minlength: 6,
        maxlength: 6,
        notEqual: '000000'
      }
    },
    messages: {
      name: {
        required: "Please enter first name",
        minlength: 'Minimum length should be 2'
      },
      mobile: {
        minlength:"Mobile number will be minimum of 10 digits",
        maxlength:"Mobile number will be maximum of 10 digits",
        notEqual: "Invalid phone number"
      },
      email: {
        required: "Please enter valid email",
        singleemail: "Please enter valid email"
      },
      purchase_date: {
        required: "Please select purchase date"
      },
      product_id: {
        required: "Please select product"
      },
      purchase_source: {
        required: "Please select source"
      },
      invoice_attch: {
        required: "Please select invoice"
      },
      address: {
        required: "Please enter address"
      },
      pin: {
        required: "Please enter pin",
        minlength:"Mobile number will be minimum of 6 digits",
        maxlength:"Mobile number will be maximum of 6 digits",
        notEqual: "Invalid pin code"
      }
    },
    submitHandler: function(form) {
      grecaptcha.ready(function() {
        grecaptcha.execute(SITE_KEY, {action: 'userWarrantyForm'}).then(function(token) {
          $('#warranty_btn').prop('disabled', true).html('Please Wait..');
          var data = new FormData(form);
          data.append('recaptcha',token);
          $.ajax({
            type: 'POST',
            url: SITE_URL+'handle-product-warranty',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response){
              if (response.success) {
                $('#filename').html('');
                $('.warranty_msg').addClass('success').html(response.message).show();
                $('#warranty_btn').prop('disabled', false).html('Submit Product Details');
                $('#user_warranty_form')[0].reset();
              } else {
                $('#warranty_btn').prop('disabled', false).html('Submit Product Details');
                $('.warranty_msg').addClass('error').html(response.message).show();
              }
              setTimeout(function() {
                $('.warranty_msg').removeClass('error').removeClass('success').hide();
              }, 5000);
            },
            error: function() {
              $("#warranty_btn").prop("disabled", false).html("Submit Product Details");
            },
          });
        });
      });
    }
  });

  $("body #start_date").datepicker({
    dateFormat: "mm/dd/yy",
    dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
    changeMonth: true,
    changeYear: true,
    onSelect: function (dateText, inst) {
      $("body").find('#end_date').datepicker('option', 'minDate', dateText);
      $(this).parent().addClass('hasValueall');
      $(this).parent().removeClass('field-error');
      $(this).parent().find('.msg-error').html('');
    }
  });
});

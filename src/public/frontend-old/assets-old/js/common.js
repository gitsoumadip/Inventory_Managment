$(document).ready(function() {
  jQuery.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^[a-zA-Z\s_]+$/i.test(value);
  }, "Letters only please");

  jQuery.validator.addMethod("singleemail", function(value, element, params) {
    if (value != "") {
      var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/i;
      return re.test(value);
    } else {
      return true;
    }
  }, "Please enter a valid email address");

  $.validator.addMethod("checkalphabet", function(value) {
    return /[a-zA-Z]/.test(value);
  });

  $.validator.addMethod("checkdigit", function(value) {
    return /[0-9]/.test(value);
  });

  $.validator.addMethod("checkspecialcharacter", function(value) {
    return /([!,%,&,@,#,$,^,*,?,_,~])/.test(value);
  });

  $('.somespecialchar').keyup(function () {
    var yourInput = $(this).val();
    re = /[`~@#$%^*()+\=;:'"<>\{\}\[\]\\\/]/gi;
    var isSplChar = re.test(yourInput);
    if (isSplChar) {
      var no_spl_char = yourInput.replace(/[`~@#$%^*()+\=;:'"<>\{\}\[\]\\\/]/gi, '');
      $(this).val(no_spl_char);
    }
  });

  $('.my__account').click(function () {
    $('#user_login_form')[0].reset();
    $(".form-element").find('i').hide();
  });

  $("body").on("keyup", ".validfieldnumaric", function (e) {
    var yourInput = $(this).val();
    re =
    /[-`~!@#$%^&*()_|+\=?;:'",ABCDEFGHIJKLMNOPQRSTUVWXyzabcdefghijklmnopqrstuvwxyz<>\{\}\[\]\\\/]/gi;
    var isSplChar = re.test(yourInput);
    if (isSplChar) {
      var no_spl_char = yourInput.replace(
        /[-`~!@#$%^&*()_|+\=?;:'",ABCDEFGHIJKLMNOPQRSTUVWXyzabcdefghijklmnopqrstuvwxyz<>\{\}\[\]\\\/]/gi,
        ""
      );
      $(this).val(no_spl_char);
    }
  });

  $('.validemail').keyup(function () {
    var yourInput = $(this).val();
    re = /[`~!#$%^&*()|+\=?;:'",<>\{\}\[\]\\\/]/gi;
    var isSplChar = re.test(yourInput);
    if (isSplChar) {
      var no_spl_char = yourInput.replace(/[`~!#$%^&*()|+\=?;:'",<>\{\}\[\]\\\/]/gi, '');
      $(this).val(no_spl_char);
    }
  });

  $("body").on("keyup", ".validfieldnumaric", function (e) {
    var yourInput = $(this).val();
    re =
    /[-`~!@#$%^&*()_|+\=?;:'",ABCDEFGHIJKLMNOPQRSTUVWXyzabcdefghijklmnopqrstuvwxyz<>\{\}\[\]\\\/]/gi;
    var isSplChar = re.test(yourInput);
    if (isSplChar) {
      var no_spl_char = yourInput.replace(
        /[-`~!@#$%^&*()_|+\=?;:'",ABCDEFGHIJKLMNOPQRSTUVWXyzabcdefghijklmnopqrstuvwxyz<>\{\}\[\]\\\/]/gi,
        ""
      );
      $(this).val(no_spl_char);
    }
  });

  $("body").on("keyup", ".removedspace", function (e) {
    var val = $(this).val();
    $(this).val(val.trim());
  });

  jQuery.validator.addMethod("notEqual", function(value, element, param) {
    return this.optional(element) || value != param;
  });

  $(".select-search").select2({
    placeholder: "Please select",
    allowClear: true
  });

});

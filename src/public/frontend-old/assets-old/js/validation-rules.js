$(document).ready(function () {
    jQuery.validator.addMethod("noSpace", function (value, element) {
        if (value.length == 0) {
            return true;
        } else {
            return value.indexOf(" ") < 0 && value != "";
        }
    }, "Space are not allowed");

    jQuery.validator.addMethod("namevalidation", function (value, element, params) {
        result = true;
        if (value != "") {
            var re = /^[A-Za-z][A-Za-z0-9 ]*(?:_[A-Za-z0-9 ]+)*$/;
            result = re.test(value);
            return result;
        } else {
            return result;
        }
    }, jQuery.validator.messages.namevalidation);

    jQuery.validator.addMethod("customnamevalidation", function (value, element, params) {
        result = true;
        if (value != "") {
            var re = /^[A-Za-z][A-Za-z]*(?:_[A-Za-z]+)*$/;
            result = re.test(value);
            return result;
        } else {
            return result;
        }
    }, jQuery.validator.messages.customnamevalidation);

    jQuery.validator.addMethod("customemail", function (value, element, params) {
        //var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/i;
        if(value.length == 0){
            return true;
        }
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/i;

        return re.test(value);
    }, "Please enter a valid email address");

    jQuery.validator.addMethod("customcode", function (value, element, params) {
        var re = /^[A-Za-z][A-Za-z0-9_-]*(?:_[A-Za-z0-9_-]+)*$/;
        return re.test(value);
    }, "Please enter a valid code");

    jQuery.validator.addMethod("product_input", function (value, element, params) {
        result = true;
        if (value != "") {
            var re = /^[A-Za-z][A-Za-z0-9 &'\-()]*(?:_[A-Za-z0-9  &'\-()]+)*$/;
            result = re.test(value);
            return result;
        } else {
            return result;
        }
    }, jQuery.validator.messages.product_input);

    jQuery.validator.addMethod("numericcustomcode", function (value, element, params) {
        var re = /^[0-9A-Za-z0-9][0-9A-Za-z_-]*(?:_[0-9A-Za-z_-]+)*$/;
        return re.test(value);
    }, "Please enter valid Code.");


    jQuery.validator.addMethod("dollarsscents", function (value, element) {
        return this.optional(element) || /^\d{0,8}(\.\d{0,2})?$/i.test(value);
    }, "Please enter valid amount of maximum 2 decimal places.");

    jQuery.validator.addMethod("percentcheck", function (value, element) {
        var offert_type = $('#offer_on').find(":selected").text();
        // alert(offert_type);
        if (offert_type == "Percentage") {
            if (value > 99.99) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }, "Discount cannot be more than 99.99%.");

    jQuery.validator.addMethod("lengthcheck", function (value, element) {

        if (value.length > 15) {
            return false;
        } else {
            return true;
        }
    }, "Please enter less than 15 characters.");

    jQuery.validator.addMethod("mobcheck", function (value, element) {
        if(value.length == 0){
            return true;
        }
        if (value.length < 10 || value.length > 10) {
            return false;
        } else {
            return true;
        }
    }, "Please enter 10 digit mobile no.");

    jQuery.validator.addMethod("notazero", function (value, element, params) {
        if (Number(value) <= 0 && value != "") {
            return false;
        } else {
            var char_arr = value.split('');
            var spcl_arr = ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "=", "-", ",", "<", ">", ".", "/", "?", ";", ":", "'", "[", "]", "{", "}", "|", "0", " "]
            if (spcl_arr.includes(char_arr[0])) {
                return false;
            } else {
                return true;
            }
        }
    }, "Please enter valid amount.");

    jQuery.validator.addMethod("maxage", function (value, element, params) {
        result = true;
        if (value <= 100) {
            return true;
        } else {
            return false;
        }
    }, jQuery.validator.messages.maxage);

    jQuery.validator.addMethod("singleemail", function (value, element, params) {
        if (value != "") {
            var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/i;
            return re.test(value);
        } else {
            return true;
        }
    }, "Please enter a valid email address");

    jQuery.validator.addMethod(
        "multiemail",
        function (value, element, params) {
            if (value != "") {
                var email_id = value.split(/[,]+/); // split element by ,
                result = true;
                var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/i;
                for (var count in email_id) {
                    value = email_id[count];
                    result = re.test(value);
                }
                return result;
            } else {
                result = true;
                return result;
            }

        }, jQuery.validator.messages.multiemail
    );
});






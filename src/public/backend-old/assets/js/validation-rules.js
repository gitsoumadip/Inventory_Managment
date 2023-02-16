$(document).ready(function () {
    jQuery.validator.addMethod(
        "noSpace",
        function (value, element) {
            if (value.length == 0) {
                return true;
            } else {
                return value.indexOf(" ") < 0 && value != "";
            }
        },
        "Space are not allowed"
    );

    jQuery.validator.addMethod(
        "namevalidation",
        function (value, element, params) {
            result = true;
            if (value != "") {
                var re = /^[A-Za-z][A-Za-z0-9 ]*(?:_[A-Za-z0-9 ]+)*$/;
                result = re.test(value);
                return result;
            } else {
                return result;
            }
        },
        jQuery.validator.messages.namevalidation
    );

    jQuery.validator.addMethod(
        "customnamevalidation",
        function (value, element, params) {
            result = true;
            if (value != "") {
                var re = /^[A-Za-z][A-Za-z]*(?:_[A-Za-z]+)*$/;
                result = re.test(value);
                return result;
            } else {
                return result;
            }
        },
        jQuery.validator.messages.customnamevalidation
    );

    jQuery.validator.addMethod(
        "customemail",
        function (value, element, params) {
            //var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/i;
            if (value.length == 0) {
                return true;
            }
            var re =
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/i;

            return re.test(value);
        },
        "Please enter a valid email address"
    );

    jQuery.validator.addMethod(
        "customcode",
        function (value, element, params) {
            var re = /^[A-Za-z][A-Za-z0-9_-]*(?:_[A-Za-z0-9_-]+)*$/;
            return re.test(value);
        },
        "Please enter a valid code"
    );

    jQuery.validator.addMethod(
        "product_input",
        function (value, element, params) {
            result = true;
            if (value != "") {
                var re =
                    /^[A-Za-z][A-Za-z0-9 &'\-()]*(?:_[A-Za-z0-9  &'\-()]+)*$/;
                result = re.test(value);
                return result;
            } else {
                return result;
            }
        },
        jQuery.validator.messages.product_input
    );

    jQuery.validator.addMethod(
        "numericcustomcode",
        function (value, element, params) {
            if (value.length == 0) {
                return true;
            }
            var re = /^[0-9A-Za-z0-9][0-9A-Za-z_-]*(?:_[0-9A-Za-z_-]+)*$/;
            return re.test(value);
        },
        "Please enter valid Code"
    );

    jQuery.validator.addMethod(
        "dollarsscents",
        function (value, element) {
            return (
                this.optional(element) || /^\d{0,8}(\.\d{0,2})?$/i.test(value)
            );
        },
        "Please enter valid amount of maximum 2 decimal places"
    );

    jQuery.validator.addMethod(
        "percentcheck",
        function (value, element) {
            var offert_type = $("#offer_on").find(":selected").text();
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
        },
        "Discount cannot be more than 99.99%"
    );

    jQuery.validator.addMethod(
        "lengthcheck",
        function (value, element) {
            if (value.length > 15) {
                return false;
            } else {
                return true;
            }
        },
        "Please enter less than 15 characters"
    );

    jQuery.validator.addMethod(
        "mobcheck",
        function (value, element) {
            if (value.length == 0) {
                return true;
            }
            if (value.length < 10 || value.length > 10 || value[0] == 0) {
                return false;
            } else {
                return true;
            }
        },
        "Please enter valid 10 digit mobile no"
    );

    jQuery.validator.addMethod(
        "notazero",
        function (value, element, params) {
            if (Number(value) <= 0 && value != "") {
                return false;
            } else {
                var char_arr = value.split("");
                var spcl_arr = [
                    "~",
                    "`",
                    "!",
                    "@",
                    "#",
                    "$",
                    "%",
                    "^",
                    "&",
                    "*",
                    "(",
                    ")",
                    "_",
                    "+",
                    "=",
                    "-",
                    ",",
                    "<",
                    ">",
                    ".",
                    "/",
                    "?",
                    ";",
                    ":",
                    "'",
                    "[",
                    "]",
                    "{",
                    "}",
                    "|",
                    "0",
                    " ",
                ];
                if (spcl_arr.includes(char_arr[0])) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        "Please enter valid amount"
    );

    jQuery.validator.addMethod(
        "maxage",
        function (value, element, params) {
            result = true;
            if (value <= 100) {
                return true;
            } else {
                return false;
            }
        },
        jQuery.validator.messages.maxage
    );

    jQuery.validator.addMethod(
        "singleemail",
        function (value, element, params) {
            if (value != "") {
                var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/i;
                return re.test(value);
            } else {
                return true;
            }
        },
        "Please enter a valid email address"
    );

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
        },
        jQuery.validator.messages.multiemail
    );

    jQuery.validator.addMethod(
        "lettersonly",
        function (value, element) {
            return this.optional(element) || /^[a-zA-Z\s_]+$/i.test(value);
        },
        "Letters only please"
    );

    $.validator.addMethod("checkalphabet", function (value) {
        return /[a-zA-Z]/.test(value);
    });

    $.validator.addMethod("checkdigit", function (value) {
        return /[0-9]/.test(value);
    });

    $.validator.addMethod("checkspecialcharacter", function (value) {
        return /([!,%,&,@,#,$,^,*,?,_,~])/.test(value);
    });

    $(".somespecialchar").keyup(function () {
        var yourInput = $(this).val();
        re = /[`~@#$%^*()+\=;:'"<>\{\}\[\]\\\/]/gi;
        var isSplChar = re.test(yourInput);
        if (isSplChar) {
            var no_spl_char = yourInput.replace(
                /[`~@#$%^*()+\=;:'"<>\{\}\[\]\\\/]/gi,
                ""
            );
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

    $(".validemail").keyup(function () {
        var yourInput = $(this).val();
        re = /[`~!#$%^&*()|+\=?;:'",<>\{\}\[\]\\\/]/gi;
        var isSplChar = re.test(yourInput);
        if (isSplChar) {
            var no_spl_char = yourInput.replace(
                /[`~!#$%^&*()|+\=?;:'",<>\{\}\[\]\\\/]/gi,
                ""
            );
            $(this).val(no_spl_char);
        }
    });

    $("body").on("keyup", ".removedspace", function (e) {
        var val = $(this).val();
        $(this).val(val.trim());
    });

    // Copied from additional methods
    //========================================================

    // Accept a value from a file input based on a required mimetype
    $.validator.addMethod(
        "accept",
        function (value, element, param) {
            // Split mime on commas in case we have multiple types we can accept
            var typeParam =
                    typeof param === "string"
                        ? param.replace(/\s/g, "")
                        : "image/*",
                optionalValue = this.optional(element),
                i,
                file,
                regex;

            // Element is optional
            if (optionalValue) {
                return optionalValue;
            }

            if ($(element).attr("type") === "file") {
                // Escape string to be used in the regex
                // see: http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
                // Escape also "/*" as "/.*" as a wildcard
                typeParam = typeParam
                    .replace(/[\-\[\]\/\{\}\(\)\+\?\.\\\^\$\|]/g, "\\$&")
                    .replace(/,/g, "|")
                    .replace(/\/\*/g, "/.*");

                // Check if the element has a FileList before checking each file
                if (element.files && element.files.length) {
                    regex = new RegExp(".?(" + typeParam + ")$", "i");
                    for (i = 0; i < element.files.length; i++) {
                        file = element.files[i];

                        // Grab the mimetype from the loaded file, verify it matches
                        if (!file.type.match(regex)) {
                            return false;
                        }
                    }
                }
            }

            // Either return true because we've validated each file, or because the
            // browser does not support element.files and the FileList feature
            return true;
        },
        $.validator.format("Please enter a valid file")
    );

    // Added by Pritam
    $.validator.addMethod(
        "contains",
        function (value, element, param) {
            if (value.length == 0) {
                return true;
            }
            return typeof value === "string" ? value.includes(param) : false;
        },
        "Please enter valid string"
    );

    $.validator.addMethod('filesize', function (value, element, param) {
        return this.optional(element) || (element.files[0].size <= param*1000000)
    }, 'File size must be less than {0} MB');
});

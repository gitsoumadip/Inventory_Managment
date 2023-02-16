$(document).ready(function () {
    // Remember Me
    var email = localStorage.email;
    var password = localStorage.password;
    if (email != "" && password != "") {
        $("body #email_address").val(email);
        $("body #password").val(password);
        $("body #remember_me").prop("checked", true);
        $("body #remember_me").val("1");
    } else {
        $("body #remember_me").val("0");
    }
    $("#remember_me").on("click", function () {
        var remember_me = $(this).val();
        if (remember_me == "0") {
            $(this).val("1");
        } else if (remember_me == "1") {
            $(this).val("0");
        }
    });
    $("#submit_button").on("click", function () {
        var remember_button_value = $("#remember_me").val();
        if (remember_button_value == "1") {
            localStorage.email = $('input[id="email_address"]').val();
            localStorage.password = $('input[name="password"]').val();
        } else if (remember_button_value == "0") {
            localStorage.email = "";
            localStorage.password = "";
        }
    });
    // Remember Me

    // space validation
    $(".sp_validate").on("keypress", function (e) {
        if (e.which === 32 && !this.value.length) e.preventDefault();
    });

    $(".number_only").bind("keydown", function (event) {
        let key = event.keyCode;
        if (
            (key >= 48 && key <= 57) || // Allow number line
            (key >= 96 && key <= 105) || // Allow number pad
            key == 8 || //Allow backspace
            key == 9 || // Allow tab
            key == 13 || // Allow enter
            key == 46 // Allow delete
        ) {
            // Do not perform any event
        } else {
            event.preventDefault();
        }
    });

    $(".number_only").bind("drop", function (e) {
        e.preventDefault();
    });

    $(".number_only").bind("contextmenu", function (e) {
        return false;
    });
    // timer for resend otp
    const resendTimer = () => {
        let counter = 30;
        $("#resend_otp_button").attr("disabled", true);
        $("#resend_otp_button").text(`Resend OTP (${counter})`);

        let setCounter = setInterval(() => {
            if (counter > 0) {
                counter--;
                $("#resend_otp_button").text(`Resend OTP (${counter})`);
            }
        }, 1000);
        setTimeout(() => {
            clearInterval(setCounter);
            $("#resend_otp_button").attr("disabled", false);
            $("#resend_otp_button").text(`Resend OTP`);
        }, 1000 * counter);
    };

    //Login form validation
    $("#login").validate({
        errorElement: "i",
        errorClass: "msg msg-error",
        rules: {
            password: "required",
            email_address: {
                required: true,
                customemail: true,
                noSpace: true,
            },
        },
        messages: {
            password: "Please enter password",
            email_address: {
                required: "Please enter email",
                customemail: "Please enter valid email",
                noSpace: "Space are not allowed",
            },
        },
        submitHandler: function (form) {
            var url = $(form).attr("action");
            var data = new FormData(form);
            data.append("_token", $('meta[name="_token"]').attr("content"));
            let btn = $(form).find('button[type="submit"]');
            let btnTxt = btn.html();
            btn.attr("disabled", true);
            btn.html(`Please Wait ...`);
            $.ajax({
                type: "POST",
                url,
                data,
                cache: false,
                contentType: false,
                processData: false,
                beforeSend: function () {
                    $("#loader").show();
                },
                success: function (res) {
                    if (res.success == true) {
                        $("#return_id").val(res.key);
                        $("#login_screen").hide();
                        $("#otp_screen").show();
                        $("#forgot_password_screen").hide();

                        resendTimer();
                    } else {
                        if (
                            res.login_attept_error != "" &&
                            res.login_attept_error == true
                        ) {
                            $("#login_error_message")
                                .html(res.message)
                                .css({
                                    color: "red",
                                    "font-size": "14px",
                                    "margin-bottom": "10px",
                                    position: "relative",
                                })
                                .show();
                            $("#email_address_error").html("");
                        } else {
                            $.each(res.message, function (key, value) {
                                $("#" + key + "_error")
                                    .html(value)
                                    .css({
                                        color: "red",
                                        "font-size": "14px",
                                        "margin-top": "10px",
                                    });
                                $("#login_error_message").html("");
                            });
                        }
                        btn.html(`Login`);
                        btn.attr("disabled", false);
                    }
                },
                complete: function () {
                    setTimeout(() => {
                        $("#loader").hide();
                    }, 1000);
                },
                error: function (xhr, x) {
                    // btn.attr('disabled',false);
                    // btn.html(btnTxt);
                },
            });
        },
    });
    //Login form validation

    // OTP form validation
    $("#otps_form").validate({
        errorElement: "i",
        errorClass: "msg msg-error",
        rules: {
            otp: {
                required: true,
                minlength: 4,
                maxlength: 4,
            },
        },
        messages: {
            otp: {
                required: "Please enter OTP",
                minlength: "OTP should be 4 digit",
                maxlength: "OTP should be 4 digit",
            },
        },
        submitHandler: function (form) {
            var url = $(form).attr("action");
            var data = new FormData(form);
            data.append("_token", $('meta[name="_token"]').attr("content"));
            let btn = $(form).find('button[type="submit"]');
            let btnTxt = btn.html();
            $(".otp_message").html("").css(["display : none"]);
            btn.attr("disabled", true);
            btn.html(`Please Wait ...`);
            $.ajax({
                type: "POST",
                url,
                data,
                cache: false,
                contentType: false,
                processData: false,
                beforeSend: function () {
                    $("#loader").show();
                },
                success: function (res) {
                    if (res.success == false) {
                        if (res.otp_error != "" && res.otp_error == true) {
                            // resend OTP open
                            $("#otp_error_message").html(res.message).css({
                                color: "red",
                                "font-size": "14px",
                                "margin-bottom": "-4px",
                                "text-align": "left"
                            }).show();
                            setTimeout(() => {
                                $("#otp_error_message").html("").hide();
                            }, 3000);
                            $("#otp").focus();

                            btn.attr("disabled", false);
                            btn.html(btnTxt);
                        }else{
                            $("#otp_error_message").html("Please try again").css({
                                color: "red",
                                "font-size": "14px",
                                "margin-bottom": "-4px",
                                "text-align": "left"
                            }).show();
                            setTimeout(() => {
                                $("#otp_error_message").html("").hide();
                            }, 3000);
                            btn.attr("disabled", false);
                            btn.html(btnTxt);
                        }
                    } else if (res.success == true) {
                        window.location.href = res.redirect_url;
                    }
                },
                complete: function () {},
                error: function (xhr, x) {
                    btn.attr("disabled", false);
                    btn.html(btnTxt);
                },
            });
        },
    });

    // resend OTP
    $("#resend_otp_button").click(() => {
        $("#otp_error_message").html("").hide();
        $.ajax({
            url: SITE_URL + "auth/resend-otp",
            type: "POST",
            data: {
                return_id: $('input[name="return_id"]').val(),
            },
            dataType: "json",
            beforeSend: function () {
                $("#loader").show();
                $("#resend_otp_button").attr("disabled", true);
                $("#resend_otp_button").text(`Sending...`);
            },
            success: function (resp) {
                if (resp.success == true) {
                    $("#otp_error_message")
                        .html(resp.message)
                        .css({
                            color: "green",
                            "font-size": "14px",
                            "margin-bottom": "-4px",
                            "text-align": "left"
                        })
                        .show();
                    resendTimer();
                } else {
                    $("#otp_error_message")
                        .html(resp.message)
                        .css({
                            color: "red",
                            "font-size": "14px",
                            "margin-bottom": "-4px",
                            "text-align": "left"
                        })
                        .show();
                    $("#resend_otp_button").attr("disabled", true);
                    $("#resend_otp_button").text(`Resend OTP`);
                }
            },
            complete: function () {
                $("#loader").hide();
            },
            error: function (xhr, errorStatus, errorMessage) {
                console.log(xhr);
            },
        });
    });

    // Return to login button event handler
    $(document).on("click", ".return_login_btn", function () {
        $("#otp_screen").hide();
        $("#forgot_password_screen").hide();
        $("#forgot_password_error_message").html("").removeAttr("style");
        $("#login_screen").show();
    });

    // forgot password button event handler
    $(document).on("click", ".forgot_password_btn", function () {
        $("#login_screen").hide();
        $("#otp_screen").hide();
        if ($("#email_address").val() != "") {
            $("#forgot_email").val($("#email_address").val());
        }
        $("#forgot_password_screen").show();
        $("#forgot_email").focus();
    });

    // forgot password
    $("#forgot_password_form").validate({
        errorElement: "i",
        errorClass: "msg msg-error",
        rules: {
            forgot_email: {
                required: true,
                customemail: true,
            },
        },
        messages: {
            forgot_email: {
                required: "Please enter your registered email id",
                customemail: "Please enter valid email",
            },
        },
        submitHandler: function (form) {
            var url = SITE_URL + "auth/forgot-password";
            var data = new FormData(form);
            let btn = $(form).find('button[type="submit"]');
            let btnTxt = btn.html();
            btn.attr("disabled", true);
            btn.html(`Please Wait ...`);
            $.ajax({
                type: "POST",
                url,
                data,
                cache: false,
                contentType: false,
                processData: false,
                beforeSend: function () {
                    $("#loader").show();
                },
                success: function (res) {
                    if (res.success == false) {
                        if (res.is_validation_errors == true) {
                            $("#forgot_password_error_message")
                                .html(res.message)
                                .css({
                                    color: "green",
                                    "font-size": "14px",
                                    "margin-bottom": "-4px",
                                    "text-align": "left"
                                });
                            $("#forgot_email").focus();
                            $("#forgot_password_button")
                                .prop("disabled", false)
                                .html("Submit");
                        } else {
                            $("#forgot_password_error_message")
                                .html(res.message)
                                .css({
                                    color: "red",
                                    "font-size": "14px",
                                    "margin-bottom": "-4px",
                                    "text-align": "left"
                                });
                            $("#forgot_email").focus();
                            $("#forgot_password_button")
                                .prop("disabled", false)
                                .html("Submit");
                        }
                    } else if (res.success == true) {
                        $("#forgot_password_error_message")
                            .html(res.message)
                            .css({
                                color: "green",
                                "font-size": "14px",
                                "margin-bottom": "-4px",
                                "text-align": "left"
                            });
                        $("#forgot_password_button")
                            .prop("disabled", false)
                            .html("Submit");
                        // setTimeout( () => {
                        // 	window.location.reload();
                        // },2000);
                    }
                },
                complete: function () {
                    $("#loader").hide();
                },
                error: function (xhr, x) {
                    btn.attr("disabled", false);
                    btn.html(btnTxt);
                },
            });
        },
    });

    $(document).on("click", ".bckLog", function () {
        $("#email_id").val("");
    });

    $(document).on("click", ".bckLog", function () {
        $("#email_id").val("");
    });
});

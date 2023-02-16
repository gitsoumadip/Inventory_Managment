$(document).ready(function () {
    // space validation
    $(".sp_validate").on("keypress", function (e) {
        if (e.which === 32 && !this.value.length) e.preventDefault();
    });

    //Login form validation
    $("#forgot_password_form").validate({
        errorElement: "i",
        errorClass: "msg msg-error",
        rules: {
            password: {
                required: true,
                minlength: 5,
            },
            confirm_password: {
                required: true,
                equalTo: "#password",
            },
        },
        messages: {
            password: {
                required: "Please enter password",
                minlength: "Password should be greater than 5 character",
            },
            confirm_password: {
                required: "Please enter confirm password",
                equalTo: "Confirm password is not matched with new password",
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
                success: function (resp) {
                    if (resp.success == true) {
                        $('#show_success_message').html(resp.message).css({
                            "color": 'green',
                            'font-size': '16px',
                        });
                        $('#submit_button').html('Submit').attr("disabled", false);
                        setTimeout(() => {
                            window.location = SITE_URL+"DVK-1122";
                        }, 2000);
                    } else {
                        $('#show_success_message').html('').css({
                            "color": 'red',
                            'font-size': '16px',
                        });
                        $('#submit_button').html('Submit').attr("disabled", false);
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

    $(document).on("click", ".bckLog", function () {
        $("#email_id").val("");
    });
});

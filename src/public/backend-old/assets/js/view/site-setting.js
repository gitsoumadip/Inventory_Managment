$(document).ready(function () {
    // Form Validations
    $("#modalForm").validate({
        errorElement: "i",
        errorClass: "msg msg-error",
        rules: {
            site_url: {
                required: true,
                rangelength: [3, 100],
                noSpace: true,
                url: true,
            },
            name: {
                required: true,
                rangelength: [3, 100],
            },
            logo: {
                accept: "jpg,jpeg,png,ico,bmp",
                filesize: 1,
            },
            address: {
                rangelength: [3, 200],
            },
            email: {
                noSpace: true,
                customemail: true,
            },
            mobile_1: {
                required: true,
                mobcheck: true,
                noSpace: true,
            },
            mobile_2: {
                mobcheck: true,
                noSpace: true,
            },
            gst: {
                numericcustomcode: true,
                rangelength: [15, 15],
            },
            facebook: {
                rangelength: [3, 100],
                noSpace: true,
                contains: "facebook.com",
                url: true,
            },
            twitter: {
                rangelength: [3, 100],
                noSpace: true,
                url: true,
                contains: "twitter.com",
            },
            instagram: {
                rangelength: [3, 100],
                noSpace: true,
                url: true,
                contains: "instagram.com",
            },
            youtube: {
                rangelength: [3, 100],
                noSpace: true,
                url: true,
                contains: "youtube.com",
            },
        },
        messages: {
            site_url: {
                required: "Please enter site URL",
                rangelength:
                    "Site URL must be between 3 to 100 characters long",
                noSpace: "Space is not allowed",
                url: "Enter a valid URL",
            },
            name: {
                required: "Please enter site name",
                rangelength: "Name must be between 3 to 100 characters long",
            },
            logo: {
                accept: "Please select valid image",
            },
            address: {
                rangelength: "Address must be between 3 to 200 characters long",
            },
            email: {
                noSpace: "Space is not allowed",
                customemail: "Please enter a valid email",
            },
            mobile_1: {
                required: "Please enter mobile number",
                noSpace: "Space is not allowed",
            },
            mobile_2: {
                noSpace: "Space is not allowed",
            },
            gst: {
                numericcustomcode: "Please enter valid GST number",
                rangelength: "Please enter a 15 digit GST number",
            },
            facebook: {
                rangelength:
                    "Facebook handler must be between 3 to 100 characters long",
                noSpace: "Space is not allowed",
                contains: "Please enter a valid URL",
                url: "Enter a valid URL",
            },
            twitter: {
                rangelength:
                    "Twitter handler must be between 3 to 100 characters long",
                noSpace: "Space is not allowed",
                contains: "Please enter a valid URL",
                url: "Enter a valid URL",
            },
            instagram: {
                rangelength:
                    "Instagram handler must be between 3 to 100 characters long",
                noSpace: "Space is not allowed",
                contains: "Please enter a valid URL",
                url: "Enter a valid URL",
            },
            youtube: {
                rangelength:
                    "Youtube handler must be between 3 to 100 characters long",
                noSpace: "Space is not allowed",
                contains: "Please enter a valid URL",
                url: "Enter a valid URL",
            },
        },
        submitHandler: function (form) {
            let btn = $(form).find('button[type="submit"]');
            btn.attr("disabled", true);
            btn.html(`Please Wait ...`);
            form.submit();
        },
    });
});

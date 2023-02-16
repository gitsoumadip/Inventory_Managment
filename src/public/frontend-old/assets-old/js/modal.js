let vmodalTarget;

function closeModal() {
    jQuery(".sundew-ui--modal").removeClass("showing-modal"), jQuery("body").removeClass("bound"), vmodalTarget && jQuery(vmodalTarget).find("iframe").attr("src", "")
}
$(document).ready((function() {
    jQuery("body").on("click", ".sundew-ui--modal-bg", (function() {
        closeModal()
    })), jQuery("body").keyup((function(a) {
        27 == a.keyCode && closeModal()
    })), jQuery("body").on("click", (a => {
        if (jQuery(a.target).attr("data-modal") != undefined) {
          $('#customer_register')[0].reset();
          $('#forgot_password_form')[0].reset();
          $('#user_login_form')[0].reset();
          $(".form-element").find('i').hide();
          $('.customer_register_otp_from, .customer_login_otp_from').hide();
          $('.customer_register_from, .customer_login_from').show();
        }
        let t = jQuery(a.target).attr("data-modal") ? jQuery(a.target).attr("data-modal") : jQuery(a.target).closest("[data-modal]").attr("data-modal");
        t && (jQuery("body").find(".sds-ui--modal.showing-modal").removeClass("showing-modal"), jQuery("body").find(t).addClass("showing-modal"), jQuery("body").addClass("bound"))
    })),
    jQuery("body").on("click", ".sds-modal-exit", (function() {
        jQuery("body").find(".sundew-ui--modal").removeClass("showing-modal"),
        jQuery("body").removeClass("bound")
    }))
}));

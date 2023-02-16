let vmodalTarget;

function closeModal() {
    jQuery(".sundew-ui--modal").removeClass("showing-modal"), jQuery("body").removeClass("bound"), vmodalTarget && jQuery(vmodalTarget).find("iframe").attr("src", "")
}
$(document).ready((function() {
    jQuery("body").on("click", ".sundew-ui--modal-bg-action", (function() {
        closeModal()
    })), jQuery("body").keyup((function(a) {
        27 == a.keyCode && closeModal()
    })), jQuery("body").on("click", (a => {
        let t = jQuery(a.target).attr("data-modal") ? jQuery(a.target).attr("data-modal") : jQuery(a.target).closest("[data-modal]").attr("data-modal");
        t && (jQuery("body").find(".sds-ui--modal.showing-modal").removeClass("showing-modal"), jQuery("body").find(t).addClass("showing-modal"), jQuery("body").addClass("bound"))
    })), 
    jQuery("body").on("click", ".sds-modal-exit", (function() {
        jQuery("body").find(".sundew-ui--modal").removeClass("showing-modal"), 
        jQuery("body").removeClass("bound")
    }))
    // code appended by pritam 
    $("body").on("click", ".sds-cropper-modal-exit", (function() {
        // $(this).closest(".center-cropper-modal").hide(500)
        $(this).closest(".center-cropper-modal").removeClass("showing-modal"), 
        jQuery("body").removeClass("bound")
    }))
}));

// code appended by pritam 
function openRightModal() {
    $("#modal--right").addClass('showing-modal');
}
function openCenterCropperModal() {
    $(".center-cropper-modal").addClass('showing-modal');
}
function closeRequiredModal(className) {
    jQuery("."+className).removeClass("showing-modal"), jQuery("body").removeClass("bound"), vmodalTarget && jQuery(vmodalTarget).find("iframe").attr("src", "")
}
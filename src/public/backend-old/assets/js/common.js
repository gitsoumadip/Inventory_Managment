$(document).ready(function () {
    // Setting position for all alertify toast
    alertify.set("notifier", "position", "top-right");

    // on form reset removing file show paragraph content inside it
    $(document).on("reset", "form", function () {
        $(this).find("p.file-show").text("");
    });

    // opening Right Modal
    $("#openModalButton").click(() => {
        openRightModal();
    });

    // Run search for the datatable
    $("#searchTable").submit(function (e) {
        dataTable.ajax.reload();
        e.preventDefault();
    });

    // Run clear search for the datatable
    $("#clearSearch").click(function () {
        $("#searchTable")[0].reset();
        dataTable.ajax.reload();
    });

    // For checking all single checkbox in tables
    $(document).on("change", ".all_check", function () {
        if ($(this).prop("checked") == true) {
            $(".single_check").prop("checked", true);
        } else if ($(this).prop("checked") == false) {
            $(".single_check").prop("checked", false);
        }
        showHideDeleteButton();
    });
    $(document).on("change", ".single_check", function () {
        showHideDeleteButton();
    });

    // Check if any of the delete checkbox selected or not and show/hide delete button
    function showHideDeleteButton() {
        let ifChecked = false;
        $(".single_check").is(function (index, element) {
            if ($(element).prop("checked")) {
                ifChecked = true;
            }
        });
        ifChecked
            ? $("#deleteChecked").css("display", "flex")
            : $("#deleteChecked").css("display", "none");
    }
    // FIELD VALIDATION //
    $(".remove_special_characters").keyup(function () {
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
    
    $(".validfieldnumaric").keyup(function () {
        var yourInput = $(this).val();
        re =
            /[-`~!@#$%^&*()_|+\=?;:'",ABCDEFGHIJKLMNOPQRSTUVWXyzabcdefghijklmnopqrstuvwxyz.<>\{\}\[\]\\\/]/gi;
        var isSplChar = re.test(yourInput);
        if (isSplChar) {
            var no_spl_char = yourInput.replace(
                /[-`~!@#$%^&*()_|+\=?;:'",ABCDEFGHIJKLMNOPQRSTUVWXyzabcdefghijklmnopqrstuvwxyz.<>\{\}\[\]\\\/]/gi,
                ""
            );
            $(this).val(no_spl_char);
        }
    });

    // below code added by CPC//
    $(".no_space").keydown(function (e) {
        if (e.keyCode == 32) {
            $(this).val($(this).val() + "-"); // append '-' to input
            return false; // return false to prevent space from being added
        }
    });
    //Above code added by CPC//

    //Below code added by CPC //
    $(".validfieldnumaricbutallowdot").keyup(function () {
        var yourInput = $(this).val();
        re =
            /[-`~!@#$%^&*()_|+\=?;:'",ABCDEFGHIJKLMNOPQRSTUVWXyzabcdefghijklmnopqrstuvwxyz<>\{\}\[\]\\\/]/gi;
        var isSplChar = re.test(yourInput);
        if (isSplChar) {
            var no_spl_char = yourInput.replace(
                /[-`~!@#$%^&*()_|+\=?;:'",ABCDEFGHIJKLMNOPQRSTUVWXyzabcdefghijklmnopqrstuvwxyz.<>\{\}\[\]\\\/]/gi,
                ""
            );
            $(this).val(no_spl_char);
        }
    });

    //Above code added by CPC //

    $(".first_spac").keyup(function () {
        var yourInput = $(this).val();
        console.log(yourInput.length);
        re = /\s/g;
        var isSplChar = re.test(yourInput);
        if (isSplChar && yourInput.length == 1) {
            var no_spl_char = yourInput.replace(/\s/g, "");
            $(this).val(no_spl_char);
        }
    });

    $(".validfieldtelno").keyup(function () {
        var yourInput = $(this).val();
        re =
            /[`~!@#$%^&*_|+\=?;:'",ABCDEFGHIJKLMNOPQRSTUVWXyzabcdefghijklmnopqrstuvwxyz.<>\{\}\[\]\\\/]/gi;
        var isSplChar = re.test(yourInput);
        if (isSplChar) {
            var no_spl_char = yourInput.replace(
                /[`~!@#$%^&*_|+\=?;:'",ABCDEFGHIJKLMNOPQRSTUVWXyzabcdefghijklmnopqrstuvwxyz.<>\{\}\[\]\\\/]/gi,
                ""
            );
            $(this).val(no_spl_char);
        }
    });
    //Below Code Added by CPC For Store Sub Module//
    $(".validfieldtelnoallowsplchar").keyup(function () {
        var yourInput = $(this).val();
        re = /[ABCDEFGHIJKLMNOPQRSTUVWXyzabcdefghijklmnopqrstuvwxyz]/gi;
        var isSplChar = re.test(yourInput);
        if (isSplChar) {
            var no_spl_char = yourInput.replace(
                /[ABCDEFGHIJKLMNOPQRSTUVWXyzabcdefghijklmnopqrstuvwxyz]/gi,
                ""
            );
            $(this).val(no_spl_char);
        }
    });
    //Above Code Added By CPC For Store Sub Module//
    $(".validfielddatepicker").keyup(function () {
        var yourInput = $(this).val();
        re =
            /[-`~!@#$%^&*()_|+\=?;:'",1234567890ABCDEFGHIJKLMNOPQRSTUVWXyzabcdefghijklmnopqrstuvwxyz.<>\{\}\[\]\\\/]/gi;
        var isSplChar = re.test(yourInput);
        if (isSplChar) {
            var no_spl_char = yourInput.replace(
                /[-`~!@#$%^&*()_|+\=?;:'",1234567890ABCDEFGHIJKLMNOPQRSTUVWXyzabcdefghijklmnopqrstuvwxyz.<>\{\}\[\]\\\/]/gi,
                ""
            );
            $(this).val(no_spl_char);
        }
    });
    $(".validfield").keyup(function () {
        var yourInput = $(this).val();
        re = /[`~!@#$%^&*|+\=?;:'",.<>\{\}\[\]\\\/]/gi;
        var isSplChar = re.test(yourInput);
        if (isSplChar) {
            var no_spl_char = yourInput.replace(
                /[`~!@#$%^&*|+\=?;:'",.<>\{\}\[\]\\\/]/gi,
                ""
            );
            $(this).val(no_spl_char);
        }
    });
    $(".validfieldonlychar").keyup(function () {
        var yourInput = $(this).val();
        re = /[1234567890]/gi;
        var isSplChar = re.test(yourInput);
        if (isSplChar) {
            var no_spl_char = yourInput.replace(/[1234567890]/gi, "");
            $(this).val(no_spl_char);
        }
    });

    $(".validfieldallowdot").keyup(function () {
        var yourInput = $(this).val();
        re = /[`~!@#$%^&*|+\=?;:'",<>\{\}\[\]\\\/]/gi;
        var isSplChar = re.test(yourInput);
        if (isSplChar) {
            var no_spl_char = yourInput.replace(
                /[`~!@#$%^&*|+\=?;:'",<>\{\}\[\]\\\/]/gi,
                ""
            );
            $(this).val(no_spl_char);
        }
    });
    // Below Code Added by CPC //
    $(".validfieldallowspcchr").keyup(function () {
        var yourInput = $(this).val();
        re = /[`1234567890]/gi;
        var isSplChar = re.test(yourInput);
        if (isSplChar) {
            var no_spl_char = yourInput.replace(/[`1234567890]/gi, "");
            $(this).val(no_spl_char);
        }
    });

    // Above Code Added By CPC //
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
    $(".validfieldtextarea").keyup(function () {
        var yourInput = $(this).val();
        re = /[`~!#$%^|+\=;<>\{\}\[\]\\\/]/gi;
        var isSplChar = re.test(yourInput);
        if (isSplChar) {
            var no_spl_char = yourInput.replace(
                /[`~!#$%^|+\=;<>\{\}\[\]\\\/]/gi,
                ""
            );
            $(this).val(no_spl_char);
        }
    });

    $(".validfieldtextarea_promo").keyup(function () {
        var yourInput = $(this).val();
        re = /[`~!@#$^&()|+\=;<>\{\}\[\]\\\/]/gi;
        var isSplChar = re.test(yourInput);
        if (isSplChar) {
            var no_spl_char = yourInput.replace(
                /[`~!@#$^&()|+\=;<>\{\}\[\]\\\/]/gi,
                ""
            );
            $(this).val(no_spl_char);
        }
    });

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
    $(".validfieldnumaric_rate").keyup(function () {
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
    // FIELD VALIDATION //
    $(".first_space").on("keypress", function (e) {
        if (e.which === 32 && !this.value.length) e.preventDefault();
    });

    $(".numeric").keyup(function () {
        var val = $(this).val();
        $(this).val(val.replace(/[^a-zA-Z0-9]+/gi, ""));
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

    // $('.mobile_format').bind('keydown', function(event) {
    // 	let key = event.keyCode;
    // 	if((key >= 48 && key <= 57) || // Allow number line
    // 		(key >= 96 && key <= 105) ||  // Allow number pad
    // 		(key == 8)
    // 	){
    // 		let phone_no = $(this).val();
    // 		if(phone_no.length < 9){
    // 			$('#profile_mobile_number_error').html("Contact number should be 10 digit").css({
    // 				'color': 'red',
    // 			});
    // 		}else if(phone_no.length > 9){
    // 			$('#profile_mobile_number_error').html("Contact number not be greater than 10 digit").css({
    // 				'color': 'red',
    // 			});
    // 		}else{
    // 			$('#profile_mobile_number_error').html('');
    // 		}
    // 	}else{
    // 		$(this).val('');
    // 	}
    // });

    $(".number_only").bind("drop", function (e) {
        e.preventDefault();
    });

    $(".number_only").bind("contextmenu", function (e) {
        return false;
    });

    $(document).on("click", ".status-change", function () {
        let name = $(this).attr("data-name");
        let status = $(this).attr("data-status");
        let id = $(this).attr("data-id");
        // alert(name + " | "+ status+ " | "+  id+" | "+ moduleName+" | ");
        // return false;
        let message = "";
        if (status == 0) {
            message = `Are you sure you want to change the status to INACTIVE for ${name}?`;
        } else if (status == 1) {
            message = `Are you sure you want to change the status to ACTIVE for ${name}?`;
        } else if (status == 2) {
            message = `Are you sure you want to change the status to DRAFT for ${name}?`;
        }

        let obj = {};
        obj.code = MODULE_CODE;
        obj.id = id;
        obj.status = status;

        alertify.confirm(
            "Alert!",
            message,
            () => {
                $(this).children("span").text("Please wait...");
                $(this).attr("disabled", true);
                $(this).children("span").attr("disabled", true);
                changeStatus(obj);
            },
            () => {}
        );
    });
});

// Getting select box Records via ajax call and putting them to target select field
function getRecordsAjax(mode, master_id, target, current_id) {
    // getting records via ajax call
    $.post(
        `${SITE_URL}ajax/get-records`,
        {
            mode: mode,
            id: master_id,
        },
        (res) => {
            if (res.code == 1) {
                let values = res.result;
                // Setting values to the target
                $("#" + target).html(`<option value="">Select</option>`);
                values.forEach((record) => {
                    $("#" + target).append(
                        $("<option></option>")
                            .attr("value", record.id)
                            .text(record.name)
                    );
                });
                // setting value for edit form
                if (current_id) {
                    $("#" + target).val(current_id);
                }
            } else {
                alertify.error(res.message);
            }
        }
    ).fail((e) => {
        alertify.error("Some error ocurred! Please try again.");
    });
}

// Convert Sql date to dd/mm/YYYY
function convertDateFromSql(mySqlDate) {
    let date = new Date(mySqlDate);
    return (
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
}

// Function to run ajax in jquery validate
const ajaxJqueryValidateSubmit = (form, data, noRefreshDataTable) => {
    event.preventDefault();
    var url = $(form).attr("action");
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
        beforeSend: function () {},
        success: function (res) {
            if (res.code == 1) {
                alertify.success(res.message);
                form.reset();
                $("#modal--right").removeClass("showing-modal");
                !noRefreshDataTable ? dataTable.ajax.reload(null, false) : "";
            } else {
                alertify.error(res.message);
            }
            btn.attr("disabled", false);
            btn.html(btnTxt);
        },
        complete: function () {
            btn.attr("disabled", false);
            btn.html(btnTxt);
        },
        error: function (xhr, x) {
            btn.attr("disabled", false);
            btn.html(btnTxt);
        },
    });
};

// Delete with form via anchor with data-href attribute
// Delete Confirmation and Firing Delete form
function confirmDelete(elm) {
    alertify.confirm(
        "Alert!",
        "Are You sure to Delete This?",
        () => {
            // creating form fields
            let url = $(elm).attr("data-href");
            let token = $('meta[name="_token"]').attr("content");

            $.ajax({
                type: "DELETE",
                url,
                data: {
                    _token: token,
                },
                cache: false,
                contentType: false,
                processData: false,
                beforeSend: function () {},
                success: function (res) {
                    if (res.code == 1) {
                        alertify.success(res.message);
                        dataTable.ajax.reload(null, false);
                    } else {
                        alertify.error(res.message);
                    }
                },
                complete: function () {},
                error: function (xhr, x) {},
            });
        },
        () => {}
    );
}

// function for confirming and deleting multiple records by id
function confirmDeleteMultiple(module) {
    let deleteArr = [];
    $(".single_check").each(function () {
        $(this).prop("checked") ? deleteArr.push($(this).val()) : "";
    });
    if (deleteArr.length == 0) {
        alertify.error("Please Select the items you want to delete");
        return;
    }
    alertify.confirm(
        "Alert!",
        "Are You sure to Delete these items?",
        () => {
            $.ajax({
                url: `${SITE_URL}admin/${module}/delete_multiple`,
                method: "DELETE",
                data: {
                    delete_array: deleteArr,
                },
                success: function (res) {
                    res.code == 1
                        ? alertify.success(res.message)
                        : alertify.error(res.message);
                    dataTable.ajax.reload(null, false);
                    $("#deleteChecked").css("display", "none");
                    $(".all_check").prop("checked", false);
                },
            });
        },
        () => {}
    );
}
//  This function is for submitting via form not ajax
// function confirmDelete(elm) {
// 	alertify.confirm('Alert!', 'Are You sure to Delete This?', () => {
// 		// creating form element
// 		let form = $('<form>', {
// 			'method': 'POST',
// 			'action': $(elm).attr("data-href")
// 		});

// 		// creating form fields
// 		let token =
// 			$('<input>', {
// 				'type': 'hidden',
// 				'name': '_token',
// 				'value': $('meta[name="_token"]').attr('content')
// 			});
// 		let method =
// 			$('<input>', {
// 				'name': '_method',
// 				'type': 'hidden',
// 				'value': 'DELETE'
// 			});

// 		// Appending fields to form
// 		form.append(token, method).appendTo('body');
// 		//Submitting the form
// 		form.submit();
// 	}, () => { });
// }

//Reset CK Editor Instances

// Call ajax for changing status
function changeStatus(params) {
    $.ajax({
        type: "PUT",
        url: `${SITE_URL}admin/change-status`,
        // data: { model_name: modelName, id, status },
        data: params,
        success: function (res) {
            if (res.code == 1) {
                alertify.success(res.message);
            } else {
                alertify.error(res.message);
            }
            dataTable.ajax.reload(null, false);
        },
        error: function () {
            dataTable.ajax.reload(null, false);
        },
    });
}

function resetCKEditorInstance(arr = []) {
    $("body").on(
        "click",
        ".add_record,#table-content .edit_record",
        function () {
            if (arr.length > 0) {
                arr.map(function (field, index) {
                    CKEDITOR.instances[field].setData("");
                });
            }
        }
    );
}
//Reset CK Editor Instances

//Reset TinyMCE Instances
function resetTinyMceInstance(arr = []) {
    $("body").on(
        "click",
        ".add_record,#table-content .edit_record",
        function () {
            if (arr.length > 0) {
                arr.map(function (field, index) {
                    CKEDITOR.instances[field].setData("");
                });
            }
        }
    );
}
//Reset TinyMCE Instances

// space validation
$(document).on("keypress", ".sp_validate", function (e) {
    if (e.which === 32 && !this.value.length) e.preventDefault();
});

$(document).on("keyup", 'input[type="tel"]', function (event) {
    formatToPhone(event);
});

$(document).on("keydown", 'input[type="tel"]', function (event) {
    enforceFormat(event);
});

const isNumericInput = (event) => {
    const key = event.keyCode;
    return (
        (key >= 48 && key <= 57) || // Allow number line
        (key >= 96 && key <= 105) // Allow number pad
    );
};

const isModifierKey = (event) => {
    const key = event.keyCode;
    return (
        event.shiftKey === true ||
        key === 35 ||
        key === 36 || // Allow Shift, Home, End
        key === 8 ||
        key === 9 ||
        key === 13 ||
        key === 46 || // Allow Backspace, Tab, Enter, Delete
        (key > 36 && key < 41) || // Allow left, up, right, down
        // Allow Ctrl/Command + A,C,V,X,Z
        ((event.ctrlKey === true || event.metaKey === true) &&
            (key === 65 ||
                key === 67 ||
                key === 86 ||
                key === 88 ||
                key === 90))
    );
};

const enforceFormat = (event) => {
    // Input must be of a valid number format or a modifier key, and not longer than ten digits
    if (!isNumericInput(event) && !isModifierKey(event)) {
        event.preventDefault();
    }
};

const formatToPhone = (event) => {
    if (isModifierKey(event)) {
        return;
    }

    // I am lazy and don't like to type things more than once
    const target = event.target;
    const input = event.target.value.replace(/\D/g, "").substring(0, 11); // First ten digits of input only
    const zip = input.substring(0, 1);
    const middle = input.substring(1, 4);
    const sec_middle = input.substring(4, 7);
    const last = input.substring(7, 11);

    if (input.length > 7) {
        target.value = `+${zip}-${middle}-${sec_middle}-${last}`;
    } else if (input.length > 4) {
        target.value = `+${zip}-${middle}-${sec_middle}`;
    } else if (input.length > 1) {
        target.value = `+${zip}-${middle}`;
    } else if (input.length > 0) {
        target.value = `+${zip}`;
    }
};

function convertToSlug(Text) {
    return Text.toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");
}

function run_ajax(module, data) {
    return $.ajax({
        type: "POST",
        url: SITE_URL + "admin/" + module + "/add",
        data: data,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function () {
            $("#loader").show();
        },
        success: function (response) {
            $("#submit_button").prop("disabled", false);
            $("#submit_button").val("SAVE");
            if (response.success) {
                if (id == "") {
                    $("#addFrm")[0].reset();
                }
                $("#display-msg").removeClass("errormsg allmsg");
                $("#display-msg").addClass("successmsg");
                $("#display-msg").html(response.message);
                if (response.redirect == true) {
                    window.location.href = response.redirect_url;
                }
                setTimeout(function () {
                    $("#display-msg").show();
                }, 1000);
                refresh();
                $("#addFrm .btnCLOSE").trigger("click");
            } else {
                // $(".btnClose").trigger("click");
                $("#display-msg").removeClass("successmsg");
                $("#display-msg").addClass("errormsg allmsg");
                $("#display-msg").html(response.message);
                $("#display-msg").show();
            }
            setTimeout(function () {
                $("#display-msg").hide();
            }, 5000);
        },
        error: function () {
            $("#submit_button").prop("disabled", false);
            $("#submit_button").val("SAVE");
            // NOTHING DO
        },
        complete: function () {
            $("#loader").hide();
        },
    }).responseJSON;
}

function ajax_handler(module, data, custom_url) {
    return $.ajax({
        type: "POST",
        url: SITE_URL + "admin/" + module + "/" + custom_url,
        data: data,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function () {
            $("#loader").show();
        },
        success: function (response) {},
        error: function () {
            // NOTHING DO
        },
        complete: function () {
            $("#loader").hide();
        },
    }).responseJSON;
}

function js_number_format(n, digitRound = null) {
    let parts = n.toString().split(".");
    // console.log(parts);return false;
    if (digitRound == "" || digitRound == null) {
        return n;
    } else {
        let total_number_len = parts[1].length;
        if (digitRound <= total_number_len) {
            let cuttedVal = parts[1].substr(0, digitRound);
            return parts[0] + "." + cuttedVal;
        }
    }
}

$(".decimal_field").bind("keydown", function (event) {
    let key = event.keyCode;
    if (
        (key >= 48 && key <= 57) || // Allow number line
        (key >= 96 && key <= 105) || // Allow number pad
        key == 190 ||
        key == 110 || // allow dot key
        key == 8
    ) {
        // Do not perform any event
    } else {
        event.preventDefault();
    }
});

$(".decimal_field").bind("drop", function (e) {
    e.preventDefault();
});

$(".decimal_field").bind("contextmenu", function (e) {
    return false;
});

// convert data-url to a valid images
function dataURLtoFile(dataUrl, filename) {
    var arr = dataUrl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
}

$(document).ready(function () {
    filtering();

    // for module checkbox
    /*
    $(document).on("change", 'input[name="check_all_modules"]', function () {
        if ($(this).prop("checked") == true) {
            let module_id = $(this).val();
            $('input[name="view_permission-' + module_id + '"]')
                .prop("checked", true)
                .val(1);
            $('input[name="add_permission-' + module_id + '"]')
                .prop("checked", true)
                .val(1);
            $('input[name="edit_permission-' + module_id + '"]')
                .prop("checked", true)
                .val(1);
            $('input[name="delete_permission-' + module_id + '"]')
                .prop("checked", true)
                .val(1);
        } else if ($(this).prop("checked") == false) {
            let module_id = $(this).val();
            $('input[name="view_permission-' + module_id + '"]')
                .prop("checked", false)
                .val("");
            $('input[name="add_permission-' + module_id + '"]')
                .prop("checked", false)
                .val("");
            $('input[name="edit_permission-' + module_id + '"]')
                .prop("checked", false)
                .val("");
            $('input[name="delete_permission-' + module_id + '"]')
                .prop("checked", false)
                .val("");
        }
    });

    $(document).on("change", ".submodule_checkbox", function () {
        if ($(this).prop("checked") == true) {
            $(this).val(1);
        } else if ($(this).prop("checked") == false) {
            $(this).val("");
        }
    });
    */

    $("#addForm").validate({
        submitHandler: function (form) {
            let isChecked = 0;
            $(".sub_modules").each(function () {
                if ($(this).prop("checked") == true) {
                    isChecked++;
                }
            });
            if (isChecked == 0) {
                alertify.error("Please check at least one permission.");
                return false;
            }
            let data = new FormData(form);
            ajaxJqueryValidateSubmit(form, data, (noRefreshDataTable = true));
        },
    });

    // $(document).on("click", "#access_permission_btn dfdd", function () {

    //     $("#access_permission_btn")
    //         .attr("disabled", true)
    //         .html(`Please Wait ...`);

    //     let data = new FormData($('#addForm')[0]);
    //     // console.log(f);
    //     // return false;
    //     $.ajax({
    //         url: SITE_URL + "admin/" + CURRENT_URI + "/update-permissions",
    //         type: "POST",
    //         cache: false,
    //         contentType: false,
    //         processData: false,
    //         data:data,
    //         beforeSend: function () { },
    //         success: function (resp) {
    //             if (resp.code == 1) {
    //                 alertify.success(resp.message);
    //                 $("#access_permission_btn")
    //                     .attr("disabled", false)
    //                     .html(`Submit`);
    //                 $("#modal--right").removeClass("showing-modal");
    //             } else {
    //                 alertify.error(resp.message);
    //             }
    //         },
    //     });
    // });

    $(".sds-modal-exit").click(() => {
        $("#addForm")[0].reset();
    });

    // edit permission records
    $(document).on("click", ".edit_records", function () {
        let id = $(this).attr("rel");
        $("#id").val(id);
        let url = SITE_URL + "admin/" + CURRENT_URI + "/" + id;
        $.get(url, function (resp) {
            if (resp.code == 1) {
                let formTemplate = "";
                let viewPermissionChecked = null;
                let addPermissionChecked = "";
                let editPermissionChecked = "";
                let deletePermissionChecked = "";

                // updating user details
                if (resp.user_details != "") {
                    $("#user_name").text(resp.user_details.name).css({
                        "font-size": "15px",
                    });
                    $("#user_email").text(resp.user_details.email_address).css({
                        "font-size": "15px",
                    });
                    $("#user_phone").text(resp.user_details.mobile).css({
                        "font-size": "15px",
                    });

                    $("#user_id").val(resp.user_details.id);
                }

                // Add access checkboxes
                if (Object.keys(resp.modules).length > 0) {
                    $.each(resp.modules, function (key, value) {
                        formTemplate += `<div class="row">
                                            <div class="col-12 flow-rootx">
                                            <div style="display: grid; grid-auto-flow: column; align-items: center; justify-content: space-between;">`;
                        formTemplate +=
                            `<span><b>` + value.name + `</b></span>`;
                        formTemplate +=
                            `<div class="form-checkbox inline-style"><label>
                                            <input type="checkbox" name="check_all_modules" class="master_check" data-id="` +
                            value.id +
                            `" value="` +
                            value.id +
                            `">
                                            <span class="checkmark"></span>
                                            <p>Check All</p>
                                            </label></div>`;
                        formTemplate += `</div></div></div>`;
                        if (
                            Object.keys(resp.sub_modules[value.id]).length > 0
                        ) {
                            $.each(
                                resp.sub_modules[value.id],
                                function (skey, svalue) {
                                    // viewPermissionChecked = (resp.assigned_permissions[svalue.id].view_permission == 1) ? 'checked' : null;
                                    viewPermissionChecked =
                                        resp.assigned_permissions[svalue.id] !==
                                            undefined &&
                                        resp.assigned_permissions[svalue.id]
                                            .view_permission == 1
                                            ? "checked"
                                            : null;
                                    addPermissionChecked =
                                        resp.assigned_permissions[svalue.id] !==
                                            undefined &&
                                        resp.assigned_permissions[svalue.id]
                                            .add_permission == 1
                                            ? "checked"
                                            : null;
                                    editPermissionChecked =
                                        resp.assigned_permissions[svalue.id] !==
                                            undefined &&
                                        resp.assigned_permissions[svalue.id]
                                            .edit_permission == 1
                                            ? "checked"
                                            : null;
                                    deletePermissionChecked =
                                        resp.assigned_permissions[svalue.id] !==
                                            undefined &&
                                        resp.assigned_permissions[svalue.id]
                                            .delete_permission == 1
                                            ? "checked"
                                            : null;

                                    formTemplate +=
                                        `
								<div class="row"><div class="col-6 flow-rootx">
                                    <span style="font-size:14px"><b>` +
                                        svalue.name +
                                        `</b></span> 
                                    <div class="form-checkbox inline-style">
                                        <label>
                                            <input type="checkbox" name="view[` +
                                        svalue.id +
                                        `]" value="1" ${viewPermissionChecked} class="sub_modules mode_view" data-master="` +
                                        value.id +
                                        `" data-id="` +
                                        svalue.id +
                                        `">
                                            <span class="checkmark"></span>
                                            <p>View</p>
                                        </label>

                                        <label>
                                            <input type="checkbox" name="add[` +
                                        svalue.id +
                                        `]" value="1" ${addPermissionChecked} class="sub_modules mode_add" data-master="` +
                                        value.id +
                                        `" data-id="` +
                                        svalue.id +
                                        `">
                                            <span class="checkmark"></span>
                                            <p>Add</p>
                                        </label>

                                        <label>
                                            <input type="checkbox" name="edit[` +
                                        svalue.id +
                                        `]" value="1" ${editPermissionChecked} class="sub_modules mode_update" data-master="` +
                                        value.id +
                                        `" data-id="` +
                                        svalue.id +
                                        `">
                                            <span class="checkmark"></span>
                                            <p>Edit</p>
                                        </label>

                                        <label>
                                            <input type="checkbox" name="delete[` +
                                        svalue.id +
                                        `]" value="1" ${deletePermissionChecked} class="sub_modules mode_delete" data-master="` +
                                        value.id +
                                        `" data-id="` +
                                        svalue.id +
                                        `">
                                            <span class="checkmark"></span>
                                            <p>Delete</p>
                                        </label>
                                    </div>
                                </div></div>`;
                                }
                            );
                        }
                    });
                }

                $(".append_dynamic_form").html(formTemplate);
                openRightModal();

                $(".master_check").each(function (index) {
                    let mid = $(this).attr("data-id");
                    let length = $(
                        ".sub_modules[data-master='" + mid + "']"
                    ).length;
                    let lengthSelected = $(
                        ".sub_modules[data-master='" + mid + "']:checked"
                    ).length;
                    if (lengthSelected == length) {
                        $(".master_check[data-id='" + mid + "']").prop(
                            "checked",
                            true
                        );
                    } else {
                        $(".master_check[data-id='" + mid + "']").prop(
                            "checked",
                            false
                        );
                    }
                });
            }
        });
    });

    $(document).on("click", ".master_check", function () {
        let mid = $(this).attr("data-id");
        if ($(this).is(":checked")) {
            $(".sub_modules[data-master='" + mid + "']").prop("checked", true);
        } else {
            $(".sub_modules[data-master='" + mid + "']").prop("checked", false);
        }
    });

    $(document).on("click", ".sub_modules", function () {
        let mid = $(this).attr("data-master");
        let length = $(".sub_modules[data-master='" + mid + "']").length;
        let lengthSelected = $(
            ".sub_modules[data-master='" + mid + "']:checked"
        ).length;
        if (lengthSelected == length) {
            $(".master_check[data-id='" + mid + "']").prop("checked", true);
        } else {
            $(".master_check[data-id='" + mid + "']").prop("checked", false);
        }
    });

    $(document).on(
        "click",
        ".mode_add, .mode_update, .mode_delete",
        function () {
            let id = $(this).attr("data-id");
            if ($(this).is(":checked")) {
                $(".sub_modules.mode_view[data-id='" + id + "']").prop(
                    "checked",
                    true
                );
            }
        }
    );

    $(document).on("click", ".mode_view", function () {
        let id = $(this).attr("data-id");
        if (!$(this).is(":checked")) {
            $(
                ".sub_modules.mode_add[data-id='" +
                    id +
                    "'], .sub_modules.mode_update[data-id='" +
                    id +
                    "'], .sub_modules.mode_delete[data-id='" +
                    id +
                    "']"
            ).prop("checked", false);
        }
    });
});

function filtering() {
    // Populating Modules Table via jquery datatable using ajax
    let dataTable = $("#_listing_table").DataTable({
        columnDefs: [
            {
                orderable: false,
                targets: [0, 1],
            },
        ],
        destroy: true,
        searching: false,
        processing: true,
        serverSide: true,
        ajax: {
            url: SITE_URL + "admin/" + MODULE_CONTROLLER + "/filtering",
            dataSrc: "data",
            data: function (d) {
                return $.extend({}, d, {
                    access_permission_view: "exclude_super_admin",
                });
            },
        },
        drawCallback: function () {
            feather.replace();
        },
        lengthMenu: [50, 100, 200],
        columns: [
            {
                data: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                title: "#",
            },
            {
                data: function (data) {
                    return `
                            <div class="card-action">
                                <a class="button--2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                                </a>
                                <ul class="left-flow">
                                    <li><a href="javascript:void(0)" class="edit_records" rel="${data.id}"><i data-feather="edit"></i> Edit</a></li>
                                </ul>
                            </div>
                            `;
                },
                title: "Action",
            },
            {
                data: "name",
                title: "Name",
            },
            {
                data: "email_address",
                title: "Email",
            },
            {
                data: "mobile",
                title: "Mobile",
            },
            {
                data: "role",
                title: "Role",
            },
        ],
    });
}

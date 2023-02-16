$(document).ready(function () {
    $("#date_of_joining").Zebra_DatePicker({
        direction: false,
        format: "d-m-Y",
    });
    console.log(new Date().toISOString().slice(0, 10));

    // Delete the checked items
    $(document).on("click", "#deleteChecked", function () {
        confirmDeleteMultiple(MODULE_CONTROLLER);
    });

    filtering();

    $(document).on("change", "#user_type_id", function () {
        let id = $(this).val();
        if (id == 3) {
            getReportingAuthorities();
            $("#department_div")
                .show(300)
                .find("select")
                .attr("disabled", false);
            $("#reporting_authority_div")
                .show(600)
                .find("select")
                .attr("disabled", false);
        } else {
            $("#department_div")
                .hide(600)
                .find("select")
                .attr("disabled", true);
            $("#reporting_authority_div")
                .hide(300)
                .find("select")
                .attr("disabled", true);
        }
    });

    $("#addForm").validate({
        errorElement: "i",
        errorClass: "msg msg-error",
        rules: {
            name: "required",
            email_address: {
                required: true,
                customemail: true,
                noSpace: true,
                remote: {
                    url: SITE_URL + "admin/check-unique-column",
                    data: {
                        id: function () {
                            return $("#id").val();
                        },
                    },
                    type: "POST",
                },
            },
            mobile: {
                required: true,
                mobcheck: true,
                noSpace: true,
            },
            department_id: {
                required: {
                    depends: function (element) {
                        return $("#user_type_id").val() == 3 ? true : false;
                    },
                },
            },
            reporting_authority: {
                required: {
                    depends: function (element) {
                        return $("#user_type_id").val() == 3 ? true : false;
                    },
                },
            },
        },
        messages: {
            name: "Enter name",
            email_address: {
                required: "Please enter email",
                customemail: "Please enter valid email",
                noSpace: "Space are not allowed",
                remote: "Email is already exists",
            },
            mobile: {
                required: "Please enter mobile number",
                mobcheck: "Please enter valid mobile number",
                noSpace: "Space are not allowed",
            },
            department_id: "Select Department",
            reporting_authority: "Select reporting authority",
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
                beforeSend: function () {},
                success: function (res) {
                    if (res.code == 1) {
                        alertify.success(res.message);
                        $("#addForm")[0].reset();
                        $("#modal--right").removeClass("showing-modal");
                        $("#module_head_title").html("Add Admin Users");
                        filtering();
                    } else {
                        alertify.error(res.message);
                    }
                    btn.attr("disabled", false);
                    btn.html(`Submit`);
                },
                complete: function () {},
                error: function (xhr, x) {
                    btn.attr("disabled", false);
                    btn.html(btnTxt);
                },
            });
        },
    });

    $(document).on("click", ".edit_record", function () {
        $("i.msg-error").hide();
        let id = $(this).attr("rel");
        let url = SITE_URL + "admin/" + MODULE_CONTROLLER + "/" + id + "/edit";
        $.get(url, function (resp) {
            if (resp.code == 1) {
                $("#module_head_title").html("Edit Admin Users");
                $("#addForm").attr(
                    "action",
                    SITE_URL + "admin/" + MODULE_CONTROLLER + "/" + resp.data.id
                );
                $("#formMethod").val("PUT");
                $("#user_type_id").val(resp.data.user_type_id);
                if (resp.data.user_type_id == 3) {
                    $("#department_id").val(resp.data.department_id);
                    $("#department_div").show();
                    $("#department_div")
                    .find("select")
                    .attr("disabled", false);

                    if (resp.data.reporting_authority != null) {
                        getReportingAuthorities(id);
                        setTimeout(() => {
                            if ($("#reporting_authority_div").find("select")) {
                                $("#reporting_authority").val(
                                    resp.data.reporting_authority
                                );
                                $("#reporting_authority_div").show();
                            } else {
                                $("#reporting_authority_div")
                                    .hide()
                                    .find("select")
                                    .attr("disabled", true);
                            }
                        }, 2000);
                    }
                } else {
                    $("#department_div")
                        .hide()
                        .find("select")
                        .attr("disabled", true);
                    $("#reporting_authority_div")
                        .hide()
                        .find("select")
                        .attr("disabled", true);
                }

                $("#name").val(resp.data.name);
                $("#email_address").val(resp.data.email_address);
                $("#mobile").val(resp.data.mobile);

                if (resp.data.date_of_joining != null) {
                    $("#date_of_joining")
                        .val(
                            resp.data.date_of_joining
                                .split("-")
                                .reverse()
                                .join("-")
                        )
                        .data("Zebra_DatePicker");
                }

                $("#id").val(resp.data.id);

                openRightModal();
            }
        });
    });


    $(".sds-modal-exit").click(() => {
        $("i.msg-error").hide();
        $("#addForm")[0].reset();
    });
    $("#openModalButton").click(() => {
        $("i.msg-error").hide();
        $("#addForm")[0].reset();
    });
});

function filtering() {
    // Populating Modules Table via jquery datatable using ajax
    dataTable = $("#_listing_table").DataTable({
        columnDefs: [
            {
                orderable: false,
                targets: [0, 1, 2, 8,9],
            },
            { width: "5%", targets: 0 },
        ],
        oLanguage: {
            sEmptyTable: "No records found",
        },
        dom: "Bfrtip",
        buttons: [
            "pageLength",
            `<div style="width: 100px;">
                <div class="form-element mb-0">
                    <button type="button" class="c2a size:tiny danger no-animation"
                        id="deleteChecked" style="display:none;padding:7px 10px">
                        <i data-feather="trash"></i>
                        <span style="margin-top:3px">Delete</span>                        
                    </button>
                </div>
            </div>`,
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
                    search_master: $("#searchMaster").val(),
                    search_keyword: $("#searchKeyword").val().toLowerCase(),
                });
            },
        },
        drawCallback: function () {
            feather.replace();
        },
        lengthMenu: [50, 100, 200],
        columns: [
            {
                data: function (data) {
                    return `<div class="form-style">
                        <div class="form-checkbox flow-rootx">
                            <label>
                                <input type="checkbox" class="single_check" value="${data.id}">
                                <span class="checkmark"></span>
                            </label>
                        </div>
                    </div>`;
                },
                title: `<div class="form-style">
                    <div class="form-checkbox flow-rootx">
                        <label>
                            <input type="checkbox" class="all_check" value="1">
                            <span class="checkmark"></span>
                        </label>
                    </div>
                </div>`,
            },
            {
                data: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                title: "#",
            },
            {
                data: function (data) {
                    let edit_action_btn = "";
                    let delete_action_btn = "";
                    if (EDIT_PERMISSION == 1) {
                        edit_action_btn = `<li><a href="javascript:void(0)" class="left_flow_dropdown_btn edit_record" rel="${data.id}"><i data-feather="edit"></i> Edit</a></li>`;
                    }
                    if (DELETE_PERMISSION == 1) {
                        delete_action_btn = ` <li>
                                                <a href="javascript:void(0)" onclick="confirmDelete(this)" data-href="${
                                                    SITE_URL +
                                                    "admin/" +
                                                    MODULE_CONTROLLER +
                                                    "/" +
                                                    data.id
                                                }">
                                                <i data-feather="trash"></i> Delete
                                                </a>
                                            </li>`;
                    }
                    return (
                        `
                        <div class="card-action">
                            <a class="button--2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                            </a>
                            <ul class="left-flow">
                                ` +
                        edit_action_btn +
                        `
                                ` +
                        delete_action_btn +
                        `
                            </ul>
                        </div>`
                    );
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
                data: function (data) {
                    return data.department_name != null
                        ? data.department_name
                        : "N/A";
                },
                title: "Department",
            },
            {
                data: "role",
                title: "Role",
            },
            {
                data: "reporting_authorities_name",
                title: "Reporting Authority",
            },
            // // {
            // //     data: function (data) {
            // //         return data.date_of_joining != null
            // //             ? data.date_of_joining.split("-").reverse().join("-")
            // //             : "N/A";
            // //     },
            // //     title: "Date Of Joining",
            // // },
            {
                data: function (data) {
                    let t = "Active",
                        c = "success",
                        s = 0;
                    if (data.status == 0) {
                        (t = "Inactive"), (c = "danger"), (s = 1);
                    }

                    return `<div style="cursor:pointer" class="status-change" data-name="${data.name}" data-id="${data.id}" data-status="${s}" ><span class="badge ${c} radius:tiny size:tiny padding:tiny">${t}</span></div>`;
                },
                title: "Status",
            },
        ],
    });
}

function getReportingAuthorities(id = null) {
    let url = SITE_URL + "admin/admin-users/reporting-authorities-list/" + id;
    $.get(url, (resp) => {
        if (resp.code == 1 && resp.results.length > 0) {
            let generate_reporting_select_box = `
                <div class="form-element form-select">
                    <label class="form-label">Select Reporting Authority <sup class="c--redC">*</sup></label>
                    <select name="reporting_authority" class="form-field" id="reporting_authority">
                        <option value="">Select</option>`;
            $.each(resp.results, function (key, value) {
                generate_reporting_select_box +=
                    `<option value=` +
                    value.id +
                    `>` +
                    value.name +
                    `</option>`;
            });
            generate_reporting_select_box += `</select>
                </div>`;
            $("#reporting_authority_div")
                .html(generate_reporting_select_box)
                .show();
        } else {
            $("#reporting_authority_div").html("").hide();
        }
    });
}

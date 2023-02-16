$(document).ready(function () {
    filtering();

    // Delete the checked items
    $(document).on("click", "#deleteChecked", function () {
        confirmDeleteMultiple(MODULE_CONTROLLER);
    });
    // Form Validations
    $("#submodalForm").validate({
        errorElement: "i",
        errorClass: "msg msg-error",
        rules: {
            sub_module_name: {
                required: true,
                rangelength: [3, 100],
                remote: {
                    url: SITE_URL + "admin/check-unique-column",
                    data: {
                        id: function () {
                            return $("#id").val();
                        },
                        m: MODULE_CODE,
                    },
                    type: "POST",
                },
            },
            module_id: {
                required: true,
            },
            controller_name: {
                required: true,
                rangelength: [3, 100],
            },
            code: {
                required: true,
                rangelength: [3, 100],
                remote: {
                    url: SITE_URL + "admin/check-unique-column",
                    data: {
                        id: function () {
                            return $("#id").val();
                        },
                        m: MODULE_CODE,
                    },
                    type: "POST",
                },
            },
            sequence: {
                required: true,
                digits: true,
            },
        },
        messages: {
            sub_module_name: {
                required: "Please enter name",
                rangelength: "Name must be 3 to 100 characters long",
                remote: "Name already exists",
            },
            module_id: {
                required: "Please select module",
            },
            controller_name: {
                required: "Please enter controller name",
                rangelength: "Controller name must be 3 to 100 characters long",
            },
            code: {
                required: "Please enter code",
                rangelength: "code must be 3 to 50 characters long",
                remote: "Code already exists",
            },
            sequence: {
                required: "Please enter order number",
                digits: "Sequence must be a number",
            },
        },
        submitHandler: function (form) {
            let data = new FormData(form);
            ajaxJqueryValidateSubmit(form, data);
        },
    });

    $("#openModalButton").click(function () {
        $("i.msg-error").hide();
        $("#submodalForm")[0].reset();
        $("#iconHolder").html(``);

        $("#submodalForm").attr("action", `${SITE_URL}admin/sub-modules`);
        $("#formMethod").val("POST");

        $("#formHead").text("Add Sub Module");
        openRightModal();
    });
});

// Populating Modules Table via jquery datatable using ajax
function filtering() {
    dataTable = $("#moduleTable").DataTable({
        oLanguage: {
            sEmptyTable: "No Sub Modules Available",
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
        columnDefs: [
            {
                orderable: false,
                targets: [0, 1, 2, 7, 8],
            },
            { width: "5%", targets: 0 },
        ],
        searching: false,
        processing: true,
        serverSide: true,
        ajax: {
            url: `${SITE_URL}admin/${MODULE_CONTROLLER}/fetch`,
            dataSrc: "data",
            data: function (d) {
                return $.extend({}, d, {
                    search_master: $("#searchMaster").val(),
                    // "search_column": $("#searchColumn").val().toLowerCase(),
                    search_keyword: $("#searchKeyword").val().toLowerCase(),
                });
            },
        },
        drawCallback: function () {
            feather.replace();
        },
        lengthMenu: [10, 20, 30],
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
                title: "Sl",
            },
            {
                data: function (data) {
                    return `
                    <div class="card-action">
                        <a class="button--2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                        </a>
                        <ul class="left-flow ">
                            <li><a href="javascript:void(0)" onclick="showEditModal(${
                                data.id
                            })">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                            Edit</a></li>
                            <li>
                                <a href="javascript:void(0)" onclick="confirmDelete(this)" data-href="${
                                    SITE_URL + "admin/sub-modules/" + data.id
                                }">
                                <i data-feather="trash"></i> Delete
                                </a>
                            </li>
                        </ul>
                    </div>
                    `;
                },
                title: "Action",
            },
            {
                data: "module_name",
                title: "Module",
            },
            {
                data: "sub_module_name",
                title: "Sub Module",
            },
            {
                data: "code",
                title: "Code",
            },
            {
                data: "sequence",
                title: "Sequence",
            },
            {
                data: function (data) {
                    return data.icon
                        ? `<i data-feather="${data.icon}"></i>`
                        : `<span class="badge danger radius:tiny size:tiny padding:tiny">N/A</span>`;
                },
                title: "Icon",
            },
            {
                data: function (data) {
                    let t = "Active",
                        c = "success",
                        s = 0;
                    if (data.status == 0) {
                        (t = "Inactive"), (c = "danger"), (s = 1);
                    }

                    return `<div style="cursor:pointer" class="status-change" data-name="${data.sub_module_name}" data-id="${data.id}" data-status="${s}" ><span class="badge ${c} radius:tiny size:tiny padding:tiny">${t}</span></div>`;
                },

                title: "Status",
            },
        ],
    });
}

function showEditModal(id) {
    $.get(`${SITE_URL}admin/${MODULE_CONTROLLER}/${id}/edit`, function (res) {
        if (res.code == 1) {
            $("i.msg-error").hide();
            $("#submodalForm")[0].reset();

            $("#submodalForm").attr(
                "action",
                `${SITE_URL}admin/sub-modules/${id}`
            );
            $("#formMethod").val("PUT");

            $("#subModuleName").val(res.data.sub_module_name);
            $("#moduleId").val(res.data.module_id);
            $("#controllerName").val(res.data.controller_name);
            $("#code").val(res.data.code);
            $("#icon").val(res.data.icon);
            $("#sequence").val(res.data.sequence);

            $("#id").val(res.data.id);
            $("#formHead").text("Edit Sub Module");

            if (res.data.icon) {
                $("#iconHolder").html(
                    `<i data-feather="${res.data.icon}"></i>`
                );
            } else {
                $("#iconHolder").html(``);
            }
            feather.replace();

            openRightModal();
        }
    });
}

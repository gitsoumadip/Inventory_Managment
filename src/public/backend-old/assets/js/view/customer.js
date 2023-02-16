$(document).ready(function () {
    filtering();

    // Delete the checked items
    $(document).on("click", "#deleteChecked", function () {
        confirmDeleteMultiple(MODULE_CONTROLLER);
    });

    // Form Validations
    $("#modalForm").validate({
        errorElement: "i",
        errorClass: "msg msg-error",
        rules: {
            first_name: {
                required: true,
                rangelength:[3,100]
                
            },
            last_name: {
                rangelength: [3, 100],
            },
            email: {
                required: true,
                customemail:true,
                remote: {
                    url: SITE_URL + "admin/check-unique-column",
                    data: {
                        id: function () {
                            return $("#id").val();
                        },
                        m: MODULE_CODE,
                    },
                    type: "post",
                },
            },
            phone:{
                mobcheck:true
            }
        },
        messages: {
            first_name: {
                required: "Please enter first name",
                rangelength:"First name should be between 3-100 characters"
                
            },
            last_name: {
                rangelength: "Last name should be between 3-100 characters",
            },
            email: {
                required: "Please enter email address",
                customemail:"Enter valid email address",
                remote: "Email already exists",
            },
            phone:{
                mobcheck:"Enter valid phone number"
            }
        },
        submitHandler: function (form) {
            let data = new FormData(form);
            ajaxJqueryValidateSubmit(form, data);
        },
    });

    // Opening Create modal
    $("#openModalButton").click(function () {
        $("i.msg-error").hide();
        $("#modalForm")[0].reset();
        $("#iconHolder").html(``);

        $("#modalForm").attr("action", `${SITE_URL}admin/${MODULE_CONTROLLER}`);
        $("#formMethod").val("POST");
        $("#formHead").text("Add Customer");

        openRightModal();
    });
});

// Populating Modules Table via jquery datatable using ajax

function filtering() {
    dataTable = $("#moduleTable").DataTable({
        oLanguage: {
            sEmptyTable: "No Modules Available",
        },
        dom: "Bfrtip",
        buttons: [
            "pageLength",
            // `<div style="width: 100px">
            //     <div class="form-element mb-0">
            //         <button type="button" class="c2a size:tiny danger no-animation"
            //             id="deleteChecked" style="display:none;padding:7px 10px">
            //             <i data-feather="trash"></i>
            //             <span style="margin-top:3px">Delete</span>
            //         </button>
            //     </div>
            // </div>`,
        ],
        columnDefs: [
            {
                orderable: false,
                targets: [0, 1],
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
                    search_keyword: $("#searchKeyword").val().toLowerCase(),
                });
            },
        },
        drawCallback: function () {
            feather.replace();
        },
        lengthMenu: [10, 20, 30],
        columns: [
            // {
            //     data: function (data) {
            //         return `<div class="form-style">
            //                 <div class="form-checkbox flow-rootx">
            //                     <label>
            //                         <input type="checkbox" class="single_check" value="${data.id}">
            //                         <span class="checkmark"></span>
            //                     </label>
            //                 </div>
            //             </div>`;
            //     },
            //     title: `<div class="form-style">
            //                 <div class="form-checkbox flow-rootx">
            //                     <label>
            //                         <input type="checkbox" class="all_check" value="1">
            //                         <span class="checkmark"></span>
            //                     </label>
            //                 </div>
            //           </div>`,
            // },
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
                            <ul class="left-flow">
                                <li><a href="javascript:void(0)" onclick="showEditModal(${
                                    data.id
                                })"><i data-feather="edit"></i> Edit</a></li>
                                <li>
                                    <a href="javascript:void(0)" onclick="confirmDelete(this)" data-href="${
                                        SITE_URL +
                                        "admin/" +
                                        MODULE_CONTROLLER +
                                        "/" +
                                        data.id
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
                data: (data) => {
                    return data.first_name + " " + data.last_name;
                },
                title: "Name",
            },
            {
                data: "email",
                title: "Email",
            },
            {
                data: "phone",
                title: "Phone",
            },
            {
                data: "created_at_formatted",
                title: "Joined",
            },
            {
                data: "last_login_formatted",
                title: "Last Login",
            },
            {
                data: function (data) {
                    let t = "Active",
                        c = "success",
                        s = 0;
                    if (data.status == 0) {
                        (t = "Inactive"), (c = "danger"), (s = 1);
                    }

                    return `<div style="cursor:pointer" class="status-change" data-name="${data.first_name}" data-id="${data.id}" data-status="${s}" ><span class="badge ${c} radius:tiny size:tiny padding:tiny">${t}</span></div>`;
                },
                title: "Status",
            },
        ],
    });
}

//Opening Edit modal
function showEditModal(id) {
    $.get(`${SITE_URL}admin/${MODULE_CONTROLLER}/${id}/edit`, function (res) {
        if (res.code == 1) {
            $("i.msg-error").hide();
            $("#modalForm")[0].reset();

            $("#modalForm").attr(
                "action",
                `${SITE_URL}admin/${MODULE_CONTROLLER}/${id}`
            );
            $("#formMethod").val("PUT");
            $("#firstName").val(res.data.first_name);
            $("#lastName").val(res.data.last_name);
            $("#email").val(res.data.email);
            $("#phone").val(res.data.phone);

            $("#id").val(res.data.id);
            $("#formHead").text("Edit Customer");

            openRightModal();
        } else {
            alertify.error("Error Occurred!");
        }
    });
}

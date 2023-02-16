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
            category_id: {
                required: true,
            },
            name: {
                required: true,
                minlength: 3,
                maxlength: 200,
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
            sequence: {
                required: true,
            },
        },
        messages: {
            category_id: {
                required: "Please select category",
            },
            name: {
                required: "Please enter group name",
                minlength: "Name must be minimum 3 characters long",
                maxlength: "Name must be maximum 200 characters long",
                remote: "Name already used",
            },
            sequence: {
                required: "Sequence is required",
            },
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

        $("#modalForm").attr("action", `${SITE_URL}admin/${MODULE_CONTROLLER}`);
        $("#formMethod").val("POST");

        $("#formHead").text("Add Product Sub Category");
        openRightModal();
    });
});

// Populating Modules Table via jquery datatable using ajax
const filtering = () => {
    dataTable = $("#moduleTable").DataTable({
        oLanguage: {
            sEmptyTable: "No Groups Available",
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
                targets: [0, 1, 2, 4, 6],
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
                            <ul class="left-flow">
                                <li><a href="javascript:void(0)" onclick="showEditModal(${
                                    data.id
                                })"><i data-feather="edit"></i> Edit</a></li>
                                <li>
                                    <a href="javascript:void(0)" ${
                                        data.products_count == 0
                                            ? `onclick="confirmDelete(this)"`
                                            : "disabled"
                                                } data-href="${
                                                SITE_URL + "admin/" + MODULE_CONTROLLER + "/" + data.id
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
                data: "name",
                title: "Name",
            },
            {
                data: "category.title",
                title: "Category",
            },
            {
                data: "sequence",
                title: "Sequence",
            },
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
};

//Opening Edit modal
function showEditModal(id) {
    $("#cropWrapper").hide("fast");
    $.get(`${SITE_URL}admin/${MODULE_CONTROLLER}/${id}/edit`, function (res) {
        if (res.code == 1) {
            $("i.msg-error").hide();
            $("#modalForm")[0].reset();

            $("#modalForm").attr(
                "action",
                `${SITE_URL}admin/${MODULE_CONTROLLER}/${id}`
            );
            $("#formMethod").val("PUT");

            $("#name").val(res.data.name);
            $("#categoryId").val(res.data.category_id);
            $("#sequence").val(res.data.sequence);

            $("#id").val(res.data.id);
            $("#formHead").text("Edit Product Sub Category");

            openRightModal();
        } else {
            alertify.error("Error Occurred!");
        }
    });
}

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

$("#title").keyup(function () {
    if($("#id").val()){

    }else{
        $("#slug").val(convertToSlug($(this).val()));
    }
});

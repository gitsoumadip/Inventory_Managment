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
            title: {
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
            slug: {
                required: true,
                minlength: 3,
                maxlength: 200,
            },
            file: {
                required: function () {
                    return $("#formMethod").val() == "POST" ? true : false;
                },
                filesize: 1,
            },
            tax: {
                required: true,
            },
        },
        messages: {
            title: {
                required: "Please enter title",
                minlength: "Name must be longer than 3 characters",
                maxlength: "Name must be smaller than 200 characters",
                remote: "Title is already used",
            },
            slug: {
                required: "Please enter slug",
                minlength: "Slug must be longer than 3 characters",
                maxlength: "Slug must be smaller than 200 characters",
            },
            tax: {
                required: "Please enter tax related to this category",
            },
        },
        submitHandler: function (form) {
            let data = new FormData(form);
            let fileField = document.getElementById("file");
            if (fileField.value) {
                image_crop
                    .croppie("result", {
                        type: "canvas",
                        size: "viewport",
                    })
                    .then((res) => {
                        data.delete("file");
                        let file = dataURLtoFile(res, fileField.value);
                        data.append("icon", file);
                        ajaxJqueryValidateSubmit(form, data);
                    });
            } else {
                ajaxJqueryValidateSubmit(form, data);
            }
        },
    });

    // Opening Create modal
    $("#openModalButton").click(function () {
        $("i.msg-error").hide();
        $("#modalForm")[0].reset();

        $("#modalForm").attr("action", `${SITE_URL}admin/${MODULE_CONTROLLER}`);
        $("#formMethod").val("POST");

        $("#formHead").text("Add Product Category");
        openRightModal();
    });
});

// Populating Modules Table via jquery datatable using ajax
const filtering = () => {
    dataTable = $("#moduleTable").DataTable({
        oLanguage: {
            sEmptyTable: "No Categories Available",
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
                targets: [0, 1, 2, 5, 6],
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
                                        data.product_groups_count == 0 &&
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
                data: "title",
                title: "Title",
            },
            {
                data: "slug",
                title: "Slug",
            },
            {
                data: function (data) {
                    return data.icon
                        ? `<img width="80px" src="${SITE_URL}storage/uploads/product/category/${data.icon}"/>`
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

                    return `<div style="cursor:pointer" class="status-change" data-name="${data.title}" data-id="${data.id}" data-status="${s}" ><span class="badge ${c} radius:tiny size:tiny padding:tiny">${t}</span></div>`;
                },
                title: "Status",
            },
        ],
    });
};

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

            $("#title").val(res.data.title);
            $("#slug").val(res.data.slug);

            // setting existing image in cropper
            $("#prevImg").attr(
                "src",
                SITE_URL + "storage/uploads/product/category/" + res.data.icon
            );
            $("#prevHeading").text(`Icon`);
            $("#cropPreviewWrap").css("display", "block");

            $("#id").val(res.data.id);
            $("#formHead").text("Edit Product Category");

            openRightModal();
        } else {
            alertify.error("Error Occurred!");
        }
    });
}

$("#title").keyup(function () {
    if ($("#id").val()) {
        // Do Nothing
    } else {
        $("#slug").val(convertToSlug($(this).val()));
    }
});

// for cropper
$("#file").on("change", function () {
    if (
        this.files[0].type == "image/png" ||
        this.files[0].type == "image/jpeg"
    ) {
        $("#imageCropCanvas").html("");
        $("#cropPreviewWrap").css("display", "none");
        let reader = new FileReader();
        image_crop = $("#imageCropCanvas").croppie({
            enableExif: true,
            viewport: {
                width: 150,
                height: 150,
                type: "square",
            },
            boundary: {
                width: 200,
                height: 200,
            },
            showZoomer: false,
        });
        reader.onload = () => {
            image_crop.croppie("bind", {
                url: event.target.result,
            });
        };
        reader.readAsDataURL(this.files[0]);
        $("#cropWrapper").show(500);
        setTimeout(() => {
            $("#previewImageBtnWrap").css("display", "block");
        }, 500);
    } else {
        $("#imageCropCanvas").html("");
    }
});

//Preview image
$("#previewImageBtn").click(function () {
    image_crop
        .croppie("result", {
            type: "canvas",
            size: "viewport",
        })
        .then((res) => {
            $("#prevImg").attr("src", res);
            $("#prevHeading").text(`Preview`);
            $("#cropPreviewWrap").css("display", "block");
        });
});

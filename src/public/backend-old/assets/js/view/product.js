$(document).ready(function () {
    filtering();

    // cKeditor settings
    ClassicEditor.create(document.querySelector(".ckeditor"), {
        ckfinder: {
            uploadUrl: ckEditorImageUploadUrl,
        },
    })
        .then((editor) => {
            descriptionEditor = editor;
        })
        .catch((error) => {
            console.error(error);
        });

    ClassicEditor.create(document.querySelectorAll(".ckeditor")[1], {
        ckfinder: {
            uploadUrl: ckEditorImageUploadUrl,
        },
    })
        .then((editor) => {
            specificationEditor = editor;
        })
        .catch((error) => {
            console.error(error);
        });

    // Delete the checked items
    $(document).on("click", "#deleteChecked", function () {
        confirmDeleteMultiple(MODULE_CONTROLLER);
    });
    // Form Validations
    $("#modalForm").validate({
        errorElement: "i",
        errorClass: "msg msg-error",
        ignore: [],
        normalizer: function (value) {
            return $.trim(value);
        },
        rules: {
            name: {
                required: true,
                rangelength: [3, 200],
            },
            sku: {
                required: true,
                rangelength: [3, 50],
            },
            category_id: {
                required: true,
            },
            group_id: {
                required: true,
            },
            option_id: {
                required: true,
            },
            option_value_id: {
                required: true,
            },
            price: {
                number: true,
                min: 1,
            },
            quantity: {
                number: true,
            },
            description: {
                required: true,
            },
            specification: {
                required: true,
            },
            image: {
                required: function () {
                    return $("#formMethod").val() == "POST" ? true : false;
                },
                accept: "jpg,jpeg,png",
                filesize: 1,
            },
        },
        messages: {
            name: {
                required: "Please enter name",
                rangelength: "Name should be between 3 and 200 characters",
            },
            sku: {
                required: "Please enter SKU code",
                rangelength: "SKU Code should be between 3 and 50 characters",
            },
            category_id: {
                required: "Please select category",
            },
            group_id: {
                required: "Please select group",
            },
            option_id: {
                required: "Please select option",
            },
            option_value_id: {
                required: "Please select option value",
            },
            price: {
                number: "Please enter valid price",
            },
            quantity: {
                number: "Please enter valid quantity",
            },
            description: {
                required: "Please enter description",
            },
            specification: {
                required: "Please enter specification",
            },
            image: {
                required: "Please select product image",
                accept: "Please select valid image",
            },
        },
        // errorPlacement: function (error, element) {
        //     // if (element.attr("name") == "description") {
        //     //     error.insertAfter("description-wrapper");
        //     // }
        // },
        submitHandler: function (form) {
            let data = new FormData(form);
            let fileField = document.getElementById("image");
            if(fileField.value){
                image_crop
                .croppie("result", {
                    type: "canvas",
                    size: "viewport",
                })
                .then((res) => {
                    let file = dataURLtoFile(res, fileField.value);
                    data.set("image", file);
                    ajaxJqueryValidateSubmit(form, data);
                });
            }else{
                ajaxJqueryValidateSubmit(form, data);
            }
        },
    });

    // Opening Create modal
    $("#openModalButton").click(function () {
        $("#cropWrapper").hide("fast");
        $("#previewImageBtnWrap").css("display", "none");
        $("#cropPreviewWrap").css("display", "none");

        $("i.msg-error").hide();
        $("#modalForm")[0].reset();
        descriptionEditor.setData("");
        specificationEditor.setData("");

        $("#modalForm").attr("action", `${SITE_URL}admin/${MODULE_CONTROLLER}`);
        $("#formMethod").val("POST");

        $("#formHead").text("Add Product");
        openRightModal();
    });
});

// Populating Modules Table via jquery datatable using ajax
const filtering = () => {
    dataTable = $("#moduleTable").DataTable({
        oLanguage: {
            sEmptyTable: "No Options Available",
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
                targets: [0, 1, 2, 4, 7, 8, 11],
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
                    search_category: $("#searchCategory").val(),
                    search_group: $("#searchGroup").val(),
                    search_option: $("#searchOption").val(),
                    search_option_value: $("#searchOptionValue").val(),
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
                                <li><a href="${SITE_URL}admin/${MODULE_CONTROLLER}/${
                        data.id
                    }">
                                        <i data-feather="eye"></i>Extra Images</a></li>
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
                data: "name",
                title: "Name",
            },
            {
                data: "category.title",
                title: "Category",
            },
            {
                data: "group.name",
                title: "Group",
            },
            {
                data: "sku",
                title: "SKU",
            },
            {
                data: "code",
                title: "Code",
            },
            {
                data: "option.name",
                title: "Option",
            },
            {
                data: "option_value.value",
                title: "Option value",
            },
            {
                data: "price",
                title: "Price",
            },
            {
                data: "quantity",
                title: "Quantity",
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
    $("#previewImageBtnWrap").css("display", "none");
    $("#cropPreviewWrap").css("display", "none");

    $.get(`${SITE_URL}admin/${MODULE_CONTROLLER}/${id}/edit`, function (res) {
        if (res.code == 1) {
            $("i.msg-error").hide();
            $("#modalForm")[0].reset();

            $("#modalForm").attr(
                "action",
                `${SITE_URL}admin/${MODULE_CONTROLLER}/${id}`
            );
            $("#formMethod").val("PUT");
            //setting values
            $("#name").val(res.data.name);
            $("#sku").val(res.data.sku);
            $("#categoryId").val(res.data.category_id);
            $("#optionId").val(res.data.option_id);

            // iterating option value select box then select current value
            getRecordsAjax(
                "get-groups-by-category",
                res.data.category_id,
                "groupId",
                res.data.group_id
            );
            getRecordsAjax(
                "get-option-values",
                res.data.option_id,
                "optionValueId",
                res.data.option_value_id
            );
            // $("#optionValueId").val(res.data.option_value_id);
            $("#price").val(res.data.price);
            $("#quantity").val(res.data.quantity);

            descriptionEditor.setData(res.data.description);
            specificationEditor.setData(res.data.specification);

            // setting existing image in cropper
            $("#prevImg").attr("src", SITE_URL+'storage/uploads/product/'+res.data.image);
            $("#prevHeading").text(`Image`);
            $("#cropPreviewWrap").css("display", "block");
            ///////////////////////////////////////////////////

            $("#id").val(res.data.id);
            $("#formHead").text("Edit Product Option");

            openRightModal();
        } else {
            alertify.error("Error Occurred!");
        }
    });
}

// for cropper
$("#image").on("change", function () {
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
                width: 1200,
                height: 800,
                type: "square",
            },
            boundary: {
                width: 1300,
                height: 900,
            },
            showZoomer: false,
        });
        reader.onload = (e) => {
            image_crop.croppie("bind", {
                url: e.target.result,
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

$("#optionId").change(function () {
    let id = $(this).val();
    if (!id) {
        $("#optionValueId").html("<option value=''>Select</option>");
        alertify.error("Please select option");
        return;
    }
    getRecordsAjax("get-option-values", id, "optionValueId");
});

$("#searchOption").change(function () {
    let id = $(this).val();
    if (!id) {
        $("#searchOptionValue").html("<option value=''>Select</option>");
        alertify.error("Please select option");
        return;
    }
    getRecordsAjax("get-option-values", id, "searchOptionValue");
});

$("#categoryId").change(function () {
    let id = $(this).val();
    if (!id) {
        $("#groupId").html("<option value=''>Select</option>");
        alertify.error("Please select category");
        return;
    }
    getRecordsAjax("get-groups-by-category", id, "groupId");
});
$("#searchCategory").change(function () {
    let id = $(this).val();
    if (!id) {
        $("#searchGroup").html("<option value=''>Select</option>");
        alertify.error("Please select category");
        return;
    }
    getRecordsAjax("get-groups-by-category", id, "searchGroup");
});

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

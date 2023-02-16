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
            name: {
                required: true,
                minlength: 3,
                maxlength: 200,
            },
            slug: {
                required: true,
                minlength: 3,
                maxlength: 200,
            },
        },
        messages: {
            name: {
                required: "Please enter name",
                minlength: "Name must be longer than 3 characters",
                maxlength: "Name must be smaller than 200 characters",
            },
            slug: {
                required: "Please enter slug",
                minlength: "Slug must be longer than 3 characters",
                maxlength: "Slug must be smaller than 200 characters",
            },
        },
        submitHandler: function (form) {
            // ajaxJqueryValidateSubmit(form, data);
            let data = new FormData(form);
            let image = document.getElementById("image");

            if (image.value != "") {
                if (
                    image.files[0].type == "image/png" ||
                    image.files[0].type == "image/jpeg"
                ) {
                    data.delete("image");
                    image_crop
                        .croppie("result", {
                            type: "canvas",
                            size: "viewport",
                        })
                        .then((res) => {
                            var file = dataURLtoFile(res, image.value);
                            data.append("image", file);
                            ajaxJqueryValidateSubmit(form, data);
                        });
                } else {
                    alertify.error("Please Select only image");
                }
            } else {
                ajaxJqueryValidateSubmit(form, data);
            }
        },
    });

    // Opening Create modal
    $("#openModalButton").click(function () {
        $("i.msg-error").hide();
        $("#modalForm")[0].reset();
        $("#iconHolder").html(`N/A`);
        $("#cropWrapper").hide("fast");

        $("#modalForm").attr("action", `${SITE_URL}admin/${MODULE_CONTROLLER}`);
        $("#formMethod").val("POST");

        $("#formHead").text("Add Blog Category");
        openRightModal();
    });

    // Showing cropper
    $("#image").change(function () {
        if (
            this.files[0].type == "image/png" ||
            this.files[0].type == "image/jpeg"
        ) {
            $("#imageCropCanvas").html("");
            let reader = new FileReader();
            image_crop = $("#imageCropCanvas").croppie({
                enableExif: true,
                viewport: {
                    width: 200,
                    height: 200,
                    type: "squire",
                },
                boundary: {
                    width: 300,
                    height: 300,
                },
            });
            reader.onload = () => {
                image_crop.croppie("bind", {
                    url: event.target.result,
                });
            };
            reader.readAsDataURL(this.files[0]);
            $("#cropWrapper").show(1000);
        } else {
            alertify.error("Please Select only image");
            $("#cropWrapper").css("display", "none");
            $("#imageCropCanvas").html("");
            $("#filename").text("");
        }
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
            `<div style="width: 100px">
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
                targets: [0, 1, 2, 5, 6, 7],
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
                data: "slug",
                title: "Slug",
            },
            {
                data: "icon",
                title: "Icon",
            },
            {
                data: function (data) {
                    return data.image
                        ? `<img width="80px" src="${SITE_URL}storage/uploads/blog/category/${data.image}"/>`
                        : `<span class="badge danger radius:tiny size:tiny padding:tiny">N/A</span>`;
                },
                title: "Image",
            },
            {
                data: function (data) {
                    return data.status == 1
                        ? `<span class="badge success radius:tiny size:tiny padding:tiny">Active</span>`
                        : `<span class="badge danger radius:tiny size:tiny padding:tiny">Inactive</span>`;
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
            $("#slug").val(res.data.slug);
            $("#icon").val(res.data.icon);

            $("#id").val(res.data.id);
            console.log(res.data.icon);
            if (res.data.icon) {
                $("#iconHolder").html(
                    `<i data-feather="${res.data.icon}"></i>`
                );
                feather.replace();
            } else {
                $("#iconHolder").html(`N/A`);
            }
            $("#formHead").text("Edit Blog Category");

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

$("#name").keyup(function () {
    $("#slug").val(convertToSlug($(this).val()));
});

$(document).ready(function () {
    filtering();

    ClassicEditor.create(document.querySelector(".ckeditor"), {
        ckfinder: {
            uploadUrl: ckEditorImageUploadUrl,
        },
    }).catch((error) => {
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
        rules: {
            title: {
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
            title: {
                required: "Please enter title",
                minlength: "Title must be longer than 3 characters",
                maxlength: "Title must be smaller than 200 characters",
            },
            slug: {
                required: "Please enter slug",
                minlength: "Slug must be longer than 3 characters",
                maxlength: "Slug must be smaller than 200 characters",
            },
        },
        submitHandler: function (form) {
            var data = new FormData(form);
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
                            data.append("featured_image", file);
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
        $("#cropWrapper").hide("fast");
        $("i.msg-error").hide();
        $("#modalForm")[0].reset();

        $("#modalForm").attr("action", `${SITE_URL}admin/${MODULE_CONTROLLER}`);
        $("#formMethod").val("POST");

        $("#formHead").text("Add Blog Post");
        openRightModal();
    });

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
            sEmptyTable: "No Posts Available",
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
                targets: [0, 1, 2, 5],
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
                data: "title",
                title: "Title",
            },
            {
                data: "slug",
                title: "Slug",
            },
            {
                data: function (data) {
                    let html = ``;
                    data.get_category_posts.forEach((catPost) => {
                        html += catPost.get_categories.name + ` , `;
                    });
                    return html;
                },
                title: "Categories",
            },
            {
                data: "short_desc",
                title: "Sort Description",
            },
            {
                data: function (data) {
                    return data.featured_image != null
                        ? `<img width="80px" src="${SITE_URL}storage/uploads/blog/post/${data.featured_image}"/>`
                        : `<span class="badge danger radius:tiny size:tiny padding:tiny">No Image</span>`;
                },
                title: "Image",
            },
            {
                data: "posted_on",
                title: "Posted On",
            },
            {
                data: function (data) {
                    if (data.status == 1) {
                        return `<span class="badge success radius:tiny size:tiny padding:tiny">Active</span>`;
                    } else if (data.status == 2) {
                        return `<span class="badge warning radius:tiny size:tiny padding:tiny">Draft</span>`;
                    } else {
                        return `<span class="badge danger radius:tiny size:tiny padding:tiny">Inactive</span>`;
                    }
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

            $("#title").val(res.data[0].title);
            $("#slug").val(res.data[0].slug);
            $("#shortDesc").val(res.data[0].short_desc);
            $("#content").val(res.data[0].content);
            $("#metaTitle").val(res.data[0].meta_title);
            $("#meta_desc").val(res.data[0].meta_desc);
            let catArr = [];
            res.data[0].get_category_posts.forEach((catPost) => {
                catArr.push(catPost.cat_id);
            });
            $("#categories").val(catArr);
            $("#categories").change();

            $("#id").val(res.data.id);
            $("#formHead").text("Edit Blog Post");

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
    $("#slug").val(convertToSlug($(this).val()));
});

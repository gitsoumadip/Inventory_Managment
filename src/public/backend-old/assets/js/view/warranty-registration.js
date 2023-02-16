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
                maxlength: 100,
            },
            mobile: {
                required: true,
                mobcheck: true,
                noSpace: true,
            },
            email: {
                customemail: true,
            },
            purchase_date: {
                required: true,
            },
            product_name: {
                required: true,
                minlength: 3,
                maxlength: 100,
            },
            sku_code: {
                required: true,
                minlength: 3,
                maxlength: 100,
                noSpace: true,
            },
            purchase_source: {
                required: true,
            },
            address: {
                required: true,
                minlength: 3,
                maxlength: 100,
            },
            pin: {
                required: true,
                minlength: 3,
                maxlength: 10,
                noSpace: true,
            },
            invoice: {
                required: function () {
                    return $("#formMethod").val() == "POST" ? true : false;
                },
                accept: "jpg,jpeg,png,pdf",
            },
        },
        messages: {
            name: {
                required: "Please enter name",
                minlength: "Name must be minimum 3 characters long",
                maxlength: "Name must be maximum 100 characters long",
            },
            mobile: {
                required: "Mobile number is required",
            },
            email: {
                customemail: "Please enter valid email address",
            },
            purchase_date: {
                required: "Purchase date is required",
            },
            product_name: {
                required: "Please enter product name",
                minlength: "Product name must be minimum 3 characters long",
                maxlength: "Product name must be maximum 100 characters long",
            },
            sku_code: {
                required: "SKU code is required",
                minlength: "SKU code must be minimum 3 characters long",
                maxlength: "SKU code must be maximum 100 characters long",
                noSpace: "Space is not allowed",
            },
            purchase_source: {
                required: "Please select purchase source",
            },
            address: {
                required: "Please enter address",
                minlength: "Address must be minimum 3 characters long",
                maxlength: "Address must be maximum characters long",
            },
            pin: {
                required: "Please enter PIN code",
                minlength: "PIN must be minimum 3 characters long",
                maxlength: "PIN must be maximum 10 characters long",
                noSpace: "Space is not allowed",
            },
            invoice: {
                required: "Invoice file is required",
                accept: "Please select valid image or PDF file",
            },
        },
        submitHandler: function (form) {
            var data = new FormData(form);
            let inv = document.getElementById("invoiceFile");
            if (
                inv.files[0].type == "image/png" ||
                inv.files[0].type == "image/jpeg"
            ) {
                data.delete("invoice");
                image_crop
                    .croppie("result", {
                        type: "canvas",
                        size: "viewport",
                    })
                    .then((res) => {
                        var file = dataURLtoFile(res, inv.value);
                        data.append("invoice_attch", file);
                        console.log(file);
                        ajaxJqueryValidateSubmit(form, data);
                        // $.ajax({
                        //     type: 'POST',
                        //     url,
                        //     data,
                        //     cache: false,
                        //     contentType: false,
                        //     processData: false,
                        //     beforeSend: function () {
                        //     },
                        //     success: function (res) {
                        //         if (res.code == 1) {
                        //             alertify.success(res.message);
                        //             $('#modalForm')[0].reset();
                        //             $('#modal--right').removeClass('showing-modal');
                        //             dataTable.destroy();
                        //             filtering();
                        //         } else {
                        //             alertify.error(res.message);
                        //             btn.attr('disabled', false);
                        //             btn.html(btnTxt);
                        //         }
                        //     },
                        //     complete: function () {
                        //         btn.attr('disabled', false);
                        //         btn.html(btnTxt);
                        //     },
                        //     error: function (xhr, x) {
                        //         btn.attr('disabled', false);
                        //         btn.html(btnTxt);
                        //     }
                        // });
                    });
            } else {
                ajaxJqueryValidateSubmit(form, data);
            }
            // $.ajax({
            //     type: 'POST',
            //     url,
            //     data,
            //     cache: false,
            //     contentType: false,
            //     processData: false,
            //     beforeSend: function () {
            //     },
            //     success: function (res) {
            //         if (res.code == 1) {
            //             alertify.success(res.message);
            //             $('#modalForm')[0].reset();
            //             $('#modal--right').removeClass('showing-modal');
            //             dataTable.destroy();
            //             filtering();
            //         } else {
            //             alertify.error(res.message);
            //             btn.attr('disabled', false);
            //             btn.html(btnTxt);
            //         }
            //     },
            //     complete: function () {
            //         btn.attr('disabled', false);
            //         btn.html(btnTxt);
            //     },
            //     error: function (xhr, x) {
            //         btn.attr('disabled', false);
            //         btn.html(btnTxt);
            //     }
            // });

            // data.append('_token', $('meta[name="_token"]').attr('content'));
            // Appending the cropped image in FormData
        },
    });

    

    // Opening Create modal
    $("#openModalButton").click(function () {
        $("#imageCropCanvas").html("");
        $("i.msg-error").hide();
        $("#modalForm")[0].reset();

        $("#modalForm").attr("action", `${SITE_URL}admin/${MODULE_CONTROLLER}`);
        $("#formMethod").val("POST");

        $("#formHead").text("Add Warranty Registration");

        openRightModal();
    });
    // showEditModal(1);

    $("#invoiceFile").change(function () {
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
                    type: "square",
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
            $("#imageCropCanvas").html("");
        }
    });
});

// Populating Modules Table via jquery datatable using ajax
function filtering() {
    dataTable = $("#moduleTable").DataTable({
        oLanguage: {
            sEmptyTable: "No Warranty Registrations Available",
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
                targets: [0, 1, 2, 9, 10, 11],
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
                data: "name",
                title: "Name",
            },
            {
                data: "mobile",
                title: "Mobile",
            },
            {
                data: "email",
                title: "Email",
            },
            {
                data: "product_name",
                title: "Product Name",
            },
            {
                data: function (data) {
                    return convertDateFromSql(data.purchase_date);
                },
                title: "Purchase Date",
            },
            {
                data: "sku_code",
                title: "SKU Code",
            },
            {
                data: "purchase_source_name",
                title: "Purchase Source",
            },
            {
                data: "file_icon",
                title: "Invoice",
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
}

//Opening Edit modal
function showEditModal(id) {
    $("#imageCropCanvas").html("");
    $.get(`${SITE_URL}admin/${MODULE_CONTROLLER}/${id}/edit`, function (res) {
        if (res.code == 1) {
            $("i.msg-error").hide();
            $("#modalForm")[0].reset();

            $("#modalForm").attr(
                "action",
                `${SITE_URL}admin/${MODULE_CONTROLLER}/${id}`
            );
            $("#formMethod").val("PUT");

            // putting value
            $("#name").val(res.data.name);
            $("#mobile").val(res.data.mobile);
            $("#email").val(res.data.email);
            $("#purchaseDate").val(res.data.purchase_date);
            $("#productName").val(res.data.product_name);
            $("#skuCode").val(res.data.sku_code);
            $("#address").val(res.data.address);
            $("#pin").val(res.data.pin);
            $("#purchaseSource").val(res.data.purchase_source);
            
            $("#formHead").text("Edit Warranty Registration");

            openRightModal();
        } else {
            alertify.error("Error Occurred!");
        }
    });
}

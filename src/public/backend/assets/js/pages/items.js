$(document).ready(function () {
  filtering();

  // Form Validations
  $("#moduleModalForm")
    .submit(function (e) {
      e.preventDefault();
    })
    .validate({
      errorElement: "i",
      errorClass: "msg msg-error",
      rules: {
        products_id: {
          required: true,
        },
        category_id: {
          required: true,
        },
        brand_id: {
          required: true,
        },
        store_id: {
          required: true,
        },
        models_id: {
          required: true,
        },
        serial_no: {
          required: true,
        },
        price: {
          required: true,
        },
        description: {
          required: true,
        },
        status: {
          required: true,
        },
      },
      messages: {        
        products_id: {
          required: "Please select product",
        },
        category_id: {
          required: "Please select category",
        },
        brand_id: {
          required: "Please select brand",
        },
        store_id: {
          required: "Please select store",
        },
        models_id: {
          required: "Please select models",
        },
        serial_no: {
          required: "Please enter serial number",
        },
        price: {
          required: "Please enter price",
        },
        description: {
          required: "Please enter description",
        },
        status: {
          required: "Please select status.",
        },
      },
      submitHandler: function (form) {
        let data = new FormData(form);
        ajaxJqueryValidateSubmit(form, data);
        return false;
      },
    });

  $("#openModalButton").click(function () {
    $("i.msg-error").hide();
    $("#moduleModalForm")[0].reset();

    $("#moduleModalForm").attr(
      "action",
      `${SITE_URL}/admin/${MODULE_CONTROLLER}`
    );
    $("#formMethod").val("POST");

    $("#formHead").text("Add Category");
    $("#moduleFormModal").modal("show");
  });

  // Show Edit modal
  $(document).on("click", ".edit-button", function () {
    let id = $(this).data("id");
    $.get(`${SITE_URL}/admin/${MODULE_CONTROLLER}/${id}/edit`, function (res) {
      if (res.code == 1) {
        $("i.msg-error").hide();
        $("#moduleModalForm")[0].reset();

        $("#moduleModalForm").attr(
          "action",
          `${SITE_URL}/admin/${MODULE_CONTROLLER}/${id}`
        );
        $("#formMethod").val("PUT");

        $("#name").val(res.data.name);
        $("#slug").val(res.data.slug);
        $("#status").val(res.data.status);

        $("#id").val(res.data.id);
        $("#formHead").text("Edit Category");

        $("#moduleFormModal").modal("show");
      }
    });
  });
});

// Populating Modules Table via jquery datatable using ajax
function filtering() {
  dataTable = $("#moduleTable").DataTable({
    oLanguage: {
      sEmptyTable: "No Items Available",
    },
    columnDefs: [
      {
        orderable: false,
        targets: [],
      },
    ],
    searching: false,
    processing: true,
    serverSide: true,
    ajax: {
      url: `${SITE_URL}/admin/${MODULE_CONTROLLER}/fetch`,
      dataSrc: "data",
      data: function (d) {
        return $.extend({}, d, {
          search_keyword: $("#searchKeyword").val().toLowerCase(),
        });
      },
    },
    drawCallback: function () {
      // feather.replace();
    },
  
    lengthMenu: [10, 20, 30],
    columns: [
      {
        data: function (data, type, row, meta) {
          return meta.row + meta.settings._iDisplayStart + 1;
        },
        title: "Sl",
      },
      {
        data: function (data) {
          return `
          <a href="javascript:void(0)"  class="btn btn-warning btn-sm edit-button" data-id="${data.id}">Edit</a>
          <a href="javascript:void(0)"  class="btn btn-danger btn-sm delete-button" data-id="${data.id}">Delete</a>
          `;
        },
        title: "Action",
      },
      {
        data: "category_id",
        title: "category_id",
      },
      {
        data: "product_formatted",
        title: "Products",
      },
      {
        data: "brand_formatted",
        title: "brand_id",
      },
      {
        data: "storeLoc_formatted",
        title: "store_id",
      },
      {
        data: "modelNo_formatted",
        title: "models_id",
      },
      {
        data: "serial_no",
        title: "serial_no",
      },
      {
        data: "price",
        title: "Price",
      },
      {
        data: "description",
        title: "description",
      },
      {
        data: "status_formatted",
        title: "Status",
      },
    ],
  });
}

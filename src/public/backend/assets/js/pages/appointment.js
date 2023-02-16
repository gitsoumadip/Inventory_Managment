$(document).ready(function () {
  filtering();

  // Form Validations
  $("#moduleModalForm").submit(function(e){
    e.preventDefault();
  }).validate({
    errorElement: "i",
    errorClass: "msg msg-error",
    rules: {
      name: {
        required: true,
        rangelength: [3, 100],
      },
      phone: {
        required: true,
        rangelength: [10,10],
      },
      email: {
        required: true,
        email: true,
        rangelength: [3, 100],
      },
      dateOfProgram: {
        required: true,      
      },
      discussion_details: {
        required: true,
        rangelength: [3, 150],
      },
      status: {
        required: true,
      },
    },
    messages: {
      name: {
        required: "Please enter name",
        rangelength: "Name should be 3 to 100 characters.",
      },
      phone: {
        required: "Please enter phone number",
        rangelength: "Phone Number should be 10 characters.",
      },
      email: {
        required: "Please enter email address",
        rangelength: "Email Address should be 3 to 100 characters.",
      },
      dateOfProgram: {
        required: "Please enter date of program",
      },
      discussion_details: {
        required: "Please enter Details",
        rangelength: "Details should be 3 to 100 characters.",
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

    $("#formHead").text("Add Appointment");
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
        $("#phone").val(res.data.phone);
        $("#email").val(res.data.email);
        $("#dateOfProgram").val(res.data.dateOfProgram);
        $("#discussion_details").val(res.data.discussion_details);
        $("#status").val(res.data.status);
       
        $("#id").val(res.data.id);
        $("#formHead").text("Edit Appointment");

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
        data: "name",
        title: "Name",
      },
      {
        data: "phone",
        title: "Phone",
      },
      {
        data: "email",
        title: "Email",
      },
      {
        data: "requirement",
        title: "Requirement",
      },
      {
        data: "dateOfProgram",
        title: "Date Of Program",
      },
      {
        data: "discussion_details",
        title: "Discussion Details",
      },
      {
        data: "reference",
        title: "Reference",
      },
      {
        data: "status_formatted",
        title: "Status",
      }
    ],
  });
}

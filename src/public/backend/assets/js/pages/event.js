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
    
      location: {
        required: true,
        rangelength: [3, 100],
      },
      date: {
        required: true
      },
      start_time: {
        required: true
      },
      end_time: {
        required: true
      },
      person_name: {
        required: true,
        rangelength: [3, 100],
      },
      person_ph: {
        required: true,
        rangelength: [10,10],
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
     
      location: {
        required: "Please enter location",
        rangelength: "location should be 3 to 100 characters.",
      },
      date: {
        required: "Please enter date"
      },
      start_time: {
        required: "Please enter start_time"
      },
      end_time: {
        required: "Please enter end_time"
      },
      person_name: {
        required: "Please enter person_name",
        rangelength: "person_name should be 3 to 100 characters.",
      },
      person_ph: {
        required: "Please enter person phone number",
        rangelength: "person_ph should be 10 characters.",
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

    $("#formHead").text("Add Event");
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
        $("#location").val(res.data.location);
        $("#date").val(res.data.date);
        $("#start_time").val(res.data.start_time);
        $("#end_time").val(res.data.end_time);
        $("#person_name").val(res.data.person_name);
        $("#person_ph").val(res.data.person_ph);
        $("#status").val(res.data.status);

        $("#id").val(res.data.id);
        $("#formHead").text("Edit Event");

        $("#moduleFormModal").modal("show");
      }
    });
  });
});

// Populating Modules Table via jquery datatable using ajax
function filtering() {
  dataTable = $("#moduleTable").DataTable({
    oLanguage: {
      sEmptyTable: "No Brands Available",
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
        data: "env_number",
        title: "env_number",
      },
      {
        data: "location",
        title: "location",
      },
      {
        data: "date",
        title: "date",
      },
      {
        data: "start_time",
        title: "start_time",
      },
      {
        data: "end_time",
        title: "end_time",
      },
      {
        data: "person_name",
        title: "person_name",
      },
      {
        data: "person_ph",
        title: "person_ph",
      },
      {
        data: "status",
        title: "status",
      },
    ],
  });
}

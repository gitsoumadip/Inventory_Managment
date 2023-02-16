$(document).ready(function () {
  // Run clear search for the datatable
  $("#clearSearch").click(function () {
    $("#searchTable")[0].reset();
    dataTable.ajax.reload();
  });
  // Run search for the datatable
  $("#searchTable").submit(function (e) {
    dataTable.ajax.reload();
    e.preventDefault();
  });
  // Delete with form via anchor with data-href attribute
  // Delete Confirmation and Firing Delete form
  $(document).on("click", ".delete-button", function () {
    let id = $(this).data("id");

    Swal.fire({
      title: "<strong>Are you sure to delete this item?</strong>",
      icon: "question",
      html: "",
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then((r) => {
      if (r.isConfirmed) {
        let url = `${SITE_URL}/admin/${MODULE_CONTROLLER}/${id}`;
        $.ajax({
          type: "DELETE",
          url,
          cache: false,
          contentType: false,
          processData: false,
          beforeSend: function () {},
          success: function (res) {
            if (res.code == 1) {
              Swal.fire({
                title: "Success!",
                html: res.message,
                icon: "success",
              });
              dataTable.ajax.reload(null, false);
            } else {
              Swal.fire({
                title: "Error!",
                html: res.message,
                icon: "error",
              });
            }
          },
          complete: function () {},
          error: function (xhr, x) {},
        });
      }
    });
  });
});

// Getting select box Records via ajax call and putting them to target select field
function getRecordsAjax(mode, master_id, target, current_id) {
  // getting records via ajax call
  $.post(
    `${SITE_URL}/ajax/get-records`,
    {
      mode: mode,
      id: master_id,
    },
    (res) => {
      if (res.code == 1) {
        let values = res.result;
        // Setting values to the target
        $("#" + target).html(`<option value="">Select</option>`);
        values.forEach((record) => {
          $("#" + target).append(
            $("<option></option>").attr("value", record.id).text(record.value)
          );
        });
        // setting value for edit form
        if (current_id) {
          $("#" + target).val(current_id);
        }
      } else {
       alert(res.message);
      }
    }
  ).fail((e) => {
   alert("Some error ocurred! Please try again.");
  });
}

// Function to run ajax in jquery validate
const ajaxJqueryValidateSubmit = (form, data, noRefreshDataTable) => {
  event.preventDefault();
  var url = $(form).attr("action");
  let btn = $(form).find('button[type="submit"]');
  let btnTxt = btn.html();
  btn.attr("disabled", true);
  btn.html(`Please Wait ...`);
  $.ajax({
    type: "POST",
    url,
    data,
    cache: false,
    contentType: false,
    processData: false,
    beforeSend: function () {},
    success: function (res) {
      if (res.code == 1) {
        Swal.fire({
          title: "Success!",
          html: res.message,
          icon: "success",
        }).then((e) => {
          form.reset();
          $("#moduleFormModal").modal("hide");
          !noRefreshDataTable ? dataTable.ajax.reload(null, false) : "";
        });
      } else {
        Swal.fire({
          title: "Error!",
          html: res.message,
          icon: "error",
        });
      }
      btn.attr("disabled", false);
      btn.html(btnTxt);
    },
    complete: function () {
      btn.attr("disabled", false);
      btn.html(btnTxt);
    },
    error: function (xhr, x) {
      btn.attr("disabled", false);
      btn.html(btnTxt);
    },
  });
};

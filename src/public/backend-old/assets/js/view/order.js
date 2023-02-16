$(document).ready(function () {
    // For cancelling order
    $(document).on("click", ".cancel-order", function () {
        let order_id = $(this).data("id");
        alertify.confirm(
            "Alert!",
            "Really want to cancel the order??",
            () => {
                $.ajax({
                    type: "PUT",
                    url: `${SITE_URL}cancel-order/${order_id}`,
                    cache: false,
                    contentType: false,
                    processData: false,
                    beforeSend: function () {},
                    success: function (res) {
                        if (res.code == 1) {
                            alertify.success(res.message[0]);
                            location.reload();
                        } else {
                            alertify.error("error ocurred!");
                        }
                    },
                    complete: function () {},
                    error: function (xhr, x) {
                        alertify.error("error ocurred!");
                    },
                });
            },
            () => {}
        );
    });
    filtering();

    // Add event listener for opening and closing details
    $("#moduleTable tbody").on("click", "td.dt-control", function () {
        var tr = $(this).closest("tr");
        var row = dataTable.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide("slow");
            tr.removeClass("shown");
        } else {
            // Open this row
            row.child(format(row.data())).show("slow");
            tr.addClass("shown");
        }
    });
});

/* Formatting function for row details - modify as you need */
function format(data) {
    // `d` is the original data object for the row
    var subTable = $("<table>").addClass("order-sub-row");
    subTable.append(`
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>SKU</th>
                        <th>Price</th>
                        <th>quantity</th>
                    </tr>
                `);
    data.order_products.forEach((product) => {
        subTable.append(`
            <tr>
                <td style="width:50px"><img width="50px" src="${SITE_URL+"storage/uploads/product/"+product.product.image}"/></td>
                <td>${product.product_name}</td>
                <td>${product.sku_code}</td>
                <td>₹ ${product.product_price}</td>
                <td> X ${product.product_quantity}</td>
            </tr>
        `);
    });
    return subTable;
}

// Populating Orders Table via jquery datatable using ajax
function filtering() {
    dataTable = $("#moduleTable").DataTable({
        oLanguage: {
            sEmptyTable: "No Orders Available",
        },
        dom: "Bfrtip",
        buttons: ["pageLength"],
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
                className: "dt-control",
                orderable: false,
                data: null,
                defaultContent: "",
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
                            <i data-feather="more-horizontal"></i>
                            </a>
                            <ul class="left-flow">
                                <li><a href="${SITE_URL}admin/${MODULE_CONTROLLER}/${data.unique_id}"><i data-feather="eye"></i>View</a></li>
                                
                            </ul>
                        </div>
                        `;
                },
                title: "Action",
            },
            {
                data: "unique_id",
                title: "Order No.",
            },
            {
                data: "full_name",
                title: "Customer Name",
            },
            {
                data: "billing_email",
                title: "Email",
            },
            {
                data: (data) => {
                    return "₹" + data.order_total;
                },
                title: "Amount",
            },
            {
                data: "payment_method",
                title: "Payment Method",
            },
            {
                data: "purchase_date_formatted",
                title: "Date",
            },
            {
                data: function (data) {
                    let t = "Placed",
                        c = "primary",
                        s = 0;
                    if (data.status == 0) {
                        (t = "Inactive"), (c = "danger"), (s = 1);
                    }

                    return `<div style="cursor:pointer" class="status-change" data-name="${data.module_name}" data-id="${data.id}" data-status="${s}" ><span class="badge ${c} radius:tiny size:tiny padding:tiny">${t}</span></div>`;
                },
                title: "Status",
            },
        ],
    });
}

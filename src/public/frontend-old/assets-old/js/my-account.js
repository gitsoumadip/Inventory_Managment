$(document).ready(() => {
    length = 5;
    page = 1;
    start = 0;
    showOrdersList(start, length);

    // For pagination
    $(document).on("click", ".pagination-link", function () {
        $("html, body").animate(
            {
                scrollTop: $("#scrollTopSection").offset().top,
            },
            300
        );
        clickedPage = $(this).data("page");
        if (clickedPage == "prev") {
            if (page > 1) {
                page--;
            } else {
                return false;
            }
        } else if (clickedPage == "next") {
            page++;
        } else if (clickedPage == page) {
            return false;
        } else {
            page = clickedPage;
        }
        start = page * length - 1;
        setTimeout(() => {
            let searchKeyword = $("#keyword").val();
            showOrdersList(start, length, searchKeyword);
        }, 300);
    });
    //For searching
    $(document).on("click", "#searchForm", function (e) {
        e.preventDefault();
        page = 1;
        start = 0;
        let searchKeyword = $("#keyword").val();
        showOrdersList(start, length, searchKeyword);
    });

    // For cancelling order
    $(document).on("click", ".cancel-order", function () {
        let order_id = $(this).data("id");
        Swal.fire({
            title: "Really want to cancel the order??",
            text: "You won't be able to revert this!",
            type: "warning",
            icon: "warning",
            showCancelButton: true,
            // confirmButtonColor: "#3085d6",
            // cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    type: "PUT",
                    url: `${SITE_URL}cancel-order/${order_id}`,
                    cache: false,
                    contentType: false,
                    processData: false,
                    beforeSend: function () {},
                    success: function (res) {
                        if (res.code == 1) {
                            Swal.fire(
                                res.message[0],
                                res.message[1],
                                "success"
                                ).then(e=>{
                                    location.reload();
                                });
                        } else {
                            Swal.fire({
                                title: "error ocurred!",
                                text: "Please try again later.",
                                type: "error",
                                icon: "error",
                            })
                        }
                    },
                    complete: function () {},
                    error: function (xhr, x) {
                        Swal.fire({
                            title: "error ocurred!",
                            text: "Please try again later.",
                            type: "error",
                            icon: "error",
                        })
                    },
                });
            }
        });
    });
});

function showOrdersList(start = 0, length = 10, search_keyword = "") {
    $("#orderWrapper").html(
        `<div class="text-center loading">
            <img src="${SITE_URL}public/frontend/assets/img/loader.gif" alt="Loading...">
            <small>Loading...</small>
        </div>`
    );
    setTimeout(() => {
        $.get(
            `my-account/orders?start=${start}&length=${length}&search_keyword=${search_keyword}`,
            (res) => {
                if (res.code == 1) {
                    let orderHtml = ``;
                    if (res.count > 0) {
                        let allCount = res.count;
                        let pages = Math.ceil(allCount / length);
                        res.data.forEach((order) => {
                            orderHtml += `
					<div class="order-block">
						<div class="order-head">
							<ul class="od_head">
								<li>
									<p class="h6">Order Placed: <span class="h5 fw--b">${order.purchase_date_formatted}</span></p>
								</li>
								<li>
									<p class="h6">Total: <span class="h5 fw--b">₹ ${order.order_total}</span></p>
								</li>
								<li>
									<p class="h6">Order No: <span class="h5 fw--b">#${order.unique_id}</span></p>
								</li>
								<li>
									<p class="h6">Status: <span class="h5 fw--b">${order.status_text}</span></p>
								</li>
								<li>
									<a class="order-link" href="${SITE_URL}order-details/${order.unique_id}">View Order Details</a>
								</li>
							</ul>
						</div>`;
                            order.order_products.forEach((orderProduct) => {
                                orderHtml += `
						<div class="order-body">
							<div class="delivery__status">
								<ul class="status-body">
									<li class="status-image">
										<a target="_blank" href="${SITE_URL + orderProduct.product.category.slug}/${
                                    orderProduct.product.group.slug
                                }/${orderProduct.product.code}">
											<img src="${SITE_URL}storage/uploads/product/${
                                    orderProduct.product.image
                                }" alt="${orderProduct.product_name}" title="${
                                    orderProduct.product_name
                                }">
										</a>
									</li>
									<li class="status-details">
										<a target="_blank" href="${SITE_URL + orderProduct.product.category.slug}/${
                                    orderProduct.product.group.slug
                                }/${orderProduct.product.code}">${
                                    orderProduct.product_name
                                }</a>
									</li>
									<li class="status-actions">
										<a href="javascript:void(0)" class="c2a c2a-arw c2a--inline outline c--txt hvr:bg--txt hvr:c--whitee size:expandedX text-center radius:expandedX2">Return Items</a>
										<a href="javascript:void(0)" class="c2a c2a-arw c2a--inline outline c--txt hvr:bg--txt hvr:c--whitee size:expandedX text-center radius:expandedX2">Write a Product Review</a>
									</li>
								</ul>
							</div>
						</div>
					`;
                            });
                        });
                        orderHtml += `
								<div class="pagination d-flex justify-content-between">
									<span>Showing ${start + 1} to ${
                            start + length > allCount
                                ? allCount
                                : start + length
                        } out of ${allCount}</span>
                                    <ul>
                                        <li><a ${
                                            page == 1 ? "disabled" : ""
                                        } href="javascript:void(0)" class="pagination-link ml-1" data-page="prev"> Prev</a></li>`;
                        for (i = 1; i <= pages; i++) {
                            orderHtml += `<li><a href="javascript:void(0)" class="pagination-link ml-1 ${
                                page == i ? "active" : ""
                            }" data-page="${i}"> ${i}</a></li>`;
                        }
                        orderHtml += `<li><a ${
                            page == pages ? "disabled" : ""
                        } href="javascript:void(0)" class="pagination-link ml-1" data-page="next"> Next</a></li>
                                    </ul>
								</div>
							</div>`;
                    } else {
                        orderHtml = `<h2 class="text-center">No Orders available</h2>`;
                    }
                    $("#orderWrapper").html(orderHtml);
                }
            }
        );
    }, 300);
}

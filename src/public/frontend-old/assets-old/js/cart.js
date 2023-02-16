$(document).ready(function () {

  showCartItems();

  $('.plus').click(function () {
    let maxStock = $("#maxStock").val();
    let currentValue = parseInt($("#quantity").val());
    if (currentValue + 1 > maxStock) {
      $("#quantity").val(currentValue);
      $("#stockError").text(`Maximum allowed limit is ${maxStock}.`)
    } else {
      $("#quantity").val(currentValue + 1);
      $("#stockError").text(``)
    }
  });

  $('.minus').click(function () {
    let minStock = 1;
    let currentValue = parseInt($("#quantity").val());

    if (currentValue - 1 < minStock) {
      $("#quantity").val(currentValue);
      $("#stockError").text(`Minimum allowed limit is ${minStock}.`)
    } else {
      $("#quantity").val(currentValue - 1);
      $("#stockError").text(``)
    }
  });

  $(".add__cart").click(function () {
    // alert();
    // $('#add--cart').addClass("showing-modal");
    let code = $(this).data("pcode");
    let mode = 'update';
    let qty = 1;

    // $('#add--cart').addClass("showing-modal");
    // return false;
    let card__1 = $(this).closest(".card__1");
    $.ajax({
      type: 'GET',
      url: SITE_URL + 'update-cart',
      data: { code: code, mode: mode, qty: qty },
      cache: false,
      // contentType: false,
      processData: true,
      success: function (response) {
        console.log(response);
        let c = (response.code == 1) ? 'green' : 'red';
        $('#cart__img').html(`<img src="${response.info.image}" alt="" title="${response.info.name}" style="width:150px" >`);
        $('#cart__pname').html(response.info.name);
        $('#cart__msg').html(response.message).css('color', c);
        $('#add--cart').addClass("showing-modal");
        $(card__1).addClass("cartadded");

        if (response.code == 1) {
          showCartItems();
          setTimeout(function () { location.reload(); }, 2000);
        }
      },
      error: function () {
        // $("#warranty_btn").prop("disabled", false).html("Submit Product Details");
      },
    });
  });

  $(".cart--select--box").change(function () {
    let code = $(this).data("pcode");
    let mode = 'update';
    let qty = $(this).val();
    let fixed = 1;

    if (parseInt(qty) > 0) {
      $.ajax({
        type: 'GET',
        url: SITE_URL + 'update-cart',
        data: { code: code, mode: mode, qty: qty, fixed: fixed },
        cache: false,
        // contentType: false,
        processData: true,
        success: function (response) {
          let c = (response.code == 1) ? 'green' : 'red';
          $('#cart__img').html(`<img src="${response.info.image}" alt="" title="${response.info.name}" style="width:150px" >`);
          $('#cart__pname').html(response.info.name);
          $('#cart__msg').html(response.message).css('color', c);
          $('#add--cart').addClass("showing-modal");
          if (response.code == 1) {
            showCartItems();
            setTimeout(function () { location.reload(); }, 2000);
          }
        },
        error: function () {
          // $("#warranty_btn").prop("disabled", false).html("Submit Product Details");
        },
      });
    } else {
      alert("not a valid Quantity");
    }

    // $('#add--cart').addClass("showing-modal");
    // return false;


  });

  // details page add to cart
  $("#add_to_cart").click(function () {
    let code = $(this).data("pcode");
    let mode = 'update';
    let qty = $('#quantity').val();
    let fixed = 1;

    if (parseInt(qty) > 0) {
      $.ajax({
        type: 'GET',
        url: SITE_URL + 'update-cart',
        data: { code: code, mode: mode, qty: qty, fixed: fixed },
        cache: false,
        // contentType: false,
        processData: true,
        success: function (response) {
          console.log(response);
          let c = (response.code == 1) ? 'green' : 'red';
          $('#cart__img').html(`<img src="${response.info.image}" alt="" title="${response.info.name}" style="width:150px" >`);
          $('#cart__pname').html(response.info.name);
          $('#cart__msg').html(response.message).css('color', c);
          $('#add--cart').addClass("showing-modal");

          if (response.code == 1) {
            showCartItems();
          }
        },
        error: function () {
          // $("#warranty_btn").prop("disabled", false).html("Submit Product Details");
        },
      });
    } else {
      alert("not a valid Quantity");
    }

    // $('#add--cart').addClass("showing-modal");
    // return false;


  });


  $('body').on('click', '.remove__item', function () {
    Swal.fire({
      title: "Are you sure you want to remove this item from cart",
      type: "warning",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
    }).then((result) => {
      if (result.value) {
        let code = $(this).data("pcode");
        let mode = 'delete';
        // let qty = 1;
        // $('#add--cart').addClass("showing-modal");
        // return false;

        $.ajax({
          type: 'GET',
          url: SITE_URL + 'update-cart',
          data: { code: code, mode: mode },
          cache: false,
          // contentType: false,
          processData: true,
          success: function (response) {
            console.log(response);
            let c = (response.code == 1) ? 'green' : 'red';
            $('#cart__img').html(`<img src="${response.info.image}" alt="" title="${response.info.name}" style="width:150px" >`);
            $('#cart__pname').html(response.info.name);
            $('#cart__msg').html(response.message).css('color', c);
            $('#add--cart').addClass("showing-modal");
            if (response.code == 1) {
              showCartItems();
              setTimeout(function () { location.reload(); }, 2000);
            }
          },
          error: function () {
            // $("#warranty_btn").prop("disabled", false).html("Submit Product Details");
          },
        });
      }

    });


  });



  $('body').on('click', '#empty__cart', function () {

    Swal.fire({
      title: 'Are you sure you want to empty the cart?',
      type: "warning",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
    }).then((result) => {
      if (result.value) {
        let code = $(this).data("pcode");
        let mode = 'clear';

        $.ajax({
          type: 'GET',
          url: SITE_URL + 'update-cart',
          data: { code: code, mode: mode },
          cache: false,
          // contentType: false,
          processData: true,
          success: function (response) {
            let c = (response.code == 1) ? 'green' : 'red';
            $('#msg--modal #msg__area').html(response.message).css('color', c);
            $('#msg--modal').addClass("showing-modal");
            setTimeout(function () { }, 2000);
          },
          error: function () {
            // $("#warranty_btn").prop("disabled", false).html("Submit Product Details");
          },
        });
      }
    });
  });
});

function showCartItems() {

  $.ajax({
    type: 'GET',
    url: SITE_URL + 'show-cart-items',
    cache: false,
    // contentType: false,
    processData: true,
    success: function (response) {
      let cartItems = '';
      $('#cart_total_items').html('(0)');
      if (response.code) {
        $(response.results).each(function (index, element) {
          cartItems += `<div class="card__cell">
                            <figure>
                                <a href="${element.link}">
                                <img src="${element.image}" alt="" title="">
                                </a>
                            </figure>
                            <article class="flow-rootx">
                                <h6><a href="${element.link}">${element.name}</a></h6>
                                <p>${element.price_formatted} X ${element.in_cart}</p>
                            </article>
                            <a class="card__delete remove__item" href="javascript:void(0)" data-pcode="${element.sku}"><span class="material-icons-outlined">delete_forever</span></a>
                        </div>` ;
        });
        $('.divya__minicart #total').html(response.info['total']);
        $('#cart_total_items').html('(' + response.info['total_items'] + ')');
        if (response.info['total_items'] > 0) {
          $('.clickCart').data('status', 1);
        }
      }
      $('.divya__minicart #card_items_list_top').html(cartItems);
    },
    error: function () {
      // $("#warranty_btn").prop("disabled", false).html("Submit Product Details");
    },
  });

}

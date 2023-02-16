// $(document).ready(function() {
//   $('.plus').click(function () {
//     var val = $('#quantity').val();
//     quantityCheck('add', (parseInt(val)+1));
//   });
//
//   $('.minus').click(function () {
//     var val = $('#quantity').val();
//     quantityCheck('sub', (parseInt(val)-1));
//   });
//
//   $('#quantity').keyup(function () {
//     var val = $('#quantity').val();
//     quantityCheck('sub', (parseInt(val)-1));
//   });
//
// });
//
// function quantityCheck(operator, quantity) {
//   var code = $('#code').val();
//   var error_msg = "You've reached the maximum limit";
//   if (quantity <= 3) {
//     $.ajax({
//       type: "POST",
//       url: SITE_URL + "check-product-quantity",
//       data: { code: code },
//       success: function(response) {
//         if (response.success) {
//           if (response.quantity == 2 && quantity == 2 && operator == 'add') {
//             $('#quantity').val(parseInt(val)+1);
//           }else if (response.quantity == 3 && quantity == 3 && operator == 'add') {
//             $('#quantity').val(parseInt(val)+1);
//           }else {
//             $('#quantity').after("<i id='quantity-error' class='msg msg-error'>"+error_msg+"</i>");
//           }
//         }
//       }
//     });
//   }
//
//
//
//
//
//
//
//
//
//   // if (operator == 'sub' && response.quantity == 2 && val == 2) {
//   //   $('.number').find('i').remove();
//   //   $('#quantity').val(parseInt(val)-1);
//   // }else if (operator == 'sub' && response.quantity == 3 && val == 3) {
//   //   $('.number').find('i').remove();
//   //   $('#quantity').val(parseInt(val)-1);
//   // }else {
//   //   $('#quantity').after("<i id='quantity-error' class='msg msg-error'>"+error_msg+"</i>");
//   // }
//
//
//
//   // if (val <= 2) {
//   //
//   // }else {
//   //   if (val > 0) {
//   //     $('#quantity').val(1);
//   //     $('#quantity').after("<i id='quantity-error' class='msg msg-error'>"+error_msg+"</i>");
//   //   }
//   // }
// }

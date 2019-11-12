window.onload = function() {

  $('.delivery-js').on('click', function () {
    $('.delivery-js').addClass('ship-active');
    $('.pickup-js').removeClass('ship-active');
    $('.type-ship-delivery-wrap').css('display', 'block');
    $('.type-ship-pickup-wrap').css('display', 'none');
  });

  $('.pickup-js').on('click', function () {
    $('.pickup-js').addClass('ship-active');
    $('.delivery-js').removeClass('ship-active');
    $('.type-ship-delivery-wrap').css('display', 'none');
    $('.type-ship-pickup-wrap').css({"display":"block"});
  });

  $('.baskets-list__close').on('click', function () {
      $('.frm.frm-delete').addClass('act');
      $('.overlay').addClass('act');
  });

   $('.frm-delete .close').on('click', function () {
      $('.frm.frm-delete').removeClass('act');
      $('.overlay').removeClass('act');
  });
 $('.total__promocode_btn').on('click', function () {
      $('.total__promocode').css("display", "none");

  });
 $("#form-phone").mask("+7(999)999-99-99");

};

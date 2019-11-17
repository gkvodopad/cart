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


};

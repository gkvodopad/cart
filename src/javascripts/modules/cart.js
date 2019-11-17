window.onload = function() {

  $('.delivery-js').on('click', function () {
    $('.delivery-js').addClass('active');
    $('.pickup-js').removeClass('active');
    $('.type-ship-delivery-wrap').css('display', 'block');
    $('.type-ship-pickup-wrap').css('display', 'none');
  });

  $('.pickup-js').on('click', function () {
    $('.pickup-js').addClass('active');
    $('.delivery-js').removeClass('active');
    $('.type-ship-delivery-wrap').css('display', 'none');
    $('.type-ship-pickup-wrap').css({"display":"block"});
  });


};

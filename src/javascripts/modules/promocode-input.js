export default class PromocodeInput {
  constructor(el) {
    this.el = el;

    $(this.el).each(function() {
      const $wrapper = $(this);
      const $input = $wrapper.find('.js-input');
      const $button = $wrapper.find('.js-button');

      $input.on('keyup', function(){
        if (!$input.val()) {
          $button.addClass('disabled');

        } else {
          $button.removeClass('disabled');
        }
      });
    });
  }
}

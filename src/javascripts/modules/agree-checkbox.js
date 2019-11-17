export default class AgreeCheckbox {
  constructor(el) {
    this.el = el;

    $(this.el).each(function() {
      const $checkbox = $(this);
      const target = $checkbox.data('target');
      const $target = $(target);

      $checkbox.on('change', function(){
        if ($checkbox.is(':checked')) {
          $target.removeClass('disabled');
        } else {
          $target.addClass('disabled');
        }
      });
    });
  }
}

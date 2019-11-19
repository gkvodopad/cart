export default class AgreeCheckbox {
  constructor(el) {
    this.el = el;

    $(this.el).each(function() {
      const $checkbox = $(this);
      const target = $checkbox.data('target');
      const $target = $(target);
      const className = $checkbox.data('class') || 'disabled';

      $checkbox.on('change', function(){
        if ($checkbox.is(':checked')) {
          $target.removeClass(className);
        } else {
          $target.addClass(className);
        }
      });
    });
  }
}

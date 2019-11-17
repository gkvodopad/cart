import 'svgxuse';
// import Drop from 'tether-drop';
// import autosize from 'autosize';
import ismobile from 'ismobilejs';

$(() => {
  // 60fps scrolling using pointer-events: none
  // https://habrahabr.ru/post/204238/

  const { body } = document;
  let timer;

  window.addEventListener('scroll', () => {
    clearTimeout(timer);
    if (!body.classList.contains('disable-hover')) {
      body.classList.add('disable-hover');
    }
    timer = setTimeout(() => {
      body.classList.remove('disable-hover');
    }, 500);
  }, false);

  if (ismobile.phone) {
    body.classList.add('is-mobile');
  } else if (ismobile.tablet) {
    body.classList.add('is-tablet');
  } else {
    body.classList.add('is-desktop');
  }

  // drop

  // (function () {
  //   const _Drop = Drop.createContext({
  //     classPrefix: 'drop',
  //   });

  //   const setup = function () {
  //     return $('.js-drop').each(function () {
  //       const $dropwrap = $(this);
  //       const theme = $dropwrap.data('theme');
  //       const position = $dropwrap.data('position');
  //       const openOn = $dropwrap.data('open-on') || '';
  //       const $target = $dropwrap.find('.drop-target');
  //       $target.addClass(theme);
  //       const content = $dropwrap.find('.drop-content').html();

  //       const drop = new _Drop({
  //         target: $target[0],
  //         classes: theme,
  //         position,
  //         constrainToWindow: false,
  //         constrainToScrollParent: false,
  //         openOn,
  //         content,
  //         hoverOpenDelay: 1000,
  //         // remove: true
  //       });

  //       $(this)[0].drop = drop;

  //       return drop;
  //     });
  //   };

  //   const init = function () {
  //     return setup();
  //   };

  //   init();
  // }).call(this);

  // dropdown

  $(document)
    .on('click.bs.dropdown.data-api', '.dropdown-menu.noclose', (e) => {
      e.stopPropagation();
    });

  $(document).on('click.bs.dropdown.data-api', '[data-dismiss="dropdown"]', function () {
    $(this).parents('.dropdown').eq(0).find('[data-toggle="dropdown"]')
      .dropdown('toggle');
  });

  // $(document).on('click', '.js-radio-buttons .btn, .js-radio-buttons .js-btn',  function () {
  //   $(this).siblings().removeClass('active').end().addClass('active');
  //   $(this).parent('[class*="col-"]').siblings().find('.js-btn').removeClass('active').end().end().addClass('active');
  // });

  // autosize textarea

  // autosize($('textarea.js-autosize'));

  
});

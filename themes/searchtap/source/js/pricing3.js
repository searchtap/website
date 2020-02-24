$(function () {

  var slider = document.getElementById('pricing-slider-right');

  //if no slider on the page, return
  if (!slider)
    return;

  noUiSlider.create(slider, {
    start: 250,
    snap: true,
    range: {
      'min': 250,
      '50%': 500,
      'max': 1000
    },
    pips: {
      mode: 'values',
      values: [250, 500, 1000],
      format: wNumb({
        decimals: 0,
        postfix: 'K'
      })
    }
  });

  slider.noUiSlider.on('update', function () {
    var price = 159;
    var pages = 10000;
    switch (parseInt(slider.noUiSlider.get())) {
      case 250:
        price = 159;
        pages = "25K";
        break;

      case 500:
        price = 249;
        pages = "50K";
        break;

      case 1000:
        price = 299;
        pages = "100K";
        break;
    }

    $('#essential-price-text').text(price);
    $('#essential-price-monthly-pages').text(pages);


  });
});
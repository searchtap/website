$(function () {
  

  var slider = document.getElementById('pricing-slider');

  if (slider === undefined || slider === null)
    return;

  noUiSlider.create(slider, {
    start: 10,
    snap: true,
    range: {
      'min': 10,
      'max': 50
    },
    pips: {
      mode: 'values',
      values: [10, 50],
      format: wNumb({
        decimals: 0,
        postfix: 'K'
      })
    }
  });

  slider.noUiSlider.on('update', function () {
    var price = 69;
    var pages = 1000;
    switch (parseInt(slider.noUiSlider.get())) {
      case 10:
        price = 69;
        pages = "1K";
        break;

      case 50:
        price = 129;
        pages = "5K";
        break;
    }

    $('#business-price-text').text(price);
    $('#business-price-monthly-pages').text(pages);

  });

});
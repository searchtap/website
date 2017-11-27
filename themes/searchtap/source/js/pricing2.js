$(function () {

  var slider = document.getElementById('pricing-sliderr');

  noUiSlider.create(slider, {
    start: 100,
    snap: true,
    range: {
      'min': 100,
      '50%': 250,
      'max': 500
    },
    pips: {
      mode: 'values',
      values: [100, 250, 500],
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
      case 100:
        price = 159;
        pages = "10,000";
        break;

      case 250:
        price = 249;
        pages = "25,000";
        break;

      case 500:
        price = 299;
        pages = "50,000";
        break;
    }

    $('#startup-price-text').text(price);
    $('#startup-price-monthly-pages').text(pages);


  });


  console.log("hello world");
});
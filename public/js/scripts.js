var lat = '';
var long = '';
var apiKey = '0fecdb28cbdff03ea5310e85d2f5133f';

// Get current geolocation
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;

        // Get current weather data
        var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&APPID=' + apiKey;

        $.getJSON(url, function(json) {

            // Loop through each key value pair in the json object
            $.each(json, function(key, value) {
                 if (key === 'sys') {
                     $.each(this, function(key, value) {
                        if (key === 'country') {
                            var country = value;
                            $('.country').html(country);
                        }
                     });
                 }
                 if (key === 'weather') {

                     // Get the first object in the weather array
                     var obj = value[0];
                     $.each(obj, function(key, value) {
                         if (key === 'main') {
                             var desc = value.toUpperCase();
                             $('.descriptor').html(desc);
                         }
                         if (key === 'id') {
                             var firstDigit = value.toString()[0];
                             $icon = $('.icon-img');
                             switch (firstDigit) {
                                 case '2':
                                 $icon.attr('src', '/img/cloud-lightning.svg');
                                 break;

                                 case '3':
                                 case '5':
                                 $icon.attr('src', '/img/cloud-drizzle-alt.svg');
                                 break;

                                 case '6':
                                 $icon.attr('src', '/img/cloud-snow-alt.svg');
                                 break;

                                 case '7':
                                 $icon.attr('src', '/img/cloud-fog-alt.svg');
                                 break;

                                 case '8':
                                 $icon.attr('src', '/img/cloud.svg');
                                 break;

                                 case '9':
                                 $icon.attr('src', '/img/cloud-wind.svg');
                                 break;

                                 default:
                                 $icon.attr('src', '/img/sun.svg');
                                 break;
                             }
                         }
                     });
                 }
                 if (key === 'main') {
                     $.each(this, function(key, value) {
                        if (key === 'temp') {
                            var temp = kelvinToFahrenheit(value);
                            $('.num').html(temp);
                        }
                     });
                 }
                 if (key === 'name') {
                     var city = value.toUpperCase();
                     $('.city').html(city);
                 }
            });
        });

        // Listen for clicks to convert F to C
        $('.temp').on('click', function(e) {
            e.preventDefault();
            var temp = $('.num').html();
            var current = $('.metric').html();

            if (current === 'F') {
                var c = fahrenheitToCelsius(temp);
                $('.num').html(c);
                $('.metric').html('C');
            }
            else {
                var f = celsiusToFahrenheit(temp);
                $('.num').html(f);
                $('.metric').html('F');
            }
        });
    });

    function kelvinToFahrenheit(k) {
        var f = k * (9/5) - 459.67;
        return Math.round(f);
    }

    function fahrenheitToCelsius(f) {
        var c = (f - 32) * (5/9);
        return Math.round(c);
    }

    function celsiusToFahrenheit(c) {
        var f = (c * (9/5)) + 32;
        return Math.round(f);
    }
};

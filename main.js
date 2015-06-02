import StravaSeason from "./season"

(function ($) {
    /*  once the DOM (and its <link> tags) is ready...  */
    $(document).ready(function () {

        /*  once jQuery.Markup has loaded the markup templates...  */
        $.markup.debug = 4;
        $.markup.load(function () {

            /*
            var h = $("body").markup("hello");

            for (var i = 0; i < 3; i++) {
                $(h).markup("hello/message", {
                    i: i,
                    k: i % 2,
                    message: "Hello World"
                });
            }
            */

            var stravaSeason = new StravaSeason();

            let fetchPromised = (year, details) => {
                return new Promise((resolve, reject) => {
                    stravaSeason.calYear(year, details, resolve, reject)
                })
            }

            Promise.all([
                fetchPromised(2013, true),
                fetchPromised(2014, true),
                fetchPromised(2015, true)
            ]).then((data) => {
                let [ sum2013, sum2014, sum2015 ] = data
                $("body").markup("chart", {
                    title: "Disciplines",
                    chart_type: 'line',
                    chart_data: '[["Year", "km Swim", "km Bike", "km Run"], ["2013", '+sum2013['Swim']+', '+sum2013['Ride']+','+sum2013['Run']+'], ["2014", '+sum2014['Swim']+', '+sum2014['Ride']+','+sum2014['Run']+'], ["2015", '+sum2015['Swim']+', '+sum2015['Ride']+','+sum2015['Run']+']]'
                });
                $("body").markup("chart", {
                    title: "Disciplines",
                    chart_type: 'bar',
                    chart_data: '[["Year", "km Swim", "km Bike", "km Run"], ["2013", '+sum2013['Swim']+', '+sum2013['Ride']+','+sum2013['Run']+'], ["2014", '+sum2014['Swim']+', '+sum2014['Ride']+','+sum2014['Run']+'], ["2015", '+sum2015['Swim']+', '+sum2015['Ride']+','+sum2015['Run']+']]'
                });
            }, (err) => {
                console.log('error: ${err}')
            })
        });

    });
})(jQuery);


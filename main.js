import StravaSeason from "./season"

(function ($) {

    String.prototype.toHHMMSS = function () {
        var sec_num = parseInt(this, 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        var time    = hours+':'+minutes;
        return time;
    }

    /*  once the DOM (and its <link> tags) is ready...  */
    $(document).ready(function () {

        /*  once jQuery.Markup has loaded the markup templates...  */
        $.markup.debug = 4;
        $.markup.load(function () {

            var stravaSeason = new StravaSeason();

            let fetchPromised = (year, details) => {
                return new Promise((resolve, reject) => {
                    stravaSeason.calYear(year, details, resolve, reject)
                })
            };

            Promise.all([
                fetchPromised(2013, true),
                fetchPromised(2014, true),
                fetchPromised(2015, true)
            ]).then(([ sum2013, sum2014, sum2015 ]) => {
                // let [ sum2013, sum2014, sum2015 ] = data
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


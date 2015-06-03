import StravaSeason from "./season"

(function ($) {

    String.prototype.toHHMMSS = function () {
        var sec_num = parseInt(this, 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        var time = hours + ':' + minutes;
        return time;
    }

    /*  once the DOM (and its <link> tags) is ready...  */
    $(document).ready(function () {

        /*  once jQuery.Markup has loaded the markup templates...  */
        $.markup.debug = 4;
        $.markup.load(function () {

            let stravaSeason2013 = new StravaSeason(2013);
            let stravaSeason2014 = new StravaSeason(2014);
            let stravaSeason2015 = new StravaSeason(2015);

            var fetchPromised = (stravaSeason) => {
                return new Promise((resolve, reject) => {
                    stravaSeason.fetchData(resolve, reject)
                })
            };

            Promise.all([
                fetchPromised(stravaSeason2013),
                fetchPromised(stravaSeason2014),
                fetchPromised(stravaSeason2015)
            ]).then(([ data2013, data2014, data2015 ]) => {

                let sum2013 = stravaSeason2013.sumAll();
                let sum2014 = stravaSeason2014.sumAll();
                let sum2015 = stravaSeason2015.sumAll();

                let chart_data = [
                    ["Year", "km Swim", "km Bike", "km Run"],
                    ["2013", sum2013["Swim"], sum2013["Ride"], sum2013["Run"]],
                    ["2014", sum2014["Swim"], sum2014["Ride"], sum2014["Run"]],
                    ["2015", sum2015["Swim"], sum2015["Ride"], sum2015["Run"]]
                ]

                let chart_data2 = [
                    ["Discipline", "2013", "2014", "2015"],
                    ["Swim", sum2013["Swim"], sum2014["Swim"], sum2015["Swim"]],
                    ["Ride", sum2013["Ride"], sum2014["Ride"], sum2015["Ride"]],
                    ["Run", sum2013["Run"], sum2014["Run"], sum2015["Run"]]
                ]

                $("body").markup("chart", {
                    title: "Disciplines",
                    chart_type: 'line',
                    chart_data: JSON.stringify(chart_data)
                });
                $("body").markup("chart", {
                    title: "Disciplines",
                    chart_type: 'bar',
                    chart_data: JSON.stringify(chart_data2)
                });

                stravaSeason2013.showTable();
                stravaSeason2014.showTable();
                stravaSeason2015.showTable();

            }, (err) => {
                console.log('error: ${err}')
            })
        });

    });
})(jQuery);


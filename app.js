(function ($) {
    /*  once the DOM (and its <link> tags) is ready...  */
    $(document).ready(function () {

        /*  once jQuery.Markup has loaded the markup templates...  */
        $.markup.debug = 4;
        $.markup.load(function () {

            /*  render a "hello" container markup  */
            var h = $("body").markup("hello");

            /*  insert ten message markups  */
            for (var i = 0; i < 3; i++) {
                $(h).markup("hello/message", {
                    i: i, k: i % 2,
                    message: "Hello World"
                });
            }

        });

        calYear(2013, false);
        calYear(2014, false);
        calYear(2015, false);
    });
})(jQuery);

function calYear (saison, showTable) {

    $.ajax({
        url: "https://www.strava.com/api/v3/activities?access_token=1a116d53dfe037cedbc5b9c19d173d38afc8435a&per_page=200&after="+new Date((saison-1)+'-11-20').getTime()/1000,
        dataType: "jsonp"
    }).then(function (data) {
        var h = $("body").markup("strava");
        //$(h).markup("strava/head", { head: ['Name'] })
        //$(h).markup("strava/head", { head: ['Typ'] })
        //$(h).markup("strava/head", { head: ['Entfernung'] })

        var sum = {}
        for (var i = 0; i < data.length; i++) {

            var notAfter = new Date(saison + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate());
            var activityDate = new Date(data[i].start_date_local.substring(0,10));

            if (activityDate < notAfter) {
                if (showTable) {
                    $(h).markup("strava/row", {
                        k: i % 2,
                        i: i,
                        title: data[i].name,
                        date: data[i].start_date_local.substring(0, 10),
                        type: data[i].type,
                        distance: $.number(data[i].distance / 1000, 1, ',', '')
                    })
                }
                if (isNaN(sum[data[i].type]))
                    sum[data[i].type] = data[i].distance / 1000
                else
                    sum[data[i].type] = sum[data[i].type] + data[i].distance / 1000;
            }
        }

        $(h).markup("strava/row", {
            i: saison,
            title: 'Gesamt',
            date: '',
            type: 'Swim',
            distance: $.number (sum['Swim'], 1, ',', '')
        })
        $(h).markup("strava/row", {
            i: saison,
            title: 'Gesamt',
            date: '',
            type: 'Ride',
            distance: $.number (sum['Ride'], 1, ',', '')
        })
        $(h).markup("strava/row", {
            i: saison,
            title: 'Gesamt',
            date: '',
            type: 'Run',
            distance: $.number (sum['Run'], 1, ',', '')
        })
    });
}
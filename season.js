export default class StravaSeason {

    constructor(saison) {
        this.data = [];
        this.saison = saison;
    }

    fetchData(resolve, reject) {

        var self = this;

        $.ajax({
            url: "https://www.strava.com/api/v3/activities?access_token=1a116d53dfe037cedbc5b9c19d173d38afc8435a&per_page=200&after=" + new Date((this.saison - 1) + '-11-20').getTime() / 1000,
            dataType: "jsonp"
        }).then(function (data) {

            self.from = new Date((self.saison - 1) + '-11-20');
            self.to = new Date(self.saison + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate());
            let j = 0;

            for (let i = 0; i < data.length; i++) {

                let activityDate = new Date(data[i].start_date_local.substring(0, 10));
                if (activityDate < self.to) self.data[j++] = data[i];
            }

            resolve(self.data);
        });
    }

    sumAll() {

        var sum = {};

        for (let i = 0; i < this.data.length; i++) {

            if (isNaN(sum[this.data[i].type]))
                sum[this.data[i].type] = this.data[i].distance / 1000
            else
                sum[this.data[i].type] = sum[this.data[i].type] + this.data[i].distance / 1000;
        }

        for (var property in sum) {
            if (sum.hasOwnProperty(property)) {
                sum[property] = Math.round(sum[property]*10)/10;
            }
        }

        return (sum);
    }

    showTable() {

        let h = $.markup("table", {
            range_from: this.from.toLocaleDateString(),
            range_to: this.to.toLocaleDateString()
        })

        for (let i = 0; i < this.data.length; i++) {

            $("tbody", h).markup("table/row", {
                k: i%2,
                i: i+1,
                title: this.data[i].name,
                date: this.data[i].start_date_local.substring(0, 10),
                type: this.data[i].type,
                time: this.data[i].moving_time.toString().toHHMMSS(),
                distance: $.number(this.data[i].distance / 1000, 1, ',', ''),
                link: "https://www.strava.com/activities/"+this.data[i].id
            })
        }

        $("body").append(h);
    }
}

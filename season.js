export default class StravaSeason {

  constructor(debug = false){
      this.name = 'Season Wrapper';
  }

  calYear (saison, showTable, resolve, reject) {

      $.ajax({
          url: "https://www.strava.com/api/v3/activities?access_token=1a116d53dfe037cedbc5b9c19d173d38afc8435a&per_page=200&after=" + new Date((saison - 1) + '-11-20').getTime() / 1000,
          dataType: "jsonp"
      }).then(function (data) {

          var sum = {};
          var notBefore = new Date((saison - 1) + '-11-20');
          var notAfter = new Date(saison + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate());
          // var notAfter = new Date(saison + '-07-13');

          $("body").markup("table", {
              range_from: notBefore.toLocaleDateString(),
              range_to: notAfter.toLocaleDateString()
          })

          for (var i = 0; i < data.length; i++) {

              var activityDate = new Date(data[i].start_date_local.substring(0, 10));
              if (activityDate < notAfter) {
                  if (showTable) {
                      $("tbody").markup("table/row", {
                          k: i%2,
                          i: i,
                          title: data[i].name,
                          date: data[i].start_date_local.substring(0, 10),
                          type: data[i].type,
                          distance: $.number(data[i].distance / 1000, 1, ',', ''),
                          link: "https://www.strava.com/activities/"+data[i].id
                      })
                  }
                  if (isNaN(sum[data[i].type]))
                      sum[data[i].type] = data[i].distance / 1000
                  else
                      sum[data[i].type] = sum[data[i].type] + data[i].distance / 1000;
              }
          }

          $("tbody").markup("table/row", {
              i: saison,
              k: 0,
              title: 'Gesamt',
              date: '',
              type: 'Swim',
              distance: $.number(sum['Swim'], 1, ',', '')
          })
          $("tbody").markup("table/row", {
              i: saison,
              k: 0,
              title: 'Gesamt',
              date: '',
              type: 'Ride',
              distance: $.number(sum['Ride'], 1, ',', '')
          })
          $("tbody").markup("table/row", {
              i: saison,
              k: 0,
              title: 'Gesamt',
              date: '',
              type: 'Run',
              distance: $.number(sum['Run'], 1, ',', '')
          })

          for (var property in sum) {
              if (sum.hasOwnProperty(property)) {
                  sum[property] = Math.round(sum[property]*10)/10;
              }
          }

          resolve (sum);
      });
  }
}

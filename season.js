class StravaSeason {

  constructor(debug = false){
      this.name = 'Season Wrapper';
  }

  calYear (saison, showTable, resolve, reject) {

      $.ajax({
          url: "https://www.strava.com/api/v3/activities?access_token=1a116d53dfe037cedbc5b9c19d173d38afc8435a&per_page=200&after=" + new Date((saison - 1) + '-11-20').getTime() / 1000,
          dataType: "jsonp"
      }).then(function (data) {
          var h = $("body").markup("table");
          //$(h).markup("strava/head", { head: ['Name'] })
          //$(h).markup("strava/head", { head: ['Typ'] })
          //$(h).markup("strava/head", { head: ['Entfernung'] })

          var sum = {}
          var notBefore = new Date((saison - 1) + '-11-20');
          var notAfter = new Date(saison + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate());

          $(h).markup("table/range", {
              range_from: notBefore.toLocaleDateString(),
              range_to: notAfter.toLocaleDateString()
          })

          for (var i = 0; i < data.length; i++) {

              var activityDate = new Date(data[i].start_date_local.substring(0, 10));
              if (activityDate < notAfter) {
                  if (showTable) {
                      $(h).markup("table/row", {
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

          $(h).markup("table/row", {
              i: saison,
              k: 0,
              title: 'Gesamt',
              date: '',
              type: 'Swim',
              distance: $.number(sum['Swim'], 1, ',', '')
          })
          $(h).markup("table/row", {
              i: saison,
              k: 0,
              title: 'Gesamt',
              date: '',
              type: 'Ride',
              distance: $.number(sum['Ride'], 1, ',', '')
          })
          $(h).markup("table/row", {
              i: saison,
              k: 0,
              title: 'Gesamt',
              date: '',
              type: 'Run',
              distance: $.number(sum['Run'], 1, ',', '')
          })

          resolve (sum);
      });
  }
}

module.exports = StravaSeason;
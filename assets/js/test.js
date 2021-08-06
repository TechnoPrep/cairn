var getForecast = function() {
  var oneCallApi = `http://api.openweathermap.org/data/2.5/onecall?lat=${}&lon=${}&units=imperial&exclude=minutely,hourly,alerts&appid=43a284bcc0758c5a0b96ec7c9d233494`
  
  console.log(oneCallApi);
  fetch(oneCallApi)
  .then(function(response) {
        if (response.ok) {
            return response.json();          
        }

    })

    .then(function(data) {
      var temp = data.current.temp;
      var weather = data.current.weather[0].icon;
      var cloud = data.current.weather[0].description;
         console.log(temp);
         console.log(weather);
         console.log(cloud);
         var lon = data.lon;
         var lat = data.lat;
         console.log(lat, lon);
        console.log(data)
    })
          
}

getForecast();


var getForecast = function(lat, lon) {

    var oneCallApi = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,alerts&appid=43a284bcc0758c5a0b96ec7c9d233494`
    
    console.log(oneCallApi);
    fetch(oneCallApi)
    .then(function(response) {
          if (response.ok) {
              return response.json();          
          }
  
      })
  
      .then(function(data) {
  
        let weatherDiv = $('.park-weather');
        let weatherEl = $('<ul>')
        let tempEl = $('<li>');
        let imgEl = $('<img>');
        let humEl = $('<li>');
  
        var temp = data.current.temp;
        var iconCode = data.current.weather[0].icon;
        var humidity = data.current.humidity;
        let iconURL = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png'
  
        imgEl.attr('src',iconURL);
        tempEl.text(`${temp}°F`);
        humidity
  
      })
  }
  
  getParkName();
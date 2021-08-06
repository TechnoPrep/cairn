const apiKey ="hrzeZivocJeVP942upjoq1HS5TL5d1mRUZmDQ64t"

let allParks = $('#parkNames');

function getParkName(){

  let queryString = document.location.search;
  let stateCode = queryString.split('=')[1];

  console.log(stateCode);

  let fetchURL = `https://developer.nps.gov/api/v1/parks?stateCode=&${stateCode}&q=${stateCode}&api_key=${apiKey}`

  console.log(fetchURL);

 fetch(fetchURL)
  .then(response => { 
    if (!response.ok){
      throw Error("Error");
    }
    return response.json();
  })
  .then(data => {

    console.log(data.data);
    const html = data.data
     .map(parks => {

      let parkEl = $('<div>')
      let parkImgDiv = $('<div>');
      let parkImgEl = $('<img>');
      let parkNameDiv = $('<div>');
      let parkNameEl = $('<h2>');
      let parkDescDiv = $('<div>');
      let parkDescEl = $('<p>');
      let parkDescH = $('<h3>');

      let parkHoursDiv = $('<div>')
      let parkHoursEl = $('<ul>');
      let parkHoursH = $('<h3>');

      let parkContactDiv = $('<div>')
      let parkContactH = $('<h3>');
      let parkContactEl = $('<ul>')
      let parkPhoneEl = $('<li>')
      let parkWebEl = $('<li>')
      let parkWebAnchor = $('<a>');

      let weatherDiv = $('<div>');

      let mon = $('<li>');
      let tue = $('<li>');
      let wed = $('<li>');
      let thu = $('<li>');
      let fri = $('<li>');
      let sat = $('<li>');
      let sun = $('<li>');
      
      parkImg = parks.images[0].url;
      parkImgAlt = parks.images[0].altText;
      parkName = parks.fullName;
      parkDesc = parks.description;
      parklat = parks.latitude;
      parklon = parks.longitude;
      parkPhone = parks.contacts.phoneNumbers[0].phoneNumber;
      parkWeb = parks.url;

      parkHours = parks.operatingHours[0].standardHours;

      const {monday,tuesday,wednesday,thursday,friday,saturday,sunday} = parkHours

      //append data to elements

      //Append Image to ParkEl
      parkImgEl.attr('src', parkImg);
      parkImgEl.addClass('park-img card-image has-text-centered px-6 mt-6')
      parkImgEl.attr('alt', parkImgAlt)
      parkImgDiv.addClass('card-image has-text-centered px-6 mt-6');
      parkImgDiv.append(parkImgEl);
      parkEl.append(parkImgDiv);

      //Append ParkName to ParkEl
      parkNameEl.text(parkName);
      parkNameEl.addClass('park-name title is-size-5 has-text-centered')
      parkNameDiv.addClass('card-content');
      parkNameDiv.append(parkNameEl);
      parkEl.append(parkNameDiv);

      //Append Desc to ParkEl
      parkDescH.text('Description');
      parkDescDiv.append(parkDescH);
      parkDescEl.text(parkDesc);
      parkDescEl.addClass('park-desc title is-size-5 has-text-centered')
      parkDescDiv.addClass('card-content');
      parkDescDiv.append(parkDescEl);
      parkEl.append(parkDescDiv);

      //Append Hours to ParkEl
      parkHoursH.text('Hours:');
      parkHoursEl.addClass('hours title is-size-5')
      parkHoursDiv.addClass('card-content');
      parkHoursDiv.append(parkHoursH);
      parkHoursDiv.append(parkHoursEl);
      parkEl.append(parkHoursDiv);

      mon.text(`Monday: ${monday}`);
      parkHoursEl.append(mon);

      tue.text(`Tuesday: ${tuesday}`);
      parkHoursEl.append(tue);

      wed.text(`Wednesday: ${wednesday}`);
      parkHoursEl.append(wed);

      thu.text(`Thursday: ${thursday}`);
      parkHoursEl.append(thu);

      fri.text(`Friday: ${friday}`);
      parkHoursEl.append(fri);

      sat.text(`Saturday: ${saturday}`);
      parkHoursEl.append(sat);

      sun.text(`Sunday: ${sunday}`);
      parkHoursEl.append(sun);

      //Append ContactInfo to ParkEl
      parkContactH.text('Contact Info:');
      parkPhoneEl.text(`Phone: ${parkPhone}`);
      parkWebAnchor.text(`More Info`);
      parkContactEl.addClass('contact-info title is-size-5')
      parkContactDiv.addClass('card-content');
      parkWebAnchor.attr('href',parkWeb);
      parkWebAnchor.attr('target', '_blank');
      parkContactDiv.append(parkContactH);
      parkContactEl.append(parkPhoneEl);
      
      parkWebEl.append(parkWebAnchor);
      parkContactEl.append(parkWebEl);
      parkContactDiv.append(parkContactEl);
      parkEl.append(parkContactDiv);

      //append Weather to ParkEl
      weatherDiv.addClass('park-weather')
      parkEl.append(weatherDiv);

      getWeather(parklat, parklon);

      //Append ParkEl to allPark Div
      parkEl.addClass('park-container card')
      allParks.append(parkEl);

    })
    .join("")
  console.log(html);  
  // document.getElementById("parkNames").insertAdjacentHTML("afterbegin", html);  
  })  
  .catch(error =>{
      // console.log(error);
      // console.log(data);
     });   
     
  $("#park-name").text("")
}  

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


    })
}

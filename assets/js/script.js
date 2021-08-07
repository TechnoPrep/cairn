const apiKey ="hrzeZivocJeVP942upjoq1HS5TL5d1mRUZmDQ64t"

let allParks = $('#parkNames');

console.log('I got here');

async function getParkName(){

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
      
      let parkImg = parks.images[0].url;
      let parkImgAlt = parks.images[0].altText;
      let parkName = parks.fullName;
      let parkDesc = parks.description;
      let parkHours = parks.operatingHours[0].standardHours;
      let parkPhone = parks.contacts.phoneNumbers[0].phoneNumber;
      let parkWeb = parks.url;
      let parklat = parks.latitude;
      let parklon = parks.longitude;

      const {monday,tuesday,wednesday,thursday,friday,saturday,sunday} = parkHours

      //append data to elements

      const weatherData = getForecast(parklat, parklon).then(data=>{

        let temp = data.current.temp;
        let iconCode = data.current.weather[0].icon;
        let iconAlt = data.current.weather[0].description;
        let wind = data.current.wind_speed;
        let humidity = data.current.humidity;
        let iconURL = 'https://openweathermap.org/img/wn/' + iconCode + '@2x.png';

        parkCardEl = 
        `<div class="park-container card">
        <div class="card-image image is-2by1 has-text-centered px-6 mb-5">
          <img
            src="${parkImg}"
            class="park-img card-image has-text-centered px-6 mt-6"
            alt="${parkImgAlt}"
          />
        </div>
        <div class="card-content">
          <h2 class="park-name title divider is-size-5 has-text-centered">
            ${parkName}
          </h2>
        </div>
        <div class="card-content">
          <h3 class="is-size-2 has-text-weight-semibold">Description</h3>
          <p class="park-desc title is-size-5 has-text-grey">
            ${parkDesc}
          </p>
        </div>
        <div class="card-content">
          <h3 class="is-size-2 has-text-weight-semibold">Hours:</h3>
          <ul class="hours title is-size-5 has-text-grey">
            <li>Monday: ${monday}</li>
            <li>Tuesday: ${tuesday}</li>
            <li>Wednesday: ${wednesday}</li>
            <li>Thursday: ${thursday}</li>
            <li>Friday: ${friday}</li>
            <li>Saturday: ${saturday}</li>
            <li>Sunday: ${sunday}</li>
          </ul>
        </div>
        <div class="card-content">
          <ul>
            <img src="${iconURL}" alt="${iconAlt}">
            <li>Temp: <span>${temp}</span></li>
            <li>Wind: <span>${wind} MPH</span></li>
            <li>Humidity: <span>${humidity}%</span></li>
          </ul>
        </div>
        <div class="card-content">
          <h3 class="divider is-size-6">Contact Info</h3>
          <ul class="contact-info title is-size-6 has-text-centered">
            <li>Phone: ${parkPhone}</li>
            <li>
              <a href="${parkWeb}" target="_blank">More Info</a>
            </li>
          </ul>
        </div>
      </div>`
  
      allParks.append(parkCardEl);
      })

    })
    .join("")
  })
  
  .catch(error =>{
      // console.log(error);
      // console.log(data);
     });   
}  

var getForecast = function(lat, lon) {

  let apiKey = '1cba65d3c13edbfe6f1ac567815665c2'

  var oneCallApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,alerts&appid=${apiKey}`

  return fetch(oneCallApi)

  .then(function(response) {
        if (response.ok) {
            return response.json();          
        }

    })

    .then(function(data) {

      return data;

    })
}

getParkName();














































// function call1 () => {
//   fetch(api1)
// }.then(() => {
//   fetch(api2)
// })

// //--------------------------------------


function call1() {
  fetch(api1)
    .then(response => {
      response
    })
    .then(response2 => {
      response2
    })

}

async function call2(){
  const response = await fetch(api1);
  const response2 = await response;

}
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

      parkCardEl = `<div class="park-container card">
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
        <h3 class="divider is-size-6">Contact Info</h3>
        <ul class="contact-info title is-size-6 has-text-centered">
          <li>Phone: ${parkPhone}</li>
          <li>
            <a href="${parkWeb}" target="_blank"
              >More Info</a
            >
          </li>
        </ul>
      </div>
      <div class="park-weather"><p>test weather</p></div>
    </div>`

      allParks.append(parkCardEl);

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

getParkName()

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













































// function call1 () => {
//   fetch(api1)
// }.then(() => {
//   fetch(api2)
// })

// //--------------------------------------


// function call1() {
//   fetch(api1)

// }

// async function call2(){
//   global vars
//   await call1()
//   await fetch(api2)
//   more stuff

// }
const burgerIcon = document.querySelector("#burger");
const navbarMenu = document.querySelector("#nav-links");

let allParks = $('#parkNames');

async function getParkName(){

  const apiKey ="hrzeZivocJeVP942upjoq1HS5TL5d1mRUZmDQ64t"

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
      
      let parkID =parks.id;
      // let parkCode = parks.parkCode;
      let parkImg = parks.images[0].url;
      let parkImgAlt = parks.images[0].altText;
      let parkName = parks.fullName;
      let parkDesc = parks.description;
      let parkHours = parks.operatingHours[0].standardHours;
      let parkPhone = parks.contacts.phoneNumbers[0].phoneNumber;
      let parkWeb = parks.url;
      let parklat = parks.latitude;
      let parklon = parks.longitude;

      favParksArr = JSON.parse(localStorage.getItem('favParks')) || [];
      let favParkColor = favParksArr.includes(parkID) ? 'red' : 'white';
      let favHeart = favParksArr.includes(parkID) ? 'fas' : 'far';

      const {monday,tuesday,wednesday,thursday,friday,saturday,sunday} = parkHours

      //append data to elements

      const weatherData = getForecast(parklat, parklon).then(data=>{

        let currTemp = data.current.temp;
        let feelLike = data.current.feels_like;
        let highTemp = data.daily[0].temp.max;
        let lowTemp = data.daily[0].temp.min;
        let wind = data.current.wind_speed;
        let humidity = data.current.humidity;
        let uvi = data.current.uvi;
        let uviClass = uvIndex(uvi);
        let iconCode = data.current.weather[0].icon;
        let iconAlt = data.current.weather[0].description;
        let iconURL = 'https://openweathermap.org/img/wn/' + iconCode + '@2x.png';

        parkCardEl = 
        `<div class="park-container card">
        <div>
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
        <button class="favorite-btn" style="color: white" value="${parkID}";">
          <i class="${favHeart} fa-heart fa-3x"></i>
        </button>
        <div class="card-content">
          <h3 class="is-size-2 has-text-weight-semibold">Description</h3>
          <p class="park-desc title is-size-5 has-text-grey">
            ${parkDesc}
          </p>
        </div>
        <div class="card-content columns">
        <ul class="hours title is-size-5 has-text-grey ml-4">
        <h3 class="is-size-2 has-text-weight-semibold has-text-grey-dark">Hours:</h3>
          <li>Monday: ${monday}</li>
          <li>Tuesday: ${tuesday}</li>
          <li>Wednesday: ${wednesday}</li>
          <li>Thursday: ${thursday}</li>
          <li>Friday: ${friday}</li>
          <li>Saturday: ${saturday}</li>
          <li>Sunday: ${sunday}</li>
        </ul>
        <div class="weather-card card column is-offset-3 mr-4">
              <div class="row is-4">
                <ul class="hours title is-size-5 has-text-white ml-4">
                  <img src="${iconURL}" alt="${iconAlt}">
                  <li>Current Temperature: <span class="current-temp">${currTemp}</span> &deg;F</li>
                  <li>Feels Like: <span class="current-feels-like">${feelLike}</span> &deg;F</li>
                  <li>Humidity: <span class="current-humidity">${humidity}</span>%</li>
                  <li>High: <span class="current-high">${highTemp}</span> &deg;F</li>
                  <li>Low: <span class="current-low">${lowTemp}</span> &deg;F</li>
                  <li>Wind Speed: <span class="current-wind-speed">${wind}</span> MPH</li>
                  <li class="uvIndex">UV Index: <span class="${uviClass}" id="current-uvi">${uvi}</span></li>
              </div>
           </div>
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

      if (favParksArr.includes(parkID)) {
        $('.favorite-btn').addClass('clicked');
      }
      })

    })
    // .join("")
  })
  
  .catch(error =>{
      // console.log(error);
      // console.log(data);
     });   
}  

var getForecast = function(lat, lon) {

  let apiKey = 'ff95b92cc0caa7113edde4310fba7af9' //Burner
  // let apiKey = '1cba65d3c13edbfe6f1ac567815665c2' //Erics
  // let apiKey = '43a284bcc0758c5a0b96ec7c9d233494' //Nathans
  // let apiKey = 'f61c81c8ff417a9c362b860a132e5c83' //Tommy's
  
  var oneCallApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,alerts&appid=${apiKey}`

  return fetch(oneCallApi)

  .then(function(response) {

    if(response.ok){

          return response.json(); 
        }
        
    })

    .then(function(data) {

      return data;

    })
}

function uvIndex(uvi){

  if(uvi < 3){
    return 'uvi-low';
  
  }else if(uvi < 6 && uvi > 3){
      return 'uvi-moderate';
  
  } else if(uvi < 8 && uvi > 5){
    return 'uvi-high';

  }  else if(uvi < 11 && uvi > 7){
    return 'uvi-vhigh';

  } else {
    return 'uvi-extreme';
  }
}

function saveToFav(parkID){

  let parkArr = [];

  parkArr = JSON.parse(localStorage.getItem('favParks')) || [];

  parkArr.push(parkID);

  let uniquePark = parkArr.filter((c, index) =>{
    return parkArr.indexOf(c) === index;
  });

  localStorage.setItem('favParks', JSON.stringify(uniquePark));
}

function removeFromFav(parkID){
  let parkArr = [];
  parkArr = JSON.parse(localStorage.getItem('favParks')) || [];
  tempArr = removeItem(parkArr, parkID);
  localStorage.setItem('favParks', JSON.stringify(tempArr));
}

$(document).ready(function () {
    
  $(document).on('click', '.favorite-btn', function(e){

      e.preventDefault();
      let parkID = $(this).val();
  
      //if it is on the favs, click will remove
      if($(this).hasClass('clicked')){
        $(this).toggleClass('clicked');
        $(this).children('i').toggleClass('far');
        $(this).children('i').toggleClass('fas');
        removeFromFav(parkID);
      } else {
        $(this).toggleClass('clicked');
        $(this).children('i').toggleClass('far');
        $(this).children('i').toggleClass('fas');
        saveToFav(parkID);
      }
  })

});

function removeItem(arr, value){
  var index = arr.indexOf(value);
  if (index > -1){
    arr.splice(index, 1)
  }
  return arr;
}

//hamburger menu

burgerIcon.addEventListener("click", () => {
   navbarMenu.classList.toggle("is-active")
})

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
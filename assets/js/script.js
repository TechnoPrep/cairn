const burgerIcon = document.querySelector("#burger");
const navbarMenu = document.querySelector("#nav-links");

//Div for the park cards to be appended to
let allParks = $('#parkNames');

//Gets list of parks from the state selected from the homepage
async function getParkName(){

  const apiKey ="hrzeZivocJeVP942upjoq1HS5TL5d1mRUZmDQ64t"

  //Grabs the URL from the address bar and splits the get the StateCode for the Fetch Request
  let queryString = document.location.search;
  let stateCode = queryString.split('=')[1];

  console.log(stateCode);

  let fetchURL = `https://developer.nps.gov/api/v1/parks?stateCode=&${stateCode}&q=${stateCode}&api_key=${apiKey}`

 fetch(fetchURL)
  .then(response => { 
    if (response.ok){
      return response.json();
    }
    
  })
  .then(data => {

    const html = data.data

    //Run a loop for all parks within the data promise
    .map(parks => {
      
      //Define data from National Park Service API to be injected into HTML
      let parkID =parks.id;
      let parkImg = parks.images[0].url;
      let parkImgAlt = parks.images[0].altText;
      let parkName = parks.fullName;
      let parkDesc = parks.description;
      let parkHours = parks.operatingHours[0].standardHours;
      let parkPhone = parks.contacts.phoneNumbers[0].phoneNumber;
      let parkWeb = parks.url;
      let parklat = parks.latitude;
      let parklon = parks.longitude;

      //Pull a list of the Favorite Parks to apply classes to
      favParksArr = JSON.parse(localStorage.getItem('favParks')) || [];

      //If parkID is in the favParksArr set class to fas else far
      let favHeart = favParksArr.includes(parkID) ? 'fas' : 'far';

      //Deconstruct the parkHouse object for ease of use
      const {monday,tuesday,wednesday,thursday,friday,saturday,sunday} = parkHours

     
      //call getForecast function and pass through Lat and Lon for use in Weather API
      const weatherData = getForecast(parklat, parklon).then(data=>{

        //Definte data from weather API service to be injected into HTML
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

        // Create HTML Element to be appended to page
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
        <div class="weather-card card column is-offset-4 mr-6">
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
  
      //Append HTML to Div Element
      allParks.append(parkCardEl);

      //If the park is included in the favParksArr apply a class to be used in the Favorites Function
      if (favParksArr.includes(parkID)) {
        $('.favorite-btn').addClass('clicked');
      }
      })

    })
  })
    
}  

//Return data from Fetch Request to be used in the getParkName() function
function getForecast(lat, lon) {

  // let apiKey = 'ff95b92cc0caa7113edde4310fba7af9' //Burner
  // let apiKey = '1cba65d3c13edbfe6f1ac567815665c2' //Erics
  let apiKey = '43a284bcc0758c5a0b96ec7c9d233494' //Nathans
  // let apiKey = 'f61c81c8ff417a9c362b860a132e5c83' //Tommy's
  
  //Create FetchURL to be used in the getParkNames() function
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

//apply classes based on uvIndex thresholds
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

//If the favorite parks button is clicked, save it to localStorage
function saveToFav(parkID){

  let parkArr = [];

  parkArr = JSON.parse(localStorage.getItem('favParks')) || [];

  parkArr.push(parkID);

  //ensure only unique parks are stored
  let uniquePark = parkArr.filter((c, index) =>{
    return parkArr.indexOf(c) === index;
  });

  localStorage.setItem('favParks', JSON.stringify(uniquePark));
}

//Remove Park from Favorites if currently selected as a favorite
function removeFromFav(parkID){
  let parkArr = [];
  parkArr = JSON.parse(localStorage.getItem('favParks')) || [];
  tempArr = removeItem(parkArr, parkID);
  localStorage.setItem('favParks', JSON.stringify(tempArr));
}

//Allows users to click the Heart button on the card to add to their Favorites to view later in the favorites.html page
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
        //if it is not on favs, it will add
        $(this).toggleClass('clicked');
        $(this).children('i').toggleClass('far');
        $(this).children('i').toggleClass('fas');
        saveToFav(parkID);
      }
  })

});

//Used to remove an element from an array 
function removeItem(arr, value){
  //Sets index as the elements order in the array
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

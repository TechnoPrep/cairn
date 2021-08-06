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

      parkEl = $('<div>')
      parkImgDiv = $('<div>');
      parkImgEl = $('<img>');
      parkNameDiv = $('<div>');
      parkNameEl = $('<h2>');
      parkDescDiv = $('<div>');
      parkDescEl = $('<p>');
      parkHoursDiv = $('<div>')
      parkHoursEl = $('<ul>');
      mon = $('<li>');
      tue = $('<li>');
      wed = $('<li>');
      thu = $('<li>');
      fri = $('<li>');
      sat = $('<li>');
      sun = $('<li>');
      
      parkImg = parks.images[0].url;
      parkImgAlt = parks.images[0].altText;
      parkName = parks.fullName;
      parkDesc = parks.description;
      parklat = parks.latitude;
      parklon = parks. longitude;

      parkHours = parks.operatingHours[0].standardHours;

      const {monday,tuesday,wednesday,thursday,friday,saturday,sunday} = parkHours

      //append data to elements

      parkImgEl.attr('src', parkImg);
      parkImgEl.addClass('park-img card-image has-text-centered px-6 mt-6')
      parkImgEl.attr('alt', parkImgAlt)
      parkImgDiv.addClass('card-image has-text-centered px-6 mt-6');
      parkImgDiv.append(parkImgEl);
      parkEl.append(parkImgDiv);

      parkNameEl.text(parkName);
      parkNameEl.addClass('park-name title is-size-5 has-text-centered')
      parkNameDiv.addClass('card-content');
      parkNameDiv.append(parkNameEl);
      parkEl.append(parkNameDiv);

      parkDescEl.text(parkDesc);
      parkDescEl.addClass('park-desc title is-size-5 has-text-centered')
      parkDescDiv.addClass('card-content');
      parkDescDiv.append(parkDescEl);
      parkEl.append(parkDescDiv);

      parkHoursEl.addClass('hours title is-size-5')
      parkHoursDiv.addClass('card-content');
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

      parkEl.addClass('park-container card')
      allParks.append(parkEl);

      console.log(parkImg);
      console.log(parkName);
      console.log(parkDesc);
      console.log(parkHours);
      console.log(parklat);
      console.log(parklon);
    })
    .join("")
  console.log(html);  
  document.getElementById("parkNames").insertAdjacentHTML("afterbegin", html);  
  })  
  .catch(error =>{
      // console.log(error);
      // console.log(data);
     });   
     
  $("#park-name").text("")
}  

getParkName();
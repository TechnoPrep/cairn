const apiKey ="hrzeZivocJeVP942upjoq1HS5TL5d1mRUZmDQ64t"

let allParks = $('#parkNames');

function getParkName(){

  let queryString = document.location.search;
  let stateCode = queryString.split('=');

 fetch(`https://developer.nps.gov/api/v1/parks?api_key=${apiKey}&stateCode=&${stateCode}`)
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

      parkEl = $('<li>')
      parkImgEl = $('<img>');
      parkNameEl = $('<p>');
      parkDescEl = $('<p>');
      parkHoursEl = $('<ul>');
      parkDailyHoursEl = $('<li>');
      
      parkImg = parks.images[0].url;
      parkImgAlt = parks.images[0].altText;
      parkName = parks.fullName;
      parkDesc = parks.description;

      parkHours = parks.operatingHours[0].standardHours;

      const {monday,tuesday,wednesday,thursday,friday,saturday,sunday} = parkHours

      //append data to elements

      parkImgEl.attr('src', parkImg);
      parkImgEl.attr('alt', parkImgAlt)
      parkEl.append(parkImgEl);

      parkNameEl.text(parkName);
      parkEl.append(parkNameEl);

      parkDescEl.text(parkDesc);
      parkEl.append(parkDescEl);
      
      parkDailyHoursEl.text(`Monday: ${monday}`);
      parkEl.append(parkDailyHoursEl);

      parkDailyHoursEl.text(`Tuesday: ${tuesday}`);
      parkEl.append(parkDailyHoursEl);

      parkDailyHoursEl.text(`Wednesday: ${wednesday}`);
      parkEl.append(parkDailyHoursEl);

      parkDailyHoursEl.text(`Thursday: ${thursday}`);
      parkEl.append(parkDailyHoursEl);

      parkDailyHoursEl.text(`Friday: ${friday}`);
      parkEl.append(parkDailyHoursEl);

      parkDailyHoursEl.text(`Saturday: ${saturday}`);
      parkEl.append(parkDailyHoursEl);

      parkDailyHoursEl.text(`Sunday: ${sunday}`);
      parkEl.append(parkDailyHoursEl);

      
      allParks.append(parkEl);

      console.log(parkImg);
      console.log(parkName);
      console.log(parkDesc);
      console.log(parkHours);

    })
    .join("")
  console.log(html);  
  document.getElementById("parkNames").insertAdjacentHTML("afterbegin", html);  
  })  
  .catch(error =>{
      console.log(error);
      // console.log(data);
     });    
}  

getParkName();
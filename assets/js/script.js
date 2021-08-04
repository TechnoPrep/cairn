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

      parkHours = parks.operatingHours[0].standardHours;

      const {monday,tuesday,wednesday,thursday,friday,saturday,sunday} = parkHours

      //append data to elements

      parkImgEl.attr('src', parkImg);
      parkImgEl.addClass('park-img')
      parkImgEl.attr('alt', parkImgAlt)
      parkEl.append(parkImgEl);

      parkNameEl.text(parkName);
      parkNameEl.addClass('park-name')
      parkEl.append(parkNameEl);

      parkDescEl.text(parkDesc);
      parkDescEl.addClass('park-desc')
      parkEl.append(parkDescEl);

      parkHoursEl.addClass('hours')
      parkEl.append(parkHoursEl);
      
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

      parkEl.addClass('park-container')
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
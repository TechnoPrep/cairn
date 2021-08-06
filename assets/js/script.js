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
      parkDescH = $('<h3>');

      parkHoursDiv = $('<div>')
      parkHoursEl = $('<ul>');
      parkHoursH = $('<h3>');

      parkContactDiv = $('<div>')
      parkContactH = $('<h3>');
      parkContactEl = $('<ul>')
      parkPhoneEl = $('<li>')
      parkWebEl = $('<li>')
      parkWebAnchor = $('<a>');

  

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
      parklon = parks.longitude;
      parkPhone = parks.contacts.phoneNumbers[0].phoneNumber;
      parkWeb = parks.url;

      parkHours = parks.operatingHours[0].standardHours;

      const {monday,tuesday,wednesday,thursday,friday,saturday,sunday} = parkHours

      //append data to elements

      parkImgEl.attr('src', parkImg);
      parkImgEl.addClass('park-img card-image has-text-centered px-6 mt-6')
      parkImgEl.attr('alt', parkImgAlt)
      parkImgDiv.addClass('card-image image is-2by1 has-text-centered px-6 mb-5');
      parkImgDiv.append(parkImgEl);
      parkEl.append(parkImgDiv);

      parkNameEl.text(parkName);
      parkNameEl.addClass('park-name title divider is-size-5 has-text-centered')
      parkNameDiv.addClass('card-content');
      parkNameDiv.append(parkNameEl);
      parkEl.append(parkNameDiv);

      parkDescH.text('Description');
      parkDescH.addClass("is-size-2 has-text-weight-semibold")
      parkDescDiv.append(parkDescH);
      parkDescEl.text(parkDesc);
      parkDescEl.addClass('park-desc title is-size-5 has-text-grey')
      parkDescDiv.addClass('card-content');
      parkDescDiv.append(parkDescEl);
      parkEl.append(parkDescDiv);

      parkHoursH.text('Hours:');
      parkHoursH.addClass("is-size-2 has-text-weight-semibold")
      parkHoursEl.addClass('hours title is-size-5 has-text-grey')
      parkHoursDiv.addClass('card-content');
      parkHoursDiv.append(parkHoursH);
      parkHoursDiv.append(parkHoursEl);
      parkEl.append(parkHoursDiv);

      parkContactH.text('Contact Info');
      parkContactH.addClass('divider is-size-6')
      parkPhoneEl.text(`Phone: ${parkPhone}`);
      parkWebAnchor.text(`More Info`);
      parkContactEl.addClass('contact-info title is-size-6 has-text-centered')
      parkContactDiv.addClass('card-content');
      parkWebAnchor.attr('href',parkWeb);
      parkWebAnchor.attr('target', '_blank');
      parkContactDiv.append(parkContactH);
      parkContactEl.append(parkPhoneEl);
      
      parkWebEl.append(parkWebAnchor);
      parkContactEl.append(parkWebEl);
      parkContactDiv.append(parkContactEl);
      parkEl.append(parkContactDiv);
      
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
  // document.getElementById("parkNames").insertAdjacentHTML("afterbegin", html);  
  })  
  .catch(error =>{
      // console.log(error);
      // console.log(data);
     });   
     
  $("#park-name").text("")
}  

getParkName();
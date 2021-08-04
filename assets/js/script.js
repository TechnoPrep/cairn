const apiUrl ="https://developer.nps.gov/api/v1/parks?api_key=hrzeZivocJeVP942upjoq1HS5TL5d1mRUZmDQ64t&stateCode=co";
const apiKey ="hrzeZivocJeVP942upjoq1HS5TL5d1mRUZmDQ64t"
var stateInput = ""

function getParkName(){
 fetch(`https://developer.nps.gov/api/v1/parks?api_key=${apiKey}&stateCode=&${stateInput}`)
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
      return `<li>name: ${parks.fullName}</li>`;
    })
    .join("")
  console.log(html);  
  document.getElementById("parkNames").insertAdjacentHTML("afterbegin", html);  
  })  
  .catch(error =>{
      console.log(error);
      console.log(data);
     });    
}  
 
getParkName();
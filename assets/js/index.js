
//Passes the selected <option> into the results.html page
$('#search').click(function (e) { 
   
    e.preventDefault();
    let stateCode = $('#state').val();
    let stateName = $('#state option:selected').text();

    addToLocal(stateCode, stateName);

    if(stateName !== 'State'){
     
       $(window).attr('location', `results.html?state=${stateCode}`);
    }
});

//Calls the information associated with the "Recent Search"
//button clicked to then pass to the results.html page
$(document).ready(function () {
    
   $(document).on('click', '.custom-state-btn', function(e){

       e.preventDefault();
       let stateCode = $(this).val();
   
       $(window).attr('location', `results.html?state=${stateCode}`);
   })

});


//Activates the 'How it Works' modal on the homepage
$(document).ready(function () {
    
   $(document).on('click', '#how-it-works', function(e){

      $('.modal').toggleClass('is-active');
       
   })

});

//Adds previously selected states to local storage for use later
function addToLocal(stateCode, stateName){
   
   //Create Array
   let stateArr = [];
   
   //Create Object
   let stateInfo = {
      Code: stateCode, 
      Name: stateName
   }

   //Pull from local storage, if it doesn't exist, create an empty array
   stateArr = JSON.parse(localStorage.getItem('previousSelection')) || [];

   stateArr.push(stateInfo);

   //Remove Duplicate Objects by StateCode
   let uniqueState = stateArr.filter((value,index,array)=>{
      return array.findIndex(truthy=>{
         return truthy.Code === value.Code
      }) === index
   })

   //Push new Array of unique objects to local storage
   localStorage.setItem('previousSelection', JSON.stringify(uniqueState));

}

//Displays the data in local storage
function displayPrevState(){

   $('#prevState').empty();

   tempArr = JSON.parse(localStorage.getItem('previousSelection'));

   let prevStateEl = $('#prevState');
   
   if(tempArr !== null){
       for (let i = 0; i < tempArr.length; i++) {

         let preStateBtn = 
         `<li>
         <button value="${tempArr[i].Code}" type="button" class="button custom-state-btn is-fullwidth is-primary is-rounded">${tempArr[i].Name}</button>
         </li>`         

         prevStateEl.append(preStateBtn);
       }
   }

}

displayPrevState();

//hamburger menu
const burgerIcon = document.querySelector("#burger");
const navbarMenu = document.querySelector("#nav-links");

burgerIcon.addEventListener("click", () => {
   navbarMenu.classList.toggle("is-active")
})
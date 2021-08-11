$('#search').click(function (e) { 
   
    e.preventDefault();
    let stateCode = $('#state').val();
    let stateName = $('#state option:selected').text();

    addToLocal(stateCode, stateName);

    if(state !== 'State'){
     
       $(window).attr('location', `results.html?state=${stateCode}`);
    }
});

$(document).ready(function () {
    
   $(document).on('click', '.custom-state-btn', function(e){

       e.preventDefault();
       let stateCode = $(this).val();
   
       $(window).attr('location', `results.html?state=${stateCode}`);
   })

});

$(document).ready(function () {
    
   $(document).on('click', '#how-it-works', function(e){

      $('.modal').toggleClass('is-active');
       
   })

});

function addToLocal(stateCode, stateName){
   let stateArr = [];

   let stateInfo = {
      Code: stateCode, 
      Name: stateName
   }

   stateArr = JSON.parse(localStorage.getItem('previousSelection')) || [];

   stateArr.push(stateInfo);

   let uniqueState = stateArr.filter((value,index,array)=>{
      return array.findIndex(truthy=>{
         return truthy.Code === value.Code
      }) === index
   })

   localStorage.setItem('previousSelection', JSON.stringify(uniqueState));

}

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
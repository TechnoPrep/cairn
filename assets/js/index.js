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

function addToLocal(stateCode, stateName){
   let stateArr = [];

   let stateInfo = {
      Code: stateCode, 
      Name: stateName
   }

   stateArr = JSON.parse(localStorage.getItem('previousSelection')) || [];

   stateArr.push(stateInfo);

   // let uniqueState = stateArr.filter((v,i,a)=>a.findIndex(t=>(t.Code === v.Code))===i);

      let uniqueState = stateArr.filter((value,index,array)=>{
         return array.findIndex(truthy=>{
            return truthy.Code === value.Code
         }) === index
      })

   // let uniqueState = [...new Set(stateArr)];

   localStorage.setItem('previousSelection', JSON.stringify(uniqueState));

}

function displayPrevState(){

   $('#prevState').empty();

   tempArr = JSON.parse(localStorage.getItem('previousSelection'));

   let prevStateEl = $('#prevState');
   
   if(tempArr !== null){
       for (let i = 0; i < tempArr.length; i++) {

         let preStateBtn = `<button value="${tempArr[i].Code}" type="button" class="custom-state-btn">${tempArr[i].Name}</button>`         

         prevStateEl.append(preStateBtn);
       }
   }

}

displayPrevState();
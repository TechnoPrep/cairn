$('#search').click(function (e) { 
   
    e.preventDefault();
    let state = $('#state').val();

    if(state !== 'State'){
     
       $(window).attr('location', `results.html?state=${state}`);
    }

   });
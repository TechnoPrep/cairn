$('#search').click(function (e) { 
   
    e.preventDefault();
    let state = $('#state').val();

    if(state !== 'State'){
     
       $(window).attr('location', `results.html?state=${state}`);
    }

   });

   //hamburger menu
   const burgerIcon = document.querySelector("#burger");
   const navbarMenu = document.querySelector("#nav-links");

   burgerIcon.addEventListener("click", () => {
      navbarMenu.classList.toggle("is-active")
   })
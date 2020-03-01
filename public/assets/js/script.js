// jquery code goes here

$( document ).ready(function() {


    //*************************** POST REQUEST *********************************//
    
    let $burgerSubmitBtn = $("#burgerSubmit");
    
    // 3. Burger data sent to server to be dealt with by mysql database using AJAX
    let saveburger = function(burger) {
      //console.log(burger);
      return $.ajax({
        url: "/api/addBurger",
        data: burger,
        method: "POST"
      });
    };
    
    // 2. Send burger info to ajax function in form of an object for the server to use with mysql then reload
    let handleBurgerInfoDelivery = function() {
      let burgerData = document.querySelector("#usrform textarea").value;
      let burger = {
        burger_name: burgerData,
        devoured: false
      };
    
      saveburger(burger).then(function() {
       // Calls burger data updating content
       getAndRenderBurgers();
      });
    };
    
    
    // 1. Makes call to handleBurgerInfoDelivery
    $burgerSubmitBtn.on("click",  () => {
      let burgerData = document.querySelector("#usrform textarea").value;
      if(burgerData.length >= 1){
        handleBurgerInfoDelivery();
      }
    });
    
    
    //*************************** GET REQUEST *********************************//
    
    
    // 3. Render's the list of burger titles past from the db
    let renderBurgerList = function(data) {
      location.reload();
    };
    
    
    // 2. A function for getting all burgers from the db
    let getBurgers = function() {
      return $.ajax({
        url: "/api/burgers",
        method: "GET"
      });
    };
    
    // 1. Gets burgers from the db
    let getAndRenderBurgers = function() {
      return getBurgers().then(function(data) {
        renderBurgerList(data);
      });
    };
    
    //getAndRenderBurgers();
    
    //*************************** PUT REQUEST *********************************//
    
    // 2. A function for updating a burger from the db
    let putBurger = function(id) {
      return $.ajax({
        url: "/api/burgers/" + id,
        method: "PUT"
      });
    };
    
    // 1. Click the burger
    let handleBurgerPut = function(id) {
      // prevents the click listener for the list from being called when the button inside of it is clicked
    
      putBurger(id).then(function() {
        location.reload();
      });
    };
    
    //*************************** DELETE REQUEST *********************************//
    
    
    
    // 2. A function for deleting all burgers from the db
    let deleteBurgers = function() {
      return $.ajax({
        url: "/api/burgers",
        method: "DELETE"
      });
    };
    
    // 1. Gets burgers from the db
    let handleBurgerDelete = function() {
      // prevents the click listener for the list from being called when the button inside of it is clicked
    
      deleteBurgers().then(function() {
        location.reload();
      });
    };
    
    
    //***************************  INITIAL SETUP  ******************************************/
    
    (function () {
      // Set initial 
      let burgersMenu = document.querySelectorAll("#burgersDBdata #burgers div button");
      let burgersReset = document.querySelector('#burgerReset');
      //console.log(burgersMenu);
      
      burgersMenu.forEach((burger) =>{
        burger.addEventListener("click", function() { handleBurgerPut(this.getAttribute('data-id')) });
      });
    
      burgersReset.addEventListener("click", function() { handleBurgerDelete()});
      
    }());
    
    
    });
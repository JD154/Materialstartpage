var set_id = "";        //create a variable to store name of id sections

/* Create variables searching for each section id*/
const dev_id = document.getElementById("dev_id");
const reddit_id = document.getElementById("reddit_id");
const social_id = document.getElementById("social_id");
const others_id = document.getElementById("others_id");
const url_id = document.getElementById("set_url");
const close_btn = document.getElementById("close_btn");

(function(){
    /* Assign click event listener to each plus button in the page */
    dev_id.addEventListener('click', function dev_set() {
    
        openNav();      // Call function to open side bar 
        set_id = "development";      // Set the appropriate name to id variable
        console.log("ID = " + set_id);        //Verifies in console if the name is correct
    });
    
    reddit_id.addEventListener('click', function reddit_set() {
        openNav();
        set_id = "reddit";
        console.log("ID = " + set_id);
    });
    
    social_id.addEventListener('click', function social_set() {
        openNav();
        set_id = "social";
        console.log("ID = " + set_id);
    });
    
    others_id.addEventListener('click', function others_set() {
        openNav();
        set_id = "others";
        console.log("ID = " + set_id);
    });
    
    /* Function to get data from input fields when user press the pencil button on side bar */
    url_id.addEventListener('click', function set_url(){
        /* Search content from input fields */
        var url_name = document.getElementById("setURL").value;
        var domain_name = document.getElementById("setName").value;
    
        /* Verifies in console each value before final set */
        console.log(url_name);
        console.log(domain_name);
        console.log(set_id);
    
        var div = document.createElement("div");        //create a div element
        div.className = "content-link";         //assign the appropiate class name to div
    
        var anchor = document.createElement('a');       //create a anchor element
        anchor.setAttribute('href', url_name);      //use data from input field to set an href url
        anchor.innerHTML = domain_name;     //use data from input field to set text to this anchor
    
        div.appendChild(anchor);        //append the anchor to the div created
    
        var element = document.getElementById(set_id);      //search for appropiate section with the id provided
        element.appendChild(div);       //append created div to the appropiate section
    
        /* Clear values */
        document.getElementById("setURL").value = "";
        document.getElementById("setName").value = "";
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("shadow-opacity").style.opacity= "0";
        set_id = "";
        console.log("values cleared!");
    });
    
    /* Assign click event listener to X button on the side bar */
    close_btn.addEventListener('click', function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("shadow-opacity").style.opacity= "0";
    });
})();

/* Function to set styles and make side bar visible */
function openNav(){
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("shadow-opacity").style.opacity = "1";
}






// Create variables searching for each section id
const dev_id = document.querySelector("#dev-id");
const reddit_id = document.querySelector("#reddit-id")
const social_id = document.querySelector("#social-id");
const others_id = document.querySelector("#others-id");
const url_id = document.querySelector("#send-data");
const close_btn = document.querySelector("#close-sidebar");

var set_id = "";        //create a variable to store name of id sections

// Assign click event listener to each plus button in the page 
dev_id.addEventListener('click', function dev_set() {
    openSideBar();      // Call function to open side bar 
    set_id = "#development";      // Set the appropriate name to id variable
    console.log("ID = " + set_id);        //Verifies in console if the name is correct
});

reddit_id.addEventListener('click', function reddit_set() {
    openSideBar();
    set_id = "#reddit";
    console.log("ID = " + set_id);
});

social_id.addEventListener('click', function social_set() {
    openSideBar();
    set_id = "#social";
    console.log("ID = " + set_id);
});

others_id.addEventListener('click', function others_set() {
    openSideBar();
    set_id = "#others";
    console.log("ID = " + set_id);
});

// Assign click event listener to X button on the side bar 
close_btn.addEventListener('click', closeSideBar);

// Function to get data from input fields when user press the pencil button on side bar 
url_id.addEventListener('click', function send_data(){
    // Search content from input fields 
    var url_name = document.querySelector("#get-url").value;
    var domain_name = document.querySelector("#get-name").value;

    // Verifies in console each value before final set 
    console.log(url_name);
    console.log(domain_name);
    console.log(set_id);

    var li = document.createElement("li");        //create a li element
    li.className = "content-link";         //assign the appropiate class name to li

    var anchor = document.createElement('a');       //create a anchor element
    anchor.setAttribute('href', url_name);      //use data from input field to set an href url
    anchor.innerHTML = domain_name;     //use data from input field to set text to this anchor

    li.appendChild(anchor);        //append the anchor to the li created

    var element = document.querySelector(set_id);      //search for appropiate section with the id provided
    element.appendChild(li);       //append created li to the appropiate section

    /* Clear values */
    document.querySelector("#get-url").value = "";
    document.querySelector("#get-name").value = "";
    closeSideBar();
    set_id = "";
    console.log("values cleared!");
});


// Function to set styles and make side bar visible 
function openSideBar(){
    document.querySelector(".sidenav").style.transform = "translateX(0%)";
    document.querySelector("#sidebar-overlay").style.opacity = "1";
    document.querySelector("#sidebar-overlay").style.pointerEvents = "auto";

    document.querySelector("#sidebar-overlay").addEventListener('click', closeSideBar);
}

// Function to set styles and make side bar invisible
function closeSideBar() {
    document.querySelector(".sidenav").style.transform = "translateX(-100%)";
    document.querySelector("#sidebar-overlay").style.opacity= "0";
    document.querySelector("#sidebar-overlay").style.pointerEvents = "none";
}






/* Create variables searching for each section id*/
const dev_id = document.getElementById("dev-id");
const reddit_id = document.getElementById("reddit-id");
const social_id = document.getElementById("social-id");
const others_id = document.getElementById("others-id");
const url_id = document.getElementById("send-data");
const close_btn = document.getElementById("close-sidebar");

var set_id = "";        //create a variable to store name of id sections

/* Assign click event listener to each plus button in the page */
dev_id.addEventListener('click', function dev_set() {
    openSideBar();      // Call function to open side bar 
    set_id = "development";      // Set the appropriate name to id variable
    console.log("ID = " + set_id);        //Verifies in console if the name is correct
});

reddit_id.addEventListener('click', function reddit_set() {
    openSideBar();
    set_id = "reddit";
    console.log("ID = " + set_id);
});

social_id.addEventListener('click', function social_set() {
    openSideBar();
    set_id = "social";
    console.log("ID = " + set_id);
});

others_id.addEventListener('click', function others_set() {
    openSideBar();
    set_id = "others";
    console.log("ID = " + set_id);
});

/* Function to get data from input fields when user press the pencil button on side bar */
url_id.addEventListener('click', function send_data(){
    /* Search content from input fields */
    var url_name = document.getElementById("get-url").value;
    var domain_name = document.getElementById("get-name").value;

    /* Verifies in console each value before final set */
    console.log(url_name);
    console.log(domain_name);
    console.log(set_id);

    var li = document.createElement("li");        //create a div element
    li.className = "content-link";         //assign the appropiate class name to div

    var anchor = document.createElement('a');       //create a anchor element
    anchor.setAttribute('href', url_name);      //use data from input field to set an href url
    anchor.innerHTML = domain_name;     //use data from input field to set text to this anchor

    li.appendChild(anchor);        //append the anchor to the div created

    var element = document.getElementById(set_id);      //search for appropiate section with the id provided
    element.appendChild(li);       //append created div to the appropiate section

    /* Clear values */
    document.getElementById("get-url").value = "";
    document.getElementById("get-name").value = "";
    closeSideBar();
    set_id = "";
    console.log("values cleared!");
});

/* Assign click event listener to X button on the side bar */
close_btn.addEventListener('click', closeSideBar);

/* Function to set styles and make side bar visible */
function openSideBar(){
    document.getElementById("mySidenav").style.transform = "translateX(0%)";
    document.getElementById("sidebar-overlay").style.opacity = "1";
    document.getElementById("sidebar-overlay").style.pointerEvents = "auto";

    document.getElementById("sidebar-overlay").addEventListener('click', closeSideBar);
}

function closeSideBar() {
    document.getElementById("mySidenav").style.transform = "translateX(-100%)";
    document.getElementById("sidebar-overlay").style.opacity= "0";
    document.getElementById("sidebar-overlay").style.pointerEvents = "none";
}






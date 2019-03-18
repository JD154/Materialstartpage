//create a variable to store name of id sections
let setId = "";

// Add click event listener to each plus button in the page 
document.querySelector("#dev-id").addEventListener('click', () => {
    openSideBar();      // Call function to open side bar 
    setId = "#development";      // Set the appropriate name to id variable
    console.log("ID = " + setId);        //Verifies in console if the name is correct
});

document.querySelector("#reddit-id").addEventListener('click', () => {
    openSideBar();
    setId = "#reddit";
    console.log("ID = " + setId);
});

document.querySelector("#social-id").addEventListener('click', () => {
    openSideBar();
    setId = "#social";
    console.log("ID = " + setId);
});

document.querySelector("#others-id").addEventListener('click', () => {
    openSideBar();
    setId = "#others";
    console.log("ID = " + setId);
});

// When load will check if fetched array from localStorage is not empty
document.addEventListener('DOMContentLoaded', () => {
    getSite();
});

// Function to get data from input fields when user press the pencil button on side bar 
document.querySelector("#send-data").addEventListener('click', () => {

    // Search content from input fields 
    let urlName = document.querySelector("#get-url").value;
    let domainName = document.querySelector("#get-name").value;

    // Check in console each value before final set 
    console.log("Domain url = " + urlName);
    console.log("Domain name = " + domainName);
    console.log("ID to append = " + setId);

    if (urlName && domainName){
        saveSite(urlName, domainName, setId);        // Call function to save data in Local Storage
        appendSite(urlName, domainName, setId);      // Call function to append data into the HTML
        closeSideBar();
    } else {
        errorMessage();
    }

    // Clear values 
    clearValues();
});

// Function allow me save data from input fields into an object in LocalStorage
function saveSite(urlName, domainName, setId){
    // Save input values in an object 
    let sitesObject = {
        url: urlName,
        domain: domainName,
        id: setId
    }

    // Check if local storage exist
    if (localStorage.getItem('savedSites') === null){
        let savedSites = [];        // If not exist will init a new array
        savedSites.push(sitesObject);       // Add new object to the existing object array 
        localStorage.setItem('savedSites', JSON.stringify(savedSites));     // Save modified object in Local Storage

    } else {
        let savedSites = JSON.parse(localStorage.getItem('savedSites'));        // Get string from Local Storage saved object
        savedSites.push(sitesObject);       // Add new object to the existing object array 
        localStorage.setItem('savedSites', JSON.stringify(savedSites));     // Save modified object in Local Storage
    }
}

// Function is called when I want to get data from LocalStorage objects and put in variables
function getSite(){
    let savedSites = JSON.parse(localStorage.getItem('savedSites'));        // Take object with sites and parse it to a string

    if (savedSites != null){
        for (const i in savedSites){

            // Get values of the string in each iteration and saves in variables
            let url = savedSites[i].url;
            let domain = savedSites[i].domain;
            let id = savedSites[i].id;

            appendSite(url, domain, id);        // Call function to append data into the HTML
            console.log(url + " " + domain + " " + id);     // Check in console each iteration of the loop
        }
    }
}

// Function to add fetched data from LocalStorage into HTML
function appendSite(urlName, domainName, set_id){
    let li = document.createElement("li");        // Create a li element
    li.className = "content-link";         // Assign the appropiate class name to li

    let anchor = document.createElement('a');       // Create a anchor element
    anchor.setAttribute('href', urlName);      // Use data from input field to set an href url
    anchor.innerHTML = domainName;     // Use data from input field to set text to this anchor

    let icon = document.createElement('i');     // Create i element
    icon.className = "far fa-trash-alt";        // Add FontAwesome classes for an trash can
    icon.addEventListener('click', deleteSite);     // Add eventListener to each icon to after delete entire element

    li.appendChild(anchor);        // Append the anchor to the li created
    li.appendChild(icon);           // Append the icon to the li created
    
    let element = document.querySelector(set_id);      // Search for appropiate section with the id provided
    element.appendChild(li);       // Append created li to the appropiate section
}

// Function to search for anchor content delete entire object from LocalStorage
function deleteSite(){
    let parent = this.parentElement;        // Search for the parent element of the icon
    let anchor = parent.firstChild.innerHTML;        // After search for the parent will search for the anchor as firstChild and get domain name
    
    let savedSites = JSON.parse(localStorage.getItem('savedSites'));

    for (const i in savedSites) {

        if (savedSites[i].domain == anchor) {
            savedSites.splice(i, 1);
            console.log("li element deleted!");
        } 

        localStorage.setItem('savedSites', JSON.stringify(savedSites));     // Save modified object in Local Storage
        document.querySelectorAll(".content-link").forEach(e => e.remove());        //search for li items to delete them and next re-print new data

        getSite();      // Call function to re-print items with the modified LocalStorage
    }
}

// Assign click event listener to X button on the side bar 
document.querySelector("#close-sidebar").addEventListener('click', closeSideBar);

// Function to set styles and make side bar visible 
function openSideBar(){
    document.querySelector(".sidenav").classList.add('sidenav-isvisible');
    document.querySelector(".sidebar-overlay").classList.add('overlay-isvisible');
    document.querySelector(".sidebar-overlay").addEventListener('click', closeSideBar);
}

// When an input field is empty and submit an error message will be displayed
function errorMessage(){
    document.querySelector(".form-error").classList.add('form-error-isvisible');

    setTimeout(() => {
        document.querySelector(".form-error").classList.remove('form-error-isvisible');
    }, 1500);
}

// Function to clear values on inputs
function clearValues(){
    document.querySelector("#get-url").value = "";
    document.querySelector("#get-name").value = "";
    setId = "";

    console.log("values cleared!");
}

// Function to set styles and make side bar invisible
function closeSideBar() {
    document.querySelector(".sidenav").classList.remove('sidenav-isvisible');
    document.querySelector(".sidebar-overlay").classList.remove('overlay-isvisible');
    clearValues();
}

//create a variable to store name of id sections
let setId = "";
let selectedSection = "";
let selectedIndex = "";
let sectionsList = document.querySelectorAll(".box-header");

// Add click event listener to each plus button in the page 
document.querySelector("#dev-id").addEventListener('click', () => {
    openSideBar(); // Call function to open side bar 
    setId = "#section1"; // Set the appropriate name to id variable
    console.log("ID = " + setId); //Verifies in console if the name is correct
});

document.querySelector("#reddit-id").addEventListener('click', () => {
    openSideBar();
    setId = "#section2";
    console.log("ID = " + setId);
});

document.querySelector("#social-id").addEventListener('click', () => {
    openSideBar();
    setId = "#section3";
    console.log("ID = " + setId);
});

document.querySelector("#others-id").addEventListener('click', () => {
    openSideBar();
    setId = "#section4";
    console.log("ID = " + setId);
});


// When load will check if fetched array from localStorage is not empty
document.addEventListener('DOMContentLoaded', () => {
    getSite();
    getSections();
    setDate();
});


// Function to get data from input fields when user press the pencil button on side bar 
document.querySelector("#send-data").addEventListener('click', () => {

    // Get content from input fields 
    let urlName = document.querySelector("#get-url").value;
    let domainName = document.querySelector("#get-name").value;

    // Check in console each value before final set 
    console.log("Domain url = " + urlName);
    console.log("Domain name = " + domainName);
    console.log("ID to append = " + setId);

    if (urlName && domainName) {
        saveSite(urlName, domainName, setId); // Call function to save data in Local Storage
        appendSite(urlName, domainName, setId); // Call function to append data into the HTML
        closeSideBar();
    } else {
        errorMessage();
    }

    // Clear values 
    clearValues();
});

document.querySelector("#modal-trigger").addEventListener('click', () => {
    document.querySelector(".modal-overlay").style.display = "block";

    document.querySelector("#dropdown-trigger").addEventListener('click', () => {
        document.querySelector("#page-sections").style.display = "block";
    });

    document.querySelector("#close-modal").addEventListener('click', () => {
        document.querySelector(".modal-overlay").style.display = "none";
    });
});

document.querySelector("#section-change").addEventListener('click', () => {
    let nameToChange = document.querySelector(".modal-input").value;

    if (nameToChange && selectedSection) {
        let savedSections = JSON.parse(localStorage.getItem('savedSections'));

        savedSections[selectedIndex].sectionName = nameToChange;
        localStorage.setItem('savedSections', JSON.stringify(savedSections)); // Save changes in Local Storage

    }
    getSections();
    document.querySelector(".modal-overlay").style.display = "none";
    document.querySelector(".modal-input").value = "";
    document.querySelector("#dropdown-trigger").innerHTML = "Select section";
});

// Function is called when I want to get data from LocalStorage objects and put in variables
function getSite() {
    let savedSites = JSON.parse(localStorage.getItem('savedSites')); // Take object with sites and parse it to a string

    if (savedSites != null) {
        for (const i in savedSites) {

            // Get values of the string in each iteration and saves in variables
            let url = savedSites[i].url;
            let domain = savedSites[i].domain;
            let id = savedSites[i].id;

            appendSite(url, domain, id); // Call function to append data into the HTML
            console.log(url + " " + domain + " " + id); // Check in console each iteration of the loop
        }
    }
}

// Function allow me save data from input fields into an object in LocalStorage
function saveSite(urlName, domainName, setId) {
    // Save input values in an object 
    let sitesObject = {
        url: urlName,
        domain: domainName,
        id: setId
    }

    // Check if local storage exist
    if (localStorage.getItem('savedSites') === null) {
        let savedSites = []; // If not exist will init a new array
        savedSites.push(sitesObject); // Add new object to the existing object array 
        localStorage.setItem('savedSites', JSON.stringify(savedSites)); // Save modified object in Local Storage

    } else {
        let savedSites = JSON.parse(localStorage.getItem('savedSites')); // Get string from Local Storage saved object
        savedSites.push(sitesObject); // Add new object to the existing object array 
        localStorage.setItem('savedSites', JSON.stringify(savedSites)); // Save modified object in Local Storage
    }
}

// Function to add fetched data from LocalStorage into HTML
function appendSite(urlName, domainName, set_id) {
    let li = document.createElement("li"); // Create a li element
    li.className = "content-link"; // Assign the appropiate class name to li

    let anchor = document.createElement('a'); // Create a anchor element
    anchor.setAttribute('href', urlName); // Use data from input field to set an href url
    anchor.innerHTML = domainName; // Use data from input field to set text to this anchor

    let icon = document.createElement('i'); // Create i element
    icon.className = "far fa-trash-alt"; // Add FontAwesome classes for an trash can
    icon.addEventListener('click', deleteSite); // Add eventListener to each icon to after delete entire element

    li.appendChild(anchor); // Append the anchor to the li created
    li.appendChild(icon); // Append the icon to the li created

    let element = document.querySelector(set_id); // Search for appropiate section with the id provided
    element.appendChild(li); // Append created li to the appropiate section
}

// Function to search for anchor content and delete entire object from LocalStorage
function deleteSite() {
    let parent = this.parentElement; // Search for the parent element of the icon
    let anchor = parent.firstChild.innerHTML; // After search for the parent will search for the anchor as firstChild and get domain name

    let savedSites = JSON.parse(localStorage.getItem('savedSites'));

    for (const i in savedSites) {
        if (savedSites[i].domain == anchor) {
            savedSites.splice(i, 1);
            console.log("li element deleted!");
        }

        localStorage.setItem('savedSites', JSON.stringify(savedSites)); // Save changes in Local Storage
        parent.remove(); // Remove complete desired li element
    }
}

// Assign click event listener to X button on the side bar 
document.querySelector("#close-sidebar").addEventListener('click', closeSideBar);

// When an input field is empty and submit an error message will be displayed
function errorMessage() {
    document.querySelector(".form-error").classList.add('form-error-isvisible');

    setTimeout(() => {
        document.querySelector(".form-error").classList.remove('form-error-isvisible');
    }, 1500);
}

// Function to clear values on inputs
function clearValues() {
    document.querySelector("#get-url").value = "";
    document.querySelector("#get-name").value = "";

    console.log("values cleared!");
}

// Function to set styles and make side bar visible 
function openSideBar() {
    document.querySelector(".sidenav").classList.add('sidenav-isvisible');
    document.querySelector(".sidebar-overlay").classList.add('overlay-isvisible');
    document.querySelector(".sidebar-overlay").addEventListener('click', closeSideBar);
}

// Function to set styles and make side bar invisible
function closeSideBar() {
    document.querySelector(".sidenav").classList.remove('sidenav-isvisible');
    document.querySelector(".sidebar-overlay").classList.remove('overlay-isvisible');
    clearValues();
}


function getSections() {
    reprintSections();
    let list = [].slice.call(sectionsList);
    let innerSections = list.map(e => e.innerHTML);

    saveSections(innerSections);

    document.querySelectorAll("#page-sections > li").forEach(e => e.remove());
    for (const i in innerSections) {
        let liItem = document.createElement("li");

        liItem.addEventListener('click', () => {
            document.querySelector("#page-sections").style.display = "none";

            selectedSection = liItem.innerHTML;
            selectedIndex = i;
            document.querySelector("#dropdown-trigger").innerHTML = selectedSection;
            console.log("Section to edit: " + selectedSection);
        });

        liItem.innerHTML = innerSections[i];
        document.querySelector("#page-sections").appendChild(liItem);
    }
    console.log(selectedIndex);
}

function saveSections(sectionsArray) {
    let saveSection;
    let savedSections = [];

    if (localStorage.getItem('savedSections') === null) {
        for (const i in sectionsArray) {
            saveSection = {
                sectionName: sectionsArray[i]
            }
            savedSections.push(saveSection);
            localStorage.setItem('savedSections', JSON.stringify(savedSections));
        }
    }
}

function reprintSections() {
    let savedSections = JSON.parse(localStorage.getItem('savedSections'));
    for (const i in savedSections) {
        sectionsList[i].innerHTML = savedSections[i].sectionName;
    }
}

function setDate(){
    // Initialize javascript date object
    let dateObject = new Date();
    // Variables to get properly the date in text
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Search for elements to fill with date elements
    let dateParagraph = document.querySelector(".show-date");
    let timeOfDay = document.querySelector(".show-salute");

    // Fill paragraph element with date format
    dateParagraph.innerHTML = days[dateObject.getDay()] + " " + dateObject.getDate() + " " + months[dateObject.getMonth()] + " " + dateObject.getFullYear();

    let hour = dateObject.getHours();

    if (hour > 6 && hour < 12){
        timeOfDay.innerHTML = "Good morning!";
    } else if (hour > 12 && hour < 19){
        timeOfDay.innerHTML = "Good afternoon!";
    } else{
        timeOfDay.innerHTML = "Good night!";
    }

}
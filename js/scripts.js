//create a variable to store name of id sections
let setId;
let selectedSection;
let selectedIndex;
let sectionsList = document.querySelectorAll(".box-header");

document.addEventListener('DOMContentLoaded', () => {
  clearSearchInput();
  getSite();
  getSections();
  setDate();
  rippleEffect();
  animateFloatLabel();
});


Array.from(document.querySelectorAll(".add-button")).forEach(function(element) {
  element.addEventListener('click', function() {
    setId = this.getAttribute('data-section');
    openSideBar(); // Call function to open side bar
  });
});

// Assign click event listener to X button on the side bar
document.querySelector("#close-sidebar").addEventListener('click', closeSideBar);

// Function to get data from input fields when user press the pencil button on side bar
document.getElementById("bookmark-form").addEventListener('submit', function(event){
  event.preventDefault();
  // Get content from input fields
  let urlName = document.querySelector("#get-url").value;
  let domainName = document.querySelector("#get-name").value;

  // Call functions if both inputs are filled, otherwise will show an error
  if (urlName && domainName) {
    saveSite(urlName, domainName, setId); // Call function to save data in Local Storage
    appendSite(urlName, domainName, setId); // Call function to append data into the HTML
    closeSideBar();
  } else {
    errorMessage();
  }

  clearValues();
});


// Apply event listener to FAB for open modal
document.querySelector("#modal-trigger").addEventListener('click', () => {
  document.querySelector(".modal-overlay").style.display = "block"; // show modal

  // if dropdown button is clicked will show list
  document.querySelector("#dropdown-trigger").addEventListener('click', () => {
    document.querySelector("#page-sections").classList.add("dropdown-content-opened");
  });

  // if cancel button is clicked will hide modal
  document.querySelector("#close-modal").addEventListener('click', () => {
    document.querySelector(".modal-overlay").style.display = "none";
    document.querySelector("#dropdown-trigger").innerHTML = "Select section";
    checkIfDropdownIsOpen();
  });

  // hide modal if clicked outside of the box
  document.querySelector(".modal-overlay").addEventListener('click', (e) => {
    if (e.target == document.querySelector(".modal-overlay")) {
      document.querySelector(".modal-overlay").style.display = "none";
      document.querySelector("#dropdown-trigger").innerHTML = "Select section";
      checkIfDropdownIsOpen();
    }
  });
});

// Event Listener for apply button in modal
document.querySelector("#section-change").addEventListener('click', () => {
  let nameToChange = document.querySelector("#modal-input").value;

  // Apply changes if dropdown selection and input is not empty
  if (nameToChange && selectedSection) {
    let savedSections = JSON.parse(localStorage.getItem('savedSections'));
    savedSections[selectedIndex].sectionName = nameToChange;
    localStorage.setItem('savedSections', JSON.stringify(savedSections));
  }

  getSections();
  document.querySelector(".modal-overlay").style.display = "none";
  document.querySelector("#modal-input").value = "";
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
  li.className = "ripple ripple-dark content-link"; // Assign the appropiate class name to li

  let anchor = document.createElement('a'); // Create a anchor element
  anchor.setAttribute('href', urlName); // Use data from input field to set an href url
  anchor.innerHTML = domainName; // Use data from input field to set text to this anchor

  let icon = document.createElement('i'); // Create i element
  icon.className = " far fa-trash-alt"; // Add FontAwesome classes for an trash can
  icon.addEventListener('click', deleteSite); // Add eventListener to each icon to after delete entire element

  li.appendChild(anchor); // Append the anchor to the li created
  li.appendChild(icon); // Append the icon to the li created

  let element = document.querySelector(set_id); // Search for appropiate section with the id provided
  element.appendChild(li); // Append created li to the appropiate section
  rippleEffect();
}

// Function to search for anchor content and delete entire object from LocalStorage
function deleteSite() {
  let parent = this.parentElement; // Search for the parent element of the icon
  let anchor = parent.firstChild.innerHTML; // After search for the parent will search for the anchor as firstChild and get domain name

  let savedSites = JSON.parse(localStorage.getItem('savedSites'));

  for (const i in savedSites) {
    if (savedSites[i].domain == anchor) {
      savedSites.splice(i, 1);
    }

    localStorage.setItem('savedSites', JSON.stringify(savedSites)); // Save changes in Local Storage
    parent.remove(); // Remove complete desired li element
  }
}

function getSections() {
  reprintSections();
  let list = [].slice.call(sectionsList); // Take nodelist and push to an array
  let innerSections = list.map(e => e.innerHTML); //From each object in array will take the innerHTML

  saveSections(innerSections);

  document.querySelectorAll("#page-sections > li").forEach(e => e.remove()); // Remove every li on the ul #page-sections

  // Looping for each header section found
  for (const i in innerSections) {
    let liItem = document.createElement("li");
    liItem.className = "hover-dark";

    // If the li element is click will close the entire dropdown
    liItem.addEventListener('click', (e) => {
      document.querySelector("#page-sections").classList.remove("dropdown-content-opened");
      selectedSection = liItem.innerHTML; // Take the innerHTML from the li and save it in a variable
      selectedIndex = i; // Save the iteration value of the selected li
      document.querySelector("#dropdown-trigger").innerHTML = selectedSection; //
    });

    liItem.innerHTML = innerSections[i]; // Save in innerHTML from li the element from the array
    document.querySelector("#page-sections").appendChild(liItem); // Apprend li to the ul
  }
  rippleEffect();
}

// Function to save each section header to Local Storage
function saveSections(sectionsArray) {
  let saveSection;
  let savedSections = [];

  // Array never will be empty so is not necessary to use if conditional to check if Local Storage is empty
  for (const i in sectionsArray) {
    saveSection = {
      sectionName: sectionsArray[i] // Save each section header in a object
    }
    savedSections.push(saveSection); // Put in an array of objects
    localStorage.setItem('savedSections', JSON.stringify(savedSections)); // Save it in Local Storage
  }

}

// Function to get object in Local Storage and fill each section header
function reprintSections() {
  let savedSections = JSON.parse(localStorage.getItem('savedSections')); // Get object list

  // Apply text from array to innerHTML of each section header
  for (const i in savedSections) {
    sectionsList[i].innerHTML = savedSections[i].sectionName;
  }
}

/* Interactive DOM functions for effects and animations */

// Interact with DOM to show salute message and date
function setDate() {
  // Initialize javascript date object
  let dateObject = new Date();

  // Const array variables to get properly the date in text
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Search for elements to fill with date elements
  let dateParagraph = document.querySelector(".show-date");
  let timeOfDay = document.querySelector(".show-salute");

  // Fill paragraph element with date format
  dateParagraph.innerHTML = DAYS[dateObject.getDay()] + " " + dateObject.getDate() + " " + MONTHS[dateObject.getMonth()] + " " + dateObject.getFullYear();

  // Get hours to make conditionals
  let hour = dateObject.getHours();

  if (hour >= 6 && hour < 12) {
    timeOfDay.innerHTML = "Good morning!";
  } else if (hour >= 12 && hour < 19) {
    timeOfDay.innerHTML = "Good afternoon!";
  } else {
    timeOfDay.innerHTML = "Good night!";
  }
}

// Give properly animation to float labels on inputs
function animateFloatLabel() {
  // Search for all inputs in page
  let inputs = document.querySelectorAll(".form-input");

  // loop inside each one of inputs
  inputs.forEach(input => {
    let inputWrapper = input.parentNode; // Search for parent of the input
    let label = inputWrapper.querySelector(".floating-label"); // Search for the label for the input

    // Apply a focus listener
    input.addEventListener('focus', () => {
      label.classList.add("label-focused");
      label.classList.add("label-color-focused");
    });

    // Apply a unfocus listener to the same element
    input.addEventListener('blur', () => {
      let inputValue = inputWrapper.querySelector(".form-input").value;
      label.classList.remove("label-color-focused");

      // If the input is empty will reset classes
      if (inputValue == "") {
        label.classList.remove("label-focused");
      }
    });
  });
}

function rippleEffect() {
  let rippleElements = document.querySelectorAll(".ripple"); // Search for ripple classes applied
  rippleElements.forEach(e => e.onmousedown = null); // Remove every listener if already has been applied

  // add a listener to each element with ripple class
  rippleElements.forEach(ripple => {
    ripple.addEventListener('mousedown', (e) => {
      let offset = ripple.getBoundingClientRect(); // Get position relative to the viewport

      //calculate where has been clicked
      let X = e.clientX - offset.left;
      let Y = e.clientY - offset.top;

      let rippleSpan = document.createElement("span");
      rippleSpan.classList.add("ripple-effect");
      rippleSpan.setAttribute("style", "top:" + Y + "px; left:" + X + "px;");

      // If the ripple class have ripple-dark added too will apply dark background, if not white
      if (ripple.classList.contains("ripple-dark")) {
        rippleSpan.style.background = "rgba(0, 0, 0, 0.3)";
      } else {
        rippleSpan.style.background = "rgba(255, 255, 255, 0.3";
      }

      ripple.appendChild(rippleSpan);

      setTimeout(() => {
        rippleSpan.parentNode.removeChild(rippleSpan);
      }, 900);
    })
  });
}

/* Secondary functions made for open/close/hide  */

// Function to clear values on inputs
function clearValues() {
  document.querySelector("#get-url").value = "";
  document.querySelector("#get-name").value = "";
}

function clearSearchInput() {
  if (document.querySelector(".search-input")) {
    this.value = " ";
  }
}

// Function to set styles and make side bar visible
function openSideBar() {
  document.querySelector(".sidenav").classList.add('sidenav-isvisible');
  document.querySelector(".sidebar-overlay").classList.add('overlay-isvisible');
  document.querySelector(".sidebar-overlay").addEventListener('click', closeSideBar);
  document.getElementById("get-url").focus();
}

// When an input field is empty and submit an error message will be displayed
function errorMessage() {
  document.querySelector(".form-error").classList.add('form-error-isvisible');

  setTimeout(() => {
    document.querySelector(".form-error").classList.remove('form-error-isvisible');
  }, 1500);
}

// Function to set styles and make side bar invisible
function closeSideBar() {
  document.querySelector(".sidenav").classList.remove('sidenav-isvisible');
  document.querySelector(".sidebar-overlay").classList.remove('overlay-isvisible');
  clearValues();
}

// If the dropdown list is open will close it
function checkIfDropdownIsOpen() {
  if (document.querySelector(".dropdown-content-opened")) {
    document.querySelector("#page-sections").classList.remove("dropdown-content-opened");
  }
}

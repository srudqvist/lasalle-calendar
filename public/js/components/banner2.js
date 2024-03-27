const currentURL = window.location.href;
let lastSegment = currentURL.substring(currentURL.lastIndexOf("/") + 1);
const email = sessionData.email;
console.log(email);
console.log(lastSegment);
lastSegment = lastSegment.split(".")[0];
console.log(lastSegment);

const nextButton = document.getElementById("nextButton");
const backButton = document.getElementById("backButton");

nextButton.addEventListener("click", () => {
  const linkText = document.getElementsByClassName("active");
  console.log(linkText);
  linkText[0].innerHTML = "User Details";
});

backButton.addEventListener("click", () => {
  const linkText = document.getElementsByClassName("active");
  console.log(linkText);
  linkText[0].innerHTML = "Calendar";
});
// Links
const eventContainersLink = "eventContainers.php";
const scheduleLink = "schedule.php";
const calendarLink = "calendar.php";
const profileLink = "facilitator_profile.php";

// Array of navbar links for each page
const pageLinks = {
  eventContainers: [
    { label: "Events", href: eventContainersLink, active: true },
    { label: "Scheduled", href: scheduleLink },
    { label: "Profile", href: profileLink },
  ],
  schedule: [
    { label: "Events", href: eventContainersLink },
    { label: "Scheduled", href: scheduleLink, active: true },
    { label: "Profile", href: profileLink },
  ],
  facilitator_profile: [
    { label: "Events", href: eventContainersLink },
    { label: "Scheduled", href: scheduleLink },
    { label: "Profile", href: profileLink, active: true },
  ],
  calendar: [
    { label: "Events", href: eventContainersLink },
    { label: "Calendar", href: calendarLink, active: true },
  ],
  // Add more pages and links as needed
};

// Function to create navbar links dynamically based on current page
function createNavbar(page) {
  const navbar = document.getElementById("myNavbar");
  const linkDiv = document.createElement("div");

  navbar.innerHTML = ""; // Clear existing navbar links
  linkDiv.setAttribute("id", "linkDiv");

  // Get the array of links for the current page
  const links = pageLinks[page];

  // Loop through the links array and create anchor elements
  links.forEach((link, index) => {
    const a = document.createElement("a");
    a.href = link.href;
    a.textContent = link.label;
    if (link.active) {
      a.classList.add("active"); // Add active class to the active link
    }

    linkDiv.appendChild(a);
    navbar.appendChild(linkDiv);

    if (index != links.length - 1) {
      const divider = document.createElement("span");
      divider.textContent = " | ";
      linkDiv.appendChild(divider);
    }
  });

  const accountDiv = document.createElement("div");
  const accountSpan = document.createElement("span");
  const logout = document.createElement("a");
  const logoutImg = document.createElement("img");

  accountDiv.setAttribute("id", "accountDiv");
  accountSpan.setAttribute("id", "accountSpan");
  accountSpan.textContent = `Account: ${email}`;
  logoutImg.setAttribute("id", "logOutLogo");
  logout.href = "../../../includes/logout.php";
  logoutImg.src = "img/logout.png";

  logout.appendChild(logoutImg);
  accountDiv.appendChild(accountSpan);
  accountDiv.appendChild(logout);
  navbar.appendChild(accountDiv);
}

// Call the createNavbar function with the appropriate page name
// Replace "home" with the current page name dynamically
createNavbar(lastSegment);

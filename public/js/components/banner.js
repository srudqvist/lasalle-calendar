class Banner extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const customText =
      this.getAttribute("custom-text") || "Default Banner Text";
    const label = this.getAttribute("label");
    let isEventOrSchedule = false;
    let eventLabel;
    let scheduleLabel;
    let eventLink;
    let scheduleLink;

    await new Promise((resolve) => {
      document.addEventListener("DOMContentLoaded", function () {
        // Your code here
        const currentURL = window.location.href;
        const queryString = window.location.search;
        const queryParams = new URLSearchParams(queryString);
        const parameterValue = queryParams.get("parameterName");

        console.log("Full URL:", currentURL);
        console.log("Query String:", queryString);
        console.log("Query Parameters:", queryParams);
        console.log('Value of "parameterName":', parameterValue);

        const lastSegment = currentURL.substring(
          currentURL.lastIndexOf("/") + 1,
        );
        console.log(typeof lastSegment);
        if (
          lastSegment == "schedule.php" ||
          lastSegment == "eventContainers.php"
        ) {
          [eventLabel, scheduleLabel] = customText.split("|");
          console.log(
            `Event label: ${eventLabel.trim()} \nSchedule label: ${scheduleLabel.trim()}`,
          );
          isEventOrSchedule = true;
          if (lastSegment == "schedule.php") {
            scheduleLink = `<a class="custom-link active" href="schedule.php">
                ${scheduleLabel}
              </a>`;
            eventLink = `<a class="custom-link" href="eventContainers.php">
                ${eventLabel}
              </a>`;
          } else {
            console.log("changed isEventOrSchedule", isEventOrSchedule);
            eventLink = `<a class="custom-link active" href="eventContainers.php">
                ${eventLabel}
              </a>`;
            scheduleLink = `<a class="custom-link" href="schedule.php">
                ${scheduleLabel}
              </a>`;
          }
        }
        resolve();
      });
    });

    this.innerHTML = `
      <style>
        banner {
          height: 60px;
          padding: 0 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          // background-color: #74873b;
          background-color: #96AE4D;
          color: #fff; 
        }
        #logOutLogo {
          height: 2rem;
          width: 2rem;
          margin-top: 5px;
          margin-left: 5px;
        }
        #accountDiv {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        a.custom-link {
          display: inline-block;
          font-weight: bold;
          color: gray; 
          text-decoration: none;
          padding: 5px 10px; 
        }

        a.custom-link:hover {
          cursor: pointer;
          color: whitesmoke; 
        }
        a.active {
          color: white
        }

      </style>
      <banner>
        ${
          isEventOrSchedule
            ? `

        <h3 id="bannerText">${eventLink} | ${scheduleLink}</h3>
        `
            : `<h3 id="bannerText">${customText}</h3>`
        }
        ${
          label
            ? `<div id="accountDiv">
        <span>Account: ${label}</span>

        <a href="../../../includes/logout.php">
          <img id="logOutLogo" src="img/logout.png" alt="log out logo">
        </a>
        </div>`
            : ""
        }
      </banner>
    `;
  }
}

customElements.define("banner-component", Banner);

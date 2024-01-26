class Banner extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		const customText =
			this.getAttribute("custom-text") || "Default Banner Text";

		this.innerHTML = `
      <style>
        banner {
          height: 60px;
          padding: 0 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #4CAF50; /* Green background color */
          color: #fff; /* White text color */
        }

        p {
          margin: 0;
        }
      </style>
      <banner>
        <p>${customText}</p>
      </banner>
    `;
	}
}

customElements.define("banner-component", Banner);

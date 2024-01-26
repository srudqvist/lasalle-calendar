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
          background-color: #74873b;
          color: #fff; /* White text color */
        }

      </style>
      <banner>
        <h3 id="bannerText">${customText}</h3>
      </banner>
    `;
	}
}

customElements.define("banner-component", Banner);

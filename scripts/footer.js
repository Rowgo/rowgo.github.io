// Copyright (C) Rogan Johnston 2025 all rights reserved

class Footer extends HTMLElement {
    connectedCallback(){
        this.innerHTML = `
            <p class="wide-container no-margin-block"> &copy 2025 Rogan Johnston | All Rights Reserved </p>
        `
    }
}

customElements.define("site-footer", Footer, {extends: "footer"});
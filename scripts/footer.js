// Copyright (C) Rogan Johnston 2025 all rights reserved

class Footer extends HTMLElement {
    connectedCallback(){
        this.innerHTML = `
            <p class="wide-container"> &copy 2025 Rogan Johnston | All Rights Reserved </p>
        `
        this.classList.add('flex')
    }
}

customElements.define("site-footer", Footer, {extends: "footer"});
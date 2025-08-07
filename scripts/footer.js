// Copyright (C) Rogan Johnston 2025 all rights reserved

class Footer extends HTMLElement {
    connectedCallback(){
        this.innerHTML = `
            <div class="wide-container"> 
                    <p class="item-left center-v">&copy 2025 Rogan Johnston | All Rights Reserved</p>               
                    <a class="item-right inline-link margin-h" href="https://www.youtube.com/@roganjohnston" target="_blank" rel="noopener noreferrer">
                        <svg class="border-circle icon-small"><use href="/media/sprites/socials-icons.svg#icon-youtube"/></svg>
                    </a>
                    <a class="inline-link margin-h" href="https://www.twitch.tv/rowgabear" target="_blank" rel="noopener noreferrer">
                        <svg class="border-circle icon-small"><use href="/media/sprites/socials-icons.svg#icon-twitch"/></svg>
                    </a>
                    <a class="inline-link margin-h" href="https://www.linkedin.com/in/roganjohnston/" target="_blank" rel="noopener noreferrer">
                        <svg class="border-circle icon-small"><use href="/media/sprites/socials-icons.svg#icon-linkedin"/></svg>
                    </a>
            </div>
        `
        this.classList.add('flex')
    }
}

customElements.define("site-footer", Footer, {extends: "footer"});
// Copyright (C) Rogan Johnston 2025 all rights reserved

class SiteHeader extends HTMLElement {
    constructor(){
        super();

        this._eventHandler = this.onMediaEvent.bind(this);
    }
    connectedCallback(){
        this.innerHTML = `
            <div class="wide-container flex-column">
                <h1 style="color: var(--colour-content)">Rogan Johnston</h1>
                <nav>
                    <ul class="flex">
                        <li><a href="/">My Work</a></li>
                        <li><a href="/about.html">About</a></li>
                        <li><a href="/contact.html">Contact</a></li>
                    </ul>
                </nav>
            </div>
        `;
        this.classList.add("flex");

        this.highlightCurrentPage();

        this.mediaMatch = window.matchMedia("(min-width: 800px)");
        this.mediaMatch.addEventListener("change", this._eventHandler);
        this._eventHandler(this.mediaMatch);
    }

    highlightCurrentPage(){
        const currentUrl = window.location.pathname;
        const navAnchors = this.querySelectorAll('.nav-item a');
        
        navAnchors.forEach(anchor => {
            const ancorUrl = anchor.pathname;
        
            if (currentUrl === ancorUrl) {
                anchor.classList.add('active');
            }
        });
    }

    onMediaEvent(event){
        const wrapper = this.querySelector('div');
        if (event.matches) {
            wrapper.classList.remove('flex-column');
            wrapper.classList.add('flex-space-between');
        }
        else {
            wrapper.classList.remove('flex-space-between');
            wrapper.classList.add('flex-column');
        }
    }
}

customElements.define('site-header', SiteHeader, {extends: 'header'});

/* 
TODO:
    - when the window becomes small enough change the nav menu to a drop down and center it underneath the title of the website.
    - add a link to the landing page on to the title of the website. This will increase the likely hood people will be able to navigate back.
*/
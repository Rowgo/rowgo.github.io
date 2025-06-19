// Copyright (C) Rogan Johnston 2025 all rights reserved

class SiteHeader extends HTMLElement {
    connectedCallback(){
        this.innerHTML = `
            <div class="flex-space-around" style="border-bottom: var(--line-thickness) solid var(--colour-content);">
                <div>
                    <h1 style=" color: var(--colour-content)">Rogan Johnston</h1>
                </div>
                <div>
                    <nav>
                        <ul class="horizontal-nav">
                            <li class="nav-item"><a href="/">My Work</a></li>
                            <li class="nav-item"><a href="/about.html">About</a></li>
                            <li class="nav-item"><a href="/contact.html">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        `;
        this.highlightCurrentPage();
    }

    highlightCurrentPage() {
        const currentUrl = window.location.pathname;
        const navAncors = this.querySelectorAll('.nav-item a');
        
        console.log(currentUrl)
        
        navAncors.forEach(ancor => {
            const ancorUrl = ancor.pathname;
            console.log(ancorUrl)
        
            if (currentUrl === ancorUrl) {
                ancor.classList.add('active');
            }
        });
    }
}

customElements.define('site-header', SiteHeader, {extends: 'header'})

/* 
constructor()	When element is created	Initialize shadow DOM, set defaults
connectedCallback()	Added to DOM	Render content, fetch data
disconnectedCallback()	Removed from DOM	Cleanup event listeners
attributeChangedCallback()	Observed attributes change	Update DOM when attributes change
*/
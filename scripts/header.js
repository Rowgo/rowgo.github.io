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
        const navAnchors = this.querySelectorAll('.nav-item a');
        
        navAnchors.forEach(anchor => {
            const ancorUrl = anchor.pathname;
        
            if (currentUrl === ancorUrl) {
                anchor.classList.add('active');
            }
        });
    }
}

customElements.define('site-header', SiteHeader, {extends: 'header'});

/* 
TODO:
    - when the window becomes small enough change the nav menu to a drop down and center it underneath the title of the website.
    - add a link to the landing page on to the title of the website. This will increase the likely hood people will be able to navigate back.
*/
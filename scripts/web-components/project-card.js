// Copyright (C) Rogan Johnston 2025 all rights reserved

class ProjectCard extends HTMLElement {
    connectedCallback(){
        const link = this.getAttribute("href");
        const imgSrc = this.getAttribute("img-src") || "/media/ProjectCard-Placeholder.jpg";

        this.innerHTML = `
            <div class = "grid-item">
                <a href="${link}">
                    <img src="${imgSrc}" alt="Project Card">
                    ${this.textContent.trim()}
                </a>
            </div>
        `;
    }
}

customElements.define("project-card", ProjectCard)

/* 
constructor()	When element is created	Initialize shadow DOM, set defaults
connectedCallback()	Added to DOM	Render content, fetch data
disconnectedCallback()	Removed from DOM	Cleanup event listeners
attributeChangedCallback()	Observed attributes change	Update DOM when attributes change
*/
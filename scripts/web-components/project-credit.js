// Copyright (C) Rogan Johnston 2025 all rights reserved

class ProjectCredit extends HTMLElement {
    connectedCallback(){
        const href = this.getAttribute("href") || "#";
        const imgSrc = this.getAttribute("img-src") || "/media/ProjectCard-Placeholder.jpg";
        const name = this.getAttribute("name") || "name";
        const role = this.getAttribute("role") || "role";

        this.innerHTML = `
            <div class= "grid-item">
                <a href="${href}">
                    <img style= "border-radius: 50%;" src="${imgSrc}" alt="Collaberator Image">
                    ${name}
                    <br>
                    ${role}
                </a>
            </div>
        `
    }
}

customElements.define('project-credit', ProjectCredit)
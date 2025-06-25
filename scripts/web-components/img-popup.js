class ImgPopup extends HTMLElement {
    connectedCallback(){
        this.innerHTML = `
            <div class="popup" id="popup">
                <div class="popup-content">
                    <span class="popup-close-btn" id="popup-close-btn">&times;</span>
                    <img src="" alt="" id="popup-image">
                </div>
            </div>
        `;
        this.bindPopups();
    }

    bindPopups(){
        const popup = this.querySelector("#popup");
        const popupImage = this.querySelector("#popup-image");
        const closePopup = this.querySelector("#popup-close-btn");
        const images = document.querySelectorAll(".popup-able"); /* you need to use popup-styles.css for the popups to look correct. */

        images.forEach((image) => {
            image.onclick = function() {
                popup.style.display = "flex";
                document.body.style.overflow = "hidden"; // Prevent scrolling
                popupImage.src = this.src;
                popupImage.alt = this.alt;
            }
        });
        closePopup.onclick = function() {
            popup.style.display = "none";
            document.body.style.overflow = "auto"; // Allow scrolling again
            popupImage.src = "";
            popupImage.alt = "";
        }
        popup.onclick = function(e) {
            if (e.target == popup) {
                popup.style.display = "none";
                document.body.style.overflow = "auto"; // Allow scrolling again
                popupImage.src = "";
                popupImage.alt = "";
            }
        }
    }
}

customElements.define('popup-container', ImgPopup)
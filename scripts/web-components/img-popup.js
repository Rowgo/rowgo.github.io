
const componentStyles = new CSSStyleSheet();
componentStyles.replaceSync(
    ` 
        .popup{
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            background-color: rgba(0, 0, 0, 0.8);
            justify-content: center;
            align-items: flex-start; /* prevents the popup from going off the top of the screen */
            overflow: auto; /* allows scrolling */
        }
        .popup-close-btn{
            position: absolute;
            top: 10px;
            right: 10px;
            color: var(--colour-background);
            font-size: 32px;
            cursor: pointer;
            width: 50px; /* keeps the box in a 1/1 aspect ratio meaning the margin looks right*/
            height: 50px;
        }
        .popup-close-btn:hover{
            color: var(--colour-accent);
        }
        /*  todo: remove popups for mobile or make them take up the whole screen and close 
            when the user presses anywhere on the screen */
        .popup-content{
            display: flex;
            position: relative;
            max-width: 90%;
        }
        .popup-able{
            box-sizing: border-box;
            border: var(--colour-content) solid var(--line-thickness);
        }
    `
);

document.adoptedStyleSheets = [
    ...document.adoptedStyleSheets,
    componentStyles
];

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
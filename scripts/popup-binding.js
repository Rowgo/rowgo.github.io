function bindPopups(){
    const popup = document.getElementById("popup");
    const popupImage = document.getElementById("popup-image");
    const closePopup = document.getElementById("popup-close-btn");
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
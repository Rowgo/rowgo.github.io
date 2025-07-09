class imageLink extends HTMLElement {
    connectedCallback() {
        const wrapper = document.createElement("div")
        const anchor = document.createElement("a")

        wrapper.appendChild(anchor);
    }
}
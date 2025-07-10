// Copyright (C) Rogan Johnston 2025 all rights reserved
const template = document.createElement('template');
template.innerHTML = `
    <div id="twitch-player"></div>
    <div id="twitch-chat"></div>
`;

class TwitchEmbed extends HTMLElement {
    constructor(){
        super();
        this.appendChild(template.content.cloneNode(true));
    }
    
    connectedCallback(){
        this.channel = this.getAttribute("channel") || "rowgabear";
        this.parent = this.getAttribute("parent") || "roganjohnston.com";

        const script = document.createElement("script");
        script.src = "https://player.twitch.tv/js/embed/v1.js";
        script.onload = () => this.initPlayer();
        document.head.appendChild(script);
        
        this.initChat();

        const style = document.createElement("link");
        style.rel = "stylesheet";
        style.href = "/css/twitch-style.css";
        document.head.appendChild(style);

        this.styleElements();
    }

    initPlayer(){
        const options = {
            width: "100%",
            height: "100%",
            channel: this.channel,
            parent: this.parent,
        };
        const player = new Twitch.Player("twitch-player", options);
        player.setVolume(0.5);
        player.addEventListener(Twitch.Player.ONLINE, function() {
            console.log("Playing");
            document.getElementById("twitch-player").style.borderColor = "var(--colour-accent)";
            document.getElementById("twitch-chat").style.borderColor = "var(--colour-accent)";
        });
        player.addEventListener(Twitch.Player.OFFLINE, function() {
            console.log("Offline");
            document.getElementById("twitch-player").style.borderColor = "var(--colour-content)";
            document.getElementById("twitch-chat").style.borderColor = "var(--colour-content)";
        });
    }

    initChat(){
        const chat = document.getElementById("twitch-chat");
        chat.innerHTML = `
            <iframe
            src="https://www.twitch.tv/embed/${this.channel}/chat?parent=${this.parent}"
            frameborder="0"
            height="100%"
            width="100%">
            </iframe>
        `;
    }

    styleElements(){
        const playerElement = document.getElementById("twitch-player");
        playerElement.classList.add("twitch-player");
        const chatElement = document.getElementById("twitch-chat");
        chatElement.classList.add("twitch-chat");
    }
}

customElements.define("twitch-embed", TwitchEmbed)
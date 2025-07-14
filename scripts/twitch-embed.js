// Copyright (C) Rogan Johnston 2025 all rights reserved
const componentStyles = new CSSStyleSheet();
componentStyles.replaceSync(
    ` 
        twitch-embed{
            display : flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }
        .twitch-player{
            border: var(--line-thickness) solid var(--colour-content);
            width: 100%;
            max-width: 720px;
            min-width: 400px;  
            height: auto;
            max-height: 480px;
            min-height: 300px;
            aspect-ratio: 3/2;
        }
        .twitch-chat{
            border: var(--line-thickness) solid var(--colour-content);
            border-left: 0px;
            width: 350px;
            height: 480px;
        }
        @media screen and (max-width: 1200px) {
            twitch-embed{
                flex-direction: column;
            }
            .twitch-chat{
                max-width: 720px;
                width: 100%;
                height: 300px;
                border: var(--line-thickness) solid var(--colour-accent);
                border-top: 0px;
            }
        }
    `
);

document.adoptedStyleSheets = [
    ...document.adoptedStyleSheets,
    componentStyles
];

const template = document.createElement('template');
template.innerHTML = `
    <div class="twitch-player" id="twitch-player"></div>
    <div class="twitch-chat" id="twitch-chat"></div>
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
}

customElements.define("twitch-embed", TwitchEmbed)
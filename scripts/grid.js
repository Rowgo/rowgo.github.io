// Copyright (C) Rogan Johnston 2025 all rights reserved
const componentStyles = new CSSStyleSheet();
componentStyles.replaceSync(
    ` 
        centered-grid{
           display: grid;
           grid-template-columns: repeat(3, minmax(200px, 1fr));
           justify-content: center;
           justify-items: center;
        }
        .small-grid{
            grid-template-columns: repeat(2, minmax(200px, 1fr)); 
        }
    `
);

document.adoptedStyleSheets = [
    ...document.adoptedStyleSheets,
    componentStyles
];

class Grid extends HTMLElement {
    // made this web component just so I could get the last row on my grids centered
    constructor(){
        super();
        this._eventHandler = this.onMediaEvent.bind(this); // this line ensures that when the function uses 'this' as a keyword it referes to the web component class and not the event.
    }

    connectedCallback(){
        this.mediaMatch = window.matchMedia("(max-width: 800px)");
        this.mediaMatch.addEventListener("change", this._eventHandler);
        this._eventHandler(this.mediaMatch);
    }

    onMediaEvent(event){
        //
        this.classList.remove('small-grid');
        this.removeCenteredStyles();

        if (event.matches) {
            this.classList.add('small-grid');
        }
        this.centerLastRow();
    }

    removeCenteredStyles(){
        const gridItems = this.children;
        for (let i = 0; i < gridItems.length; i++){
            let item = gridItems[i];
            item.style.gridArea = null;
            item.style.maxWidth = null;
        }
    }

    centerLastRow(){
        const gridItems = this.children;
        const totalItems = gridItems.length;
        const computedStlye = window.getComputedStyle(this);
        const columnCount = computedStlye.gridTemplateColumns.split(' ').length;
        const remainingItems = totalItems % columnCount;
 
        if (remainingItems === 0) {
            return;
        }
        // style the remaining items
        for (let i = 0; i < remainingItems; i++) {
            const span = columnCount / remainingItems; // divide the rows columns by the remaining items to find how many columns each items needs to span
            const columnStart = 1 + Math.floor(span * i); // mutiply the span variable by i to find where in the row the new column should start. floor it to round the value to the closest left most line. add 1 because css starts the span at 1
            const columnEnd = 1 + Math.ceil(span * (i + 1)); // multiply span by i + 1 to find start + span. round to the rightmost line with ceiling, and add 1 because css starts the span at 1.

            const row = Math.ceil(gridItems.length / columnCount)

            const columnWidth = 100 / (columnEnd - columnStart); // the width of the parent is actually the width of the span that the item is in not the row width.

            const item = gridItems[gridItems.length - remainingItems + i];
            item.style.gridArea = `${row} / ${columnStart} / auto / ${columnEnd}`;
            item.style.maxWidth = `${columnWidth}%`; // this is so that all the items stay the same size on the grid.
        }
    }

    disconnectedCallback(){
        this.mediaMatch.removeEventListener("change", this._eventHandler);
    }
}

customElements.define('centered-grid', Grid);
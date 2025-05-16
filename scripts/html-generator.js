/* Copyright (C) Rogan Johnston 2025 all rights reserved. */

// utility function that allows you to take a html structure and make it reusable by populating it with data on a case by case basis
function populateString({htmlString, keys}){
    let populatedString = htmlString;
    for (const key in keys) {
        const placeholder = `{{${key}}}`;
        populatedString = populatedString.replaceAll(placeholder, keys[key]);
    }
    return populatedString;
}

// This can be used to find an element and populate it with a template for things like headers, footers, and other html components.
function populateElement({elementId, filePath, data = null}){
    fetch(filePath)
    .then(response => response.text())
    .then(templateText => {
        const container = document.getElementById(elementId);
        if (!container) {
            console.error(`Container with ID ${elementId} not found.`);
            return;
        }
        if (data != null) {
            templateText = populateString({htmlString: templateText, keys: data});
        }
        container.innerHTML = templateText;
    })
}

// This can be used to find an element and populate it a list of templates for things like tables, lists, and other html components.
function populateGrid({elementId, filePath, gridItems}){
    container = document.getElementById(elementId)
    
    if (!container) {
        console.error(`Container with ID ${elementId} not found.`);
        return;
    }

    fetch(filePath)
    .then(response => response.text())
    .then(templateText => {
        gridItems.forEach(item => {
            const populatedString = populateString({htmlString: templateText, keys: item});
            container.innerHTML += populatedString;
        });
    })
    .catch(error => console.error(`Error fetching "${filePath}":`, error));
}
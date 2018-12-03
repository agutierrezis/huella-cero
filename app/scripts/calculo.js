"use strict";
//import { SOURCE_TYPES } from './source-types';

const SOURCE_TYPES = [
    {
        "key": "gas",
        "value": "Gasolina"
    },
    {
        "key": "die",
        "value": "Diésel"
    },
    {
        "key": "ref",
        "value": "Refrigerantes"
    }
];

(function() {
    let sourceCount = 0;
    document.getElementById("addSourceBtn").addEventListener("click", function(event) {
        event.preventDefault();
        sourceCount += 1;
        addSource(sourceCount);
    });
}());

function addSource(sourceNumber) {
    const sources = document.getElementById("fuentes");
    const newChild = document.createElement("div");
    newChild.setAttribute("id", 'fuente' + sourceNumber);

    const sourceTypeSelect = document.createElement("select");
    sourceTypeSelect.setAttribute("id", 'select' + sourceNumber);
    newChild.appendChild(sourceTypeSelect);

    //Create and append the options
    for (var i = 0; i < SOURCE_TYPES.length; i++) {
        let option = document.createElement("option");
        option.setAttribute("value", SOURCE_TYPES[i].key);
        option.text = SOURCE_TYPES[i].value;
        sourceTypeSelect.appendChild(option);
    }

    sources.appendChild(newChild);
}

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
    },
    {
        "key": "ext",
        "value": "Extintores"
    },
    {
        "key": "gas",
        "value": "Gas LP"
    },
    {
        "key": "tse",
        "value": "Tanque séptico"
    },
    {
        "key": "ele",
        "value": "Electricidad"
    }
];

(function() {
    let sourceCount = 0;
    document.getElementById("addSourceBtn").addEventListener("click", function(event) {
        event.preventDefault();
        sourceCount += 1;
        addSource(sourceCount);
    });
    document.getElementById("calculateBtn").addEventListener("click", function(event) {
        event.preventDefault();
        getData();
    });
}());

function addSource(sourceNumber) {
    const sources = document.getElementById('fuentes');
    const newChild = document.createElement('div');
    newChild.setAttribute('id', 'fuente' + sourceNumber);
    newChild.setAttribute('class', 'fuente jumbotron');

    // Create Source Type dropdown
    const sourceTypeLabel = document.createElement('label');
    sourceTypeLabel.setAttribute('for', 'tipoFuente' + sourceNumber);
    sourceTypeLabel.innerHTML = 'Tipo de Fuente:';
    newChild.appendChild(sourceTypeLabel);

    const sourceTypeSelect = document.createElement('select');
    sourceTypeSelect.setAttribute('id', 'tipoFuente' + sourceNumber);
    sourceTypeSelect.setAttribute('class', 'form-control tipo-fuente');
    newChild.appendChild(sourceTypeSelect);

    for (var i = 0; i < SOURCE_TYPES.length; i++) {
        let option = document.createElement('option');
        option.setAttribute('value', SOURCE_TYPES[i].key);
        option.text = SOURCE_TYPES[i].value;
        sourceTypeSelect.appendChild(option);
    }

    // Create Source total Value
    const sourceTotalValueLabel = document.createElement('label');
    sourceTotalValueLabel.setAttribute('for', 'valorTotalFuente' + sourceNumber);
    sourceTotalValueLabel.innerHTML = 'Valor total de la fuente:';
    newChild.appendChild(sourceTotalValueLabel);

    const sourceTotalValue = document.createElement('input');
    sourceTotalValue.setAttribute('id', 'valorTotalFuente' + sourceNumber);
    sourceTotalValue.setAttribute('class', 'form-control valor-fuente');
    newChild.appendChild(sourceTotalValue);

    // Create Source uncertainty percentage
    const sourceUncertaintyLabel = document.createElement('label');
    sourceUncertaintyLabel.setAttribute('for', 'incertidumbreFuente' + sourceNumber);
    sourceUncertaintyLabel.innerHTML = 'Porcentaje (%) de incertidumbre de los datos:';
    newChild.appendChild(sourceUncertaintyLabel);

    const sourceUncertainty = document.createElement('input');
    sourceUncertainty.setAttribute('id', 'incertidumbreFuente' + sourceNumber);
    sourceUncertainty.setAttribute('class', 'form-control incertidumbre-fuente');
    newChild.appendChild(sourceUncertainty);

    sources.appendChild(newChild);
}

function getData() {
    let result = [];
    const sourcesList = document.getElementsByClassName('fuente');

    for(var i = 0; i < sourcesList.length; i++) {
        const sourceItem = sourcesList.item(i);
        const tipoFuente = sourceItem.getElementsByClassName('tipo-fuente')[0].value;
        const valorFuente = sourceItem.getElementsByClassName('valor-fuente')[0].value;
        const incertidumbreFuente = sourceItem.getElementsByClassName('incertidumbre-fuente')[0].value;
        result.push({
            'fuente': tipoFuente,
            'valor': valorFuente,
            'Incertidumbre': incertidumbreFuente
        });
    }

    console.log(JSON.stringify(result));

    return result;
}

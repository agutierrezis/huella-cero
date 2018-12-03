"use strict";
//import { SOURCE_TYPES } from './source-types';

const GEI_SOURCES = [
    {
        "key": "CO2",
        "value": "Dióxido de Carbono"
    },
    {
        "key": "O2",
        "value": "Vapor de agua"
    },
    {
        "key": "CH4",
        "value": "Metano"
    },
    {
        "key": "NO",
        "value": "Óxido de Nitrógeno"
    },
    {
        "key": "03",
        "value": "Ozono"
    }
]


const SOURCE_TYPES = [
    {
        "key": "gas",
        "value": "Gasolina",
        "category": "CO2"
    },
    {
        "key": "die",
        "value": "Diésel",
        "category": "CO2"
    },
    {
        "key": "ref",
        "value": "Refrigerantes",
        "category": "CH4"
    },
    {
        "key": "ext",
        "value": "Extintores",
        "category": "NO"
    },
    {
        "key": "gasLP",
        "value": "Gas LP",
        "category": "CO2"
    },
    {
        "key": "tse",
        "value": "Tanque séptico",
        "category": "CH4"
    },
    {
        "key": "ele",
        "value": "Electricidad",
        "category": "CO2"
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
    sourceTotalValueLabel.innerHTML = 'Valor Total de la Fuente:';
    newChild.appendChild(sourceTotalValueLabel);

    const sourceTotalValue = document.createElement('input');
    sourceTotalValue.setAttribute('id', 'valorTotalFuente' + sourceNumber);
    sourceTotalValue.setAttribute('class', 'form-control valor-fuente');
    newChild.appendChild(sourceTotalValue);

    // Create Source uncertainty percentage
    const sourceUncertaintyLabel = document.createElement('label');
    sourceUncertaintyLabel.setAttribute('for', 'incertidumbreFuente' + sourceNumber);
    sourceUncertaintyLabel.innerHTML = 'Porcentaje (%) de Incertidumbre de los Datos:';
    newChild.appendChild(sourceUncertaintyLabel);

    const sourceUncertainty = document.createElement('input');
    sourceUncertainty.setAttribute('id', 'incertidumbreFuente' + sourceNumber);
    sourceUncertainty.setAttribute('class', 'form-control incertidumbre-fuente');
    newChild.appendChild(sourceUncertainty);

    sources.appendChild(newChild);
}

function getData() {
    const uncertaintyData = []
    const sourcesList = document.getElementsByClassName('fuente');

    for(var i = 0; i < sourcesList.length; i++) {
        const sourceItem = sourcesList.item(i);
        const tipoFuente = sourceItem.getElementsByClassName('tipo-fuente')[0].value;
        const tipoFuenteIndex = sourceItem.getElementsByClassName('tipo-fuente')[0].selectedIndex;
        const valorFuente = sourceItem.getElementsByClassName('valor-fuente')[0].value;
        const incertidumbreFuente = sourceItem.getElementsByClassName('incertidumbre-fuente')[0].value;
        uncertaintyData.push({
            'fuente': tipoFuente,
            'fuenteIndex': tipoFuenteIndex, 
            'valor': valorFuente,
            'incertidumbre': incertidumbreFuente
        });
    }

    // Calculo de Incertidumbre
    for (var fuente of uncertaintyData) {
        fuente["valorIncertidumbre"] = (parseInt(fuente.valor) * (parseInt(fuente.incertidumbre) / 100))
    }

    // Sumatoria
    let summatory = 0
    for (var fuente of uncertaintyData) {
        summatory += fuente.valorIncertidumbre
    }

    const $resultsContainer = $('.results-container')
    const $resultsTableBody = $('.results-table__body')
    const $sumatoriaLabel = $('.sumatoria')

    let tableBody = ""
    for (var fuente of uncertaintyData) {
        tableBody +=
        '<tr>' +
            '<th>' + SOURCE_TYPES[fuente.fuenteIndex].value + '</th>' +
            '<th>' + fuente.valor + '</th>' +
            '<th>' + fuente.incertidumbre + '</th>' +
            '<th>' + fuente.valorIncertidumbre + '</th>' +
        '</tr>'
    }

    $resultsContainer.show()
    $resultsTableBody.empty()
    $resultsTableBody.append(tableBody)
    $sumatoriaLabel.empty()
    $sumatoriaLabel.append(summatory)

    console.warn('uncertaintyData:', JSON.stringify(uncertaintyData))
    console.warn('summatory:', summatory)

    showChart(uncertaintyData)
}

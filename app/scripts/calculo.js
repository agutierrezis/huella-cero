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
    const table = $('#sourceTable');
    const rows = table.children();
    const lastRow = rows[rows.length - 2];
    const incertidumbre = $('#incertidumbre').val() || 0;
    const valor = $('#valor').val() || 0;
    const sourceOption = $($('#sourceOption :selected')[0]).text();
    $('<tr><th>' + sourceOption + '</th><td>' + incertidumbre + '</td><td>' + valor + '</td></tr>').insertBefore(lastRow);

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
}

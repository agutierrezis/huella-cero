
    /*var nov12 = [4.2281, 3.4164, 2.2585, 1.2034, 0.5189, 0.2090, 0.1079]
    var oct29 = [3.7140, 2.5772, 1.3904, 0.6071, 0.2535, 0.1219, 0.0768]
    var oct17 = [3.4484, 2.1918, 1.0272, 0.4067, 0.1774, 0.0940, 0.0642]
    var negativeControl = [0.05576666667, 0.05576666667, 0.05576666667, 0.05576666667, 0.05576666667, 0.05576666667, 0.05576666667]
    
    Highcharts.chart('result', {
        legend:{
            align: 'right',
            verticalAlign: 'middle',
            layout: 'vertical'
        },
        title: {
            text: 'Dilución del suero'
        },
        xAxis: {
            categories: ['1/500', '1/1,500', '1/4,500', '1/13,500', '1/40,500', '1/121,500', '1/364,500'],
            title: {
                text: 'Dilución del suero',
                useHTML: true
            }
        },
        yAxis: {
            labels: { 
                format: '{value:.2f}' 
            },
            title: {
                text: 'Absorbancia'
            },
            tickInterval: 0.5
        },
        plotOptions: {
            series: {
                marker: {
                    radius: 6
                }
            }
        },
        series: [{
            type: 'line',
            name: '12 de noviembre',
            data: nov12
        }, {
            type: 'line',
            name: '29 de octubre',
            data: oct29
        }, {
            type: 'line',
            name: '17 de octubre',
            data: oct17
        }, {
            type: 'line',
            name: 'Control Negativo',
            data: negativeControl
        }]
    })*/

/*var colors = Highcharts.getOptions().colors,
categories = [
    "Fuente A",
    "Fuente B",
    "Fuente C",
    "Fuente D",
    "Fuente E"
],
data = [
    {
        "y": 62.74,
        "color": colors[2],
        "drilldown": {
            "name": "Fuente A",
            "categories": [
                "Chrome v65.0",
                "Chrome v64.0",
                "Chrome v63.0",
                "Chrome v62.0",
                "Chrome v61.0",
                "Chrome v60.0",
                "Chrome v59.0",
                "Chrome v58.0",
                "Chrome v57.0",
                "Chrome v56.0",
                "Chrome v55.0",
                "Chrome v54.0",
                "Chrome v51.0",
                "Chrome v49.0",
                "Chrome v48.0",
                "Chrome v47.0",
                "Chrome v43.0",
                "Chrome v29.0"
            ],
            "data": [
                0.1,
                1.3,
                53.02,
                1.4,
                0.88,
                0.56,
                0.45,
                0.49,
                0.32,
                0.29,
                0.79,
                0.18,
                0.13,
                2.16,
                0.13,
                0.11,
                0.17,
                0.26
            ]
        }
    },
    {
        "y": 10.57,
        "color": colors[1],
        "drilldown": {
            "name": "Fuente B",
            "categories": [
                "Firefox v58.0",
                "Firefox v57.0",
                "Firefox v56.0",
                "Firefox v55.0",
                "Firefox v54.0",
                "Firefox v52.0",
                "Firefox v51.0",
                "Firefox v50.0",
                "Firefox v48.0",
                "Firefox v47.0"
            ],
            "data": [
                1.02,
                7.36,
                0.35,
                0.11,
                0.1,
                0.95,
                0.15,
                0.1,
                0.31,
                0.12
            ]
        }
    },
    {
        "y": 7.23,
        "color": colors[0],
        "drilldown": {
            "name": "Fuente C",
            "categories": [
                "Internet Explorer v11.0",
                "Internet Explorer v10.0",
                "Internet Explorer v9.0",
                "Internet Explorer v8.0"
            ],
            "data": [
                6.2,
                0.29,
                0.27,
                0.47
            ]
        }
    },
    {
        "y": 5.58,
        "color": colors[3],
        "drilldown": {
            "name": "Fuente D",
            "categories": [
                "Safari v11.0",
                "Safari v10.1",
                "Safari v10.0",
                "Safari v9.1",
                "Safari v9.0",
                "Safari v5.1"
            ],
            "data": [
                3.39,
                0.96,
                0.36,
                0.54,
                0.13,
                0.2
            ]
        }
    },
    {
        "y": 4.02,
        "color": colors[5],
        "drilldown": {
            "name": "Fuente E",
            "categories": [
                "Edge v16",
                "Edge v15",
                "Edge v14",
                "Edge v13"
            ],
            "data": [
                2.6,
                0.92,
                0.4,
                0.1
            ]
        }
    }
];*/

function getKeyName(key, array) {
    return array.find(function (element) {
        return element.key == key
    }).value;
}

function getCategoryObj(key, array) {
    return array.find(function (element) {
        return element.key == key
    });
}

function getCategory(key) {
    var category = SOURCE_TYPES.find(function (element) {
        return element.key == key
    }).category;
    return getCategoryObj(category, GEI_SOURCES)
}

function getTotal(array) {
    return array.map(function (element) {
        return element["valorIncertidumbre"]
    }).reduce(function(a, b) {
        return a + b;
    }, 0)
}

function showChart(uncertaintyData) {
    var colors = Highcharts.getOptions().colors;
    var categories = [];
    var uncertaintyDataGroupByCategory = {};
    uncertaintyData.forEach(function (element, index) {
        var category= getCategory(element["fuente"]);
        if (!uncertaintyDataGroupByCategory[category.key]) {
            uncertaintyDataGroupByCategory[category.key] = [];
            categories.push(category.value)
        }
        uncertaintyDataGroupByCategory[category.key].push(element);
    })

    var data = [];
    var colorIndex = 0
    for (var category in uncertaintyDataGroupByCategory) {
        data.push({
            "y": getTotal(uncertaintyDataGroupByCategory[category]),
            "color": colors[colorIndex],
            "drilldown": {
                "name": getKeyName(category, GEI_SOURCES),
                "categories": uncertaintyDataGroupByCategory[category].map(function (element, index) {
                    return getKeyName(element["fuente"], SOURCE_TYPES)
                }),
                "data": uncertaintyDataGroupByCategory[category].map(function (element, index) {
                    return element["valorIncertidumbre"]
                }),
            }
        });
        colorIndex++;
    }

    var browserData = [],
    versionsData = [],
    i,
    j,
    dataLen = data.length,
    drillDataLen,
    brightness;


    // Build the data arrays
    for (i = 0; i < dataLen; i += 1) {

        // add browser data
        browserData.push({
            name: categories[i],
            y: data[i].y,
            color: data[i].color
        });

        // add version data
        drillDataLen = data[i].drilldown.data.length;
        for (j = 0; j < drillDataLen; j += 1) {
            brightness = 0.2 - (j / drillDataLen) / 5;
            versionsData.push({
                name: data[i].drilldown.categories[j],
                y: data[i].drilldown.data[j],
                color: Highcharts.Color(data[i].color).brighten(brightness).get()
            });
        }
    }

    // Create the chart
    Highcharts.chart('result', {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Incertidumbre reportada'
        },
        subtitle: {
            text: 'Datos obtenidos'
        },
        yAxis: {
            title: {
                text: 'Total percent market share'
            }
        },
        plotOptions: {
            pie: {
                shadow: false,
                center: ['50%', '50%']
            }
        },
        tooltip: {
            valueSuffix: '%'
        },
        series: [{
            name: 'Fuente',
            data: browserData,
            size: '60%',
            dataLabels: {
                formatter: function () {
                    return this.y > 5 ? this.point.name : null;
                },
                color: '#ffffff',
                distance: -30
            }
        }, {
            name: 'Valor',
            data: versionsData,
            size: '80%',
            innerSize: '60%',
            dataLabels: {
                formatter: function () {
                    // display only if larger than 1
                    return this.y > 1 ? '<b>' + this.point.name + ':</b> ' +
                        this.y + '%' : null;
                }
            },
            id: 'versions'
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 400
                },
                chartOptions: {
                    series: [{
                        id: 'versions',
                        dataLabels: {
                            enabled: false
                        }
                    }]
                }
            }]
        }
    });
}
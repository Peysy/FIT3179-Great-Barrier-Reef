const base = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

    background: null,

    config: {
        view: {
            stroke: null
        },

        axis: {
            labelFontSize: 12,
            titleFontSize: 13,
            gridColor: '#e5eff1'
        },

        title: {
            fontSize: 17,
            color: '#073b4c'
        }
    }
};


function draw(id, spec) {

    vegaEmbed(
        '#' + id,
        {
            ...base,
            ...spec
        },
        {
            actions: false,
            renderer: 'svg'
        }
    ).catch(err => {

        console.error(id, err);

        document.getElementById(id).textContent =
            'Chart failed to load. Check Live Server and the browser console.';

    });
}


const valueTip = (field, title, fmt = ',.0f') => ({
    field: field,
    type: 'quantitative',
    title: title,
    format: fmt
});


draw('marine-zoning-map', {

            "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

            "width": 750,
            "height": 650,

            "title": {
                "text": "Great Barrier Reef Marine Park Zoning",
                "fontSize": 18
            },

            "projection": {
                "type": "mercator",
                "center": [148, -18],
                "scale": 2000,
                "translate": [430, 325]
            },

            "layer": [

                // LAYER 1: Australian coastline
                {
                    "data": {
                        "url": "https://vega.github.io/vega-datasets/data/world-110m.json",
                        "format": {
                            "type": "topojson",
                            "feature": "countries"
                        }
                    },

                    "transform": [
                        {
                            "filter": "datum.id == 36"
                        }
                    ],

                    "mark": {
                        "type": "geoshape",
                        "fill": "#E5E7EB",
                        "stroke": "#64748B",
                        "strokeWidth": 0.7
                    }
                },

                // LAYER 2: Great Barrier Reef zoning
                {
                    "data": {
                        "url": "data/Great_Barrier_Reef_Marine_Park_Zoning_vega.geojson",
                        "format": {
                            "type": "json",
                            "property": "features"
                        }
                    },

                    "mark": {
                        "type": "geoshape",
                        "stroke": "#FFFFFF",
                        "strokeWidth": 0.3
                    },

                    "encoding": {
                        "color": {
                            "field": "properties.PART_DESC",
                            "type": "nominal",
                            "title": "Marine Park Zone",

                            "scale": {
                                "scheme": "tableau10"
                            },

                            "legend": {
                                "title": "Marine Park Zone",
                                "orient": "right",
                                "labelLimit": 300
                            }
                        },

                        "tooltip": [
                            {
                                "field": "properties.PART_DESC",
                                "title": "Zone"
                            },
                            {
                                "field": "properties.NAME",
                                "title": "Zone Name"
                            },
                            {
                                "field": "properties.IUCN",
                                "title": "IUCN Category"
                            }
                        ]
                    }
                }
            ],

            "config": {
                "view": {
                    "stroke": null
                }
            }
        }
    );

draw('visitor-chart', {

    width: 690,
    height: 155,

    title: 'Visitors by origin · YE March 2026',

    data: {
        url: 'data/visitor_mix_2026.csv'
    },

    mark: {
        type: 'bar',
        cornerRadiusEnd: 5
    },

    encoding: {

        y: {
            field: 'Type',
            type: 'nominal',
            sort: '-x',
            title: null
        },

        x: {
            field: 'Visitors',
            type: 'quantitative',
            title: 'Visitors',

            axis: {
                format: '~s'
            }
        },

        color: {
            field: 'Type',
            type: 'nominal',

            scale: {
                domain: [
                    'Domestic',
                    'International'
                ],

                range: [
                    '#147d7c',
                    '#e3a451'
                ]
            },

            legend: null
        },

        tooltip: [
            {
                field: 'Type',
                title: 'Visitor type'
            },

            valueTip('Visitors', 'Visitors')
        ]
    }
});




draw('origins-chart', {

    width: 750,
    height: 350,

    title: 'International Visitors: 2025 vs 2026',

    data: {
        url: 'data/international_origins_2026.csv'
    },

    transform: [

        // Calculate estimated 2025 visitors
        {
            calculate:
                "datum.Visitors / (1 + datum.YoY_change_pct / 100)",
            as: 'Visitors_2025'
        },

        // Convert the two columns into rows
        {
            fold: ['Visitors_2025', 'Visitors'],
            as: ['Period', 'Visitor_Count']
        },

        // Assign year labels
        {
            calculate:
                "datum.Period === 'Visitors_2025' ? '2025' : '2026'",
            as: 'Year'
        }
    ],

    encoding: {

        x: {
            field: 'Year',
            type: 'ordinal',
            sort: ['2025', '2026'],
            title: 'Year',
            axis: {
                labelAngle: 0
            }
        },

        y: {
            field: 'Visitor_Count',
            type: 'quantitative',
            title: 'Number of Visitors',
            scale: {
                zero: false
            },
            axis: {
                format: '~s'
            }
        },

        color: {
            field: 'Country',
            type: 'nominal',
            title: 'Country',

            scale: {
                domain: [
                    'United States',
                    'Japan',
                    'United Kingdom',
                    'China',
                    'New Zealand',
                    'Germany',
                    'Canada'
                ],

                range: [
                    '#4477AA',  
                    '#AA66A0',  
                    '#E6A23C',  
                    '#55AACC',  
                    '#8B6BB3',  
                    '#D98A56',  
                    '#bf5f33'   
                ]
            }
        },

        detail: {
            field: 'Country',
            type: 'nominal'
        },

        tooltip: [
            {
                field: 'Country',
                type: 'nominal',
                title: 'Country'
            },
            {
                field: 'Year',
                type: 'ordinal',
                title: 'Year'
            },
            {
                field: 'Visitor_Count',
                type: 'quantitative',
                title: 'Visitors (estimated for 2025)',
                format: ',.0f'
            }
        ]
    },


layer: [

    // Draw lines connecting 2025 and 2026
    {
        mark: {
            type: 'line',
            strokeWidth: 3
        }
    },

    // Add points at both ends
    {
        mark: {
            type: 'point',
            filled: true,
            size: 90
        }
    },
    

    // Add percentage change labels beside 2026
    {
        transform: [
            {
                filter: "datum.Year === '2026'"
            },
            {
                calculate:
                    "format(datum.YoY_change_pct, '+.1f') + '%'",
                as: 'ChangeLabel'
            }
        ],

        mark: {
            type: 'text',
            align: 'left',
            baseline: 'middle',
            dx: 12,
            fontSize: 12,
            fontWeight: 'bold'
        },

        encoding: {
            text: {
                field: 'ChangeLabel',
                type: 'nominal'
            }
        }
    }
]

});




draw('spend-chart', {

    width: 400,
    height: 300,

    title: 'Share of Tourism Expenditure',

    data: {
        url: 'data/expenditure_2026.csv'
    },

    mark: {
        type: 'arc',
        innerRadius: 85,
        outerRadius: 135
    },

    encoding: {

        theta: {
            field: 'AUD_billion',
            type: 'quantitative'
        },

        color: {
            field: 'Type',
            type: 'nominal',
            title: 'Visitor Type',

            scale: {
                domain: ['Domestic', 'International'],
                range: ['#147d7c', '#e3a451']
            }
        },

        tooltip: [
            { field: 'Type', type: 'nominal' },
            {
                field: 'AUD_billion',
                type: 'quantitative',
                title: 'Expenditure (A$ billion)',
                format: '.2f'
            }
        ]
    }
});


draw('reef-tourism-chart', {
    width: 690,
    height: 350,

    data: {
        url: 'data/reef_tourism_activities.csv'
    },


    transform: [
        {
            fold: [
                'Full_day',
                'Part_day',
                'Scenic_flights',
                'Coral_viewing',
                'Exempt'
            ],
            as: ['Activity', 'Visits']
        },
        {
            filter: "activityFilter === 'All activities' || datum.Activity === activityFilter"
        }
    ],

    params: [
        {
            name: 'activityFilter',
            value: 'All activities',
            bind: {
                input: 'select',
                name: 'Explore activity: ',
                options: [
                    'All activities',
                    'Full_day',
                    'Part_day',
                    'Scenic_flights',
                    'Coral_viewing',
                    'Exempt'
                ],
                labels: [
                    'All activities',
                    'Full-day visits',
                    'Part-day visits',
                    'Scenic flights',
                    'Coral viewing',
                    'Exempt visits'
                ]
            }
        }
    ],

    layer: [
        {
            mark: {
                type: 'line',
                strokeWidth: 3
            }
        },
        {
            mark: {
                type: 'point',
                filled: true,
                size: 100
            }
        }
    ],

    encoding: {
        x: {
            field: 'Year',
            type: 'ordinal',
            title: 'Financial Year'
        },

        y: {
            field: 'Visits',
            type: 'quantitative',
            title: 'Number of Visits'
        },

        color: {
            field: 'Activity',
            type: 'nominal',
            title: 'Tourism Activity'
        },

        
        tooltip: [
            {
                field: 'Year',
                type: 'nominal',
                title: 'Financial Year'
            },
            {
                field: 'Activity',
                type: 'nominal',
                title: 'Tourism Activity'
            },
            {
                field: 'Visits',
                type: 'quantitative',
                title: 'Recorded Visits',
                format: ','
            }
        ]

    },
}
);

draw('zone-explorer-map', {
    
})

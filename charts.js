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


const chartViews = {};

function draw(id, spec) {
  return vegaEmbed(
    '#' + id,
    { ...base, ...spec },
    { actions: false, renderer: 'svg' }
  )
  .then(result => {
    chartViews[id] = result.view;
    return result;
  })
  .catch(err => {
    console.error(id, err);

    const container = document.getElementById(id);

    if (container) {
      container.textContent = 'Chart failed to load.';
    }
  });
}


const valueTip = (field, title, fmt = ',.0f') => ({
    field: field,
    type: 'quantitative',
    title: title,
    format: fmt
});


draw('marine-zoning-map-colour', {

            "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

            "width": 950,
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
                                "domain": [
                                    "Buffer Zone",
                                    "Commonwealth Islands Zone (GBRMPA)",
                                    "Commonwealth Islands Zone (Other)",
                                    "Conservation Park Zone",
                                    "General Use Zone",
                                    "Habitat Protection Zone",
                                    "Marine National Park Zone",
                                    "Preservation Zone",
                                    "Scientific Research Zone",
                                    "Scientific Research Zone (closed to public access)"
                                ],

                                "range": [
                                    "#4E79A7",  // Buffer - Blue
                                    "#F28E2B",  // Commonwealth Islands (GBRMPA) - Orange
                                    "#E15759",  // Commonwealth Islands (Other) - Coral
                                    "#76B7B2",  // Conservation Park - Teal
                                    "#B07AA1",  // General Use - Purple
                                    "#EDC948",  // Habitat Protection - Yellow
                                    "#9C755F",  // Marine National Park - Brown
                                    "#FF9DA7",  // Preservation - Pink
                                    "#6B6ECF",  // Scientific Research - Indigo
                                    "#BAB0AC"   // Scientific Research (closed) - Grey
                                ]
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

draw('marine-zoning-map', {

            "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

            "width": 1050,
            "height": 550,

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
                        "fill": "#1ac9e8",
                        "stroke": "#e6edf8",
                        "strokeWidth": 0.7
                    },

                    "encoding": {


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

    width: 985,
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

    width: 900,
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



draw('reef-economy-chart', {

  title: {
    text: 'Economic Importance of Great Barrier Reef Tourism (2023–24)',
    anchor: 'middle',
    fontSize: 18,
    color: '#073b4c',
    offset: 15
    },

  data: {
    url: 'data/GBR_tourism_economy_and_jobs.csv'
    },

  transform: [
    {
      fold: [
        'value_aud_billion',
        'jobs_supported_fte'
      ],
      as: ['Metric', 'Value']
    },
    {
      calculate:
        "datum.Metric === 'value_aud_billion' ? " +
        "'Economic Contribution (A$ Billion)' : " +
        "'Jobs Supported (FTE)'",
      as: 'MetricLabel'
    }
  ],

  facet: {
    column: {
      field: 'MetricLabel',
      type: 'nominal',
      title: null,
      sort: [
        'Economic Contribution (A$ Billion)',
        'Jobs Supported (FTE)'
      ]
    }
  },

  spec: {
    width: 495,
    height: 220,

    mark: {
      type: 'bar',
      cornerRadiusEnd: 5
    },

    encoding: {
      y: {
        field: 'geography',
        type: 'nominal',
        title: null,
        sort: ['Australia', 'Queensland', 'GBR region']
      },

      x: {
        field: 'Value',
        type: 'quantitative',
        title: null
      },

      color: {
        field: 'MetricLabel',
        type: 'nominal',
        legend: null,
        scale: {
          domain: [
            'Economic Contribution (A$ Billion)',
            'Jobs Supported (FTE)'
          ],
          range: ['#168AAD', '#A78BFA']
        }
      },

      tooltip: [
        {
          field: 'geography',
          title: 'Geography'
        },
        {
          field: 'MetricLabel',
          title: 'Metric'
        },
        {
          field: 'Value',
          title: 'Value',
          format: ',.2f'
        }
      ]
    }
  },

  resolve: {
    scale: {
      x: 'independent'
    }
  }
});


draw('reef-tourism-chart', {
  width: 860,
  height: 440,

  data: {
    url: 'data/reef_tourism_activities.csv'
  },

  // Vega-Lite automatically creates the dropdown
  params: [
    {
      name: 'selectedActivity',
      value: 'All',
      bind: {
        input: 'select',
        options: [
          'All',
          'Full_day',
          'Part_day',
          'Coral_viewing',
          'Scenic_flights',
          'Exempt'
        ],
        labels: [
          'All activities',
          'Full-day visits',
          'Part-day visits',
          'Coral viewing',
          'Scenic flights',
          'Exempt'
        ],
        name: 'Explore activity: '
      }
    }
  ],

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
      calculate: 'toNumber(datum.Visits)',
      as: 'VisitCount'
    },
    {
      filter: "selectedActivity === 'All' || datum.Activity === selectedActivity"
    }
  ],

  mark: {
    type: 'line',
    point: {
      filled: true,
      size: 75
    },
    strokeWidth: 3
  },

  encoding: {
    x: {
      field: 'Year',
      type: 'ordinal',
      title: 'Financial Year',
      axis: {
        labelAngle: -90
      }
    },

    y: {
      field: 'VisitCount',
      type: 'quantitative',
      title: 'Number of Visits',
      axis: {
        format: ','
      }
    },

    color: {
      field: 'Activity',
      type: 'nominal',
      title: 'Tourism Activity',
      scale: {
        domain: [
          'Coral_viewing',
          'Exempt',
          'Full_day',
          'Part_day',
          'Scenic_flights'
        ],
        range: [
          '#4C78A8',
          '#F58518',
          '#E45756',
          '#72B7B2',
          '#54A24B'
        ]
      }
    },

    tooltip: [
      {
        field: 'Year',
        type: 'ordinal',
        title: 'Financial Year'
      },
      {
        field: 'Activity',
        type: 'nominal',
        title: 'Activity'
      },
      {
        field: 'VisitCount',
        type: 'quantitative',
        title: 'Number of Visits',
        format: ','
      }
    ]
  }
});


draw('diver-impact-chart', {
  title: 'Reef Contact and Damage by Activity',

  width: 650,
  height: 300,

  data: {
    url: 'data/DiverReef_cleaned.csv'
  },

  transform: [
    {
      filter:
        "isValid(datum.contact_per_10min) && " +
        "isValid(datum.damage_per_10min)"
    },
    {
      fold: [
        'contact_per_10min',
        'damage_per_10min'
      ],
      as: ['Interaction', 'Rate']
    },
    {
      calculate:
        "datum.Interaction === 'contact_per_10min' " +
        "? 'Physical contact' : 'Recorded damage'",
      as: 'InteractionType'
    }
  ],

  mark: 'bar',

  encoding: {
    x: {
        field: 'activity',
        type: 'nominal',
        title: 'Activity',
        axis: {
            labelAngle: 0,
            labelFontSize: 12,
            labelLimit: 180
        }
    },

    xOffset: {
      field: 'InteractionType'
    },

    y: {
      aggregate: 'mean',
      field: 'Rate',
      type: 'quantitative',
      title: 'Average interactions per 10 minutes'
    },

    color: {
      field: 'InteractionType',
      type: 'nominal',
      title: 'Interaction'
    },

    tooltip: [
      { field: 'activity', title: 'Activity' },
      { field: 'InteractionType', title: 'Interaction' },
      {
        aggregate: 'mean',
        field: 'Rate',
        title: 'Average per 10 minutes',
        format: '.2f'
      }
    ]
  }
});


draw('industry-support-chart', {
  width: 650,
  height: { step: 30 },

  title: {
    text: 'Industries Supported by Tourism',
    subtitle: 'Tropical North Queensland · 2024–25',
  },

  data: {
    url: 'data/TNQ_tourism_industry_GVA_2024_25.csv'
  },

  params: [
    {
      name: 'selectedMetric',
      value: 'economic',
      bind: {
        input: 'select',
        options: ['economic', 'jobs'],
        labels: ['Economic Contribution', 'Jobs Supported'],
        name: 'Explore by: '
      }
    }
  ],

  transform: [
    {
      lookup: 'Industry',
      from: {
        data: {
          url: 'data/TNQ_tourism_industry_jobs_2024_25.csv'
        },
        key: 'Industry',
        fields: ['Total_filled_jobs']
      }
    },
    {
      calculate:
        "selectedMetric === 'economic' ? toNumber(datum.Direct_tourism_GVA_AUD_million) : toNumber(datum.Total_filled_jobs)",
      as: 'Value'
    },
    {
      filter: 'isValid(datum.Value)'
    }
  ],

  mark: {
    type: 'bar',
    cornerRadiusEnd: 4
  },

  encoding: {
    y: {
      field: 'Industry',
      type: 'nominal',
      sort: '-x',
      title: null,
      axis: {
        labelLimit: 270
      }
    },

    x: {
      field: 'Value',
      type: 'quantitative',
      title: null
    },

    color: {
      condition: {
        test: "selectedMetric === 'economic'",
        value: '#168AAD'
      },
      value: '#A78BFA'
    },

    tooltip: [
      {
        field: 'Industry',
        type: 'nominal',
        title: 'Industry'
      },
      {
        field: 'Value',
        type: 'quantitative',
        title: 'Selected Value',
        format: ',.1f'
      }
    ]
  }
});

draw('diver-damage-chart', {

  width: 700,
  height: { step: 45 },

  title: {
    text: 'Diver Behaviour and Coral Reef Impacts',
    subtitle: 'Study of recreational divers in Indonesia and the Philippines (2026)',
  },

  data: {
    url: 'data/diver_coral_damage_2026_study_summary.csv'
  },

  params: [
  {
    name: 'selectedCategory',
    value: 'Diver Behaviour',
    bind: {
      input: 'select',
      options: [
        'Diver Behaviour',
        'Wildlife Sightings'
      ],
      labels: [
        'Diver Behaviour',
        'Impact of Wildlife Sightings'
      ],
      name: 'Explore: '
    }
  }
],

transform: [
  {
    calculate: 'toNumber(datum.Value)',
    as: 'Amount'
  },
  {
    calculate: `
      indexof([
        'Damaging contacts unintentional or unnoticed',
        'Divers rating themselves above average'
      ], datum.Metric) >= 0
      ? 'Diver Behaviour'
      : 'Wildlife Sightings'
    `,
    as: 'Category'
  },
  {
    filter: `
      indexof([
        'Damaging contacts unintentional or unnoticed',
        'Divers rating themselves above average',
        'Increase in intentional contacts with wildlife sightings',
        'Increase in unintentional contacts with wildlife sightings',
        'Increase in damaging contacts with wildlife sightings'
      ], datum.Metric) >= 0
    `
  },
  {
    filter: 'datum.Category === selectedCategory'
  }
],

  mark: {
    type: 'bar',
    cornerRadiusEnd: 4
  },

encoding: {
  y: {
    field: 'Metric',
    type: 'nominal',
    sort: null,
    title: null,
    axis: {
      labelLimit: 350,
      labelFontSize: 12
    }
  },

x: {
  field: 'Amount',
  type: 'quantitative',
  title: 'Percentage (%)',
  scale: {
    zero: true
  }
},

color: {
  condition: {
    test: "selectedCategory === 'Diver Behaviour'",
    value: '#E76F51'
  },
  value: '#168AAD'
},

  tooltip: [
    {
      field: 'Metric',
      type: 'nominal',
      title: 'Finding'
    },
    {
      field: 'Amount',
      type: 'quantitative',
      title: 'Percentage (%)',
      format: '.1f'
    },
    {
      field: 'Context',
      type: 'nominal',
      title: 'Explanation'
    }
  ]
},

    tooltip: [
      {
        field: 'Metric',
        type: 'nominal',
        title: 'Finding'
      },
      {
        field: 'DisplayValue',
        type: 'nominal',
        title: 'Value'
      },
      {
        field: 'Context',
        type: 'nominal',
        title: 'Explanation'
      }
    ]
  }

);

draw('vessel-groundings-chart', {
  width: 850,
  height: 350,

  title: {
    text: 'Vessel Groundings in the Great Barrier Reef',
    subtitle: 'Reported incidents by vessel type, 2019–2023',
  },

  data: {
    url: 'data/GBR_vessel_groundings_2019_2023_digitzed.csv'
  },

  mark: {
    type: 'bar',
    tooltip: true
  },

  encoding: {
    x: {
        field: 'Financial_Year',
        type: 'ordinal',
        title: 'Financial Year',
        axis: {
            labelAngle: 0,
            labelFontSize: 12,
            labelLimit: 180
    }
    },

    y: {
      field: 'Groundings',
      type: 'quantitative',
      title: 'Number of Groundings'
    },

    color: {
      field: 'Vessel_Type',
      type: 'nominal',
      title: 'Vessel Type'
    },

    xOffset: {
      field: 'Vessel_Type'
    },

    tooltip: [
      { field: 'Financial_Year', title: 'Financial Year' },
      { field: 'Vessel_Type', title: 'Vessel Type' },
      { field: 'Groundings', type: 'quantitative', title: 'Groundings' }
    ]
  }
});

draw('coral-cover-chart', {
  width: 650,
  height: 250,

  title: {
    text: 'Coral Cover Decline Across the Reef',
    subtitle: '2025 coral cover compared with the 2024 reference'
  },

  data: {
    url: 'data/GBR_coral_cover_2025_2026.csv'
  },

  transform: [
    {
      calculate: "toString(datum.Year)",
      as: "YearString"
    },
    {
      pivot: 'YearString',
      value: 'Coral_Cover',
      groupby: ['Region']
    },
    {
      calculate: "toNumber(datum['2024'])",
      as: 'Cover2024'
    },
    {
      calculate: "toNumber(datum['2025'])",
      as: 'Cover2025'
    },
    {
      calculate: "datum.Cover2025 - datum.Cover2024",
      as: 'Change'
    }
  ],

  encoding: {
    y: {
      field: 'Region',
      type: 'nominal',
      title: null,
      sort: ['Northern', 'Central', 'Southern'],
      axis: {
        labelFontSize: 13,
        labelPadding: 12
      }
    },

    x: {
      field: 'Cover2025',
      type: 'quantitative',
      title: 'Average Hard Coral Cover (%)',
      scale: { domain: [0, 50] }
    }
  },

  layer: [
    // 2025 coral cover bars
    {
      mark: {
        type: 'bar',
        color: '#0072B2',
        size: 28,
        cornerRadiusEnd: 4
      },

      encoding: {
        tooltip: [
          { field: 'Region', title: 'Region' },
          {
            field: 'Cover2024',
            title: '2024 Coral Cover (%)',
            format: '.1f'
          },
          {
            field: 'Cover2025',
            title: '2025 Coral Cover (%)',
            format: '.1f'
          },
          {
            field: 'Change',
            title: 'Change (percentage points)',
            format: '+.1f'
          }
        ]
      }
    },

    // 2024 reference markers
    {
      mark: {
        type: 'tick',
        color: '#073B4C',
        thickness: 4,
        size: 45
      },

      encoding: {
        x: {
          field: 'Cover2024',
          type: 'quantitative'
        }
      }
    },

    // 2025 value labels
    {
      mark: {
        type: 'text',
        align: 'left',
        dx: 7,
        fontSize: 12,
        color: '#0072B2',
        fontWeight: 'bold'
      },

      encoding: {
        text: {
          field: 'Cover2025',
          type: 'quantitative',
          format: '.1f'
        }
      }
    }
  ]
});

draw('heat-stress-map', {
  width: 750,
  height: 650,

  title: {
    text: 'Marine Heat Stress Across the Great Barrier Reef',
    subtitle: 'Accumulated ocean heat stress (Degree Heating Weeks)',
    anchor: 'start'
  },

  data: {
    url: 'data/GBR_heat_stress_2020_2025_monthly_sampled.csv'
  },

  params: [
    {
      name: 'selectedYear',
      value: 2024,
      bind: {
        input: 'select',
        options: [2020, 2021, 2022, 2023, 2024, 2025],
        name: 'Year: '
      }
    },
    {
      name: 'selectedMonth',
      value: 3,
      bind: {
        input: 'select',
        options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        name: 'Month: '
      }
    }
  ],

  transform: [
    {
      calculate: 'toNumber(datum.Year)',
      as: 'YearNum'
    },
    {
      calculate: 'toNumber(datum.Month)',
      as: 'MonthNum'
    },
    {
      calculate: 'toNumber(datum.DHW)',
      as: 'HeatStress'
    },
    {
      filter: 'datum.YearNum === selectedYear && datum.MonthNum === selectedMonth'
    }
  ],

  projection: {
    type: 'mercator',
    center: [148, -18],
    scale: 2000,
    translate: [430, 325]
  },

  mark: {
    type: 'square',
    size: 50,
    opacity: 0.85
  },

  encoding: {
    longitude: {
      field: 'Longitude',
      type: 'quantitative'
    },

    latitude: {
      field: 'Latitude',
      type: 'quantitative'
    },

    color: {
      field: 'HeatStress',
      type: 'quantitative',
      title: 'DHW (°C-weeks)',
      scale: {
        domain: [0, 4, 8, 12, 16],
        range: [
          '#2166AC',
          '#FEE08B',
          '#FDAE61',
          '#F46D43',
          '#A50026'
        ],
        clamp: true
      }
    },

    tooltip: [
      { field: 'YearNum', title: 'Year' },
      { field: 'MonthNum', title: 'Month' },
      {
        field: 'HeatStress',
        title: 'Degree Heating Weeks',
        format: '.1f'
      }
    ]
  }
});

draw('cyclone-map', {
  width: 975,
  height: 650,

  background: '#EAF6FA',

  title: {
    text: 'Tropical Cyclones Near the Great Barrier Reef',
    subtitle: 'Cyclone tracks from 2020 to 2025',
  },

  projection: {
    type: 'mercator',
    center: [148, -18],
    scale: 2000,
    translate: [475, 325]
  },

  params: [
    {
      name: 'selectedCycloneYear',
      value: 'All Years',
      bind: {
        input: 'select',
        options: [
          'All Years',
          '2020',
          '2021',
          '2022',
          '2023',
          '2024',
          '2025'
        ],
        name: 'Year: '
      }
    }
  ],

  layer: [

    {
      data: {
        url: 'https://vega.github.io/vega-datasets/data/world-110m.json',
        format: {
          type: 'topojson',
          feature: 'countries'
        }
      },

      mark: {
        type: 'geoshape',
        fill: '#E8E2D5',
        stroke: '#8A9A9D',
        strokeWidth: 0.8
      }
    },
    {
      data: {
        url: 'data/Great_Barrier_Reef_Marine_Park_Zoning_vega.geojson',
        format: {
          type: 'json',
          property: 'features'
        }
      },

      mark: {
        type: 'geoshape',
        fill: '#52B6A0',
        fillOpacity: 0.3,
        stroke: '#168AAD',
        strokeWidth: 0.3
      },

      encoding: {
        tooltip: [
          {
            field: 'properties.PART_DESC',
            title: 'Marine Park Zone'
          },
          {
            field: 'properties.NAME',
            title: 'Zone Name'
          }
        ]
      }
    },

    {
      data: {
        url: 'data/GBR_cyclone_tracks_2020_2025.csv'
      },

      transform: [
        {
          calculate: 'toDate(datum.Date)',
          as: 'CycloneDate'
        },
        {
          calculate: 'year(datum.CycloneDate)',
          as: 'CycloneYear'
        },
        {
          calculate: 'toNumber(datum.Longitude)',
          as: 'Lon'
        },
        {
          calculate: 'toNumber(datum.Latitude)',
          as: 'Lat'
        },
        {
          filter:
            "selectedCycloneYear === 'All Years' || " +
            "toString(datum.CycloneYear) === selectedCycloneYear"
        }
      ],

      mark: {
        type: 'line',
        strokeWidth: 2.5,
        opacity: 0.85
      },

      encoding: {
        longitude: {
          field: 'Lon',
          type: 'quantitative'
        },

        latitude: {
          field: 'Lat',
          type: 'quantitative'
        },

        detail: {
          field: 'Storm_ID',
          type: 'nominal'
        },

        order: {
          field: 'CycloneDate',
          type: 'temporal'
        },

        color: {
          field: 'Storm_Name',
          type: 'nominal',
          title: 'Cyclone Name',

          scale: {
            range: [
              '#0072B2',
              '#E69F00',
              '#CC79A7',
              '#56B4E9',
              '#F0E442',
              '#332288',
              '#88CCEE',
              '#AA4499',
              '#DDCC77',
              '#6699CC',
              '#AA88CC',
              '#DDAA33',
              '#44AA99',
              '#999933',
              '#882255',
              '#77AADD',
              '#EE8866',
              '#BBBBBB',
              '#99DDFF',
              '#BB99DD',
              '#CCBB44',
              '#4477AA'
            ]
          },

          legend: {
            orient: 'right',
            title: 'Cyclone Name',
            labelFontSize: 11,
            titleFontSize: 13,
            labelLimit: 180,
            symbolType: 'stroke',
            symbolStrokeWidth: 3,
            symbolSize: 150
          }
        },

        tooltip: [
          {
            field: 'Storm_Name',
            title: 'Cyclone'
          },
          {
            field: 'CycloneDate',
            type: 'temporal',
            title: 'Recorded Date',
            format: '%d %B %Y, %H:%M'
          }
        ]
      }
    },

    {
      data: {
        url: 'data/GBR_cyclone_tracks_2020_2025.csv'
      },

      transform: [
        {
          calculate: 'toDate(datum.Date)',
          as: 'CycloneDate'
        },
        {
          calculate: 'year(datum.CycloneDate)',
          as: 'CycloneYear'
        },
        {
          calculate: 'toNumber(datum.Longitude)',
          as: 'Lon'
        },
        {
          calculate: 'toNumber(datum.Latitude)',
          as: 'Lat'
        },
        {
          calculate: 'toNumber(datum.Wind_Speed)',
          as: 'WindKnots'
        },
        {
          filter:
            "selectedCycloneYear === 'All Years' || " +
            "toString(datum.CycloneYear) === selectedCycloneYear"
        }
      ],

      mark: {
        type: 'circle',
        size: 35,
        opacity: 0.75
      },

      encoding: {
        longitude: {
          field: 'Lon',
          type: 'quantitative'
        },

        latitude: {
          field: 'Lat',
          type: 'quantitative'
        },

        color: {
          field: 'Storm_Name',
          type: 'nominal',
          legend: null
        },

        tooltip: [
          {
            field: 'Storm_Name',
            type: 'nominal',
            title: 'Cyclone'
          },

          {
            field: 'CycloneDate',
            type: 'temporal',
            title: 'Recorded Date',
            format: '%d %B %Y, %H:%M'
          },

          {
            field: 'Wind_Knots',
            type: 'quantitative',
            title: 'Wind Speed (knots)',
            format: '.0f'
          },

          {
            field: 'Lat',
            type: 'quantitative',
            title: 'Latitude',
            format: '.2f'
          },

          {
            field: 'Lon',
            type: 'quantitative',
            title: 'Longitude',
            format: '.2f'
          }
        ]
      }
    }

  ]
});
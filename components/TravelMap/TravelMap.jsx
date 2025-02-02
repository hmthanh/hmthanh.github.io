'use client';

import { useEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldHigh from '@amcharts/amcharts5-geodata/worldHigh';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5themes_Dark from '@amcharts/amcharts5/themes/Dark';
import { countries } from './mapData';

const countryList = ["AU", "CA", "CN", "FR", "GB", "JP", "KR", "RU", "SG", "TH", "US"]
// Set up data
const colorSet = [
    am5.color('#1BA68D'),
    am5.color('#581845'),
    am5.color('#E77624'),
    am5.color('#3498DB'),
    am5.color('#F1C40F'),
    am5.color('#232555'),
    am5.color('#E74C3C'),
    am5.color('#367B25'),
    am5.color('#000'),
    am5.color('#A569BD'),
    am5.color('#C0392B'),
    am5.color('#DF3520'),
];

export default function WorldMap() {
    const chartRef = useRef(null);

    useEffect(() => {
        // Create root element
        const root = am5.Root.new('wordMap');

        // Set themes
        root.setThemes([am5themes_Animated.new(root), am5themes_Dark.new(root)]);

        // Create map chart
        const chart = root.container.children.push(
            am5map.MapChart.new(root, {
                panX: 'translateX',
                panY: 'translateY',
                projection: am5map.geoMercator(),
                homeZoomLevel: 1,
                homeGeoPoint: { longitude: 10, latitude: 50 },
            })
        );

        // Define colors
        const btnStrokeColor = am5.color('#fff');
        const btnBackgroundColor = am5.color('#3b3b3b');

        // Set background color
        chart.set('background', am5.Rectangle.new(root, {
            fill: am5.color('rgb(255,255,255)'),
        }));

        // ************************* worldSeries *************************
        // // Create polygon series for world map
        // const worldSeries = chart.series.push(
        //     am5map.MapPolygonSeries.new(root, {
        //         geoJSON: am5geodata_worldHigh,
        //         exclude: ['AQ'],
        //         fill: am5.color('rgb(255, 247, 238)'),
        //     })
        // );

        // // Configure world series polygons
        // worldSeries.mapPolygons.template.setAll({
        //     tooltipText: '{name}',
        //     strokeOpacity: 0.5,
        //     stroke: am5.color('#000'),
        //     interactive: true,
        // });

        // worldSeries.mapPolygons.template.states.create('hover', {
        //     fill: am5.color('#1BA68D'),
        // });
        // ************************* worldSeries *************************


        // ************************* countrySeries *************************
        // Create country series (hidden by default)
        const countrySeries = chart.series.push(
            am5map.MapPolygonSeries.new(root, {
                geoJSON: am5geodata_worldHigh,
                exclude: ['AQ'],
                fill: am5.color('rgb(255, 247, 238)'),
            })
        );

        // const vietnamSeries = chart.series.push(
        //     am5map.MapPolygonSeries.new(root, {
        //         geoJSON: am5geodata_worldHigh,
        //         include: ['VN'],
        //         fill: am5.color('rgb(255, 0, 0)'),
        //     })
        // );

        countryList.forEach((country, index) => {
            const countrySeries = chart.series.push(
                am5map.MapPolygonSeries.new(root, {
                    geoJSON: am5geodata_worldHigh,
                    exclude: ['AQ'],
                    include: [country],
                    fill: colorSet[index % colorSet.length],
                })
            );
        })



        // Configure country series polygons
        countrySeries.mapPolygons.template.setAll({
            tooltipText: '{name}',
            strokeOpacity: 0.5,
            strokeWidth: 1,
            nonScalingStroke: true,
            stroke: am5.color('#000'),
            fill: am5.color('#eee'),
        });
        countrySeries.mapPolygons.template.states.create('hover', {
            fill: am5.color('#f00'),
        })




        // pointSeries.set("clusteredBullet", function (root) {
        //     let container = am5.Container.new(root, {
        //         cursorOverStyle: "pointer",
        //     });

        //     let circle2 = container.children.push(
        //         am5.Circle.new(root, {
        //             radius: 50,
        //             fillOpacity: 0.9,
        //             tooltipY: 0,
        //             fill: am5.color(0xff8c00),
        //         })
        //     );

        //     let label = container.children.push(
        //         am5.Label.new(root, {
        //             centerX: am5.p50,
        //             centerY: am5.p50,
        //             fill: am5.color(0xffffff),
        //             populateText: true,
        //             fontSize: "8",
        //             text: "{value}",
        //         })
        //     );


        //     container.events.on("click", function (e) {
        //         pointSeries.zoomToCluster(e.target.dataItem);
        //     });

        //     return am5.Bullet.new(root, {
        //         sprite: container,
        //     });
        // })






        // const data = Object.entries(countries).map(([id, country], index) => ({
        //     id,
        //     color: colorSet[index % colorSet.length],
        //     map: country.maps[0],
        // }));
        // settings up data
        let data = []
        let icolor = 0
        for (let id in countries) {
            if (countries.hasOwnProperty(id)) {
                let country = countries[id]
                if (country.maps.length) {
                    data.push({
                        id: id,
                        color: colorSet[icolor],
                        map: country.maps[0],
                    })
                }
                icolor = icolor + 1
            }
        }
        // countrySeries.data.setAll(data);
        // const data = Object.entries(countries).map(([id, country], index) => ({
        //     id,
        //     polygonSettings: {
        //         fill: colorSet[index % colorSet.length],
        //     }

        // }));


        // ************************* countrySeries *************************

        // ************************* pointSeries *************************
        const pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
        pointSeries.set("zIndex", 100);

        const bulletTemplate = am5.Template.new({
            fill: am5.color(0xe6e6e6)
        });

        var cities = [
            {
                title: "I'm here 👨",
                latitude: 10.700065,
                longitude: 106.732614,
                color: am5.color(0xff0000)
            },
        ];

        for (var i = 0; i < cities.length; i++) {
            var city = cities[i];
            addCity(city.longitude, city.latitude, city.title, city.color);
        }

        function addCity(longitude, latitude, title, color) {
            pointSeries.data.push({
                geometry: {
                    type: "Point",
                    coordinates: [longitude, latitude],
                },
                title: title,
                bulletSettings: {
                    fill: color
                }
            });
        }

        pointSeries.bullets.push(function () {
            const pin = am5.Graphics.new(root, {
                width: 24,
                height: 24,
                tooltipY: 0,
                centerX: am5.p50,
                centerY: am5.p100,
                svgPath: "M12,0C7.4,0,3.67,3.73,3.67,8.32c0,4.42,7.55,14.74,7.87,15.18l0.3,0.41c0.04,0.05,0.09,0.08,0.15,0.08 c0.06,0,0.12-0.03,0.15-0.08l0.3-0.41c0.32-0.44,7.87-10.76,7.87-15.18C20.33,3.73,16.6,0,12,0z M12,5.34 c1.64,0,2.98,1.34,2.98,2.98c0,1.64-1.34,2.98-2.98,2.98c-1.64,0-2.98-1.34-2.98-2.98C9.01,6.68,10.35,5.34,12,5.34z",
                stroke: am5.color(0xffffff),
                strokeOpacity: 0.5,
                templateField: "bulletSettings",
                tooltipText: "{title}",
                cursorOverStyle: "pointer"
            }, bulletTemplate);

            return am5.Bullet.new(root, {
                sprite: pin,
            });
        });
        // ************************* pointSeries *************************
        // // Handle world polygon clicks
        // worldSeries.mapPolygons.template.events.on('click', (ev) => {
        //     const target = ev.target;
        //     const map = target.dataItem?.dataContext?.map;

        //     if (map) {
        //         chart.zoomToMapObject(target);
        //         countrySeries.set('visible', true);
        //         worldSeries.set('visible', false);

        //         // Load country-specific geodata
        //         fetch(`https://www.amcharts.com/lib/5/geodata/json/${map}.json`)
        //             .then((response) => response.json())
        //             .then((geodata) => {
        //                 countrySeries.set('geoJSON', geodata);
        //             });

        //         btnBack.show();
        //     }
        // });

        // Add zoom control
        const zoomControl = chart.set('zoomControl', am5map.ZoomControl.new(root, {}));
        zoomControl.homeButton.set("visible", true);
        zoomControl.homeButton.set("background", am5.RoundedRectangle.new(root, {
            fill: am5.color("#999999"),  // Gray fill
            fillOpacity: 0.9,
            stroke: am5.color("#ffffff") // Darker gray border
        }));
        zoomControl.minusButton.set("background", am5.RoundedRectangle.new(root, {
            fill: am5.color("#999999"),  // Gray fill
            fillOpacity: 0.9,
            stroke: am5.color("#ffffff") // Darker gray border
        }));
        // zoomControl.plusButton.
        zoomControl.plusButton.set("background", am5.RoundedRectangle.new(root, {
            fill: am5.color("#999999"),  // Gray fill
            fillOpacity: 0.9,
            stroke: am5.color("#ffffff") // Darker gray border
        }));
        zoomControl.set('marginRight', 100);
        zoomControl.set('opacity', 0.6);
        zoomControl.set('stroke', btnStrokeColor);
        // zoomControl.plusButton.setAll({
        //     fill: am5.color("#ff0000"),
        //     stroke: am5.color("#ff0000")
        // });


        // zoomControl.minusButton.setAll({
        //     fill: am5.color("#ff0000"),
        //     stroke: am5.color("#ff0000")
        // });

        // // Add back button
        // const btnBack = root.container.children.push(
        //     am5.Button.new(root, {
        //         x: am5.percent(100),
        //         y: 50,
        //         dx: -14,
        //         paddingTop: 5,
        //         paddingBottom: 5,
        //         width: 31,
        //         height: 31,
        //         opacity: 0.6,
        //         background: am5.Rectangle.new(root, {
        //             fill: btnBackgroundColor,
        //         }),
        //         icon: am5.Graphics.new(root, {
        //             svgPath: 'M-6.5,0.5 L7.5,0.5',
        //             stroke: btnStrokeColor,
        //         }),
        //     })
        // );

        // btnBack.hide();
        // btnBack.events.on('click', () => {
        //     worldSeries.set('visible', true);
        //     countrySeries.set('visible', false);
        //     chart.goHome();
        //     btnBack.hide();
        // });

        // // Add home button
        // const btnHome = root.container.children.push(
        //     am5.Button.new(root, {
        //         x: am5.percent(100),
        //         y: 0,
        //         dx: -14,
        //         paddingTop: 5,
        //         paddingBottom: 5,
        //         width: 31,
        //         height: 31,
        //         opacity: 0.6,
        //         background: am5.Rectangle.new(root, {
        //             fill: btnBackgroundColor,
        //         }),
        //         icon: am5.Graphics.new(root, {
        //             svgPath:
        //                 'M-6.5,0.5 L0.5,-6.5 L7.5,0.5 L6.5,0.5 L6.5,6.5 L2.5,6.5 L2.5,2.5 L-1.5,2.5 L-1.5,6.5 L-5.5,6.5 L-5.5,0.5 Z',
        //             fill: btnStrokeColor,
        //         }),
        //     })
        // );

        // btnHome.events.on('click', () => {
        //     chart.goHome();
        // });


        // worldSeries.data.setAll(data);
        // worldSeries.data.setAll([{
        //     id: "US",
        //     polygonSettings: {
        //         fill: am5.color(0xFF3C38)
        //     }
        // }, {
        //     id: "CA",
        //     polygonSettings: {
        //         fill: am5.color(0xA23E48)
        //     }
        // }, {
        //     id: "MX",
        //     polygonSettings: {
        //         fill: am5.color(0xFF8C42)
        //     }
        // }])

        chartRef.current = chart;

        return () => {
            root.dispose();
        };
    }, []);

    return (
        <div
            id="wordMap"
            style={{
                width: '840px',
                height: '540px',
            }}
        ></div>
    );
}
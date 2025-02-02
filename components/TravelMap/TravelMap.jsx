'use client';

import { useEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldHigh from '@amcharts/amcharts5-geodata/worldHigh';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5themes_Dark from '@amcharts/amcharts5/themes/Dark';

const countryList = [
  'AU',
  'CA',
  'CN',
  'FR',
  'GB',
  'JP',
  'KR',
  'RU',
  'SG',
  'TH',
  'US',
];
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
      }),
    );

    // ************************* countrySeries *************************
    // Create country series (hidden by default)
    const countrySeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldHigh,
        exclude: ['AQ'],
        fill: am5.color('rgb(255, 247, 238)'),
      }),
    );

    // Add adapter for fill to dynamically set colors based on country code
    countrySeries.mapPolygons.template.adapters.add('fill', (fill, target) => {
      const dataItem = target.dataItem;
      if (dataItem && dataItem.get('id')) {
        const countryIndex = countryList.indexOf(dataItem.get('id'));
        if (countryIndex !== -1) {
          return colorSet[countryIndex % colorSet.length];
        }
      }
      return am5.color(0xfff7ee); // default color for non-included countries
    });

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
      fill: am5.color('#1a77d4'),
    });
    // ************************* countrySeries *************************

    // ************************* pointSeries *************************
    const pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
    pointSeries.set('zIndex', 100);

    const bulletTemplate = am5.Template.new({
      fill: am5.color(0xe6e6e6),
    });

    let cities = [
      {
        title: "I'm here 👨",
        latitude: 10.700065,
        longitude: 106.732614,
        color: am5.color(0xff0000),
      },
    ];

    for (let i = 0; i < cities.length; i++) {
      let city = cities[i];
      addCity(city.longitude, city.latitude, city.title, city.color);
    }

    function addCity(longitude, latitude, title, color) {
      pointSeries.data.push({
        geometry: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
        title: title,
        bulletSettings: {
          fill: color,
        },
      });
    }

    pointSeries.bullets.push(function () {
      const pin = am5.Graphics.new(
        root,
        {
          width: 24,
          height: 24,
          tooltipY: 0,
          centerX: am5.p50,
          centerY: am5.p100,
          svgPath:
            'M12,0C7.4,0,3.67,3.73,3.67,8.32c0,4.42,7.55,14.74,7.87,15.18l0.3,0.41c0.04,0.05,0.09,0.08,0.15,0.08 c0.06,0,0.12-0.03,0.15-0.08l0.3-0.41c0.32-0.44,7.87-10.76,7.87-15.18C20.33,3.73,16.6,0,12,0z M12,5.34 c1.64,0,2.98,1.34,2.98,2.98c0,1.64-1.34,2.98-2.98,2.98c-1.64,0-2.98-1.34-2.98-2.98C9.01,6.68,10.35,5.34,12,5.34z',
          stroke: am5.color(0xffffff),
          strokeOpacity: 0.5,
          templateField: 'bulletSettings',
          tooltipText: '{title}',
          cursorOverStyle: 'pointer',
        },
        bulletTemplate,
      );

      return am5.Bullet.new(root, {
        sprite: pin,
      });
    });
    // ************************* pointSeries *************************

    // Add zoom control
    const zoomControl = chart.set(
      'zoomControl',
      am5map.ZoomControl.new(root, {}),
    );
    zoomControl.homeButton.set('visible', true);
    zoomControl.homeButton.set(
      'background',
      am5.RoundedRectangle.new(root, {
        fill: am5.color('#999999'), // Gray fill
        fillOpacity: 0.9,
        stroke: am5.color('#ffffff'), // Darker gray border
      }),
    );
    zoomControl.minusButton.set(
      'background',
      am5.RoundedRectangle.new(root, {
        fill: am5.color('#999999'), // Gray fill
        fillOpacity: 0.9,
        stroke: am5.color('#ffffff'), // Darker gray border
      }),
    );
    // zoomControl.plusButton.
    zoomControl.plusButton.set(
      'background',
      am5.RoundedRectangle.new(root, {
        fill: am5.color('#999999'), // Gray fill
        fillOpacity: 0.9,
        stroke: am5.color('#ffffff'), // Darker gray border
      }),
    );
    zoomControl.set('marginRight', 100);
    zoomControl.set('opacity', 0.6);

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

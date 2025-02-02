'use client';

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Creates a wrapper component that only renders on the client side
const WorldMap = () => {
  return (
    <div className="w-full h-[540px] min-h-[540px]">
      <ClientWorldMap />
    </div>
  );
};

// Client component that handles all am4charts functionality
const ClientWorldMap = dynamic(() => Promise.resolve(WorldMapContent), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      Loading map...
    </div>
  ),
});

const WorldMapContent = () => {
  const chartRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    // Dynamically import amcharts when component mounts
    const loadMap = async () => {
      const am4core = (await import('@amcharts/amcharts4/core')).default;
      const am4maps = (await import('@amcharts/amcharts4/maps')).default;
      const am4geodata_worldHigh = (await import('@amcharts/amcharts4-geodata/worldHigh')).default;
      const am4themes_animated = (await import('@amcharts/amcharts4/themes/animated')).default;
      const am4themes_dark = (await import('@amcharts/amcharts4/themes/dark')).default;
      
      // Apply themes
      am4core.useTheme(am4themes_animated);
      am4core.useTheme(am4themes_dark);

      // Create chart instance
      const root = am4core.create("worldMap", am4maps.MapChart);
      rootRef.current = root;

      // Define colors
      const mapSeaColor = am4core.color("rgb(170, 218, 255)");
      const btnStrokeColor = am4core.color("#fff");
      const btnBackgroundColor = am4core.color("#3b3b3b");

      // Configure map
      root.projection = new am4maps.projections.Mercator();
      root.backgroundColor = "#AADAFF";
      root.fill = mapSeaColor;
      root.homeZoomLevel = 1;

      const colorSet = [
        "#1BA68D", "#581845", "#E77624", "#3498DB",
        "#F1C40F", "#232555", "#E74C3C", "#367B25",
        "#000000", "#A569BD", "#C0392B", "#DF3520"
      ].map(color => am4core.color(color));

      // Configure world series
      const worldSeries = root.series.push(new am4maps.MapPolygonSeries());
      worldSeries.useGeodata = true;
      worldSeries.geodata = am4geodata_worldHigh;
      worldSeries.exclude = ["AQ"]; // Exclude Antarctica

      const worldPolygon = worldSeries.mapPolygons.template;
      worldPolygon.tooltipText = "{name}";
      worldPolygon.nonScalingStroke = true;
      worldPolygon.strokeOpacity = 0.5;
      worldPolygon.fill = am4core.color("rgb(255, 247, 238)");
      worldPolygon.propertyFields.fill = "color";

      const hsWorld = worldPolygon.states.create("hover");
      hsWorld.properties.fill = root.colors.getIndex(9);

      // Configure country series
      const countrySeries = root.series.push(new am4maps.MapPolygonSeries());
      countrySeries.useGeodata = true;
      countrySeries.hide();

      countrySeries.geodataSource.events.on("done", function() {
        worldSeries.hide();
        countrySeries.show();
      });

      const countryPolygon = countrySeries.mapPolygons.template;
      countryPolygon.tooltipText = "{name}";
      countryPolygon.nonScalingStroke = true;
      countryPolygon.strokeOpacity = 0.5;
      countryPolygon.fill = am4core.color("#eee");

      const hsCountry = countryPolygon.states.create("hover");
      hsCountry.properties.fill = root.colors.getIndex(9);

      // Add zoom control
      const zoomControl = new am4maps.ZoomControl();
      zoomControl.marginRight = 10;
      zoomControl.opacity = 0.6;
      zoomControl.stroke = btnStrokeColor;
      root.zoomControl = zoomControl;

      // Add back button
      const backButton = root.createChild(am4core.Button);
      const backIcon = new am4core.Sprite();
      backIcon.path = "M-6.5,0.5 L7.5,0.5";
      backIcon.stroke = btnStrokeColor;
      backButton.icon = backIcon;

      backButton.align = "right";
      backButton.valign = "top";
      backButton.marginRight = 14;
      backButton.marginTop = 50;
      backButton.padding(5, 0, 5, 0);
      backButton.width = 31;
      backButton.height = 31;
      backButton._background.fill = btnBackgroundColor;
      backButton._background.opacity = 0.6;
      backButton.opacity = 0.6;
      backButton.hide();

      // Add home button
      const homeButton = root.chartContainer.createChild(am4core.Button);
      const homeIcon = new am4core.Sprite();
      homeIcon.path = "M-6.5,0.5 L0.5,-6.5 L7.5,0.5 L6.5,0.5 L6.5,6.5 L2.5,6.5 L2.5,2.5 L-1.5,2.5 L-1.5,6.5 L-5.5,6.5 L-5.5,0.5 Z";
      homeIcon.fill = btnStrokeColor;
      homeIcon.padding(4, 3, 4, 3);
      homeButton.icon = homeIcon;

      homeButton.align = "right";
      homeButton.marginRight = 14;
      homeButton.padding(5, 5, 5, 5);
      homeButton._background.fill = btnBackgroundColor;
      homeButton.opacity = 0.6;

      // Configure events
      worldPolygon.events.on("hit", function(ev) {
        ev.target.series.chart.zoomToMapObject(ev.target);
        const map = ev.target.dataItem.dataContext.map;
        if (map) {
          ev.target.isHover = false;
          countrySeries.geodataSource.url = `https://www.amcharts.com/lib/4/geodata/json/${map}.json`;
          countrySeries.geodataSource.load();
          backButton.show();
        }
      });

      backButton.events.on("hit", function() {
        worldSeries.show();
        root.goHome();
        countrySeries.hide();
        backButton.hide();
      });

      homeButton.events.on("hit", function() {
        root.goHome();
      });

      // Set up data
      const data = Object.entries(countries).reduce((acc, [id, country]) => {
        if (country.maps.length) {
          acc.push({
            id,
            color: colorSet[acc.length % colorSet.length],
            map: country.maps[0],
          });
        }
        return acc;
      }, []);

      worldSeries.data = data;
      chartRef.current = root;
    };

    loadMap();

    return () => {
      if (rootRef.current) {
        rootRef.current.dispose();
      }
    };
  }, []);

  return <div id="worldMap" className="w-full h-full" />;
};

export default WorldMap;
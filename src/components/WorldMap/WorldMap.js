import "core-js";
import React, { Component } from "react";

const countries = {
  AU: {
    country: "Australia",
    continent_code: "OC",
    continent: "Oceania",
    maps: ["australiaLow", "australiaHigh"],
  },
  CA: {
    country: "Canada",
    continent_code: "NA",
    continent: "North America",
    maps: ["canadaLow", "canadaHigh"],
  },
  CN: {
    country: "China",
    continent_code: "AS",
    continent: "Asia",
    maps: ["chinaLow", "chinaHigh"],
  },
  FR: {
    country: "France",
    continent_code: "EU",
    continent: "Europe",
    maps: [
      "franceLow",
      "franceHigh",
      "franceDepartmentsLow",
      "franceDepartmentsHigh",
    ],
  },
  GB: {
    country: "United Kingdom",
    continent_code: "EU",
    continent: "Europe",
    maps: ["ukLow", "ukHigh", "ukCountiesLow", "ukCountiesHigh"],
  },
  JP: {
    country: "Japan",
    continent_code: "AS",
    continent: "Asia",
    maps: ["japanLow", "japanHigh"],
  },
  KR: {
    country: "Korea, Republic of",
    continent_code: "AS",
    continent: "Asia",
    maps: ["southKoreaLow", "southKoreaHigh"],
  },
  RU: {
    country: "Russian Federation",
    continent_code: "EU",
    continent: "Europe",
    maps: ["russiaLow", "russiaHigh", "russiaCrimeaLow", "russiaCrimeaHigh"],
  },
  SG: {
    country: "Singapore",
    continent_code: "AS",
    continent: "Asia",
    maps: ["singaporeLow", "singaporeHigh"],
  },
  TH: {
    country: "Thailand",
    continent_code: "AS",
    continent: "Asia",
    maps: ["thailandLow", "thailandHigh"],
  },
  US: {
    country: "United States",
    continent_code: "NA",
    continent: "North America",
    maps: [
      "usaLow",
      "usaHigh",
      "usaTerritoriesLow",
      "usaTerritoriesHigh",
      "usaTerritories2Low",
      "usaTerritories2High",
    ],
  },
  VN: {
    country: "Viet Nam",
    continent_code: "AS",
    continent: "Asia",
    maps: ["vietnamLow", "vietnamHigh"],
  },
};

class WorldMap extends Component {
  componentDidMount() {
    Promise.all([
      import("@amcharts/amcharts4/core"),
      import("@amcharts/amcharts4/maps"),
      import("@amcharts/amcharts4-geodata/worldHigh"),
      import("@amcharts/amcharts4/themes/animated"),
      import("@amcharts/amcharts4/themes/dark"),
    ]).then((modules) => {
      var am4core = modules[0];
      var am4maps = modules[1];
      var am4geodata_worldHigh = modules[2].default;
      var am4themes_animated = modules[3].default;
      var am4themes_dark = modules[4].default;

      am4core.useTheme(am4themes_animated);
      am4core.useTheme(am4themes_dark);

      // define color
      let mapSeaColor = am4core.color("rgb(170 , 218, 255)");
      let btnStokeColor = am4core.color("#fff");
      let btnBackgroundColor = am4core.color("#3b3b3b");

      // create amchart
      var _worldMap = am4core.create("wordMap", am4maps.MapChart);
      _worldMap.projection = new am4maps.projections.Mercator();
      _worldMap.backgroundColor = "#AADAFF";
      _worldMap.fill = mapSeaColor;
      _worldMap.homeZoomLevel = 1;
      let colorSet = [
        am4core.color("#1BA68D"),
        am4core.color("#581845"),
        am4core.color("#E77624"),
        am4core.color("#3498DB"),
        am4core.color("#F1C40F"),
        am4core.color("#232555"),
        am4core.color("#E74C3C"),
        am4core.color("#367B25"),
        am4core.color("#000"),
        am4core.color("#A569BD"),
        am4core.color("#C0392B"),
        am4core.color("#DF3520"),
      ];

      // world settings
      let worldSeries = _worldMap.series.push(new am4maps.MapPolygonSeries());
      worldSeries.useGeodata = true;
      worldSeries.geodata = am4geodata_worldHigh;
      worldSeries.exclude = ["AQ"];

      let worldPolygon = worldSeries.mapPolygons.template;
      worldPolygon.tooltipText = "{name}";
      worldPolygon.nonScalingStroke = true;
      worldPolygon.strokeOpacity = 0.5;
      worldPolygon.fill = am4core.color("rgb(255, 247, 238);");
      worldPolygon.propertyFields.fill = "color";

      let hsWorld = worldPolygon.states.create("hover");
      hsWorld.properties.fill = _worldMap.colors.getIndex(9);

      // country settings
      let countrySeries = _worldMap.series.push(new am4maps.MapPolygonSeries());
      countrySeries.useGeodata = true;
      countrySeries.hide();
      countrySeries.geodataSource.events.on("done", function (ev) {
        worldSeries.hide();
        countrySeries.show();
      });

      let countryPolygon = countrySeries.mapPolygons.template;
      countryPolygon.tooltipText = "{name}";
      countryPolygon.nonScalingStroke = true;
      countryPolygon.strokeOpacity = 0.5;
      countryPolygon.fill = am4core.color("#eee");

      let hsCountry = countryPolygon.states.create("hover");
      hsCountry.properties.fill = _worldMap.colors.getIndex(9);

      // world event
      worldPolygon.events.on("hit", function (ev) {
        ev.target.series.chart.zoomToMapObject(ev.target);
        let map = ev.target.dataItem.dataContext.map;
        if (map) {
          ev.target.isHover = false;
          countrySeries.geodataSource.url =
            "https://www.amcharts.com/lib/4/geodata/json/" + map + ".json";
          countrySeries.geodataSource.load();
          btnBack.show();
        }
      });

      // settings up data
      let data = [];
      let icolor = 0;
      for (let id in countries) {
        if (countries.hasOwnProperty(id)) {
          let country = countries[id];
          if (country.maps.length) {
            data.push({
              id: id,
              color: colorSet[icolor],
              map: country.maps[0],
            });
          }
          icolor = icolor + 1;
        }
      }
      worldSeries.data = data;

      // add zoom control
      let btnZoomControl = new am4maps.ZoomControl();
      btnZoomControl.marginRight = 10;
      btnZoomControl.opacity = 0.6;
      btnZoomControl.stroke = btnStokeColor;
      _worldMap.zoomControl = btnZoomControl;

      // Add back button
      let btnBack = _worldMap.createChild(am4core.Button);
      let btnBackIcon = new am4core.Sprite();
      btnBackIcon.path = "M-6.5,0.5 L7.5,0.5";
      btnBackIcon.stroke = btnStokeColor;
      btnBack.icon = btnBackIcon;

      btnBack.align = "right";
      btnBack.valign = "top";
      btnBack.marginRight = 14;
      btnBack.marginTop = 50;
      btnBack.padding(5, 0, 5, 0);
      btnBack.width = 31;
      btnBack.height = 31;
      btnBack._background.fill = btnBackgroundColor;
      btnBack._background.opacity = 0.6;
      btnBack.opacity = 0.6;
      btnBack.hide();
      btnBack.events.on("hit", function (ev) {
        worldSeries.show();
        _worldMap.goHome();
        countrySeries.hide();
        btnBack.hide();
      });

      // Add home button
      let btnHome = _worldMap.chartContainer.createChild(am4core.Button);
      let btnHomeIcon = new am4core.Sprite();
      btnHomeIcon.path =
        "M-6.5,0.5 L0.5,-6.5 L7.5,0.5 L6.5,0.5 L6.5,6.5 L2.5,6.5 L2.5,2.5 L-1.5,2.5 L-1.5,6.5 L-5.5,6.5 L-5.5,0.5 Z";
      btnHomeIcon.fill = btnStokeColor;
      btnHomeIcon.padding(4, 3, 4, 3);
      btnHome.icon = btnHomeIcon;

      btnHome.align = "right";
      btnHome.marginRight = 14;
      btnHome.padding(5, 5, 5, 5);
      btnHome._background.fill = btnBackgroundColor;
      btnHome.opacity = 0.6;
      btnHome.events.on("hit", function () {
        _worldMap.goHome();
      });

      this.worldMap = _worldMap;
    });
  }

  componentWillUnmount() {
    if (this.worldMap) {
      this.worldMap.dispose();
    }
  }

  render() {
    let mapStyle = {
      width: "840px",
      height: "540px",
    };
    return <div id="wordMap" style={mapStyle}></div>;
  }
}

export default WorldMap;

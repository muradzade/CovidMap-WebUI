import { CountryService } from './../../services/shared-data/country.service';
import { CasesApiService } from './../../services/cases-api/cases-api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { MapChart } from 'angular-highcharts';
import { Country } from 'src/app/models/Country';

var Highcharts = require("highcharts/highmaps.js");



@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss']
})
export class WorldMapComponent implements OnInit {
  map = require('@highcharts/map-collection/custom/world.geo.json');
  global: [] = [];
  mapchart: MapChart;
  data: Country[] = [];
  constructor(private casesApi: CasesApiService,
    private countryService: CountryService) { }

  ngOnInit(): void {
    let globalCases = 0;
    let globalRecovered = 0;
    let globalDeaths = 0;
    this.casesApi.getAllCases().subscribe(data => {

      data.forEach(element => {
        this.data.push(element);
        globalCases += element.totalCase;
        globalRecovered += element.totalRecovered;
        globalDeaths += element.totalDeaths;
      })
       //ayni scope icinde cagirmak icin
      var onClickPoint=(name:string)=>{
        let country = this.data.find(c => c.name === name);
        this.countryService.sendCountry(country);
      }
      
      this.mapchart = new MapChart({
        chart: {
          borderWidth: 0,
          height: "65%",
          map: this.map,
          backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, "#4a0000"],
              [1, "#000000"]
            ]
          }
        },
        title: {
          text: "Harita Gosterimi",
          style: {
            color: "White",
            fontWeight: "bold",
            fontSize: "2em",
            opacity: 0.8
          }
        },
        subtitle: {
          text: "",
          style: {
            color: "white",
            fontSize: "1em",
            opacity: 0.8
          }
        },
        mapNavigation: {
          enabled: true,
          buttonOptions: {
            verticalAlign: "top"
          }
        },
        colorAxis: {
          dataClasses: [
            {
              from: 0,
              to: 0,
              color: "#FBEFEF"
            }, {
              from: 1,
              to: 100,
              color: "#FA5858"
            }, {
              from: 101,
              to: 1000,
              color: "#ff0000"
            }, {
              from: 1001,
              to: 10000,
              color: "#F880000"
            }, {
              from: 10001,
              to: 100000,
              color: "#b10000"
            }, {
              from: 100001,
              color: "#ff0000"
            },
          ]
        },
        series: [
          {
            type: undefined,
            name: "Covid",
            allowPointSelect: true,
            animation: {
              duration: 2000
            },
            borderColor: "FFDF00",
            joinBy: ["iso-a2", "code"],
            data: this.data,
            dataLabels: {
              enabled: false,
              format: "{point.name}"
            },
            minSize: 4,
            maxSize: "40%",
            tooltip: {
              headerFormat: "{point.name}",
              pointFormat: '<b>{point.name}</b> <br/>Toplam Vaka : {point.totalCase} <br/>Toplam Iyilesen : {point.totalRecovered}<br/>Toplam Vefat : {point.totalDeaths}'
            },
            events: {
              click: function(event)
              {
                event.point.zoomTo();                
                onClickPoint(event.point.name);
              }
            }
          }
        ],
      })
    });
  }
}



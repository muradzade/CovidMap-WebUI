import { Chart } from 'chart.js';
import { CasesApiService } from './../../services/cases-api/cases-api.service';
import { CountryService } from './../../services/shared-data/country.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Country } from 'src/app/models/Country';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  country: Country;

  constructor(private countryService:CountryService,
              private casesApi:CasesApiService) { }
  chartType:string;
  chartData:any;
  charOptions:any;

  monthsToNow:string[]=[];
  chart:Chart;
  date:Date;
  countries:Country[]=[];

  ngOnInit(): void {

    //sadece simdiki ay a kadar gostersin diye
    let months=["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"]
    let newDate = new Date(Date.now());//simdinin tarihi alinir
    for(let i=0;i<= (<number>newDate.getMonth());i++)//simdiki ay'a kadar label dizisine eklenir
    {
      this.monthsToNow.push(months[i]);
    }
    //chart verileri doldurulur
    this.chartType="line";
    this.chartData={
      labels:this.monthsToNow,
      datasets:[
        {
          label:"Vakalar",
          data:[0,0,0,0,0,0,0,0,0,0,0,0],
          borderColor: "rgba(255,204,0,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          fill:false
        
        },
        {
          label:"Iyilesenler",
          data:[0,0,0,0,0,0,0,0,0,0,0,0],
          borderColor: "rgba(51,204,51,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          fill:false
        },
        {
          label:"Vefat edenler",
          data:[0,0,0,0,0,0,0,0,0,0,0,0],
          borderColor: "rgba(255,0,0,1)",
          pointColor: "rgba(51,153,102,0.2)",
          pointStrokeColor: "#fff",  
          fill:false      
        }
      ]    
    };
    this.charOptions= {
      responsive: true,
      title: {
        display: true,
        text: "Dünya geneli aylık hastalık gelişimi"
      },
      tooltips: {
        mode: 'label',
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Aylar'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Veriler'
          }
        }]
      }
    }
    
    this.casesApi.getGlobal().subscribe(virusCases=>{
      for(let i=0;i<12;i++)
      {
        this.chartData.datasets[0].data[i]=virusCases[i].cases;
        this.chartData.datasets[1].data[i]=virusCases[i].recovered;
        this.chartData.datasets[2].data[i]=virusCases[i].deaths;
      }
      this.chart = new Chart('lineChart',{
        type:"line",
        data:this.chartData,
        options:this.charOptions
      });

    })
    


    this.countryService.getCountry().subscribe(country=>{
      this.country=country;
      this.casesApi.getCaseByCountryId(this.country.id?.toString())
      .subscribe(cases=>{
        for(let i=0;i<12;i++)    
        {//eski veriler sifirlansin
          this.chartData.datasets[0].data[i]=0;
          this.chartData.datasets[1].data[i]=0;
          this.chartData.datasets[2].data[i]=0;
        }        
        cases.forEach(element=>{
          this.date=new Date(element.date);
          this.chartData.datasets[0].data[this.date.getMonth()]+=element.cases;//datasets[0] =toplam vakalar
          this.chartData.datasets[1].data[this.date.getMonth()]+=element.recovered;//datasets[1] =iyilesenler
          this.chartData.datasets[2].data[this.date.getMonth()]+=element.deaths;//datasets[2] =vefatlar
        })
        //eger country-list den deger gelmisse bu fonksiyonun icinde 
        //chart data'si guncellenerek bir daha chart kurulmali
        
        this.chart.options.title.text=this.country.name+" aylık hastalık gelişimi";
        this.chart.update();
      })

    })

  }

}

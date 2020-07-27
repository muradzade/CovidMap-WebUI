import { HttpClient } from '@angular/common/http';
import { Country } from './../../models/Country';
import { CasesApiService } from './../../services/cases-api/cases-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {


  constructor(private casesApi:CasesApiService) { }
  chartElementCount:number=5;
  chartType: string = "pie";
  chartLabel: string[] = [];
  chartData: number[] = [];
  countries: Country[] = []; 

  chartOptions = {
    animation: {
      duration: 1000,
      easing: "easeInOutQuad"
    },

    responsive: true,
    legend: {
      display: true,
      position: "bottom",
      fullWidth: false,
      reverse: false
    },
  };


  pieColors = [{
    backgroundColor:[
      'rgba(0,204,153,0.8)',
      'rgba(51,204,255,0.8)',
      'rgba(255,102,255,0.8)',
      'rgba(153,102,51,0.8)',
      'rgba(204,0,102,0.8)',
      'rgba(102,204,255,0.8)'
    ]
  }]
  ngOnInit(): void {
    this.casesApi.getAllCases().subscribe(data=>{
      let sum=0;
      let others=0;
      let count=0;
      data.forEach(element=>{
        this.countries.push(element);
        //to calculate rate
        sum+=element.totalCase;
        count++;
      })
      let i=0
      //fill pie chart
      for(;i<=this.chartElementCount-1;i++)
      {
        this.chartData.push(this.countries[i].totalCase);
        this.chartLabel.push(this.countries[i].name+" - "+Math.round(this.countries[i].totalCase*100/sum)+"%");
      }
      //find sum
      for(;i<count;i++)
      {
        others+=this.countries[i].totalCase;
      }
      this.chartData.push(others);
      this.chartLabel.push("Digerleri - "+Math.round(others*100/sum)+"%");
    })    
  }

}

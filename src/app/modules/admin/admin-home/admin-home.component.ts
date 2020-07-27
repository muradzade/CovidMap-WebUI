import { CasesApiService } from './../../../services/cases-api/cases-api.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  headElements = ['name','totalCase','totalRecovered','totalDeaths'];
  dataSource:MatTableDataSource<any>;
  constructor(private api: CasesApiService) { }

  ngOnInit(): void {
    this.api.getAllCases().subscribe(data=>{
      this.dataSource= new MatTableDataSource(data);
    });
  }

  
  filterCountry(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

import { Country } from './../../models/Country';
import { CountryService } from './../../services/shared-data/country.service';
import { CasesApiService } from './../../services/cases-api/cases-api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table'


@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'totalCase', 'totalRecovered', 'totalDeaths'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private casesApi:CasesApiService,
              private countryService:CountryService) {
    
  }

  ngOnInit() {
    this.casesApi.getAllCases().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    })
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  onClick(country :Country){
    this.countryService.sendCountry(country);
  }
}

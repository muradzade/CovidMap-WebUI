import { VirusCase } from './../../../models/VirusCase';
import { AddUpdateComponent } from './../add-update/add-update.component';
import { CasesApiService } from '../../../services/cases-api/cases-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  headElements = ['date','cases','recovered','deaths'];
  dataSource:MatTableDataSource<any>;
  countryId:string;
  constructor(    
    private route: ActivatedRoute,
    private casesApiService: CasesApiService,
    private location: Location,
    public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.getCases();
  }

  getCases()
  {
    this.countryId = this.route.snapshot.paramMap.get('id');
    this.casesApiService.getCaseByCountryId(this.countryId)
      .subscribe(data=>this.dataSource=new MatTableDataSource(data));
  }


  openDialog(virusCase?:VirusCase): void {
    if(virusCase==null)
    {
      virusCase=new VirusCase();
      virusCase.id=null;
      virusCase.countryId=parseInt(this.countryId);
      virusCase.deaths=null;
      virusCase.recovered=null;
      virusCase.cases=null;
      virusCase.date=null;
    }
    const dialogRef = this.dialog.open(AddUpdateComponent, {
      width: '350px',
      data : virusCase
    });

    dialogRef.afterClosed().subscribe(result => {
        location.reload();
    });
  }
}

import { CasesApiService } from './../../../services/cases-api/cases-api.service';
import { VirusCase } from './../../../models/VirusCase';
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, Validators, FormGroup} from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-update',
  templateUrl: './add-update.component.html',
  styleUrls: ['./add-update.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddUpdateComponent implements OnInit {

  
  minDate= this.data.id==null ? new Date(Date.now()) : '';;
  fontSizeControl = new FormControl(0, Validators.min(0));

  case=new FormGroup({
    date: new FormControl(new Date((this.data.date==null) ? Date.now() : this.data.date), Validators.required),
    cases: new FormControl(this.data.cases,Validators.min(0)),
    recovered: new FormControl(this.data.recovered,Validators.min(0)),
    deaths: new FormControl(this.data.deaths,Validators.min(0))
  });

  constructor(
    private location:Location,
    private casesApiService: CasesApiService,
    public dialogRef: MatDialogRef<AddUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VirusCase) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  //Update icin disable=true Add icin disable=false 
  isDisabled(): boolean{
    if(this.data.id==null){
      return false;
    }
    else{
      return true;
    }
  }

  add()
  {
    if(this.case.valid==true)
    {
      
      let newCase=<VirusCase>this.case.value;
      newCase.countryId=this.data.countryId;
      this.casesApiService.createCase(newCase).subscribe(res=>{
        alert("Kaydedildi");
        this.dialogRef.close();
      },err=>{
        if(err.status==400)
        {
          alert("Ayni tarihe 2 veri eklenemez.Lutfen varolan veriyi duzenlemeyi tercih ediniz");
        }    
      });
      
    }

  }
  update()
  { 
    if(this.case.valid==true)
    {
      let newCase=<VirusCase>this.case.value;
      newCase.id=this.data.id;
      newCase.countryId=this.data.countryId;
      
      this.casesApiService.updateCase(newCase).subscribe(res=>{
        alert("Guncellendi");
        this.dialogRef.close();
      },err=>{
        if(err.status==400)
        {
          alert("Ayni tarihe 2 veri eklenemez");
        }   
      });
      
    }
  }

}

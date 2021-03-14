import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export type Data = {
  login:boolean
}

@Component({
  selector: 'app-admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.scss']
})
export class AdminDialogComponent implements OnInit {
  pincode:number;
  login:boolean;
  signInForm: FormGroup;
 
  ngOnInit(): void {
   
  }

  constructor(
    public dialogRef: MatDialogRef<AdminDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb: FormBuilder) {
      this.login = data?.login;
      this.signInForm = this.fb.group({
        create: ['', [Validators.required, Validators.maxLength]],
        enter: ['', [Validators.required, Validators.maxLength]]
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
 

}
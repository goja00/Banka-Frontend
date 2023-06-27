import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Banka } from 'src/app/model/banka.model';
import { Filijala } from 'src/app/model/filijala.model';
import { BankaService } from 'src/app/service/banka.service';
import { FilijalaService } from 'src/app/service/filijala.service';

@Component({
  selector: 'app-filijala-dialog',
  templateUrl: './filijala-dialog.component.html',
  styleUrls: ['./filijala-dialog.component.css']
})
export class FilijalaDialogComponent {

  public flag!:number
  bankas!:Banka[]
 
constructor(
@Inject(MAT_DIALOG_DATA)public filijala:Filijala,
public dialogRef: MatDialogRef<FilijalaDialogComponent>,
public filijalaService:FilijalaService,
public snackBar: MatSnackBar,
public bankaService:BankaService
){}

ngOnInit(){
  this.bankaService.getAllBanka().subscribe(data=>{this.bankas=data})
}


add()
{
this.filijalaService.addFilijala(this.filijala)
this.snackBar.open('Uspesno ste dodali filijalu!','OK',{duration:1500})

}
update()
{
  this.filijalaService.updateFilijala(this.filijala)
  this.snackBar.open('Uspesno ste azurirali filijalu!','OK',{duration:1500})
}
delete()
{
  this.filijalaService.deleteFilijala(this.filijala)
  this.snackBar.open('Uspesno ste izbrisali filijalu!','OK',{duration:1500})
}
cancel()
{
  this.dialogRef.close()
}
compareTo(a: any, b: any) {
  return a.id === b.id;
}
}

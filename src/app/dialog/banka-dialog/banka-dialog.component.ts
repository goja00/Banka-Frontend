import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Banka } from 'src/app/model/banka.model';
import { BankaService } from 'src/app/service/banka.service';


@Component({
  selector: 'app-banka-dialog',
  templateUrl: './banka-dialog.component.html',
  styleUrls: ['./banka-dialog.component.css']
})
export class BankaDialogComponent {

public flag!:number

constructor(
@Inject(MAT_DIALOG_DATA)public banka:Banka,
public dialogRef: MatDialogRef<BankaDialogComponent>,
public bankaService:BankaService,
public snackBar: MatSnackBar,
){}

add()
{
this.bankaService.addBanka(this.banka)
this.snackBar.open('Uspesno ste dodali banku!','OK',{duration:1500})

}
update()
{this.bankaService.updateBanka(this.banka)
  this.snackBar.open('Uspesno ste azurirali banku!','OK',{duration:1500})}
delete()
{
  this.bankaService.deleteBanka(this.banka)
  this.snackBar.open('Uspesno ste izbrisali banku!','OK',{duration:1500})
}
cancel()
{
  this.dialogRef.close()
}

}

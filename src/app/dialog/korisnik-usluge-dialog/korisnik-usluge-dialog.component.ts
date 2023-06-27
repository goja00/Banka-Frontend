import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Korisnik_usluge } from 'src/app/model/korisnik_usluge.model';
import { KorisnikUslugeService } from 'src/app/service/korisnik-usluge.service';

@Component({
  selector: 'app-korisnik-usluge-dialog',
  templateUrl: './korisnik-usluge-dialog.component.html',
  styleUrls: ['./korisnik-usluge-dialog.component.css']
})
export class KorisnikUslugeDialogComponent {
  public flag!:number

constructor(
@Inject(MAT_DIALOG_DATA)public korisnikUsluge:Korisnik_usluge,
public dialogRef: MatDialogRef<KorisnikUslugeDialogComponent>,
public korisnikUslugeService:KorisnikUslugeService,
public snackBar: MatSnackBar,
){}

add()
{
this.korisnikUslugeService.addKorisnik_usluge(this.korisnikUsluge)
this.snackBar.open('Uspesno ste dodali korisnika usluge!','OK',{duration:1500})

}
update()
{this.korisnikUslugeService.updateKorisnik_usluge(this.korisnikUsluge)
  this.snackBar.open('Uspesno ste azurirali korisnika usluge!','OK',{duration:1500})}
delete()
{
  this.korisnikUslugeService.deleteKorisnik_usluge(this.korisnikUsluge)
  this.snackBar.open('Uspesno ste izbrisali korisnika usluge!','OK',{duration:1500})
}
cancel()
{
  this.dialogRef.close()
}
}

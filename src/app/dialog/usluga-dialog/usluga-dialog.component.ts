import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Filijala } from 'src/app/model/filijala.model';
import { Korisnik_usluge } from 'src/app/model/korisnik_usluge.model';
import { Usluga } from 'src/app/model/usluga.model';
import { FilijalaService } from 'src/app/service/filijala.service';
import { KorisnikUslugeService } from 'src/app/service/korisnik-usluge.service';
import { UslugaService } from 'src/app/service/usluga.service';
@Component({
  selector: 'app-usluga-dialog',
  templateUrl: './usluga-dialog.component.html',
  styleUrls: ['./usluga-dialog.component.css']
})
export class UslugaDialogComponent {

  public flag!:number
  filijalas!:Filijala[]
  korisniks!:Korisnik_usluge[]

  constructor(
  @Inject(MAT_DIALOG_DATA)public usluga:Usluga,
  public dialogRef: MatDialogRef<UslugaDialogComponent>,
  public UslugaService:UslugaService,
  public snackBar: MatSnackBar,
  public filijalaService:FilijalaService,
  public korisnikUslugeService:KorisnikUslugeService
  ){}

  ngOnInit(){
    this.filijalaService.getAllFilijala().subscribe(data=>this.filijalas=data)
    this.korisnikUslugeService.getAllKorisnik_usluge().subscribe(data=>this.korisniks=data)
  }
  
  add()
  {
  this.UslugaService.addUsluga(this.usluga)
  this.snackBar.open('Uspesno ste dodali uslugu!','OK',{duration:1500})
  
  }
  update()
  {
    this.UslugaService.updateUsluga(this.usluga)
    this.snackBar.open('Uspesno ste azurirali uslugu!','OK',{duration:1500})}
  delete()
  {
    this.UslugaService.deleteUsluga(this.usluga)
    this.snackBar.open('Uspesno ste izbrisali uslugu!','OK',{duration:1500})
  }
  cancel()
  {
    this.dialogRef.close()
  }

  compareTo(a: any, b: any) {
    return a.id === b.id;
  }


}

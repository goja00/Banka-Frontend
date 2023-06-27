import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Korisnik_usluge } from '../model/korisnik_usluge.model';
import { KorisnikUslugeService } from '../service/korisnik-usluge.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { KorisnikUslugeDialogComponent } from '../dialog/korisnik-usluge-dialog/korisnik-usluge-dialog.component';

@Component({
  selector: 'app-korisnik-usluge',
  templateUrl: './korisnik-usluge.component.html',
  styleUrls: ['./korisnik-usluge.component.css']
})
export class KorisnikUslugeComponent {
  displayedColumns=['id','ime','prezime','maticni_broj','actions'];

  dataSource!:MatTableDataSource<Korisnik_usluge>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private korisnikUsluge_Service:KorisnikUslugeService,private dialog:MatDialog){}

  ngOnInit():void{
    this.loadData();
  }
  public loadData() {
    this.korisnikUsluge_Service.getAllKorisnik_usluge().subscribe( data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data: any, property) => {
        switch(property) {
          case 'id' : return data[property];
          case 'ime' : return data[property];
          case 'prezime' : return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(filterValue : string) {
    filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  openDialog(flag:number,id:Number,ime:String,prezime:String,maticni_broj:number)
  {
    const dialog=this.dialog.open(KorisnikUslugeDialogComponent,{data:{id:id,ime:ime,prezime:prezime,maticni_broj:maticni_broj}})
    dialog.componentInstance.flag=flag;
    dialog.afterClosed().subscribe(data=>{ if (data===1){this.loadData()}})
  }
}


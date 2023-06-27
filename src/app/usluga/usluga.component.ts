import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Usluga } from '../model/usluga.model';
import { UslugaService } from '../service/usluga.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UslugaDialogComponent } from '../dialog/usluga-dialog/usluga-dialog.component';
import { Filijala } from '../model/filijala.model';
import { Korisnik_usluge } from '../model/korisnik_usluge.model';

@Component({
  selector: 'app-usluga',
  templateUrl: './usluga.component.html',
  styleUrls: ['./usluga.component.css']
})
export class UslugaComponent {
  displayedColumns=['id','naziv','opis_usluge','datum_ugovora','provizija','filijala','korisnik_usluge','actions'];
  datum:Date = new Date()
  filijala:Filijala=new Filijala()
  kor:Korisnik_usluge=new Korisnik_usluge()
   dataSource!:MatTableDataSource<Usluga>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private uslugaService:UslugaService,private dialog:MatDialog){}

  ngOnInit():void{
    this.loadData();
  }
  public loadData() {
    this.uslugaService.getAllUsluga().subscribe( data => {
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const accumulator = (currentTerm: string, key: string) => {
          return key === 'filijala' ? currentTerm + data.filijala.id : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      this.dataSource.sortingDataAccessor = (data: any, property) => {
        switch(property) {
          case 'id' : return data[property];
          case 'datum_ugovora' : return data[property];
          case 'provizija' : return data[property];
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

  openDialog(flag:number,id:Number,naziv:String,opis_usluge:String,datum_ugovora:Date,provizija:number,filijala:Filijala,korisnik_usluge:Korisnik_usluge)
  {
    const dialog=this.dialog.open(UslugaDialogComponent,{data:{id:id,naziv:naziv,opis_usluge:opis_usluge,
    datum_ugovora:datum_ugovora,provizija:provizija,filijala:filijala,korisnik_usluge:korisnik_usluge}})
    dialog.componentInstance.flag=flag;
    dialog.afterClosed().subscribe(data=>{ if (data===1){this.loadData()}})
  }
  }


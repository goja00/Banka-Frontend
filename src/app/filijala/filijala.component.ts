import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Filijala } from '../model/filijala.model';
import { FilijalaService } from '../service/filijala.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FilijalaDialogComponent } from '../dialog/filijala-dialog/filijala-dialog.component';
import { Banka } from '../model/banka.model';

@Component({
  selector: 'app-filijala',
  templateUrl: './filijala.component.html',
  styleUrls: ['./filijala.component.css']
})
export class FilijalaComponent implements OnInit {
  displayedColumns=['id','adresa','broj_pultova','posedujeSef','banka','actions'];
  banka1:Banka=new Banka()
  dataSource!:MatTableDataSource<Filijala>;
  @Input() 
  selektovanaBanka!:Banka

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private filijalaService:FilijalaService,private dialog:MatDialog){}

  ngOnInit(){
    this.loadData();
  }

  ngOnChanges()
  {
  if(this.selektovanaBanka.id)
    {
    this.loadData()
    }
  }

  public loadData() {
    this.filijalaService.getFilijalas(this.selektovanaBanka.id).subscribe( data => {
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const accumulator = (currentTerm: string, key: string) => {
          return key === 'banka' ? currentTerm + data.banka.naziv : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      this.dataSource.sortingDataAccessor = (data: any, property) => {
        switch(property) {
          case 'id' : return data[property];
          case 'posedujeSef' : return data[property];
          case 'banka' : return data[property];
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

  openDialog(flag:number,id:number,adresa:String,broj_pultova:number,posedujeSef:boolean,banka:Banka)
  {
    const dialog=this.dialog.open(FilijalaDialogComponent,{data:{id:id,adresa:adresa,broj_pultova:broj_pultova,
      posedujeSef:posedujeSef,banka:banka}})
    dialog.componentInstance.flag=flag;
    dialog.afterClosed().subscribe(data=>{ if (data===1){this.loadData()}})
  }
}

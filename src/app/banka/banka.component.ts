import { Component,Input,OnInit, ViewChild } from '@angular/core';
import { Banka } from '../model/banka.model';
import { Observable,filter } from 'rxjs';
import { BankaService } from '../service/banka.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BankaDialogComponent } from '../dialog/banka-dialog/banka-dialog.component';
import { Filijala } from '../model/filijala.model';

@Component({
  selector: 'app-banka',
  templateUrl: './banka.component.html',
  styleUrls: ['./banka.component.css']
})
export class BankaComponent {

  displayedColumns=['id','naziv','kontakt','pib','actions'];
  dataSource!:MatTableDataSource<Banka>;
  selektovanaBanka!:Banka

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private bankaService:BankaService,private dialog:MatDialog){}

  ngOnInit():void{
    this.loadData();
  }

  ngOnChanges(){
    if(this.selektovanaBanka.id)
    {
      this.loadData()
    }
  }

  public loadData() {
 
   this.bankaService.getAllBanka().subscribe( data => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sortingDataAccessor = (data: any, property) => {
      switch(property) {
        case 'id' : return data[property];
        case 'naziv' : return data[property];
        default: return data[property].toLocaleLowerCase();
      }
    };
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  })
  }
  selectedRow(row:Banka)
  {
  this.selektovanaBanka=row
  }

  applyFilter(filterValue : string) {
    filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog(flag:number,id:Number,naziv:String,kontakt:String,pib:number)
  {
    const dialog=this.dialog.open(BankaDialogComponent,{data:{id:id,naziv:naziv,kontakt:kontakt,pib:pib}})
    dialog.componentInstance.flag=flag;
    dialog.afterClosed().subscribe(data=>{ if (data===1){this.loadData()}})
  }

  
}

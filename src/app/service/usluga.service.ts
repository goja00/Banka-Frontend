import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usluga } from '../model/usluga.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UslugaService {

  constructor(private httpClient:HttpClient) { }

  private readonly API_URL = 'http://localhost:8082/usluga/';

  dataChange: BehaviorSubject<Usluga[]> = new BehaviorSubject<Usluga[]>([]);


  public getAllUsluga(): Observable<Usluga[]> {
    this.httpClient.get<Usluga[]>(this.API_URL).subscribe({
      next: (data) => {
        this.dataChange.next(data);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }}
    );
    return this.dataChange.asObservable();
  }

   public addUsluga(Usluga:Usluga): void {
    this.httpClient.post(this.API_URL,Usluga).subscribe();
   }

   public updateUsluga(Usluga:Usluga): void {
    this.httpClient.put(this.API_URL+Usluga.id,Usluga).subscribe();
   }
   public deleteUsluga(Usluga:Usluga): void {
    this.httpClient.delete(this.API_URL+Usluga.id).subscribe();
   }

}

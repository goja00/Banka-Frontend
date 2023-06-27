import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filijala } from '../model/filijala.model';


@Injectable({
  providedIn: 'root'
})
export class FilijalaService {
  constructor(private httpClient:HttpClient) { }

  private readonly API_URL = 'http://localhost:8082/filijala/';

  private readonly API_URL_F = 'http://localhost:8082/filijala/banka/';

  dataChange: BehaviorSubject<Filijala[]> = new BehaviorSubject<Filijala[]>([]);


  public getAllFilijala(): Observable<Filijala[]> {
    this.httpClient.get<Filijala[]>(this.API_URL).subscribe({
      next: (data) => {
        this.dataChange.next(data);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }}
    );
    return this.dataChange.asObservable();
  }

  public getFilijalas(id:number): Observable<Filijala[]> {
    this.httpClient.get<Filijala[]>(this.API_URL_F + id).subscribe({
      next: (data) => {
        this.dataChange.next(data);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }}
    );
    return this.dataChange.asObservable();
  }
  
   public addFilijala(filijala:Filijala): void {
    this.httpClient.post(this.API_URL,filijala).subscribe();
   }

   public updateFilijala(filijala:Filijala): void {
    this.httpClient.put(this.API_URL+filijala.id,filijala).subscribe();
   }
   public deleteFilijala(filijala:Filijala): void {
    this.httpClient.delete(this.API_URL+filijala.id).subscribe();
   }


}

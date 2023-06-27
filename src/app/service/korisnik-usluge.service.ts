import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Korisnik_usluge } from '../model/korisnik_usluge.model';

@Injectable({
  providedIn: 'root'
})
export class KorisnikUslugeService {

  constructor(private httpClient:HttpClient) { }

  private readonly API_URL = 'http://localhost:8082/korisnik_usluge/';

  dataChange: BehaviorSubject<Korisnik_usluge[]> = new BehaviorSubject<Korisnik_usluge[]>([]);


  public getAllKorisnik_usluge(): Observable<Korisnik_usluge[]> {
    this.httpClient.get<Korisnik_usluge[]>(this.API_URL).subscribe({
      next: (data) => {
        this.dataChange.next(data);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }}
    );
    return this.dataChange.asObservable();
  }

   public addKorisnik_usluge(korisnik_usluge:Korisnik_usluge): void {
    this.httpClient.post(this.API_URL,korisnik_usluge).subscribe();
   }

   public updateKorisnik_usluge(korisnik_usluge:Korisnik_usluge): void {
    this.httpClient.put(this.API_URL+korisnik_usluge.id,korisnik_usluge).subscribe();
   }
   public deleteKorisnik_usluge(korisnik_usluge:Korisnik_usluge): void {
    this.httpClient.delete(this.API_URL+korisnik_usluge.id).subscribe();
   }
}

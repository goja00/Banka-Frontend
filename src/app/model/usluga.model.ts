import { Filijala } from "./filijala.model";
import { Korisnik_usluge } from "./korisnik_usluge.model";

export class Usluga{
id!:number;
naziv!:string;
opis_usluge!:string;
datum_ugovora!:Date;
provizija!:number;
filijala!:Filijala;
korisnik_usluge!:Korisnik_usluge;
}
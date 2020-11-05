import { Injectable } from '@angular/core';

// https://github.com/brix/crypto-js
import sha512 from "crypto-js/sha512";

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  static hashSHA512(value: string) {
    return sha512(value).toString();
  }
}

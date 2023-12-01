import React from 'react';
import * as CryptoJS from 'crypto-js';

const SECRET_KEY_BASE64 = 'OuzqaPNvtoAD6u7eb3BTF8oRosWPg1Q/5oz+kyfTZGQ=';

export class AES256Encryption {
  constructor() {
    this.secretKey = CryptoJS.enc.Base64.parse(SECRET_KEY_BASE64);
  }

  encrypt(data) {
    try {
      const encryptedData = CryptoJS.AES.encrypt(data, this.secretKey, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });
      return encryptedData.toString();
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  decrypt(encryptedData) {
    try {
      const decryptedData = CryptoJS.AES.decrypt(encryptedData, this.secretKey, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });
      return decryptedData.toString(CryptoJS.enc.Utf8);
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

import * as CryptoJS from 'crypto-js';

export class SHA256Hashing {
  hash(rawPassword) {
    try {
      const hashedPassword = CryptoJS.SHA256(rawPassword.toString()).toString(CryptoJS.enc.Base64);
      return hashedPassword;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

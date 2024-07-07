import * as CryptoJS from 'crypto-js';

const keyEncrypt = '123';

export const saveData = (key: string, value: string) => {
  localStorage.setItem(key, encrypt(value));
};

export const getData = (key: string) => {
  let data = localStorage.getItem(key) || '';
  return decrypt(data);
};
export const removeData = (key: string) => {
  localStorage.removeItem(key);
};

export const clearData = () => {
  localStorage.clear();
};

const encrypt = (txt: string) => {
  return CryptoJS.AES.encrypt(txt, keyEncrypt).toString();
};

const decrypt = (txtToDecrypt: string) => {
  return CryptoJS.AES.decrypt(txtToDecrypt, keyEncrypt).toString(
    CryptoJS.enc.Utf8
  );
};

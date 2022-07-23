/*
 * Created on Mon Jul 04 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

class StorageService {
  setItem(item, value) {
    localStorage.setItem(item, JSON.stringify(value));
  }

  getItem(item) {
    let value = localStorage.getItem(item);
    if (value) value = JSON.parse(value);

    return value;
  }

  removeItem(item) {
    return localStorage.removeItem(item);
  }
}

const storageService = new StorageService();
export default storageService;

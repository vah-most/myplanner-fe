/*
 * Copyright (c) 2023 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

class StorageService {
  static setItem(item, value) {
    localStorage.setItem(item, JSON.stringify(value));
  }

  static getItem(item) {
    let value = localStorage.getItem(item);
    if (value) value = JSON.parse(value);

    return value;
  }

  static removeItem(item) {
    return localStorage.removeItem(item);
  }
}

export default StorageService;

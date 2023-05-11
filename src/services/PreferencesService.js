/*
 * Copyright (c) 2023 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import StorageService from "./StorageService";

const defaultPreferences = {
  hideCompletedTasks: false,
};

class PreferencesService {
  preferencesToken = "prefs";
  preferences = {};

  constructor() {
    this.preferences = { ...defaultPreferences };
    //TODO: we should properly load preferences from server
    StorageService.setItem(this.preferencesToken, this.preferences);
  }

  get() {
    return this.preferences;
  }

  getProp(key) {
    return key in this.preferences ? this.preferences[key] : null;
  }

  set(newPreferences) {
    this.preferences = newPreferences;
    StorageService.setItem(this.preferencesToken, this.preferences);
  }

  setProp(key, value) {
    this.preferences[key] = value;
    StorageService.setItem(this.preferencesToken, this.preferences);
  }
}

const preferencesService = new PreferencesService();
export default preferencesService;

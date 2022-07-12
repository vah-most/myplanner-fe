/*
 * Created on Sat Jul 09 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

const { default: storageService } = require("./StorageService");

const defaultPreferences = {
  hideCompletedTasks: true,
};

class PreferencesService {
  preferencesToken = "prefs";
  preferences = {};

  constructor() {
    this.preferences = { ...defaultPreferences };
    //TODO: we should properly load preferences from server
    storageService.setItem(this.preferencesToken, this.preferences);
  }

  get() {
    return this.preferences;
  }

  getProp(key) {
    return key in this.preferences ? this.preferences[key] : null;
  }

  set(newPreferences) {
    this.preferences = newPreferences;
    storageService.setItem(this.preferencesToken, this.preferences);
  }

  setProp(key, value) {
    this.preferences[key] = value;
    storageService.setItem(this.preferencesToken, this.preferences);
  }
}

const preferencesService = new PreferencesService();
export default preferencesService;

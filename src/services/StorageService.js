class StorageService {
  setItem(item, value) {
    localStorage.setItem(item, JSON.stringify(value));
  }

  getItem(item) {
    let value = localStorage.getItem(item);
    if (value) value = JSON.parse(value);

    return value;
  }
}

const storageService = new StorageService();
export default storageService;

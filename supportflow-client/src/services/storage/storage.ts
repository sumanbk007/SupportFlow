const StorageKeys = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
} as const;

const storage = {
  getAccessToken: () => localStorage.getItem(StorageKeys.ACCESS_TOKEN),
  setAccessToken: (token: string) =>
    localStorage.setItem(StorageKeys.ACCESS_TOKEN, token),
  removeAccessToken: () => localStorage.removeItem(StorageKeys.ACCESS_TOKEN),

  getRefreshToken: () => localStorage.getItem(StorageKeys.REFRESH_TOKEN),
  setRefreshToken: (token: string) =>
    localStorage.setItem(StorageKeys.REFRESH_TOKEN, token),
  removeRefreshToken: () => localStorage.removeItem(StorageKeys.REFRESH_TOKEN),

  clearAll: () => localStorage.clear(),
};

export { storage, StorageKeys };

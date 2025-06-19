export const localstorageUtils = {
  set: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  },

  get: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error getting localStorage key "${key}":`, error);
      return null;
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  },
};

export const themeUtils = {
  setTheme: (theme: "light" | "dark"): void => {
    localstorageUtils.set("theme", theme);
  },

  getTheme: (): "light" | "dark" => {
    const stored = localstorageUtils.get("theme");
    return stored === "dark" ? "dark" : "light";
  },

  removeTheme: (): void => {
    localstorageUtils.remove("theme");
  },
};

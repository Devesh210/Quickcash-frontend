const safeParse = (value, fallback = null) => {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    return fallback;
  }
};

export const storage = {
  getUser() {
    return safeParse(localStorage.getItem("user"), null);
  },
  getToken() {
    return safeParse(localStorage.getItem("token"), null);
  },
  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  },
  setToken(token) {
    localStorage.setItem("token", JSON.stringify(token));
  },
  clearAuth() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
};

export { safeParse };

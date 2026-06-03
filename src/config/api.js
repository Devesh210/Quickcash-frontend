import runtime from "./runtime";

export const apiUrl = (path = "") => {
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  return `${runtime.apiBaseUrl}${normalizedPath}`;
};

export const apiFetch = (path, options = {}) => {
  return fetch(apiUrl(path), options);
};

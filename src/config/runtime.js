const trimValue = (value, fallback = "") => {
  if (value == null || value === "") {
    return fallback;
  }

  return String(value).trim().replace(/^['"]|['"]$/g, "");
};

const runtime = {
  apiBaseUrl: trimValue(
    process.env.REACT_APP_API_BASE_URL,
    // "https://api.quickcash.ae/api/"
    "http://localhost:4000/api/"

  ),
  storageSecret: trimValue(process.env.REACT_APP_STORAGE_SECRET, "quickcash"),
  routerBaseName: trimValue(process.env.REACT_APP_ROUTER_BASENAME, "/"),
};

export default runtime;

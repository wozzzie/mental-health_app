const serverURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://mental-health-app-server.vercel.app";

export default serverURL;

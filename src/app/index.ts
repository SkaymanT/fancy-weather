import App from "./app";

window.onload = () => {
  const app = new App();
  app.initApp();
  window.setInterval(app.weather.refreshTime, 1000);
};
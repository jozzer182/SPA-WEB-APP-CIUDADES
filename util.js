const fs = require("fs"); // para escribir y trabajar con archivos del sistema
const path = require("path"); //Formula para usar la ruta hasta la que estamos trabajando

//Definición de constantes
const finalDir = "App";
const clientDir = "build";

//copiamos los html secundarios que solo sirven para rellenar el original
fs.copyFileSync(path.resolve(__dirname, clientDir, "index.html"), path.resolve(__dirname, finalDir, "index.html"))
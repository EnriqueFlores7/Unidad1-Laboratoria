function Calcular_Modulo(parte_real, parte_img) {
    let resultado = Math.sqrt(parte_real * parte_real + parte_img * parte_img);
    return resultado.toFixed(3);
}

function Calcular_argum(parte_real, parte_img) {
    let resultado = Math.atan2(parte_img, parte_real);
    return resultado.toFixed(3);
}

function Forma_Polar(parte_real, parte_img) {
    let modulo = Calcular_Modulo(parte_real, parte_img);
    let argumento = Calcular_argum(parte_real, parte_img);
    return modulo + "(cos(" + "<span>" + argumento + "</span>" + ") + i*sin(" + "<span>" + argumento + "</span>" + "))";
}

function Forma_exponencial(parte_real, parte_img) {
    let modulo = Calcular_Modulo(parte_real, parte_img);
    let argumento = Calcular_argum(parte_real, parte_img);
    return modulo + "e<sup>i" + "<span>" + argumento + "</span>" + "</sup>";
}

function Forma_polarCartesiana(modulo, angulo) {
    let parteReal = modulo * Math.cos(angulo);
    let parteImaginaria = modulo * Math.sin(angulo);
    return parteReal.toFixed(3) + " + " + parteImaginaria.toFixed(3) + "i";
}

function exponencialACartesiana(modulo, angulo) {
    let parteReal = modulo * Math.cos(angulo);
    let parteImaginaria = modulo * Math.sin(angulo);
    return parteReal.toFixed(3) + " + " + parteImaginaria.toFixed(3) + "i";
}

function exponencialACartesiana(modulo, angulo) {
    let parteReal = modulo * Math.cos(angulo);
    let parteImaginaria = modulo * Math.sin(angulo);
    return parteReal.toFixed(3) + " + " + parteImaginaria.toFixed(3) + "i";
}

//Trabajamos para los elementos del UI
function validarEntradas() {
    let parteReal = document.getElementById('parte_real').value.trim();
    let parteImaginaria = document.getElementById('parte_img').value.trim();
    let mensajeError = document.getElementById('error');

    if (parteReal === "" || parteImaginaria === "") {
        mensajeError.textContent = "Por favor, completa ambos campos para la parte real e imaginaria.";
        return false;
    }
    mensajeError.textContent = ""; // Limpiar el mensaje de error si todo está bien
    return true;
}

function convertirPolar() {
    if(validarEntradas()){
    let parte_real = parseFloat(document.getElementById('parte_real').value);
    let parte_img = parseFloat(document.getElementById('parte_img').value);
    document.getElementById('resultado').innerHTML = 'Forma Polar: ' + Forma_Polar(parte_real, parte_img);
    }
}

function convertirExponencial() {
    if(validarEntradas()){
    let parte_real = parseFloat(document.getElementById('parte_real').value);
    let parte_img = parseFloat(document.getElementById('parte_img').value);
    document.getElementById('resultado').innerHTML = 'Forma Exponencial: ' + Forma_exponencial(parte_real, parte_img);
    }
}

function convertirPolarACartesiana() {
    alert("En la parte real introduza su modulo y en la imaginaria su argumento");
    if(validarEntradas()){
        let modulo = parseFloat(document.getElementById('parte_real').value);
        let angulo = parseFloat(document.getElementById('parte_img').value);
        let resultado = Forma_polarCartesiana(modulo, angulo);
        document.getElementById('resultado').innerHTML = 'Forma Cartesiana: ' + resultado;
    }
}

//Parte imaginaria en grados
function convertirExponencialACartesiana() {
    alert("Incluya su elemento imaginario en grado");
    if (validarEntradas()) {
        let modulo = parseFloat(document.getElementById('parte_real').value);
        let angulo = parseFloat(document.getElementById('parte_img').value); // Asegúrate de que el ángulo esté en grados
        console.log("Módulo:", modulo, "Ángulo en grados:", angulo); // Depuración

        let anguloEnRadianes = angulo * (Math.PI / 180);
        console.log("Ángulo en radianes:", anguloEnRadianes); // Depuración
        let resultado = exponencialACartesiana(modulo, anguloEnRadianes);
        document.getElementById('resultado').innerHTML = 'Forma Cartesiana: ' + resultado;
    }
}
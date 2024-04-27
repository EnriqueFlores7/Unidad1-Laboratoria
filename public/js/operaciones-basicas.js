function Limpiar_expresion(expresion) {
    return expresion.replace(/\s/g, '').replace(/^\+/, '');
}

function DefinirSigno(num) {
    if (num >= 0) {
        return '+';
    } else {
        return '';
    }
}
function Obtener_partes(expresion) {
    // Aplica la limpieza y actualiza la variable 'expresion'
    expresion = Limpiar_expresion(expresion);
    // Esta expresión regular maneja los números complejos correctamente.
    const match = expresion.match(/^([+-]?\d*\.?\d+)?([+-]?\d*\.?\d*)?i?$/);

    if (!match) {
        throw new Error("Formato invalido");
    }

    let real = 0;
    let imaginary = 0;

    // Extrae la parte real si existe
    if (match[1]) {
        real = parseFloat(match[1]);
    }

    // Extrae la parte imaginaria si existe
    if (match[2]) {
        imaginary = parseFloat(match[2]); // Esto asumirá correctamente que el número está completo
    } else if (expresion.includes('i') && !match[2]) {
        // Se busca el signo justo delante de 'i' si no hay número explícito
        const signMatch = expresion.match(/([+-])i$/);
        if (signMatch) {
            imaginary = signMatch[1] === '-' ? -1 : 1;
        } else {
            imaginary = 1; // Por defecto a 1 si solo 'i'
        }
    }

    return { real, imaginary };
}

function Sumar_complejos(expresion1, expresion2) {
    let partes1 = Obtener_partes(expresion1);
    let partes2 = Obtener_partes(expresion2)
    const SumaReal = partes1.real + partes2.real;
    const SumaImg = partes1.imaginary + partes2.imaginary;
    let signo = DefinirSigno(SumaImg);
    return (SumaReal + signo + SumaImg + "i");
}

function Restar_complejos(expresion1, expresion2) {
    let partes1 = Obtener_partes(expresion1);
    let partes2 = Obtener_partes(expresion2);
    const RestReal = partes1.real - partes2.real;
    const RestImg = partes1.imaginary - partes2.imaginary;
    let signo = DefinirSigno(RestImg);
    return (RestReal + signo + RestImg + "i");
}

function Multiplicacion_Compleja(expresion1, expresion2) {
    let partes1 = Obtener_partes(expresion1);
    let partes2 = Obtener_partes(expresion2);
    const resultadoReal = partes1.real * partes2.real - partes1.imaginary * partes2.imaginary;
    const resultadoImg = partes1.real * partes2.imaginary + partes1.imaginary * partes2.real;
    let signo = DefinirSigno(resultadoImg);
    return (resultadoReal + signo + resultadoImg + "i");
}


function Division_compleja(expresion1, expresion2) {
    let partes1 = Obtener_partes(expresion1);
    let partes2 = Obtener_partes(expresion2);
    const divisor = partes2.real * partes2.real + partes2.imaginary * partes2.imaginary;

    if (divisor === 0) {
        throw new Error("División por cero no definida en los números complejos.");
    }

    const resultadoReal = (partes1.real * partes2.real + partes1.imaginary * partes2.imaginary) / divisor;
    const resultadoImg = (partes1.imaginary * partes2.real - partes1.real * partes2.imaginary) / divisor;

    let signo = DefinirSigno(resultadoImg);
    return `${resultadoReal.toFixed(2)}${signo}${Math.abs(resultadoImg.toFixed(2))}i`;
}

//Trabajamos con la interfaz
function validarEntradas() {
    let parteReal = document.getElementById('ecua1').value.trim();
    let parteImaginaria = document.getElementById('ecua2').value.trim();
    let mensajeError = document.getElementById('error');

    if (parteReal === "" || parteImaginaria === "") {
        mensajeError.textContent = "Por favor, completa ambos campos para la parte real e imaginaria.";
        return false;
    }
    mensajeError.textContent = ""; // Limpiar el mensaje de error si todo está bien
    return true;
}

function Sumar() {
    if (validarEntradas()) {
        let expresion1 = document.getElementById('ecua1').value;
        let expresion2 = document.getElementById('ecua2').value;
        document.getElementById('resultado').innerHTML = 'Suma: ' + Sumar_complejos(expresion1, expresion2);
    }
}

function Restar() {
    if (validarEntradas()) {
        let expresion1 = document.getElementById('ecua1').value;
        let expresion2 = document.getElementById('ecua2').value;
        document.getElementById('resultado').innerHTML = 'Resta: ' + Restar_complejos(expresion1, expresion2);
    }
}

function Multiplicacion() {
    if (validarEntradas()) {
        let expresion1 = document.getElementById('ecua1').value;
        let expresion2 = document.getElementById('ecua2').value;
        document.getElementById('resultado').innerHTML = 'Multiplicación: ' + Multiplicacion_Compleja(expresion1, expresion2);
    }
}

function Division() {
    if (validarEntradas()) {
        let expresion1 = document.getElementById('ecua1').value;
        let expresion2 = document.getElementById('ecua2').value;
        document.getElementById('resultado').innerHTML = 'División: ' + Division_compleja(expresion1, expresion2);
    }
}
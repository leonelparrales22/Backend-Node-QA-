function soloNum(e) {
    var key = window.event ? e.which : e.keyCode;
    if (key < 48 || key > 57)
        e.preventDefault();
}

const fechaA = new Date();
const añoActual = parseInt(fechaA.getFullYear());
const diaA = parseInt(fechaA.getDate());
const mesA = parseInt(fechaA.getMonth() + 1);

function validar() {
    expresion_correo = /\w+@\w+\.+[a-z]/;
    expresion_contra = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    telef = document.getElementById("telefono").value;
    cedula = document.getElementById("cedula").value;
    correo = document.getElementById("correo").value;
    contra = document.getElementById("contra").value;
    fecha = document.getElementById("fecha-nacimiento").value;
    fecha2 = parseInt(fecha.substr(0, 4));
    dia = parseInt(fecha.substr(8, 10));
    mes = parseInt(fecha.substr(5, 7));
    anios = añoActual - fecha2;

    if (parseInt(fecha.substr(0, 4)) > añoActual) {
        alert("Año de cumpleaños superior al año actual");
        return false;
    } else if (anios < 15) {
        alert("Sistema de Autenticación permite a partir de 15 años de edad");
        return false;
    } else if ((dia > diaA) && (mes === mesA && fecha2 === añoActual)) {
        alert("Fecha de cumpleaños superior a la fecha actual");
        return false;
    }

    if (!expresion_contra.test(contra)) {
        alert("La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, una minúscula y mayúsculas.");
        return false;
    }

    if (telef.length < 10 || telef.length > 10) {
        alert("El campo teléfono debe tener 10 caracteres")
        return false;
    }

    if (!expresion_correo.test(correo)) {
        alert("El correo no es válido ");
        return false;
    }

    // VALIDAR CEDULA
    //Preguntamos si la cedula consta de 10 digitos
    if (cedula.length == 10) {

        //Obtenemos el digito de la region que sonlos dos primeros digitos
        var digito_region = cedula.substring(0, 2);

        //Pregunto si la region existe ecuador se divide en 24 regiones
        if (digito_region >= 1 && digito_region <= 24) {

            // Extraigo el ultimo digito
            var ultimo_digito = cedula.substring(9, 10);

            //Agrupo todos los pares y los sumo
            var pares = parseInt(cedula.substring(1, 2)) + parseInt(cedula.substring(3, 4)) + parseInt(cedula.substring(5, 6)) + parseInt(cedula.substring(7, 8));

            //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
            var numero1 = cedula.substring(0, 1);
            var numero1 = (numero1 * 2);
            if (numero1 > 9) { var numero1 = (numero1 - 9); }

            var numero3 = cedula.substring(2, 3);
            var numero3 = (numero3 * 2);
            if (numero3 > 9) { var numero3 = (numero3 - 9); }

            var numero5 = cedula.substring(4, 5);
            var numero5 = (numero5 * 2);
            if (numero5 > 9) { var numero5 = (numero5 - 9); }

            var numero7 = cedula.substring(6, 7);
            var numero7 = (numero7 * 2);
            if (numero7 > 9) { var numero7 = (numero7 - 9); }

            var numero9 = cedula.substring(8, 9);
            var numero9 = (numero9 * 2);
            if (numero9 > 9) { var numero9 = (numero9 - 9); }

            var impares = numero1 + numero3 + numero5 + numero7 + numero9;

            //Suma total
            var suma_total = (pares + impares);

            //extraemos el primero digito
            var primer_digito_suma = String(suma_total).substring(0, 1);

            //Obtenemos la decena inmediata
            var decena = (parseInt(primer_digito_suma) + 1) * 10;

            //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
            var digito_validador = decena - suma_total;

            //Si el digito validador es = a 10 toma el valor de 0
            if (digito_validador == 10)
                var digito_validador = 0;

            //Validamos que el digito validador sea igual al de la cedula
            if (digito_validador == ultimo_digito) {
                console.log('la cedula:' + cedula + ' es correcta');
                return true;
            } else {
                console.log('la cedula:' + cedula + ' es incorrecta');
                alert("Cedula Incorrecta")
                return false;
            }

        } else {
            // imprimimos en consola si la region no pertenece
            console.log('Esta cedula no pertenece a ninguna region');
            alert("Esta cédula no pertenece a ninguna region");
            return false;
        }
    } else {
        //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
        console.log('Esta cedula tiene menos de 10 Digitos');
        alert('La cédula debe tener 10 dígitos');
        return false;
    }


}
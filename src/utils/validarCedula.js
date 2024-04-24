//Validar cedula
const validarCedula = (cedula) => {
    if (cedula.length !== 10) {
      return false;
    }
  
    const digitos = cedula.substring(0, 9);
  
    let suma = 0;
    for (let i = 0; i < digitos.length; i++) {
      let digito = parseInt(digitos[i], 10);
  
      if (i % 2 === 0) {
        digito *= 2;
        if (digito > 9) {
          digito -= 9;
        }
      }
  
      suma += digito;
    }
  
    const digitoVerificadorEsperado = (10 - (suma % 10)) % 10;
  
    const digitoVerificador = parseInt(cedula[9], 10);

    return digitoVerificador === digitoVerificadorEsperado;
  };

  export default validarCedula;
document.getElementById("formulario").addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener valores del formulario
    const precio = parseFloat(document.getElementById("precio").value);
    const añosVehiculo = parseInt(document.getElementById("añosVehiculo").value);
    const tiempoUso = parseInt(document.getElementById("tiempoUso").value);
    const tipoDepreciacion = document.getElementById("tipoDepreciacion").value;

    let depreciaciónTotal = 0;

    // Validación de campos
    if (isNaN(precio) || isNaN(añosVehiculo) || isNaN(tiempoUso)) {
        document.getElementById("resultado").innerHTML = "<p>Por favor, completa todos los campos correctamente.</p>";
        document.getElementById("resultado").style.display = "block";
        return;
    }

    if (tipoDepreciacion === "lineal") {
        // Depreciación lineal: 15% anual
        const depreciaciónAnual = 0.15 * precio;
        depreciaciónTotal = Math.min(depreciaciónAnual * tiempoUso, precio);
    } else if (tipoDepreciacion === "acelerada") {
        // Depreciación acelerada: 20% el primer año, 10% los siguientes
        const primerAño = 0.2 * precio;
        const añosRestantes = Math.max(0, tiempoUso - 1);
        const restoAños = 0.1 * precio * añosRestantes;
        depreciaciónTotal = Math.min(primerAño + restoAños, precio);
    } else if (tipoDepreciacion === "personalizada") {
        // Depreciación personalizada
        const porcentajePersonalizado = parseFloat(document.getElementById("porcentajePersonalizado").value) / 100;
        if (isNaN(porcentajePersonalizado) || porcentajePersonalizado <= 0 || porcentajePersonalizado > 1) {
            document.getElementById("resultado").innerHTML = "<p>Por favor, ingresa un porcentaje válido para la depreciación personalizada.</p>";
            document.getElementById("resultado").style.display = "block";
            return;
        }
        const depreciaciónAnual = porcentajePersonalizado * precio;
        depreciaciónTotal = Math.min(depreciaciónAnual * tiempoUso, precio);
    }

    // Calcular el valor restante después de la depreciación
    const valorRestante = Math.max(precio - depreciaciónTotal, 0);

    // Mostrar resultados
    document.getElementById("resultado").innerHTML = `
        <h2>Resultados</h2>
        <p><strong>Precio Inicial:</strong> $${precio.toLocaleString()}</p>
        <p><strong>Años del Vehículo:</strong> ${añosVehiculo} años</p>
        <p><strong>Años de Uso Planeado:</strong> ${tiempoUso} años</p>
        <p><strong>Depreciación Total:</strong> $${depreciaciónTotal.toLocaleString()}</p>
        <p><strong>Valor Restante Estimado:</strong> $${valorRestante.toLocaleString()}</p>
    `;
    document.getElementById("resultado").style.display = "block";

    // Hacer scroll hacia el resultado de forma suave
    window.scrollTo({
        top: document.getElementById("resultado").offsetTop - 20, // Ajuste de desplazamiento para que no se quede al borde superior
        behavior: "smooth"
    });
});

// Mostrar campo personalizado si se elige "personalizada"
document.getElementById("tipoDepreciacion").addEventListener("change", function () {
    const personalizado = document.getElementById("personalizado");
    if (this.value === "personalizada") {
        personalizado.style.display = "block";
    } else {
        personalizado.style.display = "none";
    }
});

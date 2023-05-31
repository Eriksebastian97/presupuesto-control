import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({
  presupuesto,
  gastos,
  setGastos,
  setPrepuesto,
  setIsValidPresupuesto,
}) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );

    const TotalDisponible = presupuesto - totalGastado;

    const nuevoPorcentaje = (
      ((presupuesto - TotalDisponible) / presupuesto) *
      100
    ).toFixed(2);

    setDisponible(TotalDisponible);
    setGastado(totalGastado);

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1100);
  }, [gastos]);

  const FormatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleResetApp = () => {
    const confirmacion = window.confirm('¿Estas seguro de querer reiniciar la aplicación?')
    if (confirmacion) {
        localStorage.clear()
        window.location.reload()
    }
}

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "red" : "#2fc3d6f3",
            trailColor: "#62606035",
            textColor: porcentaje > 100 ? "red" : "#2fc3d6f3",
          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        />
      </div>

      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Resetear App
        </button>
        <p>
          <span>Presupuesto: </span> {FormatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible:</span> {FormatearCantidad(disponible)}
        </p>

        <p>
          <span> Gastado :</span>
          {FormatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;

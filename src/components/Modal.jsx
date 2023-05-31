import CerrarBtn from "../img/cerrar.svg"
import { useState , useEffect} from "react"
import Mensaje from "./Mensaje"


const Modal = ({setModal,animarModal,setAnimarModal,guardarGastos,gastoEditar,setGastoEditar}) => {

    const [mensaje , setMensaje] = useState("")

    const [nombre , setNombre] = useState("")
    const [cantidad , setCantidad] = useState("")
    const [categoria , setCategoria] = useState("")
    const [fecha , setFecha] = useState("")

    const [id, setId] = useState("")

   useEffect(() => {
     if(Object.keys(gastoEditar).length > 0){
       setNombre(gastoEditar.nombre)
       setCantidad(gastoEditar.cantidad)
       setCategoria(gastoEditar.categoria)
       setFecha(gastoEditar.fecha)

       setId(gastoEditar.id)
     }
   }, [])
   


    const ocultarModal = ()=>{
        
        setAnimarModal(false)
        
        setGastoEditar({})

        setTimeout(() => {
            setModal(false)
            
        }, 500);
    }

  const handleSubmit = (e)=>{
    e.preventDefault()

    if([nombre , cantidad , cantidad].includes("")){
        setMensaje("Todos los Campos son obligatorios")

        setTimeout(() => {
            setMensaje("")
        }, 4000);
        return
    }

    guardarGastos({nombre , cantidad , categoria,fecha ,id})

  }

  return (
    <div className='modal'>
        <div className='cerrar-modal'>
           <img
           src={CerrarBtn}
           alt="cerrar modal"
           onClick={ocultarModal}
           />
        </div>
        <form 
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}>
            <legend>{gastoEditar.nombre ? "Editar gasto" : "Nuevo gasto"}</legend>
               {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            <div className="campo">
                <label htmlFor="nombre">Nombre Gasto</label>
                <input 
                id="nombre"
                type="text"
                placeholder="Añade el Nombre del Gasto"
                value={nombre}
                onChange={ e=> setNombre(e.target.value)}
                />
            </div>

            <div className="campo">
                <label htmlFor="cantidad">Cantidad</label>
                <input 
                id="cantidad"
                type="number"
                placeholder="Añade la cantidad del gasto"
                value={cantidad}
                onChange={e=>setCantidad(Number(e.target.value))}
                />
            </div>

            <div className="campo">
                <label htmlFor="categoria">Categoria</label>
              <select id="categoria"
              value={categoria}
              onChange={e=>setCategoria(e.target.value)}
              >
                <option value=""> --Seleccione </option>
                <option value="ahorro">Ahorro</option>
                <option value="comida">Comida</option>
                <option value="casa"> Casa</option>
                <option value="gastos"> Gastos Varios</option>
                <option value="ocio"> Ocio </option>
                <option value="salud"> Salud</option>
                <option value="suscripciones"> suscripciones </option>
             </select>
            </div>

            <input
             type="submit"
             value={gastoEditar.nombre ? "Guardar cambios" : "Añadir Gasto"}

             />
        </form>
    </div>
  )
}

export default Modal
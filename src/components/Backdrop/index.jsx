import { useEffect } from "react";
import { stateLogger } from "../../stateLogger";
import { motion } from "framer-motion";
// Este componente sirve como una capa detras del modal que hace que todo se vea oscuro mientras el modal esta abierto, esto para que el usuario se concentre en el modal
const Backdrop = ({ children, onClick }) => {
  // Esta constante posee dos propiedades, children que permite incorporar mas propiedades entre las etiquetas para el Backdrop,y el segundo onClick que permite enviar un manipulador personalizado cuando el Backdrop es clickeado
  // Log state
  useEffect(() => {
    stateLogger("Backdrop", true);
    return () => stateLogger("Backdrop", false);
  }, []);

  return (
    <motion.div
      className="backdrop"
      onClick={onClick}
      // Estos serian los estados de la animación
      // El estado inicial debe ser invisible, colocando la opacidad en 0
      initial={{ opacity: 0 }}
      // Cuando este activo, debemos animarlo activando la opacidad en 1
      animate={{ opacity: 1 }}
      // Y finalmente cuando nos salgamos debe volver a su estado de opacidad en 0
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;

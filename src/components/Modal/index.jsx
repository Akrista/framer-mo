import { motion } from "framer-motion";
import Backdrop from "../Backdrop";

const dropIn = {
  // dropIn se encarga de establecer los posibles estados animados, una forma muy interactiva de permitir que tu contenido cambie segun la interacción realizada por el usuario
  hidden: { y: "-100vh", opacity: 0 },
  // Cuando la ventana esta invisible, se posicionara -100 de la altura visible en el eje Y
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      // Damping es una disminución en la amplitud de una oscilación como resultado de la energia siendo succionada desde el sistema para sobreponerse a la fricción u otras fuerzas resistivas. Para mayor información: https://blog.maximeheckel.com/posts/the-physics-behind-spring-animations/
      damping: 25,
      stiffness: 500,
    },
  },
  // Sin embargo, cuando este visible, tendra su posición standard de "0", con una transición establecida
  exit: { y: "100vh", opacity: 0 },
  // Cuando se salga de la ventana, esta se posicionara 100 de la altura visible en el eje Y
};

const Modal = ({ handleClose, text }) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        drag
        // Event Bubbling previene los clicks en modal de propagarse en el backdrop
        onClick={(e) => e.stopPropagation()}
        className="modal orange-gradient"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      ></motion.div>
    </Backdrop>
  );
};
export default Modal;

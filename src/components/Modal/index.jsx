import { motion } from "framer-motion";
import Backdrop from "../Backdrop";

// Recuerda que para iniciar tus proyectos en React debes usar 'npm install' y 'yarn start' (suelo tener problemas siempre con npm asi que siempre recurro a yarn). En este proyecto debes utilizar 'npm i framer-motion'

const dropIn = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: "0",
    opacity: 1,
    transition: { duration: 0.1, type: "spring", damping: 25, stiffness: 500 },
  },
  exit: { y: "100vh", opacity: 0 },
};

const Modal = ({ handleClose, text }) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        drag
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

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Modal from "./components/Modal";

// Recuerda que para iniciar tus proyectos en React debes usar 'npm install' y 'yarn start' (suelo tener problemas siempre con npm asi que siempre recurro a yarn). En este proyecto debes utilizar 'npm i framer-motion'

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  return (
    <div>
      <motion.button
        // motion es un elemento de HTML con propiedades especiales de animación, tales como whileHover (mientras estes parado sobre el) y whileTap (mientras le des click)
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="save-button"
        onClick={() => (modalOpen ? close() : open())}
      >
        Abrir Modal
      </motion.button>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {modalOpen && <Modal modalOpen={modalOpen} handleClose={close} />}
      </AnimatePresence>
    </div>
  );
}

export default App;

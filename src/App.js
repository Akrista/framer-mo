import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useModal from "./hooks/useModal";
import { framerLogger } from "./stateLogger";
import Notification from "./components/Notification";
import Input from "./components/Input";
import Modal from "./components/Modal";
import { add } from "./arr-utils";
// Recuerda que para iniciar tus proyectos en React debes usar 'npm install' y 'yarn start' (suelo tener problemas siempre con npm asi que siempre recurro a yarn). En este proyecto debes utilizar 'npm i framer-motion'

function App() {
  // Modal state
  // Esta constante se encarga de identificar el estado para la apertura y cierre del Modal.
  const { modalOpen, close, open } = useModal();

  // Modal type
  const [modalType, setModalType] = useState("dropIn");
  const handleType = (e) => setModalType(e.target.value);

  // Notifications state
  const [notifications, setNotifications] = useState([]);

  // Notification text
  const [text, setText] = useState("Buen trabajo! 🚀");
  const handleText = (e) => setText(e.target.value);

  // Notification style
  const [style, setStyle] = useState("success");
  const handleStyle = (e) => setStyle(e.target.value);

  // Notification position
  const [position, setPosition] = useState("bottom");
  const handlePosition = (e) => setPosition(e.target.value);

  return (
    <>
      <motion.main>
        <Header />
        <SubHeader text="Modales animados" />

        <motion.select className="input" onChange={handleType}>
          <option value="dropIn">🪂 Drop in</option>
          <option value="flip">🛹 Flip</option>
          <option value="newspaper">🗞 Newspaper</option>
          <option value="badSuspension">🔩 Bad Suspension</option>
          <option value="gifYouUp">🎸 GIF you up</option>
        </motion.select>

        <motion.button
          // motion es un elemento de HTML con propiedades especiales de animación, tales como whileHover (mientras estes parado sobre el) y whileTap (mientras le des click)
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="save-button"
          onClick={open}
        >
          Mostrar Modal
        </motion.button>

        <br />
        <br />

        <SubHeader text="Pila de notificaciones" />

        <Input
          placeHolder="Buen trabajo! 🚀"
          value={text}
          onChange={handleText}
        />

        <br />

        <motion.select className="input" onChange={handleStyle}>
          <option value="success">✅ Exito</option>
          <option value="warning">⚠️ Advertencia</option>
          <option value="error">🛑 Error</option>
          <option value="light">☀️ Claro</option>
          <option value="">🌙 Oscuro</option>
        </motion.select>

        <br />

        <motion.select className="input" onChange={handlePosition}>
          <option value="bottom">👇🏼 Abajo</option>
          <option value="top">☝🏼 Arriba</option>
        </motion.select>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="add-button"
          onClick={() => setNotifications(add(notifications, text, style))}
        >
          + Apilalas!
        </motion.button>
      </motion.main>

      <ModalContainer>
        {modalOpen && (
          <Modal
            modalOpen={modalOpen}
            text={modalType}
            type={modalType}
            handleClose={close}
          />
        )}
      </ModalContainer>

      <NotificationContainer position={position}>
        {notifications &&
          notifications.map((notification) => (
            <Notification
              key={notification.id}
              notification={notification}
              notifications={notifications}
              setNotifications={setNotifications}
            />
          ))}
      </NotificationContainer>
    </>
  );
}

const Header = () => (
  <motion.h1 className="pink">
    Framer Motion con
    <span className="light-blue"> React 🔥</span>
  </motion.h1>
);

const SubHeader = ({ text }) => (
  <motion.h2 className="sub-header">{text}</motion.h2>
);

const ModalContainer = ({ children, label }) => (
  // Enables the animation of components that have been removed from the tree
  <AnimatePresence
    /* AnimatePresence, se encarga de que cuando el Modal se remueva del DOM antes de que la animación termine */
    // Disable any initial animations on children that
    // are present when the component is first rendered
    initial={false}
    // Only render one component at a time.
    // The exiting component will finish its exit
    // animation before entering component is rendered
    exitBeforeEnter={true}
    // Fires when all exiting nodes have completed animating out
    onExitComplete={() => framerLogger(label)}
  >
    {children}
  </AnimatePresence>
);

const NotificationContainer = ({ children, position }) => {
  return (
    <div className="container">
      <ul className={position}>
        <AnimatePresence
          initial={false}
          onExitComplete={() => framerLogger("Notifications container")}
        >
          {children}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default App;

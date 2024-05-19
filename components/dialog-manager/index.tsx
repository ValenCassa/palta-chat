"use client";

import React, {
  useState,
  ComponentType,
  createContext,
  useContext,
} from "react";
import { CSSTransition } from "react-transition-group";

interface DialogManagerContext {
  showDialog: <T extends ComponentType<any>>(
    component: T,
    props: Omit<React.ComponentProps<T>, "toggle" | "visible">,
  ) => void;
  hideDialog: () => void;
  visible: boolean;
}

export const ModalContext = createContext<DialogManagerContext | undefined>(
  undefined,
);

interface DialogManagerProps {
  children: React.ReactNode;
}

export const DialogManager = ({ children }: DialogManagerProps) => {
  const [modalState, setModalState] = useState<{
    component: ComponentType<any> | null;
    props: any;
    visible: boolean;
  }>({ component: null, props: {}, visible: false });

  const showDialog = <T extends object>(
    component: ComponentType<T>,
    props: Omit<T, "toggle" | "visible">,
  ) => {
    setModalState({ component, props, visible: true });
  };

  const hideDialog = () => {
    setModalState((prev) => ({ ...prev, visible: false }));
  };

  const renderModal = () => {
    const { component, props } = modalState;
    if (component) {
      return React.createElement(component, { ...props, hideDialog });
    }
    return null;
  };

  return (
    <ModalContext.Provider
      value={{ showDialog, hideDialog, visible: modalState.visible }}
    >
      {children}
      <CSSTransition
        in={modalState.visible}
        timeout={300} // Adjust according to your animation duration
        classNames="modal"
        unmountOnExit
        onExiting={() => setModalState((prev) => ({ ...prev, visible: false }))}
        onExited={() => setModalState((prev) => ({ ...prev, component: null }))}
        onExit={(node) => {
          node.style.position = "fixed";
          node.style.top = -1 * window.scrollY + "px";
        }}
      >
        <div>{renderModal()}</div>
      </CSSTransition>
    </ModalContext.Provider>
  );
};

interface WithDialogProps {
  visible: boolean;
  toggle: () => void;
}
export function createDialog<T extends object>(
  WrappedComponent: ComponentType<T & WithDialogProps>,
) {
  // The component that the HOC returns
  const WithModal = (props: T) => {
    const modalContext = useContext(ModalContext);

    if (!modalContext) {
      throw new Error("createModal must be used within a DialogManager");
    }

    const { hideDialog, visible } = modalContext;

    const toggle = () => {
      if (visible) {
        hideDialog();
      }
    };

    return <WrappedComponent {...props} toggle={toggle} visible={visible} />;
  };
  WithModal.displayName = `WithModal(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithModal;
}

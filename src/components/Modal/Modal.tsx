import {PropsWithChildren, useEffect, useRef} from "react";
import {getClasses} from "../../utils/styleUtils";
import {modalStyle} from "./modalStyle";
import {Button} from "../Button/Button";
import {CloseCircle} from "../../media/icons";

export interface ModalProps extends PropsWithChildren {
   open: boolean;
   onClose?: () => void;
}

const cssClasses = getClasses(modalStyle);
export const Modal = ({open, children, onClose}: ModalProps) => {
   const modalRef = useRef<HTMLDialogElement>(null);

   useEffect(() => {
      if (open && !modalRef.current?.open) {
         modalRef.current?.showModal();
      }
   }, [open])

   return <>{open && <dialog onClose={onClose} className={cssClasses.modal} ref={modalRef}>{children}
      {onClose && <Button className={cssClasses.close} onClick={() => onClose()}><CloseCircle/></Button>}
   </dialog>}</>
}
import {PropsWithChildren, useEffect, useRef} from "react";
import {getClasses} from "../../utils/styleUtils";
import {modalStyle} from "./modalStyle";
import {Dialog} from "@mui/material";

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

   return <Dialog maxWidth={"md"} onClose={onClose} open={open}>
      {children}
   </Dialog>
}
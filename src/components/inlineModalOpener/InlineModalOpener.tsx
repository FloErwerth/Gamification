import {PropsWithChildren, useState} from "react";
import {getClasses} from "../../utils/styleUtils";
import {inlineModalOpenerStyles} from "./inlineModalOpenerStyles";
import {Modal} from "../basicComponents/Modal/Modal";

const cssClasses = getClasses(inlineModalOpenerStyles);

interface InlineModalOpener extends PropsWithChildren {
   content: JSX.Element;
}

export const InlineModalOpener = ({children, content}: InlineModalOpener) => {
   const [showModal, setShowModal] = useState(false)
   return <>
      <button className={cssClasses.openerButton} onClick={() => setShowModal(true)}>{children}</button>
      {showModal && <Modal onClose={() => setShowModal(false)} open={showModal}>{content}</Modal>}</>
}
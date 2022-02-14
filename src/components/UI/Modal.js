import { Fragment } from 'react'
import ReactDOM from 'react-dom';
import classes from './Modal.module.css'


const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onClick} />
}

const ModalOverlay = props => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

const portalDOMElement = document.getElementById('overlays')

const Modal = props => {
    return <Fragment>
        {ReactDOM.createPortal(<Backdrop onClick={props.onClick} />, portalDOMElement)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalDOMElement)}
    </Fragment>
}

export default Modal;
import React, { useState, Fragment, useEffect, forwardRef, createRef } from 'react';
import './index.css';

const Icon = ({ type }) => {
    const icons = {
        info: <svg viewBox="0 0 24 24" width="100%" height="100%" fill="var(--toastify-icon-color-info)"><path d="M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"></path></svg>,
        success: <svg viewBox="0 0 24 24" width="100%" height="100%" fill="var(--toastify-icon-color-success)"><path d="M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"></path></svg>,
        warning: <svg viewBox="0 0 24 24" width="100%" height="100%" fill="var(--toastify-icon-color-warning)"><path d="M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"></path></svg>,
        error: <svg viewBox="0 0 24 24" width="100%" height="100%" fill="var(--toastify-icon-color-error)"><path d="M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"></path></svg>,
        close: <svg aria-hidden="true" viewBox="0 0 14 16"><path fillRule="evenodd" d="M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"></path></svg>,
    }
    return icons[type];
}

const ToastComponent = forwardRef(({ type, message, toastData: { index, removeToast, toastOptions: {autoClose = true, closeDuration = 3000}} }, ref) => {
    const progressDuration = autoClose ? closeDuration : false;
    return (
        <div className='toastContainer' ref={ref} type={type}>
            {progressDuration && <div className='toastBar' style={{ '--duration': progressDuration + 'ms' }} />}
            <div className='toastIcon'><Icon type={type} /></div>
            <div className='toastMessage'>{message}</div>
            <div className='toastClose' onClick={() => removeToast(index)}><Icon type='close' /></div>
        </div>
    );
});

const refs = [];

const availablePostions = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center'];
const initialOptions = {
    reverse: false,
    position: 'bottom-right',
}
const ToastContainer = ({options = initialOptions}) => {
    const [toasts, setToasts] = React.useState([]);
    const [removedToasts, setRemovedToasts] = useState([]);
    const toastPosition = availablePostions.includes(options.position) ? options.position : initialOptions.position;

    const addToast = (type, message, toastOptions = {autoClose: true, closeDuration: 3000}) => {
        const ref = createRef();
        const toastData = {
            index: toasts.length,
            removeToast,
            toastOptions
        };
        const toast = <ToastComponent type={type} message={message} toastData={toastData} ref={ref} />;
        setToasts([...toasts, toast]);
        refs.push(ref);
        queueMicrotask(() => showToast(Math.max(refs.length - 1, 0)));
        if (toastOptions.closeDuration) {
            setTimeout(() => removeToast(toastData.index), toastOptions.closeDuration);
        }
    }

    const showToast = (index) => {
        if (index > -1) {
            refs[index].current.classList.add('show');
        }
    }

    const removeToast = (index) => {
        const ref = refs[index];
        setRemovedToasts([...removedToasts, index]);
        if (ref) {
            ref.current.classList.add('hide');
            refs[index] = null;
        }
    }

    useEffect(() => {
        toast.add = addToast;
    }, [toasts, refs]);

    return (
        <div className={`toastArea${options.reverse ? ' reverse' : ''} area-${toastPosition}`}>
            {toasts.map((toast, index) => {
                return <Fragment key={index}>{toast}</Fragment>
            })}
        </div>
    );
}

export const toast = {
    add: null,
    info: (message, options) => toast.add('info', message, options),
    success: (message, options) => toast.add('success', message, options),
    warning: (message, options) => toast.add('warning', message, options),
    error: (message, options) => toast.add('error', message, options),
}

export default ToastContainer;
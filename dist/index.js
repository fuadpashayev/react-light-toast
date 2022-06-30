"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toast = exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/web.queue-microtask.js");

require("core-js/modules/es.array.reverse.js");

var _react = _interopRequireWildcard(require("react"));

require("./index.css");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Icon = _ref => {
  let {
    type
  } = _ref;
  const icons = {
    info: /*#__PURE__*/_react.default.createElement("svg", {
      viewBox: "0 0 24 24",
      width: "100%",
      height: "100%",
      fill: "var(--toastify-icon-color-info)"
    }, /*#__PURE__*/_react.default.createElement("path", {
      d: "M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"
    })),
    success: /*#__PURE__*/_react.default.createElement("svg", {
      viewBox: "0 0 24 24",
      width: "100%",
      height: "100%",
      fill: "var(--toastify-icon-color-success)"
    }, /*#__PURE__*/_react.default.createElement("path", {
      d: "M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"
    })),
    warning: /*#__PURE__*/_react.default.createElement("svg", {
      viewBox: "0 0 24 24",
      width: "100%",
      height: "100%",
      fill: "var(--toastify-icon-color-warning)"
    }, /*#__PURE__*/_react.default.createElement("path", {
      d: "M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"
    })),
    error: /*#__PURE__*/_react.default.createElement("svg", {
      viewBox: "0 0 24 24",
      width: "100%",
      height: "100%",
      fill: "var(--toastify-icon-color-error)"
    }, /*#__PURE__*/_react.default.createElement("path", {
      d: "M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"
    })),
    close: /*#__PURE__*/_react.default.createElement("svg", {
      "aria-hidden": "true",
      viewBox: "0 0 14 16"
    }, /*#__PURE__*/_react.default.createElement("path", {
      fillRule: "evenodd",
      d: "M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"
    }))
  };
  return icons[type];
};

const ToastComponent = /*#__PURE__*/(0, _react.forwardRef)((_ref2, ref) => {
  let {
    type,
    message,
    toastData: {
      index,
      removeToast,
      toastOptions: {
        autoClose = true,
        closeDuration = 3000
      }
    }
  } = _ref2;
  const progressDuration = autoClose ? closeDuration : false;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "toastContainer",
    ref: ref,
    type: type
  }, progressDuration && /*#__PURE__*/_react.default.createElement("div", {
    className: "toastBar",
    style: {
      '--duration': progressDuration + 'ms'
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "toastIcon"
  }, /*#__PURE__*/_react.default.createElement(Icon, {
    type: type
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "toastMessage"
  }, message), /*#__PURE__*/_react.default.createElement("div", {
    className: "toastClose",
    onClick: () => removeToast(index)
  }, /*#__PURE__*/_react.default.createElement(Icon, {
    type: "close"
  })));
});
const refs = [];
const availablePostions = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center'];
const initialOptions = {
  reverse: false,
  position: 'bottom-right'
};

const ToastContainer = _ref3 => {
  let {
    options = initialOptions
  } = _ref3;

  const [toasts, setToasts] = _react.default.useState([]);

  const [removedToasts, setRemovedToasts] = (0, _react.useState)([]);
  const toastPosition = availablePostions.includes(options.position) ? options.position : initialOptions.position;

  const addToast = function addToast(type, message) {
    let toastOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      autoClose: true,
      closeDuration: 3000
    };
    const ref = /*#__PURE__*/(0, _react.createRef)();
    const toastData = {
      index: toasts.length,
      removeToast,
      toastOptions
    };

    const toast = /*#__PURE__*/_react.default.createElement(ToastComponent, {
      type: type,
      message: message,
      toastData: toastData,
      ref: ref
    });

    setToasts([...toasts, toast]);
    refs.push(ref);
    queueMicrotask(() => showToast(Math.max(refs.length - 1, 0)));

    if (toastOptions.closeDuration) {
      setTimeout(() => removeToast(toastData.index), toastOptions.closeDuration);
    }
  };

  const showToast = index => {
    if (index > -1) {
      refs[index].current.classList.add('show');
    }
  };

  const removeToast = index => {
    const ref = refs[index];
    setRemovedToasts([...removedToasts, index]);

    if (ref) {
      ref.current.classList.add('hide');
      refs[index] = null;
    }
  };

  (0, _react.useEffect)(() => {
    toast.add = addToast;
  }, [toasts, refs]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "toastArea".concat(options.reverse ? ' reverse' : '', " area-").concat(toastPosition)
  }, toasts.map((toast, index) => {
    return /*#__PURE__*/_react.default.createElement(_react.Fragment, {
      key: index
    }, toast);
  }));
};

const toast = {
  add: null,
  info: (message, options) => toast.add('info', message, options),
  success: (message, options) => toast.add('success', message, options),
  warning: (message, options) => toast.add('warning', message, options),
  error: (message, options) => toast.add('error', message, options)
};
exports.toast = toast;
var _default = ToastContainer;
exports.default = _default;
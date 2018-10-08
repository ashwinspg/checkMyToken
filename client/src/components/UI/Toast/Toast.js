import React from 'react';

import './Toast.css';

const Toast = () => {
    return (
        <div id="toast">
        </div>
    );
}

export const showToast = (message) => {
    var toastEle = document.getElementById("toast");
    toastEle.innerText = message;
    toastEle.className = "show";
    setTimeout(function(){
        toastEle.className = toastEle.className.replace("show", "");
    }, 2000);
}


export default Toast;
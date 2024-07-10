document.onkeydown = function (event) {
    event = event || window.event;
    const capswarning = document.getElementById('warning')
    if (event.getModifierState('CapsLock')) {
     capswarning.hidden = false;
    } else {
      capswarning.hidden = true;
    }
};
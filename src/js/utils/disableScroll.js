let supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

function preventDefault(e) {
    e.preventDefault();
  }

// call this to Disable
export function disableScroll() {
    const wheelOpt = supportsPassive ? { passive: false } : false;
    const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
    window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
}

// call this to Enable
export function enableScroll() {
  const wheelOpt = supportsPassive ? { passive: false } : false;
  const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.removeEventListener("DOMMouseScroll", preventDefault, false);
  window.removeEventListener("touchmove", preventDefault, wheelOpt);
}

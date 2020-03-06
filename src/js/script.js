function debounce(func, wait, immediate) {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;

    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

particlesJS(particles, "particles-js");

const inDepthBtn = $("#In-Depthbtn");
const firstScene = $("#splash");

inDepthBtn.on(
  "click",
  debounce(() => {
    inDepthBtn.attr("disabled", true);
    firstScene.toggleClass("fade");

    firstScene.one("oanimationend msAnimationEnd animationend", e => {
      console.log("removed firstScene", e);
      e.currentTarget.remove();
    });
  }, 500)
);

(function () {
  "use strict";
  try {
    if (sessionStorage.getItem("dashnova_login_user") !== "Super") return;
    var home = document.querySelector('.app-nav__link[data-page="home"]');
    if (!home) return;
    home.setAttribute("href", "main.html");
    var i;
    for (i = 0; i < home.childNodes.length; i++) {
      var n = home.childNodes[i];
      if (n.nodeType === 3 && /\S/.test(n.textContent)) {
        n.textContent = "首页";
        break;
      }
    }
  } catch (e) {}
})();

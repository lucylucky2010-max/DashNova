(function () {
  var KEY = "dashnova_login_user";

  function loginRole() {
    try {
      var v = sessionStorage.getItem(KEY);
      if (v === "Super" || v === "Admin" || v === "user") return v;
    } catch (e) {}
    return "Super";
  }

  var nav = document.querySelector(".sidebar-nav");
  if (!nav) return;

  function removeNav(dataPanel) {
    var btn = nav.querySelector('[data-panel="' + dataPanel + '"]');
    if (btn && btn.parentNode) btn.parentNode.removeChild(btn);
  }

  function removePanel(id) {
    var el = document.getElementById(id);
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  var r = loginRole();
  if (r === "Super") {
    removeNav("account-admin");
    removePanel("panel-account-admin");
    removeNav("custom-model");
    removePanel("panel-custom-model");
  } else {
    removeNav("account-super");
    removePanel("panel-account-super");
  }

  function activatePanel(dataPanel) {
    var panel = document.getElementById("panel-" + dataPanel);
    var btn = nav.querySelector('[data-panel="' + dataPanel + '"]');
    if (!panel || !btn) return false;
    document.querySelectorAll(".settings-panel").forEach(function (p) {
      p.classList.remove("settings-panel--active");
    });
    nav.querySelectorAll(".sidebar-nav__item").forEach(function (i) {
      i.classList.remove("sidebar-nav__item--active");
    });
    panel.classList.add("settings-panel--active");
    btn.classList.add("sidebar-nav__item--active");
    return true;
  }

  var qp = null;
  try {
    qp = new URLSearchParams(window.location.search).get("panel");
  } catch (e0) {}

  if (r === "Super") {
    activatePanel("account-super");
    if (qp === "account-super" && window.history && window.history.replaceState) {
      try {
        window.history.replaceState({}, "", window.location.pathname + window.location.hash);
      } catch (e1) {}
    }
  } else {
    // Admin：默认打开左侧第一项「默认模型配置」；?panel= 可直达子页
    var adminOk = { "default-model": true, "custom-model": true, "account-admin": true };
    if (qp && adminOk[qp] && activatePanel(qp)) {
      /* keep */
    } else {
      activatePanel("default-model");
    }
    if (qp && adminOk[qp] && window.history && window.history.replaceState) {
      try {
        window.history.replaceState({}, "", window.location.pathname + window.location.hash);
      } catch (e2) {}
    }
  }
})();

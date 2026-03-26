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
  } else {
    removeNav("custom-model");
    removeNav("account-super");
    removePanel("panel-custom-model");
    removePanel("panel-account-super");
  }

  var active = document.querySelector(".settings-panel.settings-panel--active");
  if (!active) {
    var def = document.getElementById("panel-default-model");
    document.querySelectorAll(".settings-panel").forEach(function (p) {
      p.classList.remove("settings-panel--active");
    });
    if (def) def.classList.add("settings-panel--active");
    nav.querySelectorAll(".sidebar-nav__item").forEach(function (i) {
      i.classList.remove("sidebar-nav__item--active");
    });
    var dm = nav.querySelector('[data-panel="default-model"]');
    if (dm) dm.classList.add("sidebar-nav__item--active");
  }
})();

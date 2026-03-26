(function () {
  var KEY = "dashnova_login_user";

  function getDisplayName() {
    try {
      var v = sessionStorage.getItem(KEY);
      if (v === "Super" || v === "Admin") return v;
      if (v === "user") return "user";
    } catch (e) {}
    return "Super";
  }

  function avatarLetter(displayName) {
    if (displayName === "Admin") return "A";
    if (displayName === "user") return "U";
    return "S";
  }

  function toggleSettingsTabForRole() {
    try {
      var raw = sessionStorage.getItem(KEY);
      var hide = raw === "user";
      document.querySelectorAll('a.app-nav__link[data-page="settings"]').forEach(function (el) {
        el.style.display = hide ? "none" : "";
      });
    } catch (e) {}
  }

  /** Super：隐藏顶部「工作台」「资产库」入口（与 getDisplayName 一致：无存储时视为 Super） */
  function toggleSuperNavRestricted() {
    try {
      var raw = sessionStorage.getItem(KEY);
      var isSuper = raw !== "Admin" && raw !== "user";
      document
        .querySelectorAll('a.app-nav__link[data-page="projects"], a.app-nav__link[data-page="assets"]')
        .forEach(function (el) {
          el.style.display = isSuper ? "none" : "";
        });
    } catch (e) {}
  }

  function applyToNav() {
    var name = getDisplayName();
    var letter = avatarLetter(name);
    var avatar = document.querySelector(".user-avatar");
    var triggerName = document.querySelector(".user-trigger__name");
    var header = document.querySelector(".user-dropdown__header");
    if (avatar) avatar.textContent = letter;
    if (triggerName) triggerName.textContent = name;
    if (header) header.textContent = name;
    toggleSettingsTabForRole();
    toggleSuperNavRestricted();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyToNav);
  } else {
    applyToNav();
  }
})();

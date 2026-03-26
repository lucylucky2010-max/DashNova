(function () {
  var KEY = "dashnova_login_user";

  function getDisplayName() {
    try {
      var v = sessionStorage.getItem(KEY);
      if (v === "Super" || v === "Admin") return v;
    } catch (e) {}
    return "Super";
  }

  function avatarLetter(name) {
    return name === "Admin" ? "A" : "S";
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
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyToNav);
  } else {
    applyToNav();
  }
})();

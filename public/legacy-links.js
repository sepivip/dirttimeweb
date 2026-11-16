// Old bookmarks and App Store links use fragments that never reach GitHub Pages.
const legacyRoutes = new Map([
  ["#support", "/support/"],
  ["#feedback", "/feedback/"],
  ["#privacy", "/privacy/"],
  ["#terms", "/terms/"],
  ["#website-tracking", "/privacy/#website-tracking"],
]);

function followLegacyLink() {
  const route = legacyRoutes.get(window.location.hash);
  if (!route) return;

  const target = new URL(route, window.location.origin);
  target.search = window.location.search;
  window.location.replace(target);
}

followLegacyLink();
window.addEventListener("hashchange", followLegacyLink);

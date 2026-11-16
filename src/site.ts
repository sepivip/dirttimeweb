export const maintenanceLogPath = "/guides/dirt-bike-maintenance-log/";
export const serviceCalculatorPath = "/tools/service-interval-calculator/";

export const pages = {
  "/": {
    title: "Dirt Bike Maintenance Tracker for iPhone & iPad | DIRTTIME",
    description: "Track dirt bike engine hours, mileage, rides, and service history. Set maintenance reminders for every bike in your garage with DIRTTIME for iPhone and iPad.",
  },
  "/support/": {
    title: "DIRTTIME Support | Maintenance, Ride Logs & Backups",
    description: "Get help setting up your garage, tracking service intervals, using iOS widgets, and backing up your DIRTTIME data.",
  },
  "/feedback/": {
    title: "Send Feedback or Report a Bug | DIRTTIME",
    description: "Ask a question, report a bug, or suggest a feature for the DIRTTIME dirt bike maintenance tracker.",
  },
  "/privacy/": {
    title: "Privacy Policy | DIRTTIME",
    description: "Read how DIRTTIME handles app data, device permissions, and website analytics.",
  },
  "/terms/": {
    title: "Terms of Service | DIRTTIME",
    description: "Read the terms for using the DIRTTIME dirt bike maintenance tracker.",
  },
  [maintenanceLogPath]: {
    title: "Printable Dirt Bike Maintenance Log & CSV Template | DIRTTIME",
    description: "Print a blank dirt bike maintenance log or download the CSV template. See what to record for engine hours, parts, work performed, and the next service.",
  },
  [serviceCalculatorPath]: {
    title: "Dirt Bike Service Interval Calculator | DIRTTIME",
    description: "Calculate your next dirt bike service from the current reading, last service reading, and your chosen interval in engine hours, miles, or kilometers.",
  },
} as const;

export type Route = keyof typeof pages;

export const appStoreUrl = "https://apps.apple.com/us/app/dirttime-dirtbike-maintenance/id6752694574";
const appStoreParams = "itscg=30200&mttnsubad=6752694574";
export const appStoreLink = `${appStoreUrl}?${appStoreParams}&itsct=apps_box_link`;
export const appStoreBadgeLink = `${appStoreUrl}?${appStoreParams}&itsct=apps_box_badge`;

// A package picked on the pricing or custom packages page travels to the contact form for this tab.

export type ChosenPackage = {
  name: string;
  price: string;
  need: string;
  lines: string[];
};

const KEY = "pd-package";

export function savePackage(pkg: ChosenPackage) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(pkg));
  } catch {
    // storage blocked: the contact form just starts empty
  }
}

export function loadPackage(): ChosenPackage | null {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? "null");
  } catch {
    return null;
  }
}

export function clearPackage() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    // nothing stored to clear
  }
}

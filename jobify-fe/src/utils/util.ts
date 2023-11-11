export function resolveThemeState(themeState: boolean): string {
  return themeState ? "true" : "false";
}

export function checkDefaultTheme(): boolean {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
}

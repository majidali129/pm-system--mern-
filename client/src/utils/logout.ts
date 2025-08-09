import { signInPath } from "@/paths";

let isLoggingOut = false;

export const logout = (sessionExpired = false) => {
  if (isLoggingOut) return; // prevent multiple calls
  isLoggingOut = true;

  localStorage.removeItem("accessToken");

  const redirectUrl = sessionExpired
    ? `${signInPath()}?signedOut=true`
    : signInPath();

  window.location.replace(redirectUrl);
};

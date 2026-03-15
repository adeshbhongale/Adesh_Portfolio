export const getAllowedAdmins = () => [
  process.env.ADMIN_EMAIL_1,
  process.env.ADMIN_EMAIL_2,
  ...(process.env.ADMIN_EMAILS || "").split(","),
  "adeshbhongale03@gmail.com",
  "admin@gmail.com"
].filter((item): item is string => Boolean(item && item.trim().length));

const normalizedAllowedAdmins = () =>
  Array.from(new Set(getAllowedAdmins().map((item) => item.trim().toLowerCase())));

export const isAllowedAdmin = (email: string) => {
  const normalized = email.trim().toLowerCase();
  return normalizedAllowedAdmins().includes(normalized);
};

export const getAdminPassword = () => process.env.ADMIN_PASSWORD;
export const isPasswordValid = (password: string) => password === getAdminPassword();

export const isRequestFromAdmin = (request: Request) => {
  const cookieHeader = request.headers.get("cookie") || "";
  const sessionCookie = cookieHeader
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith("admin_session="));

  if (!sessionCookie) {
    return false;
  }

  const [, rawValue = ""] = sessionCookie.split("=");
  const decodedValue = decodeURIComponent(rawValue).trim().toLowerCase();
  return isAllowedAdmin(decodedValue);
};

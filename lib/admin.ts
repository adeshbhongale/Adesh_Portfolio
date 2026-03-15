export const getAllowedAdmins = () => [
  process.env.ADMIN_EMAIL_1 || "adeshbhongale02@gmail.com",
  process.env.ADMIN_EMAIL_2 || "admin@gmail.com"
];

export const isAllowedAdmin = (email: string) => {
  const normalized = email.trim().toLowerCase();
  return getAllowedAdmins()
    .map((item) => item.trim().toLowerCase())
    .includes(normalized);
};

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

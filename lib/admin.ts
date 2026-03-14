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

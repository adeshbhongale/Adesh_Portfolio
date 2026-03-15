const extractUploadFileName = (value: string) => {
  const normalizedValue = value.trim();
  if (!normalizedValue) {
    return "";
  }

  if (normalizedValue.startsWith("/api/uploads/")) {
    return normalizedValue.replace("/api/uploads/", "").trim();
  }

  if (normalizedValue.startsWith("/assets/uploads/")) {
    return normalizedValue.replace("/assets/uploads/", "").trim();
  }

  try {
    const parsed = new URL(normalizedValue);
    if (parsed.pathname.startsWith("/api/uploads/")) {
      return parsed.pathname.replace("/api/uploads/", "").trim();
    }
    if (parsed.pathname.startsWith("/assets/uploads/")) {
      return parsed.pathname.replace("/assets/uploads/", "").trim();
    }
  } catch {
  }

  return "";
};

export const normalizeStoredImageUrl = (value: string, fallback: string) => {
  const fileName = extractUploadFileName(value);
  if (fileName) {
    return `/api/uploads/${fileName}`;
  }

  const normalizedValue = value.trim();
  if (!normalizedValue) {
    return fallback;
  }

  return normalizedValue;
};

export const featureFlags = {
  emailFlow: process.env.NEXT_PUBLIC_FEATURE_EMAIL_FLOW === "true",
  fileUploads: process.env.NEXT_PUBLIC_FEATURE_FILE_UPLOADS === "true",
};

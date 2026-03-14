const hook = process.env.VERCEL_DEPLOY_HOOK;

if (!hook) {
  throw new Error("VERCEL_DEPLOY_HOOK is missing");
}

const trigger = async () => {
  const response = await fetch(hook, { method: "POST" });
  if (!response.ok) {
    throw new Error("Failed to trigger deploy hook");
  }
  console.log("Rebuild triggered successfully");
};

trigger();

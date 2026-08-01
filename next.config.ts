const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const basePath = isGithubActions ? "/dat-pokemon" : "";

const nextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  devIndicators: false,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
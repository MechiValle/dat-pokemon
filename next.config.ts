const isGithubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig = {
  output: "export",
  basePath: isGithubActions ? "/dat-pokemon" : "",
  images: { unoptimized: true },
  devIndicators: false,
};

export default nextConfig;
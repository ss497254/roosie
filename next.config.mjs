import webpack from "webpack";

const disableChunk = !!process.env.DISABLE_CHUNK;
console.log("[Next] build with chunk: ", !disableChunk);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    if (disableChunk) {
      config.plugins.push(
        new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
      );
    }

    config.resolve.fallback = {
      child_process: false,
    };

    return config;
  },
  experimental: {
    forceSwcTransforms: true,
  },
};

nextConfig.headers = async () => {
  return [
    {
      source: "/api/:path*",
      headers: [
        { key: "Access-Control-Allow-Credentials", value: "true" },
        { key: "Access-Control-Allow-Origin", value: "*" },
        {
          key: "Access-Control-Allow-Methods",
          value: "*",
        },
        {
          key: "Access-Control-Allow-Headers",
          value: "*",
        },
        {
          key: "Access-Control-Max-Age",
          value: "86400",
        },
      ],
    },
  ];
};

nextConfig.rewrites = async () => {
  const ret = [
    {
      source: "/api/proxy/:path*",
      destination: "https://api.openai.com/:path*",
    },
  ];

  const apiUrl = process.env.API_URL;
  if (apiUrl) {
    console.log("[Next] using api url ", apiUrl);
    ret.push({
      source: "/api/:path*",
      destination: `${apiUrl}/:path*`,
    });
  }

  return {
    beforeFiles: ret,
  };
};

export default nextConfig;

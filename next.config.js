/** @type {import('next').NextConfig} */
const repo = 'AI_CFO_module';
module.exports = {
  output: 'export',            // кладёт статику в out/
  images: { unoptimized: true },
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: `/${repo}` },
};

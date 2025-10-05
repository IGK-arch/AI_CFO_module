/** @type {import('next').NextConfig} */
const repo = 'AI_CFO_module';
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  output: 'export',
  images: { unoptimized: true },
  // Используем basePath только для production (GitHub Pages)
  basePath: isProduction ? `/${repo}` : '',
  assetPrefix: isProduction ? `/${repo}/` : '',
  trailingSlash: true,
  env: { 
    NEXT_PUBLIC_BASE_PATH: isProduction ? `/${repo}` : '' 
  },
};

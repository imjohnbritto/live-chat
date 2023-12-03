/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    compiler: {
      styledComponents: true
    },
    server: {
      command: 'npm run start:prod',
    },
  };

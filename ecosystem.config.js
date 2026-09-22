// PM2 ecosystem — jalankan dari folder server: www
//
//   ADMIN_PASSWORD=rahasia pm2 start ecosystem.config.js
//
// (atau set ADMIN_PASSWORD lewat variabel env hosting/aaPanel agar tidak tersimpan di file ini)
module.exports = {
  apps: [
    {
      name: "keetech",
      cwd: "/www/wwwroot/keetech/deploy",
      script: "server.js",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "0.0.0.0",
      },
    },
  ],
};
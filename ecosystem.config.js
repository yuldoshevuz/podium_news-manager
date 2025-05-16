module.exports = {
  apps: [
    {
      name: 'Podium_News-Manager',
      script: './dist/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      error_file: 'logs/app.error.log',
      out_file: 'logs/app.output.log',
      log_file: 'logs/app.combined.log',
      time: true,
    },
  ],
};

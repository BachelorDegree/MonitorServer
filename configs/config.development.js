module.exports = {
  server: {
    port: 13876,
    prefix: '/',
    route_dir: 'Route'
  },
  database: {
    username: 'root',
    password: '',
    host: 'localhost',
    db_name: 'monitor',
    auto_alter_db: true
  },
  env: {
    JWTKEY: ''
  },
  dev: {
    hotSwap: true,
    showDBLog: true
  },
  redis: {
    host: 'redis',
    port: 6379,
    db: 0,
    enable: false
  }
}

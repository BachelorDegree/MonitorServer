// Doc: http://docs.sequelizejs.com/manual/tutorial/models-definition.html
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('machine', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(256)
    },
    ip: {
      type: DataTypes.STRING(16)
    },
    cpu: {
      type: DataTypes.STRING(128)
    },
    avg_load: {
      type: DataTypes.STRING(128)
    },
    mem_usage: {
      type: DataTypes.TEXT
    },
    io_stat: {
      type: DataTypes.TEXT
    },
    process_info: {
      type: DataTypes.TEXT
    },
    disk_info: {
      type: DataTypes.TEXT
    },
    last_upload_time: {
      type: DataTypes.INTEGER
    }
  })
}

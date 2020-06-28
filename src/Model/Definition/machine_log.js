// Doc: http://docs.sequelizejs.com/manual/tutorial/models-definition.html
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('machine_log', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    machine_id: {
      type: DataTypes.INTEGER,
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
    time: {
      type: DataTypes.INTEGER
    }
  })
}

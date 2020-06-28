// Doc: http://docs.sequelizejs.com/manual/tutorial/models-definition.html
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('service_index_log', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    service_index_id: {
      type: DataTypes.INTEGER,
    },
    machine_id: {
      type: DataTypes.INTEGER,
    },
    value: {
      type: DataTypes.INTEGER,
    },
    time: {
      type: DataTypes.INTEGER
    }
  })
}

// Doc: http://docs.sequelizejs.com/manual/tutorial/models-definition.html
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('service_index', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    service_id: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING(128)
    },
    desc: {
      type: DataTypes.TEXT
    }
  })
}

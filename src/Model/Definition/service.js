// Doc: http://docs.sequelizejs.com/manual/tutorial/models-definition.html
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('service', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(256)
    },
    desc: {
      type: DataTypes.TEXT
    },
  })
}

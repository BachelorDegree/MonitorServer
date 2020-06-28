// Doc: http://docs.sequelizejs.com/manual/tutorial/models-definition.html
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('service_status_code_log', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    report_machine_id: {
      type: DataTypes.INTEGER,
    },
    caller_service_id: {
      type: DataTypes.INTEGER,
    },
    callee_service_id: {
      type: DataTypes.INTEGER,
    },
    is_client_report: {
      type: DataTypes.BOOLEAN
    },
    status_code: {
      type: DataTypes.INTEGER,
    },
    count: {
      type: DataTypes.INTEGER
    },
    time: {
      type: DataTypes.INTEGER
    }
  })
}

//DOC: http://docs.sequelizejs.com/manual/tutorial/associations.html
module.exports = ({ machine, service_status_code_log, service }) => {
    service_status_code_log.belongsTo(machine, {
        as: 'machine',
        foreignKey: 'report_machine_id'
    })
    machine.hasMany(service_status_code_log, {
        as: 'statusCodeLogs',
        foreignKey: 'report_machine_id'
    })
    service_status_code_log.belongsTo(service, {
        as: 'callerService',
        foreignKey: 'caller_service_id'
    })
    service.hasMany(service_status_code_log, {
        as: 'callerServiceLogs',
        foreignKey: 'caller_service_id'
    })
    service_status_code_log.belongsTo(service, {
        as: 'calleeService',
        foreignKey: 'callee_service_id'
    })
    service.hasMany(service_status_code_log, {
        as: 'calleeServiceLogs',
        foreignKey: 'callee_service_id'
    })
}

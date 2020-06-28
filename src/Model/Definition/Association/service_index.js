//DOC: http://docs.sequelizejs.com/manual/tutorial/associations.html
module.exports = ({ service_index, service_index_log, service }) => {
    service_index.belongsTo(service, {
        as: 'service',
        foreignKey: 'service_id'
    })
    service.hasMany(service_index, {
        as: 'serviceIndexs',
        foreignKey: 'service_id'
    })
    service_index_log.belongsTo(service_index, {
        as: 'serviceIndex',
        foreignKey: 'service_index_id'
    })
    service_index.hasMany(service_index_log, {
        as: 'logs',
        foreignKey: 'service_index_id'
    })
}

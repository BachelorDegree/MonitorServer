//DOC: http://docs.sequelizejs.com/manual/tutorial/associations.html
module.exports = ({ machine, machine_log }) => {
    machine_log.belongsTo(machine, {
        as: 'machine',
        foreignKey: 'machine_id'
    })
    machine.hasMany(machine_log, {
        as: 'logs',
        foreignKey: 'machine_id'
    })
}

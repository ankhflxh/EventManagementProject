const { ROLE, events } = require('./data')

function canViewEvents(client, event){
    return(
        client.role === ROLE.admin ||
        events.clientId ===clientId
    )
}

function scopeEvents(client, events){
    if (user.role === ROLE.ADMIN) return events
    return events.filter(events => events.clientId === clientId)
}

module.exports = {
    canViewEvents,
    scopeEvents
}
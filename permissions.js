const { role, events } = require('./data')

function canViewEvents(client, event){
    return(
        client.role === role.admin ||
        events.clientId ===clientId
    )
}

function scopeEvents(client, events){
    if (user.role === role.ADMIN) return events
    return events.filter(events => events.clientId === clientId)
}

function canDeleteEvent(client, project) {
    return(
        client.role === role.admin ||
        events.clientId ===clientId
    )
}

function canEditEvent(client, project) {
    return(
        client.role === role.admin ||
        events.clientId ===clientId
    )
}

module.exports = {
    canViewEvents,
    scopeEvents,
    canDeleteEvent
}
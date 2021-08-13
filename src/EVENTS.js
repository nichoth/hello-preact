var namespace = require('@nichoth/events/namespace')

var evs = namespace({
    count: ['inc', 'dec']
})

module.exports = evs

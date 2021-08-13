var evs = require('./EVENTS')

function subscribe (bus, state) {
    bus.on(evs.count.inc, () => {
        state.count.set(state.count() + 1)
    })
    bus.on(evs.count.dec, () => {
        state.count.set(state.count() - 1)
    })
}

module.exports = subscribe

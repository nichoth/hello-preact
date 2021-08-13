import { html } from 'htm/preact'
import { useState } from 'preact/hooks';

function connect (App, state, bus) {
    var emit = bus.emit.bind(bus)

    return function Connector () {
        var [_state, setState] = useState(state())

        state(function onChange (newState) {
            setState(newState)
        })

        return html`<div class="app">
            <${App} ...${_state} emit=${emit} />
        </div>`
    }
}

module.exports = connect

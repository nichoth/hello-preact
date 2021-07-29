import { render } from 'preact'
import { useState } from 'preact/hooks';
import { html } from 'htm/preact'
var struct = require('observ-struct')
var observ = require('observ')
var Bus = require('@nichoth/events')
var namespace = require('@nichoth/events/namespace')

var evs = namespace({
    count: ['inc', 'dec']
})

var state = struct({
    count: observ(0)
})

var bus = Bus({ memo: true })
var emit = bus.emit.bind(bus)

bus.on(evs.count.inc, () => {
    state.count.set(state.count() + 1)
})
bus.on(evs.count.dec, () => {
    state.count.set(state.count() - 1)
})

function App () {
    var [_state, setState] = useState(state())

    state(function onChange (newState) {
        setState(newState)
    })

    return html`<div class="app">
        <${Counter} ...${_state} emit=${emit} />
    </div>`
}

function Counter ({ count, emit }) {
    console.log('state', count)
    return html`<main>
        <h1>${count}</h1>
        <div>
            <button onClick=${emit(evs.count.inc)}>plus</button>
            <button onClick=${emit(evs.count.dec)}>minus</button>
        </div>
    </main>`
}

render(html`<${App} />`, document.getElementById('content'));

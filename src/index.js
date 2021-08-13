import { render } from 'preact'
import { html } from 'htm/preact'
var struct = require('observ-struct')
var observ = require('observ')
var Bus = require('@nichoth/events')
var subscribe = require('./subscribe')
var evs = require('./EVENTS')
var connect = require('./connect')

var bus = Bus({ memo: true })

var state = struct({
    count: observ(0)
})

subscribe(bus, state)

render(html`<${connect(Counter, state, bus)} />`,
    document.getElementById('content'));

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

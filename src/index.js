var route = require('route-event')()
import { render } from 'preact'
import { html } from 'htm/preact'
var router = require('ruta3')()
var IndexView = require('./view/index')
var SpecificImageView = require('./view/specific-image-view')
var qs = require('query-string')

function Roving (props) {
    return html`<div class="roving">
        ${props.children}
    </div>`
}

router.addRoute('/', function indexRoute (match) {
    return { view: IndexView }
})

router.addRoute('/*', function ({ splats }) {
    return { view: IndexView }
})

route(function onRoute (path) {
    console.log('path', path)
    var match = router.match(path)
    console.log('match', match)
    var { view } = match.action(match)
    var { splats } = match

    // every time the route changes, we re-render the view with the
    // new route params

    var obj = qs.parse(splats[0])

    if (!obj.speed && splats[0]) {
        // not the slideshow route
        var index = splats[0]
        view = SpecificImageView(index)
    }

    var el = html`<${Roving}>
        <${view} splats=${match.splats} params=${match.params}
            speed=${obj.speed}
        />
    </${Roving}`

    render(el, document.getElementById('content'))
})


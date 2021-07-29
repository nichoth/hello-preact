import { html } from 'htm/preact'
import { useState, useEffect } from 'preact/hooks'
var wrapper = require('../../wrapper')
var S = require('pull-stream')

function indexView (props) {
    var { speed } = props
    speed = speed || 3000
    var [imgData, setImg] = useState({
        img: null,
        err: null,
        metadata: null,
        hasFetched: false,
        index: 0
    })
    console.log('speed', speed)

    // when the component mounts, do this
    useEffect(() => {
        var s = wrapper.createStream()
        var i = 0

        var id

        S(
            s,
            S.drain(function onEvent (res) {
                setImg({
                    img: res.images.base64,
                    metadata: res.metadata,
                    err: null,
                    hasFetched: true,
                    index: res.index
                })

                // set the timeout in here instead of using `setInterval`
                // because this way it accounts for the time it takes to
                // transfer to and from the API. It adds `speed` milliseconds
                // from the time the last response was reveived, vs. pushing
                // at a standard interval regardless of API response time
                id = setTimeout(() => s.push(++i), speed)
                console.log('resssss', res, i)
            })
        )

        return () => {
            if (id) clearTimeout(id)
        }
    }, [])

    var plus = new URLSearchParams({ speed: parseInt(speed) + 100 }).toString()
    var minus = new URLSearchParams({ speed: parseInt(speed) - 100 }).toString()

    if (!imgData.img) {
        return null
    }

    return html`<div class="slideshow">
        <h1>mars roving</h1>

        <ul class="metadata">
            <li>sol -- ${imgData.metadata.sol}</li>
            <li>earth date -- ${imgData.metadata.earth_date}</li>
        </ul>

        <img src="${imgData.img}" />

        <div class="controls speed">
            <a href="/?${minus}">speed --</a>
            <span>${speed}</span>
            <a href="/?${plus}">speed ++</a>
        </div>

        <div class="img-index">
            <a href="/${imgData.index}">index ${imgData.index}</a>
        </div>

    </div>`
}

module.exports = indexView

var test = require('tape')
var wrapper = require('../wrapper')
var S = require('pull-stream')

test('by index', function (t) {
    t.plan(2)
    wrapper.byIndex(0)
        .then(res => {
            t.ok(res.metadata, 'should have metadata')
            t.ok(res.images, 'should have images')
        })
        .catch(err => t.error(err))
})

test('`latest` method', function (t) {
    t.plan(3)
    wrapper.latest()
        .then(({ metadata, images }) => {
            t.ok(metadata, 'should return metadata')
            t.ok(images.base64, 'should return base64 image')
            t.ok(images.ascii, 'should return ascii image')
        })
        .catch(err => t.error(err))
})

test('`createStream` method', function (t) {
    var stream = wrapper.createStream()

    var i = 0
    stream.push(i)

    S(
        stream,
        S.take(3),
        S.drain(function onData (data) {
            t.ok(data.images, 'should have images')
            t.ok(data.metadata, 'should have metadata')
            stream.push(i++)
        }, function onEnd (err) {
            t.error(err)
            t.pass('stream should end')
            t.end()
        })
    )
})

test('metadata', function (t) {
    t.plan(2)
    wrapper.metadata()
        .then(res => {
            t.ok(res.key, 'has key')
            t.ok(res.numImages, 'has numImages')
        })
        .catch(err => t.error(err))
})

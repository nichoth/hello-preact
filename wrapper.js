var API_URL = 'https://hiring.hypercore-protocol.org/termrover'
var fetch = require('isomorphic-fetch')
// var Readable = require('stream').Readable;
var S = require('pull-stream')
var Pushable = require('pull-pushable')

var wrapper = {
    metadata: function () {
        return fetch(API_URL)
            .then(res => res.json())
    },

    byIndex: function (index) {
        return fetch(API_URL + '/' + index)
            .then(res => res.json())
    },

    // get the laterst image
    latest: function () {
        return fetch(API_URL + '/latest')
            .then(res => {
                return res.json()
            })
    },

    // smaller indexes on the `/termrover/:index` endpoint are
    //   considered earlier
    createStream: function () {
        var p = Pushable()

        p.push(0)

        var stream = S(
            p,
            S.asyncMap(function (i, cb) {
                fetch(API_URL + '/' + i)
                    .then(res => res.json())
                    .then(res => {
                        cb(null, res)
                    })
                    .catch(err => cb(err))
            })
        )

        stream.push = p.push

        return stream
    },

    // TODO
    // createNodeStream: function () {
    //     var rs = Readable();
    //     var i = 0;

    //     // note the function _read here for async iteration
    //     rs._read = function () {

    //         fetch(API_URL + '/' + i++)
    //             .then(res => {
    //                 // var reader = res.body.getReader()
    //                 // reader.read.then(r => rs.push(r))

    //                 res.text().then(res => rs.push(res))
    //                 // rs.push(res);
    //             })
    //             .catch(err => console.log('errrr', err))

    //         // rs.push(String.fromCharCode(c++));
    //         // if (c > 'z'.charCodeAt(0)) rs.push(null);
    //     };

    //     return rs
    // }
}

module.exports = wrapper


# mars roving

[![Netlify Status](https://api.netlify.com/api/v1/badges/d02eb622-335a-430a-aa60-a3b739ce53cd/deploy-status)](https://app.netlify.com/sites/mars-roving/deploys)

see it on netlify -- https://mars-roving.netlify.app/

--------------------------------

Documenting how to make a website

------------------------------

## install
Git clone and then install dependencies

```
$ mkdir mars-roving
$ cd mars-roving
$ git clone https://github.com/nichoth/mars-roving.git .
$ npm i
```

## develop
This will open a webpage being served by [budo](https://www.npmjs.com/package/budo) on localhost. It live-reloads any changes to js or css.

```
$ npm start
```

### `npm version`

We have a `preversion` script for when you change the version number with `npm`. It will lint the code.

You could also add a test script to this also if you want to

```
    "preversion": "npm run lint && npm test"
```

## build
This builds the js and css and puts them in the `public/` directory.
```
$ npm run build
```

-------------------------

This uses:

* browserify
* [budo](https://www.npmjs.com/package/budo) as a local development server
* [preact](https://preactjs.com/) and [htm](https://www.npmjs.com/package/htm) as a view layer
* client-side routing via [route-event](https://github.com/nichoth/route-event)
* single-page redirects via netlify
* sass for css


---------------------------------------------------------

## test

### Test the frontend app in [cypress](https://www.cypress.io/)
```
npm run test-browser
```
This will open the cypress GUI so you can run some tests that depend on a browser environment.

### Test `wrapper` in node:
```
npm test
```

------------------------------------

## wrapper.js

```js
var mars = require('{this-package}/wrapper')

mars.byIndex(0)
    .then(res => {
        console.log('index 0', res)
    })
```

```js
var mars = require('{this-package}/wrapper')
var s = mars.createStream()
// the state of which index you are using is *external* to the `wrapper`
// module
var i = 0

S(
    s,
    S.drain(function onEvent (res) {
        console.log('resssss', res, i)

        // set the timeout in here instead of using `setInterval`
        // because this way it accounts for the time it takes to
        // transfer to and from the API. It adds `speed` milliseconds
        // from the time the last response was reveived, vs. pushing
        // at a standard interval regardless of API response time
        setTimeout(() => s.push(++i), speed)
    })
)
```

-------------------------------

## TODO

* handle errors when requesting the images

----------------------------------

## notes

The `wrapper` uses an isomarphic fetch module, so it works in either node or browsers

We are using [pull-streams](https://pull-stream.github.io/) here, which is not a standard in node or browsers, because it is the simplest way to achieve the goals of the slideshow -- "it shouldn't synchronously load all images". Also it allows us to adjust the speed of the iteration, and it works everywhere -- node and browsers.

This is an example of my preferred testing system -- cypress for browser environment, `tape` for node.js



--------------------



## https://hiring.hypercore-protocol.org/

> For this task, we ask that you write two components, the second building on the first.

> Both approaches share one component in common: a wrapper module that exports an easy-to-use interface for querying the Rover API:

> At `hiring.hypercore-protocol.org/termrover`, we've created an HTTP(S) API that lets you get images from Perseverance's "Front Left Hazard Avoidance Camera".

>  our API returns the images as both:
> * Base64-encoded strings (for embedded in img tags)
> * ASCII art (for displaying in the terminal)

## Wrapper Module

> The first module should be a small wrapper around the Rover API that exposes a few methods for dealing with Rover images. There should be methods for:
> 
> * Getting all information about the latest Rover image (the `/termrover/latest` endpoint).
> * Generating an iterator over all Rover images/metadata, ordered from earliest to latest (smaller indexes on the `/termrover/:index` endpoint are considered earlier). **This can be a Node.js stream, an async iterator, or a similar abstraction**, but it **shouldn't synchronously load all images**.
> 
> In both cases, the JSON response should be forwarded with minimal modifications — no need to extract out pieces of the response.
> 
> Once this module is tested and documented, you should do either the CLI Task, or the Frontend Task, as described below.


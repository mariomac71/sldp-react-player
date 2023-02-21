/**
 * Thanks to @cookpete 
 * https://github.com/cookpete/react-player/blob/master/src/utils.js
 */
import loadScript from 'load-script'
function getGlobal (key) {
    if (window[key]) {
      return window[key]
    }
    if (window.exports && window.exports[key]) {
      return window.exports[key]
    }
    if (window.module && window.module.exports && window.module.exports[key]) {
      return window.module.exports[key]
    }
    return null
  }
  
const requests = {};
export function getSDK (url, sdkGlobal, sdkReady = null, isLoaded = () => true, fetchScript = loadScript) {
    const existingGlobal = getGlobal(sdkGlobal)
    if (existingGlobal && isLoaded(existingGlobal)) {
      return Promise.resolve(existingGlobal)
    }
    return new Promise((resolve, reject) => {
      // If we are already loading the SDK, add the resolve and reject
      // functions to the existing array of requests
      if (requests[url]) {
        requests[url].push({ resolve, reject })
        return
      }
      requests[url] = [{ resolve, reject }]
      const onLoaded = sdk => {
        // When loaded, resolve all pending request promises
        requests[url].forEach(request => request.resolve(sdk))
      }
      if (sdkReady) {
        const previousOnReady = window[sdkReady]
        window[sdkReady] = function () {
          if (previousOnReady) previousOnReady()
          onLoaded(getGlobal(sdkGlobal))
        }
      }
      fetchScript(url, err => {
        if (err) {
          // Loading the SDK failed – reject all requests and
          // reset the array of requests for this SDK
          requests[url].forEach(request => request.reject(err))
          requests[url] = null
        } else if (!sdkReady) {
          onLoaded(getGlobal(sdkGlobal))
        }
      })
    })
  }
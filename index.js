const securityHeaders = {
  "Cross-Origin-Embedder-Policy": "require-corp; report-to=\"default\"",
  "Cross-Origin-Embedder-Policy-Report-Only": "require-corp; report-to=\"default\"",
  "Cross-Origin-Opener-Policy": "same-origin; report-to=\"default\"",
  "Cross-Origin-Resource-Policy": "same-site",
  "Content-Security-Policy": "default-src 'none'; script-src 'self'; connect-src 'self'; img-src 'self'; style-src 'self'; base-uri 'self'; form-action 'self'; font-src 'self'",
  "Permissions-Policy": "accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), display-capture=(), execution-while-not-rendered=(), execution-while-out-of-viewport=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), publickey-credentials-get=(), sync-xhr=(), usb=(), wake-lock=(), screen-wake-lock=(), xr-spatial-tracking=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "DENY"
}, vulnHeaders = [
  "X-Powered-By",
  "X-AspNet-Version"
]

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const response = await fetchResponse(request)
  const responseHeaders = new Headers(response.headers)

  amendResponseHeaders(responseHeaders)

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders
  })
}

async function fetchResponse(request) {
  return await fetch(request)
}

function amendResponseHeaders(responseHeaders) {
  addHeaders(responseHeaders)
  removeHeaders(responseHeaders)
}

function addHeaders(responseHeaders) {
  Object.keys(securityHeaders).forEach(
      header => responseHeaders.set(header, securityHeaders[header])
  )
}

function removeHeaders(responseHeaders) {
  vulnHeaders.forEach(header => responseHeaders.delete(header))
}

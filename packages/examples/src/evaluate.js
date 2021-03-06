'use strict'

const createBrowserless = require('browserless')
const browserless = createBrowserless()

const getUrlInfo = browserless.evaluate(async (page, response) => {
  const redirectChain = response.request().redirectChain()
  return {
    headers: response.headers(),
    // html: await page.content(),
    redirectStatusCodes: redirectChain.map(req => req.response().status()),
    redirectUrls: redirectChain.map(req => req.url()),
    statusCode: response.status(),
    url: response.url()
  }
})

require('./main')(async (url, opts) => {
  return {
    output: await getUrlInfo(url, opts)
  }
})

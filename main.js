const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const fs = require('fs')
const _ = require('lodash')

async function getPathname(context) {
  let {url: contextUrl, parameters} = await context.util.models.request.getById(context.meta.requestId)
  const compiled = _.template(contextUrl, {interpolate: /{{([\s\S]+?)}}/g})
  const url = new URL(compiled(context.context))
  const queryParams = {}
  const params = parameters.filter(param => !param.disabled).map(param => {
    queryParams[param.name] = param.value
    return param
  })
  const paramCount = parameters.filter(param => !param.disabled).length
  const query = paramCount > 0 ? '?' + new URLSearchParams(queryParams).toString() : ''
  return `${url.pathname}${query}`
}

module.exports.templateTags = [{
  name: 'Fireblocks',
  displayName: 'fireblocks',
  description: 'Fireblocks',
  args: [
    { 
      displayName: 'PRIVATE KEY PATH',
      type: 'string',
      defaultValue: ''
    },
    {
      displayName: 'API KEY',
      type: 'string',
      defaultValue: ''
    }
  ],
  async run (context, privateKey, apiKey) {
    const pathname = await getPathname(context)
    const privateKeyContent = fs.readFileSync(privateKey, 'utf8')
    const request = await context.util.models.request.getById(context.meta.requestId)
    const body = _.get(request, 'body.text')
    const token = jwt.sign({
      uri: pathname,
      nonce: Date.now(),
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 55,
      sub: apiKey,
      bodyHash: crypto.createHash('sha256').update(body || '').digest().toString('hex')
    }, privateKeyContent, { algorithm: 'RS256'})

    return token
  }
}]

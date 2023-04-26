import { createServer } from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

const server = createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = url.match(route.path)

    const { query, ...params } = routeParams.groups

    req.query = query ? extractQueryParams(query) : {}
    req.params = params

    return route.handler(req, res)
  }

  return res.writeHead(404).end(JSON.stringify({
    status: 404,
    error: `Can't find this route: ${url}`
  }))
})

server.listen(3333)

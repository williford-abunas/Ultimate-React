import { create, router as _router, defaults } from "json-server"
const server = create()
const router = _router("data/cities.json")
const middlewares = defaults()


server.use((req, res, next) => {
  setTimeout(next, 500)
})

server.use(middlewares)
server.use(router)


server.listen(8000, () => {
  console.log("JSON Server is running on port 8000 with a delay")
})
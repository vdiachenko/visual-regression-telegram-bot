import bot from './bot'
import server from './server'

server.listen(process.env.PORT, () =>
    console.log(`Server listening on ${process.env.PORT}`)
)

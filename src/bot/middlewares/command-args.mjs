export default (ctx, next) => {
    const text = ctx.update.message.text.toLowerCase()

    if (text.startsWith('/')) {
        let args = []
        let command
        const match = text.match(/^\/([^\s]+)\s?(.+)?/)

        if (match !== null) {
            if (match[1]) {
                command = match[1]
            }

            if (match[2]) {
                args = match[2].split(' ')
            }
        }

        ctx.state.command = {
            raw: text,
            command,
            args,
        }
    }

    return next()
}

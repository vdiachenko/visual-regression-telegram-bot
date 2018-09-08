import backstop from '../../backstop'

export default async ({ reply, state, update, telegram }) => {
    try {
        const args = state.command.args
        const { message } = await backstop('reference', ...args)
        const { chat, message_id } = update.message

        telegram.sendMessage(chat.id, `${message}`, {
            reply_to_message_id: message_id,
            parse_mode: 'Markdown',
        })
    } catch (err) {
        reply('Something went wrong... 😢')
    }
}

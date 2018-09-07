import fs from 'fs'
import path from 'path'
import backstop from 'backstopjs'
import expose from './expose.js'

const { __dirname } = expose

export default async (command = 'test', project, label) => {
    const configPath = path.resolve(__dirname, 'configs', `${project}.json`)
    const { id } = JSON.parse(fs.readFileSync(configPath, 'utf8'))
    const reportPath =
        'backstop_data/html_report/' + process.env.REPORT_INDEX_FILE
    const date = new Date()
    const testId = `${id}${date.getFullYear()}${date.getMonth() +
        1}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`

    try {
        await backstop(command, {
            config: configPath,
            ...(label !== undefined && { filter: label }),
        })

        return {
            status: 'success',
            message:
                command === 'test'
                    ? '✅ Test passed.'
                    : '♻️ Reference successfully created.',
            id,
            reportPath,
            testId,
        }
    } catch (err) {
        return {
            status: 'fail',
            message:
                command === 'test'
                    ? '❌ Test failed!'
                    : '❗️ Failed create reference.',
            id,
            reportPath,
            testId,
        }
    }
}

import stringTests from './prototype_tests/string.js'
import arrayTests from './prototype_tests/array.js'
import objectTests from './prototype_tests/object.js'

const tests = stringTests.concat(arrayTests).concat(objectTests)

var failed = []
var passed = []

export default function run () {
    tests.forEach((test) => {
        try {
            if (test.run()) {
                console.error('%s\x1b[36m%s\x1b[0m%s\x1b[36m%s\x1b[0m%s\x1b[32m%s\x1b[0m', 'Test with name ', test.name, ' in context ', test.context, ' has ', 'passed!')
                passed.push({context: test.context, name: test.name})
            } else {
                console.error('%s\x1b[36m%s\x1b[0m%s\x1b[36m%s\x1b[0m%s\x1b[31m%s\x1b[0m', 'Test with name ', test.name, ' in context ', test.context, ' has ', 'failed!')
                failed.push({context: test.context, name: test.name})
            }
        } catch (error) {
            console.error('%s\x1b[36m%s\x1b[0m%s\x1b[36m%s\x1b[0m%s\x1b[31m%s\x1b[0m', 'Test with name ', test.name, ' in context ', test.context, ' has ', `failed: ${error}`)
            failed.push({context: test.context, name: test.name})
        }
    })

    console.log('--------------------------------')
    console.log('%s\x1b[32m%s\x1b[31m%s\x1b[0m', `${failed.length + passed.length} tests were run: `, `${passed.length} passed,`, ` ${failed.length} failed.`)
    console.log('--------------------------------')
    console.log('\x1b[32m%s\x1b[0m', 'Passed tests:')
    console.log(passed)
    console.log('--------------------------------')
    console.log('\x1b[31m%s\x1b[32m%s\x1b[0m', 'Failed tests: ', failed.length ? null : 'none!')
    if (failed.length) console.log(failed)
}
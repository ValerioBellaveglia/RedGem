import stringTests from './class_tests/string.js'
import arrayTests from './class_tests/array.js'
import objectTests from './class_tests/object.js'

const tests = stringTests.concat(arrayTests).concat(objectTests)

var failed = []
var passed = []

export default function run () {
    tests.forEach((test) => {
        try {
            if (test.run()) {
                console.error(`Test with name ${test.name} in context ${test.context} passed!`)
                passed.push({context: test.context, name: test.name})
            } else {
                console.error(`Test with name ${test.name} in context ${test.context} failed!`)
                failed.push({context: test.context, name: test.name})
            }
        } catch (error) {
            console.error(`Test with name ${test.name} in context ${test.context} failed with error:`, error)
            failed.push({context: test.context, name: test.name})
        }
    })

    console.log('--------------------------------')
    console.log(`${failed.length + passed.length} tests were run: ${passed.length} passed, ${failed.length} failed.`)
    console.log('Passed tests:')
    console.log(passed)
    console.log('Failed tests:')
    console.log(failed)
}
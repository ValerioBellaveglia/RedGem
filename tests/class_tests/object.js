import { expect, error } from '../helpers.js'

export default [
    {
        context: 'object',
        name: 'any',
        run: function () {
            let object1 = {key1: 1, key2: 2, key3: 3}
            let object2 = {key1: 'red', key2: 'green'}

            expect(this, object1.any((key, number) => {
                return number > 2
            }) === true)
            expect(this, object1.any((key, number) => {
                return number > 3
            }) === false)
            expect(this, object2.any((key, color) => {
                return color === 'red'
            }) === true)
            expect(this, object2.any((key, color) => {
                return color === 'yellow'
            }) === false)

            return true
        }
    },
    {
        context: 'object',
        name: 'compact',
        run: function () {
            let object = {key1: 1, key2: 2, key3: 3, key4: null, key5: undefined, key6: ''}

            expect(this, Object.keys(object.compact()).includes("key1"))
            expect(this, Object.keys(object.compact()).includes("key2"))
            expect(this, Object.keys(object.compact()).includes("key3"))
            expect(this, !Object.keys(object.compact()).includes("key4"))
            expect(this, !Object.keys(object.compact()).includes("key5"))
            expect(this, !Object.keys(object.compact()).includes("key6"))

            expect(this, Object.keys(object.compact(true)).includes("key1"))
            expect(this, Object.keys(object.compact(true)).includes("key2"))
            expect(this, Object.keys(object.compact(true)).includes("key3"))
            expect(this, Object.keys(object.compact(true)).includes("key6"))
            expect(this, !Object.keys(object.compact(true)).includes("key4"))
            expect(this, !Object.keys(object.compact(true)).includes("key5"))

            return true
        }
    },
    {
        context: 'object',
        name: 'forEach',
        run: function () {
            let object = {key1: 1, key2: 2, key3: 3}

            let sum = 0;

            object.forEach((key, number) => {
                sum += number
            })

            object.forEach((key, number) => {
                object[key] = number + 1
            })

            expect(this, sum === 6)
            expect(this, object["key1"] === 2)
            expect(this, object["key2"] === 3)
            expect(this, object["key3"] === 4)

            return true
        }
    }
]
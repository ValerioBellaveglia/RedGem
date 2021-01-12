import { expect, error } from '../helpers.js'

export default [
    {
        context: 'object',
        name: 'isObject',
        run: function () {
            let string = 'string'
            let number = 1
            let array = []
            let object = {}

            expect(this, Object.isObject(null) === false)
            expect(this, Object.isObject(undefined) === false)
            expect(this, Object.isObject(string) === false)
            expect(this, Object.isObject(number) === false)
            expect(this, Object.isObject(array) === false)
            expect(this, Object.isObject(object) === true)

            return true
        }
    },
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
    },
    {
        context: 'object',
        name: 'alike',
        run: function () {
            let object1 = {key1: 1, key2: 2, key3: 'string'}
            let object2 = {key1: 1, key2: 2, key3: 'string'}
            let object3 = {key1: 1, key2: 2, key3: 3}
            let object4 = {key1: 1, key2: 2, key3: ['string', 1]}
            let object5 = {key1: 1, key2: 2, key3: [1, 'string']}
            let object6 = {key1: 1, key2: 2, key3: {key1: 1}}
            let object7 = {key1: 1, key2: 2, key3: {key1: 1}}
            let object8 = {key1: 1, key2: 2, key3: {key1: 'string'}}
            let object9 = {key1: 1, key2: [{key1: 1}, {key2: 2}]}
            let object10 = {key1: 1, key2: [{key1: 1}, {key2: 2}]}
            let object11 = {key1: 1, key2: [{key1: 1}, {key2: 'string'}]}
            let object12 = {key1: 1, key2: {key1: 1, key2: [1, 2]}}
            let object13 = {key1: 1, key2: {key1: 1, key2: [1, 2]}}
            let object14 = {key1: 1, anotherkey2: {key1: 1, key2: [1, 2]}}
            let object15 = {key1: 1, key2: {key1: 1, key2: [1, null]}}
            let object16 = {key1: 'string', key2: {key1: 1, key2: [1, 2]}}
            let object17 = {key1: 1, key2: [1, 2, {key1: [1, null, {key2: 'string', key2: {key1: 1, key2: 2, key3: [{a: 1, b: 2}, {a: 3, b: 6}]}}]}]}
            let object18 = {key1: 1, key2: [1, 2, {key1: [1, null, {key2: 'string', key2: {key1: 1, key2: 2, key3: [{a: 1, b: 2}, {a: 3, b: 6}]}}]}]}
            let object19 = {key1: 1, key2: [1, 2, {key1: [1, null, {key2: 'string', key2: {key1: 1, key2: 2, key3: [{a: 1, b: 2}, {a: 3, b: 10}]}}]}]}
            let string = 'string'
            let array = []
            let number = 1

            expect(this, object1.alike(object2) === true)
            expect(this, object2.alike(object3) === false)
            expect(this, object4.alike(object5) === true)
            expect(this, object6.alike(object7) === true)
            expect(this, object7.alike(object8) === false)
            expect(this, object9.alike(object10) === true)
            expect(this, object10.alike(object11) === false)
            expect(this, object12.alike(object13) === true)
            expect(this, object13.alike(object14) === false)
            expect(this, object13.alike(object15) === false)
            expect(this, object13.alike(object16) === false)
            expect(this, object17.alike(object18) === true)
            expect(this, object18.alike(object19) === false)

            error(this, object1, this.name, string)
            error(this, object1, this.name, array)
            error(this, object1, this.name, number)
            error(this, object1, this.name, null)
            error(this, object1, this.name, undefined)

            return true
        }
    }
]
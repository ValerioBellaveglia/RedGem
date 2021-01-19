import { expect, error } from '../helpers.js'

export default [
    {
        context: 'array',
        name: 'first',
        run: function () {
            let array = [1, 2, 3, 4, 5]

            expect(this, array.first() === 1)
            expect(this, array.first(2).length === 2)
            expect(this, array.first(2).includes(1))
            expect(this, array.first(2).includes(2))
            expect(this, !array.first(2).includes(3))
            expect(this, !array.first(2).includes(4))
            expect(this, !array.first(2).includes(5))
            expect(this, array.first(array.length + 1).length === array.length)
            error(this, array, this.name, 'string')

            return true
        }
    },
    {
        context: 'array',
        name: 'last',
        run: function () {
            let array = [1, 2, 3, 4, 5]

            expect(this, array.last() === 5)
            expect(this, array.last(2).length === 2)
            expect(this, array.last(2).includes(5))
            expect(this, array.last(2).includes(4))
            expect(this, !array.last(2).includes(3))
            expect(this, !array.last(2).includes(2))
            expect(this, !array.last(2).includes(1))
            expect(this, array.last(array.length + 1).length === array.length)
            error(this, array, this.name, 'string')

            return true
        }
    },
    {
        context: 'array',
        name: 'empty',
        run: function () {
            let array1 = [1, 2, 3]
            let array2 = []

            expect(this, array1.empty() === false)
            expect(this, array2.empty() === true)

            return true
        }
    },
    {
        context: 'array',
        name: 'any',
        run: function () {
            let array1 = [1, 2, 3]
            let array2 = []

            expect(this, array1.any() === true)
            expect(this, array2.any() === false)

            return true
        }
    },
    {
        context: 'array',
        name: 'compact',
        run: function () {
            let array = [1, 2, 3, null, undefined, '']

            expect(this, array.compact().length === 3)
            expect(this, array.compact().includes(1))
            expect(this, array.compact().includes(2))
            expect(this, array.compact().includes(3))
            expect(this, !array.compact().includes(null))
            expect(this, !array.compact().includes(undefined))
            expect(this, !array.compact().includes(''))

            expect(this, array.compact(true).length === 4)
            expect(this, array.compact(true).includes(1))
            expect(this, array.compact(true).includes(2))
            expect(this, array.compact(true).includes(3))
            expect(this, array.compact(true).includes(''))
            expect(this, !array.compact(true).includes(null))
            expect(this, !array.compact(true).includes(undefined))

            return true
        }
    },
    {
        context: 'array',
        name: 'uniq',
        run: function () {
            let array1 = [1, 1, 2]
            let array2 = [1, null, null]
            let array3 = [1, undefined, undefined]
            let array4 = [1, 1, 'string', 'string']

            expect(this, array1.uniq().length === 2)
            expect(this, array2.uniq().length === 2)
            expect(this, array3.uniq().length === 2)
            expect(this, array4.uniq().length === 2)

            return true
        }
    },
    {
        context: 'array',
        name: 'reject',
        run: function () {
            let array1 = [1, 1, 2]
            let array2 = [1, null, null, '', 'string', [], {}]
            let array3 = [{key: 1}, {key: 2}, {key: 3}]
            let array4 = [1, 1, 'string', 'string']

            expect(this, array1.reject((arrayElement) => arrayElement < 2).length === 1)
            expect(this, array2.reject((arrayElement) => arrayElement).length === 3)
            expect(this, array2.reject((arrayElement) => !arrayElement).length === 4)
            expect(this, array3.reject((arrayElement) => arrayElement.key > 1).length === 1)
            expect(this, array4.reject((arrayElement) => typeof arrayElement === 'string').length === 2)

            return true
        }
    },
    {
        context: 'array',
        name: 'alike',
        run: function () {
            let array1 = [1, 2, 3]
            let array2 = [1, 2, 3]
            let array3 = [1, 2, 'string']
            let array4 = [1, 2, ['a']]
            let array5 = [1, 2, ['a']]
            let array6 = [1, 2, ['b']]
            let array7 = [1, 2, {a: ['b']}]
            let array8 = [1, 2, {a: ['b']}]
            let array9 = [1, 2, {a: ['c']}]
            let array10 = [1, 2, {b: ['c']}]
            let array11 = [1, 2, [{a: 1}, {b: 2}, {c: 3}], {a: [1, 2, {a: [1], b: {c: [1, null, {a: 1}]}}]}]
            let array12 = [1, 2, [{a: 1}, {b: 2}, {c: 3}], {a: [1, 2, {a: [1], b: {c: [1, null, {a: 1}]}}]}]
            let array13 = [1, 2, [{a: 1}, {b: 2}, {c: 3}], {a: [1, 2, {a: [1], b: {c: [1, null, {a: 2}]}}]}]

            expect(this, array1 != array2)
            expect(this, array1.alike(array2) === true)
            expect(this, array2.alike(array3) === false)
            expect(this, array4.alike(array5) === true)
            expect(this, array5.alike(array6) === false)
            expect(this, array7.alike(array8) === true)
            expect(this, array8.alike(array9) === false)
            expect(this, array9.alike(array10) === false)
            expect(this, array8.alike(array10) === false)
            expect(this, array11.alike(array12) === true)
            expect(this, array12.alike(array13) === false)

            return true
        }
    },
    {
        context: 'array',
        name: 'sortBy',
        run: function () {
            let array1 = [{quantity: 5}, {quantity: 2}, {quantity: 10}, {quantity: 7}, {quantity: 3}]
            let array2 = [2, 3, null, 1, undefined, 5, 4, 10, null, 7, 8, 1]

            let crescentArray1 = array1.sortBy((prevArrayElement, nextArrayElement) => {
                return prevArrayElement.quantity < nextArrayElement.quantity
            })
            let decrescentArray1 = array1.sortBy((prevArrayElement, nextArrayElement) => {
                return prevArrayElement.quantity > nextArrayElement.quantity
            })

            let sortedArray2 = array2.sortBy((prevArrayElement, nextArrayElement) => {
                return prevArrayElement < nextArrayElement
            })

            expect(this, crescentArray1[0].quantity === 2)
            expect(this, crescentArray1[1].quantity === 3)
            expect(this, crescentArray1[2].quantity === 5)
            expect(this, crescentArray1[3].quantity === 7)
            expect(this, crescentArray1[4].quantity === 10)

            expect(this, decrescentArray1[4].quantity === 2)
            expect(this, decrescentArray1[3].quantity === 3)
            expect(this, decrescentArray1[2].quantity === 5)
            expect(this, decrescentArray1[1].quantity === 7)
            expect(this, decrescentArray1[0].quantity === 10)

            expect(this, sortedArray2[0] === null)
            expect(this, sortedArray2[1] === null)
            expect(this, sortedArray2[2] === 1)
            expect(this, sortedArray2[3] === 1)
            expect(this, sortedArray2[4] === 2)
            expect(this, sortedArray2[5] === 3)
            expect(this, sortedArray2[6] === 4)
            expect(this, sortedArray2[7] === 5)
            expect(this, sortedArray2[8] === 7)
            expect(this, sortedArray2[9] === 8)
            expect(this, sortedArray2[10] === 10)
            expect(this, sortedArray2[11] === undefined)

            return true   
        }
    }
]
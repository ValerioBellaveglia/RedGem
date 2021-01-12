import { isObject } from '../../helpers.js'

export default [
    {
        // Checks if the argument is a literal object that can have key-value pairs.
        name: 'isObject',
        function: isObject
    },
    {
        // Checks wether the object contains at least one key-value pair that satisfies the callback condition
        name: 'any',
        function: function (callback) {
            return !Object.keys(this).every((objectKey) => {
                return !callback(objectKey, this[objectKey])
            })
        }
    },
    {
        // Removes key-value pairs from the object when either of them is null, undefined or "" (empty string). Keeps empty strings if true argument is given.
        name: 'compact',
        function: function (keepEmptyStrings) {
            const condition = function (objectValue) {
                return keepEmptyStrings ? (objectValue != null && objectValue != undefined) : objectValue
            }

            var newObjectKeys = Object.keys(this).filter((objectKey) => condition(this[objectKey]))
            var object = {}
            
            newObjectKeys.forEach((objectKey) => {
                object[objectKey] = this[objectKey]
            })

            return object
        }
    },
    {
        // Iterates through each key: value pair of the object.
        name: 'forEach',
        function: function (callback) {
            Object.keys(this).forEach((objectKey) => {
                callback(objectKey, this[objectKey])
            })

            return this
        }
    },
    {
        // Checks if two objects are equivalent, having the same key/value pairs. Ignores order.
        name: 'alike',
        function: function (object) {
            if (!isObject(object)) throw 'Cannot perform comparison of object with non-object argument'

            let thisObjectPropertiesInSecondObject = Object.keys(this).every((thisObjectKey) => {
                if (Array.isArray(this[thisObjectKey]) || isObject(this[thisObjectKey])) {
                    return Object.keys(object).includes(thisObjectKey) && this[thisObjectKey].alike(object[thisObjectKey])
                } else {
                    return this[thisObjectKey] === object[thisObjectKey]
                }
            })

            let secondObjectPropertiesInThisObject = Object.keys(object).every((secondObjectKey) => {
                if (Array.isArray(object[secondObjectKey]) || isObject(object[secondObjectKey])) {
                    return Object.keys(this).includes(secondObjectKey) && this[secondObjectKey].alike(object[secondObjectKey])
                } else {
                    return this[secondObjectKey] === object[secondObjectKey]
                }
            })
            
            return thisObjectPropertiesInSecondObject && secondObjectPropertiesInThisObject
        }
    }
]
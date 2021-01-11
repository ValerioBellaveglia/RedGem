export default [
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
    }
]
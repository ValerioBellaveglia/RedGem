import { isObject } from '../../helpers.js'

export default [
    {
        // Returns first element (or first n elements if n is given) of the array.
        name: "first",
        function: function(quantity = 1) {
            if (quantity === 1) {
                return this[0]
            } else if (Number.isInteger(quantity)) {
                return this.filter((_arrayElementValue, arrayElementindex) => {
                    return arrayElementindex < quantity
                })
            } else {
                throw 'Quantity must be an integer'
            }
        }
    },
    {
        // Returns last element (or last n elements if n is given) of the array.
        name: "last",
        function: function(quantity = 1) {
            if (quantity === 1) {
                return this[this.length - 1]
            } else if (Number.isInteger(quantity)) {
                return this.filter((_arrayElementValue, arrayElementIndex) => {
                    return arrayElementIndex >= this.length - quantity
                })
            } else {
                throw 'Quantity must be an integer'
            }
        }
    },
    {
        // Tells wether the array is empty.
        name: 'empty',
        function: function () {
            return this.length == 0
        }
    },
    {
        // Tells wether the array contains at least one element satisfying the callback condition or not.
        // If callback is not given, returns true if the array contains at least one element.
        name: 'any',
        function: function (callback = false) {
            return callback ? !this.every((arrayElement) => !callback(arrayElement)) : this.length > 0
        }
    },
    {
        // Clears the array from null, undefined and "" (empty string) values. Keeps empty strings if true argument is given.
        name: 'compact',
        function: function (keepEmptyStrings = false) {
            const condition = function (arrayElement) {
                return keepEmptyStrings ? (arrayElement != null && arrayElement != undefined) : arrayElement
            }

            var array = this.filter((arrayElement) => {
                return condition(arrayElement)
            })

            return array
        }
    },
    {
        // Clears the array from duplicate values, keeping the first occurrence.
        name: 'uniq',
        function: function () {
            return this.filter((arrayElementValue, arrayElementIndex) => {
                return this.indexOf(arrayElementValue) == arrayElementIndex
            })
        }
    },
    {
        // Rejects all elements of array that satisfy the callback condition.
        name: 'reject',
        function: function (callback) {
            return this.filter((arrayElement) => !callback(arrayElement))
        }
    },
    {
        // Checks if two arrays are equivalent. Ignores order.
        name: 'alike',
        function: function (array) {
            if (array === undefined || array === null || !Array.isArray(array)) throw 'Cannot perform comparison of array with non-array argument'

            let thisArrayContainsSecondArrayElements = this.every((arrayElement) => {
                if (Array.isArray(arrayElement) || isObject(arrayElement)) {
                    let arrayElementQuantityInThisArray = this.filter((thisArrayElement) => {
                        if (Array.isArray(thisArrayElement) || isObject(thisArrayElement)) {
                            let sameType = Array.isArray(arrayElement) && Array.isArray(thisArrayElement) || isObject(arrayElement) && isObject(thisArrayElement)
                            return sameType && arrayElement.alike(thisArrayElement)
                        } else {
                            return arrayElement === thisArrayElement
                        }
                    }).length

                    let arrayElementQuantityInSecondArray = array.filter((secondArrayElement) => {
                        if (Array.isArray(secondArrayElement) || isObject(secondArrayElement)) {
                            let sameType = Array.isArray(arrayElement) && Array.isArray(secondArrayElement) || isObject(arrayElement) && isObject(secondArrayElement)
                            return sameType && arrayElement.alike(secondArrayElement)
                        } else {
                            return arrayElement === secondArrayElement
                        }
                    }).length

                    return arrayElementQuantityInThisArray === arrayElementQuantityInSecondArray
                } else {
                    return array.includes(arrayElement)
                }
            })

            let secondArrayContainsThisArrayElements = array.every((arrayElement) => {
                if (Array.isArray(arrayElement) || isObject(arrayElement)) {
                    let arrayElementQuantityInThisArray = this.filter((thisArrayElement) => {
                        if (Array.isArray(thisArrayElement) || isObject(thisArrayElement)) {
                            let sameType = Array.isArray(arrayElement) && Array.isArray(thisArrayElement) || isObject(arrayElement) && isObject(thisArrayElement)
                            return sameType && arrayElement.alike(thisArrayElement)
                        } else {
                            return arrayElement === thisArrayElement
                        }
                    }).length

                    let arrayElementQuantityInSecondArray = array.filter((secondArrayElement) => {
                        if (Array.isArray(secondArrayElement) || isObject(secondArrayElement)) {
                            let sameType = Array.isArray(arrayElement) && Array.isArray(secondArrayElement) || isObject(arrayElement) && isObject(secondArrayElement)
                            return sameType && arrayElement.alike(secondArrayElement)
                        } else {
                            return arrayElement === secondArrayElement
                        }
                    }).length

                    return arrayElementQuantityInThisArray === arrayElementQuantityInSecondArray
                } else {
                    return this.includes(arrayElement)
                }
            })

            return thisArrayContainsSecondArrayElements && secondArrayContainsThisArrayElements
        }
    },
    {
        // Sorts elements of array by callback. First element is put at a smaller index if condition is true. Null values are prepended and undefined values are appended to the array.
        name: 'sortBy',
        function: function(callback) {
            var array = [...this]
            return array.sort((prevArrayElement, nextArrayElement) => {
                return !prevArrayElement || callback(prevArrayElement, nextArrayElement) ? -1 : 1
            })
        }
    }
]
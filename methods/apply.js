import stringMethods from './class_methods/string.js'
import arrayMethods from './class_methods/array.js'
import objectMethods from './class_methods/object.js'

export default function apply () {
    stringMethods.forEach((method) => {
        String.prototype[method.name] = method.function
    })
    
    arrayMethods.forEach((method) => {
        Array.prototype[method.name] = method.function
    })
    
    objectMethods.forEach((method) => {
        Object.prototype[method.name] = method.function
    })
}

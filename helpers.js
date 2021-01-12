export const isObject = function (object) {
    return object != undefined && object != null && object.constructor === Object
}
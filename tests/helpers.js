export const expect = function (test, statement, error) {
    if (!statement) {
        throw 'Expectation failed.'
    }
} 

export const error = function (test, subject, method, args) {
    try {
        if (Array.isArray(args)) {
            subject[method](...args)
        } else {
            subject[method](args)

            throw 'Unraised'
        }
    } catch (error) {
        if (error == 'Unraised') throw 'Error was expected but was not raised'

        return true
    }
} 
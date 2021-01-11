import { expect } from '../helpers.js'

export default [
    {
        context: 'string',
        name: 'alike',
        run: function () {
            let string1 = 'String'
            let string2 = 'String'
            let string3 = 'string'
            let string4 = 'Strin'

            expect(this, string1.alike(string2) === true)
            expect(this, string2.alike(string3) === true)
            expect(this, string1.alike(string3) === true)
            expect(this, string1.alike(string4) === false)

            expect(this, string2.alike(string1) === true)
            expect(this, string3.alike(string2) === true)
            expect(this, string3.alike(string1) === true)
            expect(this, string4.alike(string1) === false)

            return true
        }
    }
]
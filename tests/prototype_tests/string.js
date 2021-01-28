import { expect, error } from '../helpers.js'

export default [
    {
        context: 'string',
        name: 'alike',
        run: function () {
            let string1 = 'String'
            let string2 = 'String'
            let string3 = 'string'
            let string4 = 'Strin'
            let number = 1
            let array = []
            let object = {}

            expect(this, string1.alike(string2) === true)
            expect(this, string2.alike(string3) === true)
            expect(this, string1.alike(string3) === true)
            expect(this, string1.alike(string4) === false)

            expect(this, string2.alike(string1) === true)
            expect(this, string3.alike(string2) === true)
            expect(this, string3.alike(string1) === true)
            expect(this, string4.alike(string1) === false)

            error(this, string1, this.name, number)
            error(this, string1, this.name, array)
            error(this, string1, this.name, object)
            error(this, string1, this.name, null)
            error(this, string1, this.name, undefined)

            return true
        }
    },
    {
        context: 'string',
        name: 'toCamelCase',
        run: function () {
            let string1 = 'string'
            let string2 = 'string with spaces'
            let string3 = 'string-kebab-case'
            let string4 = 'string_snake_case'
            let string5 = 'StringPascalCase'
            let string6 = 'stRiNg whIch-isMi_xed'

            expect(this, string1.toCamelCase() == 'string')
            expect(this, string2.toCamelCase() == 'stringWithSpaces')
            expect(this, string3.toCamelCase() == 'stringKebabCase')
            expect(this, string4.toCamelCase() == 'stringSnakeCase')
            expect(this, string5.toCamelCase() == 'stringPascalCase')
            expect(this, string6.toCamelCase() == 'stRiNgWhIchIsMiXed')

            return true
        }
    },
    {
        context: 'string',
        name: 'toPascalCase',
        run: function () {
            let string1 = 'string'
            let string2 = 'string with spaces'
            let string3 = 'string-kebab-case'
            let string4 = 'string_snake_case'
            let string5 = 'stringCamelCase'
            let string6 = 'stRiNg whIch-isMi_xed'

            expect(this, string1.toPascalCase() == 'String')
            expect(this, string2.toPascalCase() == 'StringWithSpaces')
            expect(this, string3.toPascalCase() == 'StringKebabCase')
            expect(this, string4.toPascalCase() == 'StringSnakeCase')
            expect(this, string5.toPascalCase() == 'StringCamelCase')
            expect(this, string6.toPascalCase() == 'StRiNgWhIchIsMiXed')

            return true
        }
    }
]
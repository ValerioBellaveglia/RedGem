import camelCase from 'camelcase'

export default [
    {
        // Compares two strings ignoring case.
        name: 'alike',
        function: function (string) {
            if (typeof string != 'string') throw 'Cannot perform comparison of string with non-string argument'
            
            return this.toLowerCase() === string.toLowerCase()
        }
    },
    {
        // Transforms the string to camelCase.
        name: 'toCamelCase',
        function: function () {       
            return camelCase(this)
        }
    },
    {
        // Transforms the string to PascalCase.
        name: 'toPascalCase',
        function: function () {       
            return camelCase(this, { pascalCase: true })
        }
    }
]
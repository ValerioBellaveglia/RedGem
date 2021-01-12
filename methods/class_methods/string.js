export default [
    {
        // Compares two strings ignoring case.
        name: 'alike',
        function: function (string) {
            if (typeof string != 'string') throw 'Cannot perform comparison of string with non-string argument'
            
            return this.toLowerCase() === string.toLowerCase()
        }
    }
]
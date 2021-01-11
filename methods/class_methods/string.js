export default [
    {
        // Compares two strings ignoring case.
        name: 'alike',
        function: function (string) {
            if (typeof string === 'string') {
                return this.toLowerCase() === string.toLowerCase()
            } else {
                console.error('Cannot perform comparison with non-string argument')
            }
        }
    }
]
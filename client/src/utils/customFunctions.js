

module.exports = {

    //This function is used to convert the image data that was saved into mongoD as an array of binary to a base64 string
    //Base 64 string is required for our browser to understand and display the image
    arrayBufferToBase64: function(buffer) {
        console.log('converting to base 64')
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }

}
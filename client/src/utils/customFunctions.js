

    //This function is used to convert the image data that was saved into mongoD as an array of binary to a base64 string
    //Base 64 string is required for our browser to understand and display the image
     function arrayBufferToBase64(buffer) {
        console.log('converting to base 64')
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }

    function formatDate(string){
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',  };
        return new Date(string).toLocaleDateString([],options);
    }

 

export default {arrayBufferToBase64, formatDate}



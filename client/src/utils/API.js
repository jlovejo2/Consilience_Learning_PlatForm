import axios from 'axios';

export default {

    loginUser: function(userObj) {
        return axios.post("/loginUser/", userObj );
    }

}
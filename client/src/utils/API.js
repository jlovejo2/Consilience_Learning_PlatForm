import axios from 'axios';

export default {

    loginUser: function(userObj) {
        return axios.post("/loginUser/", userObj );
    },
    getClasses: function() {
        return axios.get("/api/classrooms")
    }

}
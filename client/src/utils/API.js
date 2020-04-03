import axios from 'axios';

export default {

    userLogin: function(userObj) {
        return axios.post("/authenticate/users/login", userObj );
    },
    userRegister: function(userObj) {
        return axios.post("/authenticate/users/register", userObj)
    },
    getClasses: function() {
        return axios.get("/api/classrooms")
    },
    addClass: function(newClass) {
        return axios.post("api/classrooms", newClass)
    }

}
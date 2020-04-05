import axios from 'axios';

export default {

    userLogin: function (userObj) {
        return axios.post("/users/login", userObj);
    },
    userRegister: function (userObj) {
        return axios.post("/users/register", userObj)
    },
    getClasses: function () {
        return axios.get("/api/classrooms")
    },
    addClass: function (newClass) {
        return axios.post("api/classrooms", newClass)
    },
    getClass: function (id) {
        return axios.get("api/classrooms/" + id)
    },
    updateClass: function (id, updateObj) {
        return axios.post('api/classrooms/' + id, updateObj)
    },
    updateClassImage: function (id, image) {
        return axios.post('api/classrooms/image/' + id, image, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    getClassImage: function(id) {
        return axios.get('api/classrooms/image/' + id)
    }

}
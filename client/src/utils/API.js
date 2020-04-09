import axios from 'axios';

export default {
    // get cookie and decode
    readAndVerifyCookie: () => {
        return axios.get('/users/getcookie') 
    },
    // get all users
    users: function () {
        return axios.get("/users")
    },
    // user login
    userLogin: function (userObj) {
        return axios.post("/users/login", userObj);
    },
    // user register
    userRegister: function (userObj) {
        return axios.post("/users/register", userObj)
    },
    // get user auth and type by id
    userAuthAndType: function (userObj) {
        return axios.get("/users/:id", userObj)
    },
    // user logout
    userLogout: function (userObj) {
        return axios.get('/users/logout', userObj)
    },
    // user update info
    userUpdate: function (userObj) {
        return axios.put('/users/:id', userObj)
    },
    classesByUser: function() {
        return axios.get('api/user/classes/')
    },
    // get classes
    getClasses: function () {
        return axios.get("/api/classrooms")
    },
    searchClasses: function (selectValue, inputValue) {
        return axios.get("/api/classrooms/?select=" + selectValue + "&input=" + inputValue)
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
    },
    createComment: function(idOne, commentInfo) {
        return axios.put('api/classrooms/comment/' + idOne, commentInfo)
    },
    requestToJoinClass: function(requestInfo, user) {
        return axios.post('api/classrooms/' + requestInfo + '/addStudent', user)
    },
    populateByID: function(id) {
        return axios.get('api/classrooms/populate/' + id)
    },
    getClassbyUser: function(id) {
        return axios.get('/user/getClasses/' + id)
    },
    deleteClassById: function(id) {
        return axios.delete('/api/classrooms/' + id)
    },
    deleteAnnouncementById: function(id) {
        return axios.delete('/api/classrooms/announcement/' + id)
    },
    deleteCommentById: function(id) {
        return axios.delete('api/classrooms/announcement/comment/' + id)
    },
    createAnnouncement: function(id, obj) {
        return axios.post('api/classrooms/announcement/' + id, obj)
    },
    getAnnouncementByClass: function(id) {
        return axios.get('api/classrooms/announcement/' + id)
    },


}
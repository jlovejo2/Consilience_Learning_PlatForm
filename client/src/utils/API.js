import axios from 'axios';

export default {
    // get cookie, veryify using secret, decode payload
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
    // user authorization => click logout => ephemeral token time => redirect to "/"
    userAuthLogout: function (id) {
        return axios.get(`/users/logout/${id}`)
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
    // getting user by id
    getUserbyId: function (id) {
        return axios.get('/users/' + id)
    },

    // classesByUser: function() {
    //     return axios.get('api/user/classes/')
    // },
    // get classes
    getClasses: function () {
        return axios.get("/api/classrooms")
    },
    addClass: function (newClass) {
        return axios.post("/api/classrooms", newClass)
    },
    updateClass: function (id, updateObj) {
        return axios.post('/api/classrooms/' + id, updateObj)
    },
    deleteClassById: function(id) {
        return axios.delete('/api/classrooms/' + id)
    },
    searchClasses: function (selectValue, inputValue) {
        return axios.get("/api/classrooms/?select=" + selectValue + "&input=" + inputValue)
    },
  
    // getClass: function (id) {
    //     return axios.get("api/classrooms/" + id)
    // },

    updateClassImage: function (id, image) {
        return axios.post('/api/classrooms/image/' + id, image, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    getClassImage: function(id) {
        return axios.get('/api/classrooms/image/' + id)
    },
    requestToJoinClass: function(requestInfo, user) {
        return axios.post('/api/classrooms/' + requestInfo + '/addStudent', user)
    },
    populateByID: function(id) {
        return axios.get('/api/classrooms/populate/' + id)
    },
    getClassesbyUser: function(id) {
        return axios.get('/api/classrooms/user/' + id)
    },

    deleteAnnouncementById: function(id) {
        return axios.delete('/api/classrooms/announcement/' + id)
    },
    createAnnouncement: function(id, obj) {
        return axios.post('/api/classrooms/announcement/' + id, obj)
    },
    getAnnouncementByClass: function(id) {
        return axios.get('/api/classrooms/announcement/' + id)
    },
    deleteCommentById: function(id) {
        return axios.delete('/api/classrooms/announcement/comment/' + id)
    },
    createComment: function(idOne, commentInfo) {
        return axios.post('/api/classrooms/announcement/comment/' + idOne, commentInfo)
    },
  
    findAuthorByID: function (id) {
        return axios.get('/api/classrooms/findAuthor/comment/' + id)
    },


}
module.exports= {
    courses:[],
    addCourse: function(name,code) {
        this.courses.push({name: name, code: code});
    },
    getCourse: function(index) {
        return this.courses[index];
    },
    getNumberOfCourses: function() {
        return this.courses.length;
    }
}
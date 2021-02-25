class Course {
    constructor(courseData) {
        this.id = courseData.id;
        this.code = courseData.code;
        this.title = courseData.title;
        this.schoolId = courseData.school_id;
        this.schoolName = courseData.school.name;
    }


    createCourseLi() {

        const nodeToAppendCourses = document.querySelector(`[data-school-id='${this.schoolId}'] div div`);

        const courseLi = document.createElement('li');
        const courseSpan = document.createElement('span');
    
        courseLi.classList.add('course');
        courseSpan.classList.add('course-span');
        courseLi.setAttribute('course-data-id', this.id);
    
        courseSpan.innerText = `${this.code} - ${this.title}`;
        //console.log(courseLi)

        nodeToAppendCourses.appendChild(courseLi);
        courseLi.appendChild(courseSpan);
    }

}
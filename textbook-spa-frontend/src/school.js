
class School {
    constructor(schoolData) {
        this.id = schoolData.id;
        this.name = schoolData.name;
        this.courses = schoolData.courses;
    }


    

    
    createSchoolLi() {
        
        const schoolLi = document.createElement('li');
        const schoolNameSpan = document.createElement('span');
        const schoolCourseInfo = document.createElement('div');
        const courses = document.createElement('div');
    
        schoolLi.classList.add('school');
        schoolNameSpan.classList.add('school-name-span');
        schoolCourseInfo.classList.add('school-course-info');
        courses.classList.add('courses');
    
        schoolNameSpan.innerText = this.name;
        schoolLi.setAttribute('data-school-id', this.id);
    
        schoolLi.appendChild(schoolNameSpan);
        schoolLi.appendChild(schoolCourseInfo);
        schoolCourseInfo.appendChild(courses);
        schoolList.appendChild(schoolLi);
        
    }
    


}
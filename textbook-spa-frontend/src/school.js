
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

    createCourseForm() {
        const schoolNode = document.querySelector(`[data-school-id="${this.id}"] div`);
    const addCourseDiv = document.createElement('div');
    //console.log(schoolNode)
    addCourseDiv.classList.add('add-course')
    addCourseDiv.innerHTML = 
        `<h4>Add a Course (${this.name})</h4>
            <form course-form-data-id='${this.id}'>
                <input type="text" name='code' value='' placeholder="Enter Course Code" course-code-data-input-id="${this.id}">
                <input type='text' name='title' value='' placeholder='Enter Course Title' course-title-data-input-id='${this.id}'>
                <input id='course-btn' type="submit" name="submit" value="Submit">
            </form>`
    
    schoolNode.append(addCourseDiv);
    //appendHideSection(schoolNode);
    submitCourse(this.id);
    }
    


}
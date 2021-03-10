
class School {
    constructor(schoolData) {
        this.id = schoolData.id;
        this.name = schoolData.name;
        this.courses = schoolData.courses;
    }

    static getSchools() {
        fetch(SCHOOLS_URL)
        .then(res => res.json())
        .then(json => {
            json.forEach(schoolObj => {
                //render schools in database to the DOM
                const school = new School(schoolObj);
                //console.log(school)
                school.renderSchool();
            })
        })
    }
    
    renderSchool() {
        //object from json is used to construct School class instance
        //const school = new School(schoolObj);
        
        //DOM elements for schools created and appended to body
        this.createSchoolLi();
        
        //form element created to enter courses that belong to school instance
        this.createCourseForm();
        
        //hide and seek DOM elements belonging to school instance
        this.toggleCourseView();
    }
    
    //create school li plus span with school name that will eventually handle a click event. also create courses div which will containcourse info and course form. course div display will toggle: block/none.
    createSchoolLi() {
        
        const schoolLi = document.createElement('li');
        const schoolNameSpan = document.createElement('span');
        const schoolCourseInfo = document.createElement('div');
        const courses = document.createElement('div');
    
        schoolLi.classList.add('school');
        schoolNameSpan.classList.add('school-name-span');
        schoolCourseInfo.classList.add('school-course-info');
        courses.classList.add('courses');
    
        schoolNameSpan.innerHTML = `<b>${this.name}</b>`;
        courses.innerHTML = '<p>Select a Course for Textbook Information or Add a Course</p>'
        schoolLi.setAttribute('data-school-id', this.id);

        schoolLi.appendChild(schoolNameSpan);
        schoolLi.appendChild(schoolCourseInfo);
        schoolCourseInfo.appendChild(courses);
        schoolList.appendChild(schoolLi);
    
    }

    
    createCourseForm() {
        const schoolNode = document.querySelector(`[data-school-id="${this.id}"] div`);
        const addCourseDiv = document.createElement('div');
        addCourseDiv.classList.add('add-course')
        addCourseDiv.innerHTML = 
            `<h4>Add a Course (${this.name})</h4>
            <form course-form-data-id='${this.id}'>
                <input type="text" name='code' value='' placeholder="Enter Course Code" course-code-data-input-id="${this.id}">
                <input type='text' name='title' value='' placeholder='Enter Course Title' course-title-data-input-id='${this.id}'>
                <input id='course-btn' type="submit" name="submit" value="Submit">
            </form>`


        schoolNode.append(addCourseDiv);
        submitCourse(this.id);
    }
    
    toggleCourseView() {

        const schoolNameSpans = document.querySelectorAll('.school-name-span');
        
        schoolNameSpans.forEach( schoolName => {
    
            let showCourse = false;
            
            schoolName.addEventListener('click', (e) => {
                const schoolCourseInfo = e.target.parentNode.nextElementSibling
                showCourse = !showCourse;
        
                if (!showCourse) {
                    schoolCourseInfo.style.display = "none";
                } else {
                    schoolCourseInfo.style.display = "block";
                } 
            })    
        
        })
        
    }

}
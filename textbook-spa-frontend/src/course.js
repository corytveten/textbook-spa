class Course {
    constructor(courseData) {
        //debugger;
        this.id = courseData.id;
        this.code = courseData.code;
        this.title = courseData.title;
        this.schoolId = courseData.school_id;
        //this.schoolName = courseData.school.name;
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

    createTextbookForm() {
        console.log("this is a function")
        //debugger;
        //console.log(this)
        const courseNode = document.querySelector(`[course-data-id='${this.id}']`);
        //const courseNode = document.querySelector(`[data-school-id='${this.schoolId}'] div div [course-data-id=]`);
        console.log(courseNode);
        const addTextbookDiv = document.createElement('div');
        
        addTextbookDiv.classList.add('add-text');
        addTextbookDiv.innerHTML =
            `<h4>Add a Textbook</h4>
                <form textbook-form-data-id='${this.course_id}'>
                    <input type="text" name='title' value='' placeholder="Enter Textbook Title" textbook-title-data-input-id="${this.course_id}">
                    <input type='text' name='author' value='' placeholder='Enter Author Last Name' textbook-author-data-input-id='${this.course_id}'>
                    <input id='textbook-btn' type="submit" name="submit" value="Submit">
                </form>`

        courseNode.append(addTextbookDiv);
        //submitTextbook(this.course_id)
        
    }
}
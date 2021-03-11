
const BASE_URL = "http://localhost:3000";
const SCHOOLS_URL = `${BASE_URL}/schools`;
const COURSES_URL = `${BASE_URL}/courses`;
const TEXTBOOKS_URL = `${BASE_URL}/textbooks`;
const schoolList = document.querySelector('.school-list');
const schoolForm = document.querySelector('#school-form');

const newAddition = document.querySelector('#new-addition');


document.addEventListener('DOMContentLoaded', () => {

    //fetch and render schools from rails api
    School.getSchools();
    
    //fetch and render courses from rails api
    Course.getCourses();
    
    //add event listener to school form to submit new schools
    submitSchool();

});



function submitSchool() {
    schoolForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const schoolInput = document.getElementById('school-input')

        //use fetch to post new school and then clear form field
        addNewSchool(schoolInput.value);
        schoolInput.value = "";
    })
}

function addNewSchool(schoolName) {
    
    let schoolObj = {
        name: schoolName
    }

    fetch(SCHOOLS_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(schoolObj)
        })
        .then(resp => resp.json())
        .then(json => {
            const school = new School(json);
            school.createSchoolLi();
            school.createCourseForm();
            school.toggleCourseView();
            
        })
        .catch(function(error) {
            alert("School already exists.")
            //console.log(error);
        })
    
};


//'submit' eventlistener for course
function submitCourse(schoolId) {
    const addCourseDiv = document.querySelector(`[course-form-data-id="${schoolId}"]`);
    
    addCourseDiv.addEventListener('submit', (e) => {
        e.preventDefault();
        const courseCodeInput = document.querySelector(`[course-code-data-input-id="${schoolId}"]`);
        const courseTitleInput = document.querySelector(`[course-title-data-input-id="${schoolId}"]`);

        const courseInfo = [courseCodeInput.value, courseTitleInput.value, schoolId]
        //use fetch to post new course and then clear form (with rest parameter)
        addNewCourse(...courseInfo);
        courseCodeInput.value = '';
        courseTitleInput.value = '';
    })
    
}

function addNewCourse(courseCode, courseTitle, schoolId) {
        //console.log(courseCode, courseTitle, schoolId);

        let courseConfigObj = {
            code: courseCode,
            title: courseTitle,
            'school_id': schoolId
        }
    
        fetch(COURSES_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(courseConfigObj)
            })
            .then(resp => {
                if (!resp.ok) {
                    throw new Error(resp)
                }
                return resp.json()
            })
            .then(json => {
                const course = new Course(json);
                course.createCourseLi();
                course.createTextbookForm();
                course.toggleTextbookView();
            })
            .catch(function(error) {
                alert("Course already logged.")
                console.log(error);
            })
            
}


function submitTextbook(courseId) {
    const addTextbookDiv = document.querySelector(`[textbook-form-data-id="${courseId}"]`);

    addTextbookDiv.addEventListener('submit', (e) => {
        e.preventDefault();
        const textbookTitleInput = document.querySelector(`[textbook-title-data-input-id="${courseId}"]`);
        const textbookAuthorInput = document.querySelector(`[textbook-author-data-input-id="${courseId}"]`);

        //use fetch to post new textbook and then clear form
        addNewTextbook(textbookTitleInput.value,textbookAuthorInput.value, courseId);
        textbookTitleInput.value = '';
        textbookAuthorInput.value = '';
    })
}

function addNewTextbook(title, author, courseId) {

    let textbookConfigObj = {
        title: title,
        author: author,
        'course_id': courseId
    }

    fetch(TEXTBOOKS_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(textbookConfigObj)
    })
    .then(resp => resp.json())
    .then(json => {
        let text = new Textbook(json);
        text.renderTextbook();
        text.deleteTextbook();
    })
}

/*
function newAdditionFunc() {
    const newDiv = document.createElement('div');

    newDiv.classList.add("new-add-input");
    newDiv.innerHTML = "<p>Add Input Here</p> <br><form id='form-text'> <input type='text' name='input'></input><br><input type='submit' value='Submit'></form>"


    newAddition.appendChild(newDiv);
}



function getValueAndAddToDOM() {
    const submitBtn = document.getElementById('form-text');
    submitBtn.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(e.target.input.value)
        const inputValue = e.target.input.value;
        const p = document.createElement('p');
        p.innerText = inputValue;
        newAddition.appendChild(p)

    })
}
*/
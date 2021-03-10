
const BASE_URL = "http://localhost:3000";
const SCHOOLS_URL = `${BASE_URL}/schools`;
const COURSES_URL = `${BASE_URL}/courses`;
const TEXTBOOKS_URL = `${BASE_URL}/textbooks`;
const schoolList = document.querySelector('.school-list');
const schoolForm = document.querySelector('#school-form');


document.addEventListener('DOMContentLoaded', () => {
    //console.log(School)
    //fetch and render schools from rails api
    School.getSchools();
    
    //fetch and render courses from rails api
    Course.getCourses();
    
    //add event listener to school form to submit new schools
    Textbook.getTextbooks();
    submitSchool();
});

/*
function getSchools() {
    fetch(SCHOOLS_URL)
    .then(res => res.json())
    .then(json => {
        json.forEach(schoolObj => {
            //render schools in database to the DOM
            renderSchool(schoolObj)
        })
    })
}


function renderSchool(schoolObj) {
    //object from json is used to construct School class instance
    const school = new School(schoolObj);
    
    //DOM elements for schools created and appended to body
    school.createSchoolLi();
    
    //form element created to enter courses that belong to school instance
    school.createCourseForm();
    
    //hide and seek DOM elements belonging to school instance
    school.toggleCourseView();
};
*/
/*
//fetch courses from rails api
function getCourses() {

    fetch(COURSES_URL)
    .then(res => res.json())
    .then(json => {
        renderCourses(json);
    })

   
}


//json course object from rails is rendered to text in an li
function renderCourses(courseObjs) {
    
    courseObjs.forEach(courseObj => {
        //course object used to create a new Course instance
        const course = new Course(courseObj);
        
        //DOM elements created and appended
        course.createCourseLi();

        //form element created to enter textbook info (attached to course instance)
        course.createTextbookForm();
        
        //hide and seek textbook info
        course.toggleTextbookView();
    })

    getTextbooks();

}
*/

/*
function getTextbooks() {

    fetch(TEXTBOOKS_URL)
    .then(res => res.json())
    .then(json => {
        renderTextbooks(json);
    })
};

function renderTextbooks(textbookObjs) {

    textbookObjs.forEach( textbookObj => {
        //textbook object => Textbook class instance
        const textbook = new Textbook(textbookObj);

        //create textbook elements and append to body
        textbook.renderTextbook();

        //delete textbook element and destroy instance in rails
        textbook.deleteTextbook();
    });

}
*/

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

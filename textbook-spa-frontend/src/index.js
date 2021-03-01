
const BASE_URL = "http://localhost:3000";
const SCHOOLS_URL = `${BASE_URL}/schools`;
const COURSES_URL = `${BASE_URL}/courses`;
const TEXTBOOKS_URL = `${BASE_URL}/textbooks`;
const schoolList = document.querySelector('.school-list')
const schoolForm = document.querySelector('#school-form')


document.addEventListener('DOMContentLoaded', () => {
    loadSchools();
    submitSchool();
    loadCourses();
    //loadTextbooks();
});


//fetch schools
const loadSchools = () => {
    fetch(SCHOOLS_URL)
    .then(res => res.json())
    .then(json => {
        json.forEach(schoolObj => {

            renderSchool(schoolObj)
        })
    })
}

//render school to the DOM
const renderSchool = (schoolObj) => {
    const school = new School(schoolObj);
 
    school.createSchoolLi();
    school.createCourseForm();
};

//submit eventlistener for course
const submitCourse = (schoolId) => {
    const addCourseDiv = document.querySelector(`[course-form-data-id="${schoolId}"]`);
    
    addCourseDiv.addEventListener('submit', (e) => {
        e.preventDefault();
        const courseCodeInput = document.querySelector(`[course-code-data-input-id="${schoolId}"]`);
        const courseTitleInput = document.querySelector(`[course-title-data-input-id="${schoolId}"]`);

        addNewCourse(courseCodeInput.value, courseTitleInput.value, schoolId);
        courseCodeInput.value = '';
        courseTitleInput.value = '';
    })
    
}

const addNewCourse = (courseCode, courseTitle, schoolId) => {
        console.log(courseCode, courseTitle, schoolId);

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
                toggleTextbookView();
            })
            .catch(function(error) {
                alert("Course already logged.")
                console.log(error.message);
            })
            
}

const loadCourses = () => {

        fetch(COURSES_URL)
        .then(res => res.json())
        .then(json => {
            renderCourses(json);
        })
        .catch(error => {
            alert('No courses listed for this school.')
            console.log(error)
        })
       
}

//json course object from rails is rendered to text in an li
const renderCourses = (courseObjs) => {

    courseObjs.forEach(courseObj => {

        const course = new Course(courseObj);
        course.createCourseLi();
        course.createTextbookForm();
    })


    //hide and seek courses and course form  
    toggleCourseView();
    loadTextbooks();
    //hide and seek textbooks
    toggleTextbookView();

}

const loadTextbooks = () => {

    fetch(TEXTBOOKS_URL)
    .then(res => res.json())
    .then(json => {
        renderTextbooks(json);
    })
};

const renderTextbooks = (textbookObjs) => {

    textbookObjs.forEach( textbookObj => {
    
        const textbook = new Textbook(textbookObj);
        textbook.renderTextbook();

    });

    deleteTextbook();
}

const submitSchool = () => {
    schoolForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const schoolInput = document.getElementById('school-input')

        addNewSchool(schoolInput.value);
        schoolInput.value = "";
    })
}

const addNewSchool = (schoolName) => {
    
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
            toggleCourseView();
            
        })
        .catch(function(error) {
            alert("School already exists.")
            //console.log(error.message);
        })
    
};

const submitTextbook = (courseId) => {
    const addTextbookDiv = document.querySelector(`[textbook-form-data-id="${courseId}"]`);

    addTextbookDiv.addEventListener('submit', (e) => {
        e.preventDefault();
        const textbookTitleInput = document.querySelector(`[textbook-title-data-input-id="${courseId}"]`);
        const textbookAuthorInput = document.querySelector(`[textbook-author-data-input-id="${courseId}"]`);

        addNewTextbook(textbookTitleInput.value,textbookAuthorInput.value, courseId);
        //clear form
        textbookTitleInput.value = '';
        textbookAuthorInput.value = '';
    })
}

const addNewTextbook = (title, author, courseId) => {

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
        console.log(json);
        let text = new Textbook(json);
        text.renderTextbook();
        deleteTextbook();
    })
}

const deleteTextbook = () => {
    const deleteTextbookButtons = document.querySelectorAll('.delete-textbook-button');
    deleteTextbookButtons.forEach( deleteTextbookButton => {
        deleteTextbookButton.addEventListener('click', (e) => {
            const textbookId = e.target.parentNode.parentNode.getAttribute('textbook-data-id');
            const textbookElem = e.target.parentNode.parentNode;
            console.log(textbookElem)
            textbookElem.remove()
            destroyTextbookDb(textbookId);

        })
    })
}

const destroyTextbookDb = (textbookId) => {
    console.log(textbookId);
    fetch(`${TEXTBOOKS_URL}/${textbookId}`, {
        method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
    })
    //.then(resp = resp.json())
    //.then(json => {
    //    console.log(json);
    //})
    //.catch(error => {
    //    console.log(error.message)
    //})

}

//TOGGLE FUNCTIONS
//toggle view of courses by clicking school
const toggleCourseView = () => {

    const schoolNameSpans = document.querySelectorAll('.school-name-span');
    //console.log(schoolNameSpans);
    
    
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

const toggleTextbookView = () => {

    const courseNameSpans = document.querySelectorAll('.course-span');

    courseNameSpans.forEach( courseName => {
        let showTextbook = false;

        courseName.addEventListener('click', (e) => {
            //console.log(e.target.nextElementSibling);
            const textbookDiv = e.target.nextElementSibling;

            showTextbook = !showTextbook

            if (!showTextbook) {
                textbookDiv.style.display = "none";
            } else {
                textbookDiv.style.display = "block";
            } 
        })
    })
}

/*
const deleteSchool = () => {
    const deleteButtons = document.querySelectorAll('.delete-school-btn');
    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', (e) => {
            e.preventDefault;
            console.log(e.target.parentElement.parentElement.dataset.schoolId);
            const schoolId = e.target.parentElement.parentElement.dataset.schoolId;
            fetch(`${SCHOOLS_URL}/${schoolId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            .catch( error => {
                console.log(error.message);
            })
        })
    })
    
}
*/

/*const openView = () => {
    const schoolElems = document.querySelectorAll('.school');
    console.log(schoolElems);
    schoolElems.forEach( schoolElem => {
        schoolElem.addEventListener('click', (e) => {
            console.log(schoolElem)
            //const schoolCourseInfo = e.target;
            const schoolCourseInfo = schoolElem.querySelector('.school-course-info');
            
            schoolCourseInfo.style.display = "block";

            const hideSection = schoolElem.querySelector('.hide-section')
            clickToHide(hideSection)
        })
        //const hideSection = 
        //clickToHide(hideSection);
    })
    

}
*/

//const appendHideSection = (schoolNode) => {
    //const schoolCourseInfos = document.querySelectorAll('.school-course-info');
    //console.log(schoolNode);
    //const hideSection = document.createElement('p');
    //hideSection.innerText = "(Hide Section)";
    //hideSection.classList.add('hide-section');
    //schoolNode.appendChild(hideSection);
    
//};

/*
//??? is this a redundant function???
const displayCourses = () => {
    const schoolElems = document.querySelector('.school');
    console.log(schoolElems);
    schoolElems.addEventListener('click', (e) => {
        console.log(e.target.dataset.schoolId);
    })
}
*/

/*
const clickToHide = (hideSection) => {
    //console.log(hideSection);
    hideSection.addEventListener('click', (e) => {
        e.preventDefault;
        console.log(e.target.parentNode);
        const schoolCourseInfo = e.target.parentNode;
        schoolCourseInfo.style.display = "none";
    })
}
*/

/*
const createTextbookForm = (textbookObj) => {
    //console.log(textbookObj)
    const courseNode = document.querySelector(`[course-data-id='${textbookObj.course_id}']`);
    console.log(courseNode);
    const addTextbookDiv = document.createElement('div');

    addTextbookDiv.classList.add('add-text');
    addTextbookDiv.innerHTML =
        `<h4>Add a Textbook</h4>
            <form textbook-form-data-id='${textbookObj.course_id}'>
                <input type="text" name='title' value='' placeholder="Enter Textbook Title" textbook-title-data-input-id="${textbookObj.course_id}">
                <input type='text' name='author' value='' placeholder='Enter Author Last Name' textbook-author-data-input-id='${textbookObj.course_id}'>
                <input id='textbook-btn' type="submit" name="submit" value="Submit">
            </form>`

    courseNode.append(addTextbookDiv);
    //submitTextbook(textbookObj.course_id)
    
}
*/

    //from renderSchool, moved to class
    /*
    const schoolLi = document.createElement('li');
    const schoolNameSpan = document.createElement('span');
    const schoolCourseInfo = document.createElement('div');
    const courses = document.createElement('div');

    schoolLi.classList.add('school');
    schoolNameSpan.classList.add('school-name-span');
    schoolCourseInfo.classList.add('school-course-info');
    courses.classList.add('courses');

    schoolNameSpan.innerText = school.name;
    schoolLi.setAttribute('data-school-id', school.id);

    schoolLi.appendChild(schoolNameSpan);
    schoolLi.appendChild(schoolCourseInfo);
    schoolCourseInfo.appendChild(courses);
    schoolList.appendChild(schoolLi);
    */

    //createCourseForm(school);

    //create a form to post courses, form is attached to school
/*
const createCourseForm = (schoolObj) => {

    const schoolNode = document.querySelector(`[data-school-id="${schoolObj.id}"] div`);
    const addCourseDiv = document.createElement('div');
    //console.log(schoolNode)
    addCourseDiv.classList.add('add-course')
    addCourseDiv.innerHTML = 
        `<h4>Add a Course (${schoolObj.name})</h4>
            <form course-form-data-id='${schoolObj.id}'>
                <input type="text" name='code' value='' placeholder="Enter Course Code" course-code-data-input-id="${schoolObj.id}">
                <input type='text' name='title' value='' placeholder='Enter Course Title' course-title-data-input-id='${schoolObj.id}'>
                <input id='course-btn' type="submit" name="submit" value="Submit">
            </form>`
    
    schoolNode.append(addCourseDiv);
    //appendHideSection(schoolNode);
    submitCourse(schoolObj.id);
};
*/

//display block/none needs to apply to individual school element, not to entire document, may need to add data-ids

//maybe fetch courses with schools, but display:none

//create close Section for add course, replace toggle function.

//README

//change text when elements are clicked on, such as <school name> + "click a course to see textbooks"

//TEXTBOOK FORM NEEDS TO BE ATTACHED TO ALL COURSES

//ADD TOGGLE FOR TEXTBOOK INFO

//ADD POST FETCH TO TEXTBOOK FORM
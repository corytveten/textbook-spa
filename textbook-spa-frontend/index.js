
const BASE_URL = "http://localhost:3000";
const SCHOOLS_URL = `${BASE_URL}/schools`;
const COURSES_URL = `${BASE_URL}/courses`;
const TEXTBOOKS_URL = `${BASE_URL}/textbooks`;
const schoolList = document.querySelector('.school-list')
const schoolForm = document.querySelector('#school-form')

//let showCourse = false;

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

            renderSchools(schoolObj)
        })
    })
}

//render school to the DOM
const renderSchools = (schoolObj) => {
    //console.log(schoolObj);
    const schoolLi = document.createElement('li');
    const schoolNameSpan = document.createElement('span');
    const schoolCourseInfo = document.createElement('div');
    const courses = document.createElement('div');

    schoolLi.classList.add('school');
    schoolNameSpan.classList.add('school-name-span');
    schoolCourseInfo.classList.add('school-course-info');
    courses.classList.add('courses');

    schoolNameSpan.innerText = schoolObj.name;
    schoolLi.setAttribute('data-school-id', schoolObj.id);

    schoolLi.appendChild(schoolNameSpan);
    schoolLi.appendChild(schoolCourseInfo);
    schoolCourseInfo.appendChild(courses);
    schoolList.appendChild(schoolLi);
    createCourseForm(schoolObj);

};

//create a form to post courses, form is attached to school
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

//submit eventlistener for course
const submitCourse = (schoolId) => {
    const addCourseDiv = document.querySelector(`[course-form-data-id="${schoolId}"]`);
    //console.log(addCourseDiv)
    
    addCourseDiv.addEventListener('submit', (e) => {
        e.preventDefault();
        const courseCodeInput = document.querySelector(`[course-code-data-input-id="${schoolId}"]`);
        const courseTitleInput = document.querySelector(`[course-title-data-input-id="${schoolId}"]`);

        //console.log(courseCodeInput.value, courseTitleInput.value);
        addNewCourse(courseCodeInput.value, courseTitleInput.value, schoolId);
        courseCodeInput.value = '';
        courseTitleInput.value = '';
    })
    
}

const addNewCourse = (courseCode, courseTitle, schoolId) => {
        console.log(courseCode, courseTitle, schoolId);
    
        let courseObj = {
            code: courseCode,
            title: courseTitle,
            'school_id': schoolId
        }
    
        fetch(COURSES_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(courseObj)
            })
            .then(resp => resp.json())
            .then(json => console.log(json))
            .catch(function(error) {
                alert("Course already logged.")
                //console.log(error.message);
            })
            
}

//event listener that fetches courses
const loadCourses = () => {
    const schoolList = document.querySelector('.school-list');
    
    //schoolList.addEventListener('click', (e) => {
        //console.log(e.target.dataset.schoolId);
        //const schoolCourseInfo = schoolList.querySelector('.school-course-info');
        //const schoolId = e.target.dataset.schoolId;
        //const courses = schoolList.querySelector(
        //    `[data-school-id='${schoolId}']  div div`
        //)


        fetch(COURSES_URL)
        .then(res => res.json())
        .then(json => {
            renderCourses(json);
        })
        .catch(error => {
            alert('No courses listed for this school.')
            console.log(error)
        })
  
    //}, {once: true});
        
       
}




//json course object from rails is rendered to text in an li
const renderCourses = (courseObjs) => {
    //console.log(courseObjs)
    courseObjs.forEach(courseObj => {
        const nodeToAppendCourses = document.querySelector(`[data-school-id='${courseObj.school_id}'] div div`);

        const courseLi = document.createElement('li');
        const courseSpan = document.createElement('span');
    
        courseLi.classList.add('course');
        courseSpan.classList.add('course-span');
        courseLi.setAttribute('course-data-id', courseObj.id);
    
        courseSpan.innerText = `${courseObj.code} - ${courseObj.title}`;
        //console.log(courseLi)

        nodeToAppendCourses.appendChild(courseLi);
        courseLi.appendChild(courseSpan);
    })

    //const loadTextbooks = (courseId) => {
        //console.log(courseId.textbooks[0]);
        //const textbook = courseId.textbooks[0].title;
        //const textLi = document.createElement('li');
        //textLi.classList.add('textbook');
        //textLi.innerHTML = `Textbook: <span style="color: #624a72"><em>${textbook}</em></span>`
        //schoolUl.appendChild(textLi);
    //}

    //loadTextbooks(courseObj);
    //displayCourses();

    //hide and seek courses and course form  
    toggleView();
    loadTextbooks();
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
        console.log(textbookObj);
        const nodeToAppendTextbooks = document.querySelector(`[course-data-id='${textbookObj.course_id}']`);
        console.log(nodeToAppendTextbooks);
        const textbookLi = document.createElement('li');

        textbookLi.classList.add('textbook');
        textbookLi.innerText = `Textbook: ${textbookObj.title}, Author: ${textbookObj.author}`

        nodeToAppendTextbooks.appendChild(textbookLi);

    });
}

const submitSchool = () => {
    schoolForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const schoolInput = document.getElementById('school-input')
        //console.log(schoolInput.value);
        addNewSchool(schoolInput.value);
        schoolInput.value = "";
    })
}

const addNewSchool = (schoolName) => {
    //console.log(schoolName);
    
    let schoolObj = {
        name: schoolName
    }

    fetch(SCHOOLS_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(schoolObj)
        })
        .then(resp => resp.json())
        .then(json => console.log(json))
        .catch(function(error) {
            alert("School already exists.")
            //console.log(error.message);
        })
};

//toggle view of courses by clicking school
const toggleView = () => {
    //console.log("Hello")

    const schoolNameSpans = document.querySelectorAll('.school-name-span');
    console.log(schoolNameSpans);
    
    
    schoolNameSpans.forEach( schoolName => {

        let showCourse = false;
        
        schoolName.addEventListener('click', (e) => {
            //console.log(schoolElem);
            console.log(e.target)
            const schoolCourseInfo = e.target.nextElementSibling
            //const schoolCourseInfo = schoolElem.querySelector('.school-course-info')
            console.log(schoolCourseInfo);
            //const schoolCourseInfo = schoolElem.querySelector(
            //    `[data-school-id='${schoolId}']  div`
            //)
            
            showCourse = !showCourse;
    
            if (!showCourse) {
                schoolCourseInfo.style.display = "none"
            } else {
                schoolCourseInfo.style.display = "block"
            } 
        })    
    
    })
    
}

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

//display block/none needs to apply to individual school element, not to entire document, may need to add data-ids

//maybe fetch courses with schools, but display:none

//create close Section for add course, replace toggle function.

//README

//change text when elements are clicked on, such as <school name> + "click a course to see textbooks"

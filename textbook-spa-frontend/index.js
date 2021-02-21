
const BASE_URL = "http://localhost:3000";
const SCHOOLS_URL = `${BASE_URL}/schools`;
const COURSES_URL = `${BASE_URL}/courses`;
const TEXTBOOKS_URL = `${BASE_URL}/textbooks`;
const schoolList = document.querySelector('.school-list')
const schoolForm = document.querySelector('#school-form')

let showCourse = false;

document.addEventListener('DOMContentLoaded', () => {
    loadSchools();
    submitSchool();
    loadCourses();
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

//add school to the DOM
const renderSchools = (schoolObj) => {
    //console.log(schoolObj);
    const schoolLi = document.createElement('li');
    const schoolCourseInfo = document.createElement('div');

    schoolLi.classList.add('school');
    schoolCourseInfo.classList.add('school-course-info');

    schoolLi.innerText = schoolObj.name;
    schoolLi.appendChild(schoolCourseInfo);
    schoolLi.setAttribute('data-school-id', schoolObj.id);
    
    schoolList.appendChild(schoolLi);
    createCourseForm(schoolObj);
};

//create a form to post courses, form is attached to school
const createCourseForm = (schoolObj) => {
    //console.log(schoolObj);

    const schoolNode = document.querySelector(`[data-school-id="${schoolObj.id}"] div`);
    //console.log(schoolNode);
    const addCourseDiv = document.createElement('div');
    addCourseDiv.classList.add('add-course')
    addCourseDiv.innerHTML = "<h4>Add a Course</h4>"
    schoolNode.append(addCourseDiv);
}

//event listener that fetches courses
const loadCourses = () => {
    const schoolList = document.querySelector('.school-list');
    
    schoolList.addEventListener('click', (e) => {
        console.log(e.target.dataset.schoolId);
        const schoolCourseInfo = schoolList.querySelector('.school-course-info');
        
        //hide and seek courses and course form
        toggleView();
        const schoolId = e.target.dataset.schoolId;


        fetch(COURSES_URL + `/${schoolId}`)
        .then(res => res.json())
        .then(json => {
            renderCourses(json);
        })
        .catch(error => {
            alert('No courses listed for this school.')
            console.log(error)
        })
    });

}




//json course object from rails is rendered to text in an li
const renderCourses = (courseObj) => {
    //console.log(courseObj)
    const schoolUl = document.querySelector(`[data-school-id='${courseObj.id}']  div`);
    console.log(schoolUl);
    const courseLi = document.createElement('li');
    courseLi.classList.add('course');
    courseLi.innerText = `${courseObj.code} - ${courseObj.title}`;

    //const loadTextbooks = (courseId) => {
        //console.log(courseId.textbooks[0]);
        //const textbook = courseId.textbooks[0].title;
        //const textLi = document.createElement('li');
        //textLi.classList.add('textbook');
        //textLi.innerHTML = `Textbook: <span style="color: #624a72"><em>${textbook}</em></span>`
        //schoolUl.appendChild(textLi);
    //}

    schoolUl.appendChild(courseLi);
    //loadTextbooks(courseObj);
    //displayCourses();

}

//??? is this a redundant function???
const displayCourses = () => {
    const schoolElems = document.querySelector('.school');
    console.log(schoolElems);
    schoolElems.addEventListener('click', (e) => {
        console.log(e.target.dataset.schoolId);
    })
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
    console.log(schoolName);
    
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
    const schoolCourseInfo = schoolList.querySelector('.school-course-info')
    showCourse = !showCourse;

    if (showCourse === true) {
        schoolCourseInfo.style.display = "block"
      } else {
        schoolCourseInfo.style.display = "none"
      }


}
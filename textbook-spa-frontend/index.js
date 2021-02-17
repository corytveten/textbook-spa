
const BASE_URL = "http://localhost:3000";
const SCHOOLS_URL = `${BASE_URL}/schools`;
const COURSES_URL = `${BASE_URL}/courses`;
const TEXTBOOKS_URL = `${BASE_URL}/textbooks`;
const schoolList = document.querySelector('.school-list')
const schoolForm = document.querySelector('#school-form')

document.addEventListener('DOMContentLoaded', () => {
    loadSchools();
    submitSchool();
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

const renderSchools = (schoolObj) => {
    //console.log(schoolObj);
    const schoolLi = document.createElement('li');
    schoolLi.classList.add('school');
    schoolLi.innerText = schoolObj.name;
    schoolLi.setAttribute('data-school-id', schoolObj.id)
    loadCourses(schoolObj.id);
    schoolList.appendChild(schoolLi);
}

const loadCourses = (schoolId) => {
    //console.log(schoolId);
    fetch(COURSES_URL + `/${schoolId}`)
    .then(res => res.json())
    .then(json => {
        renderCourses(json);
    });
}

const renderCourses = (courseObj) => {
    //console.log(courseObj)
    const schoolUl = document.querySelector(`[data-school-id='${courseObj.id}'`);
    const courseLi = document.createElement('li');
    courseLi.classList.add('course');
    courseLi.innerText = `${courseObj.code} - ${courseObj.title}`;

    const loadTextbooks = (courseId) => {
        console.log(courseId.textbooks[0]);
        const textbook = courseId.textbooks[0].title;
        const textLi = document.createElement('li');
        textLi.classList.add('textbook');
        textLi.innerHTML = `Textbook: <span style="color: #624a72"><em>${textbook}</em></span>`
        schoolUl.appendChild(textLi);
    }

    schoolUl.appendChild(courseLi);
    loadTextbooks(courseObj);
    //displayCourses();

}

//const displayCourses = () => {
//    const schoolElems = document.querySelector('.school');
//    console.log(schoolElems);
//    schoolElems.addEventListener('click', (e) => {
//        console.log(e.target.dataset.schoolId);
//    })
//}

const submitSchool = () => {
    schoolForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const schoolInput = document.getElementById('school-input')
        console.log(schoolInput.value);
    })
}



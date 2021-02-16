
const BASE_URL = "http://localhost:3000";
const SCHOOLS_URL = `${BASE_URL}/schools`;
const COURSES_URL = `${BASE_URL}/courses`;
const TEXTBOOKS_URL = `${BASE_URL}/textbooks`;
const schoolList = document.querySelector('.school-list')

document.addEventListener('DOMContentLoaded', () => {
    loadSchools()
})

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
    console.log(schoolId);
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
    schoolUl.appendChild(courseLi);
}
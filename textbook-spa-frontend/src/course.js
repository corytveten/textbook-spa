class Course {
    constructor(courseData) {

        this.id = courseData.id;
        this.code = courseData.code;
        this.title = courseData.title;
        this.schoolId = courseData.school_id;
    }

    /*
    createCourseLi() {

        const nodeToAppendCourses = document.querySelector(`[data-school-id='${this.schoolId}'] div div`);

        const courseLi = document.createElement('li');
        const courseSpan = document.createElement('span');
        const textbooks = document.createElement('div');
    
        courseLi.classList.add('course');
        courseSpan.classList.add('course-span');
        courseLi.setAttribute('course-data-id', this.id);
        textbooks.classList.add('textbooks');
    
        courseSpan.innerText = `${this.code} - ${this.title}`;

        nodeToAppendCourses.appendChild(courseLi);
        courseLi.appendChild(courseSpan);
        courseLi.appendChild(textbooks);

    }
    */

    createCourseLi() {

        const nodeToAppendCourses = document.querySelector(`[data-school-id='${this.schoolId}'] div div`);

        const courseLi = document.createElement('li');
        const courseSpan = document.createElement('span');
        const textbooks = document.createElement('div');
        const textbookTable = document.createElement('table')
    
        courseLi.classList.add('course');
        courseSpan.classList.add('course-span');
        courseLi.setAttribute('course-data-id', this.id);
        textbooks.classList.add('textbooks');
        textbookTable.classList.add('textbook-table');
    
        courseSpan.innerText = `${this.code} - ${this.title}`;
        textbooks.innerHTML = `<b>Textbooks for ${this.code}:</b>`
        textbookTable.innerHTML = '<tr><th>Title</th><th>Author</th><th>Remove</th></tr>';


        nodeToAppendCourses.appendChild(courseLi);
        courseLi.appendChild(courseSpan);
        courseLi.appendChild(textbooks);
        textbooks.appendChild(textbookTable);

    }


    
    createTextbookForm() {
        const courseNode = document.querySelector(`[course-data-id='${this.id}'] div`);
        const addTextbookDiv = document.createElement('div');
        
        addTextbookDiv.classList.add('add-text');
        addTextbookDiv.innerHTML =
            `<h4>Add a Textbook</h4>
                <form textbook-form-data-id='${this.id}'>
                    <input type="text" name='title' value='' placeholder="Enter Textbook Title" textbook-title-data-input-id="${this.id}">
                    <input type='text' name='author' value='' placeholder='Enter Author Last Name' textbook-author-data-input-id='${this.id}'>
                    <input id='textbook-btn' type="submit" name="submit" value="Submit">
                </form>`

        courseNode.append(addTextbookDiv);

        submitTextbook(this.id)
        
    }
    

    /*
    loadTextbooks() {

        fetch(TEXTBOOKS_URL)
        .then(res => res.json())
        .then(json => {
            renderTextbooks(json);
        })
    };

    
    renderTextbooks(textbookObjs) {

        textbookObjs.forEach( textbookObj => {
        
            const textbook = new Textbook(textbookObj);
            textbook.renderTextbook();
    
        });
    
        deleteTextbook();
    }
    */

    toggleTextbookView() {

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
}
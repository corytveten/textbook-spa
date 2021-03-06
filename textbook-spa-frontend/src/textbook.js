class Textbook {
    constructor(textbookData) {
        this.id = textbookData.id;
        this.title = textbookData.title;
        this.author = textbookData.author;
        this.courseId = textbookData.course_id;
    }
    /*
    renderTextbook() {
         const nodeToAppendTextbooks = document.querySelector(`[course-data-id='${this.courseId}'] .textbook`);
         const textbookLi = document.createElement('li');
         const deleteButton = document.createElement('span')
 
         textbookLi.classList.add('textbook');
         textbookLi.setAttribute('textbook-data-id', this.id)
         deleteButton.classList.add('delete-textbook-button');

         textbookLi.innerText = `Textbook: ${this.title}, Author: ${this.author}`;
         deleteButton.innerHTML = '<button type="button">Remove Textbook</button>';
 
         nodeToAppendTextbooks.insertBefore(textbookLi, nodeToAppendTextbooks.lastChild)
         textbookLi.append(deleteButton);
 
    }
    */

    renderTextbook() {
        const nodeToAppendTextbooks = document.querySelector(`[course-data-id='${this.courseId}'] .textbook-table tbody`);
        const textbookTr = document.createElement('tr');
        const deleteButton = document.createElement('td')

        textbookTr.classList.add('textbook');
        textbookTr.setAttribute('textbook-data-id', this.id)
        deleteButton.classList.add('delete-textbook-button');

        textbookTr.innerHTML = `<td>${this.title}</td><td>${this.author}</td>`;
        deleteButton.innerHTML = '<button type="button">Remove Textbook</button>';

        //nodeToAppendTextbooks.insertBefore(textbookLi, nodeToAppendTextbooks.lastChild)
        nodeToAppendTextbooks.appendChild(textbookTr);
        textbookTr.append(deleteButton);

   }

    deleteTextbook() {
        const deleteTextbookButtons = document.querySelectorAll('.delete-textbook-button');
        deleteTextbookButtons.forEach( deleteTextbookButton => {
            deleteTextbookButton.addEventListener('click', (e) => {
                const textbookId = e.target.parentNode.parentNode.getAttribute('textbook-data-id');
                const textbookElem = e.target.parentNode.parentNode;
                console.log(textbookElem)
                textbookElem.remove()
                this.destroyTextbookDb();
    
            })
        })
    }

    destroyTextbookDb() {
        //console.log(textbookId);
        fetch(`${TEXTBOOKS_URL}/${this.id}`, {
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
}
class Textbook {
    constructor(textbookData) {
        this.id = textbookData.id;
        this.title = textbookData.title;
        this.author = textbookData.author;
        this.courseId = textbookData.course_id;
    }

    renderTextbook() {
         //console.log(textbookObj);
         const nodeToAppendTextbooks = document.querySelector(`[course-data-id='${this.courseId}'] .textbooks`);
         //console.log(nodeToAppendTextbooks);
         const textbookLi = document.createElement('li');
         const deleteButton = document.createElement('span')
 
         textbookLi.classList.add('textbook');
         deleteButton.classList.add('delete-textbook-button');

         textbookLi.innerText = `Textbook: ${this.title}, Author: ${this.author}`;
         deleteButton.innerHTML = '<button type="button">Remove Textbook</button>';
 
         //nodeToAppendTextbooks.appendChild(textbookLi);
         nodeToAppendTextbooks.insertBefore(textbookLi, nodeToAppendTextbooks.lastChild)
         textbookLi.append(deleteButton);
         //createTextbookForm(textbookObj, nodeToAppendTextbooks)
 
    }
}
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
 
         textbookLi.classList.add('textbook');
         textbookLi.innerText = `Textbook: ${this.title}, Author: ${this.author}`
 
         //nodeToAppendTextbooks.appendChild(textbookLi);
         nodeToAppendTextbooks.insertBefore(textbookLi, nodeToAppendTextbooks.lastChild)
         //createTextbookForm(textbookObj, nodeToAppendTextbooks)
 
    }
}
document.addEventListener('DOMContentLoaded', startApp);

function startApp() {
    const notePocket = new NotePocket();
    const noteList = new NoteList();
    document.querySelector('.addBtn')
        .addEventListener('click', showForm);
    noteList.displayNotesShorts('shorts');
}

function showForm() {
    document.querySelector("#addForm").classList.toggle("active");
}
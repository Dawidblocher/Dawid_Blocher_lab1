class NoteList{
    constructor(){
        this.noteList = JSON.parse(localStorage.getItem('notes'));
    }

    displayNotes(){
        console.log(this.noteList);
    }
}
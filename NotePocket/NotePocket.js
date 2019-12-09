class NotePocket {
    constructor() {
        this.notesArr = this.getnoteArr();
        this.input = document.querySelector('#createInput').addEventListener('click', (e) => this.handleAddNoteForm(e));

    }

    getnoteArr() {
        if (!localStorage.getItem('notes')) {
            this.notesArr = [];
            localStorage.setItem('notes', JSON.stringify(this.notesArr))
            return this.notesArr = []
        } else {
            return this.notesArr = JSON.parse(localStorage.getItem('notes'));
        }
    }

    handleAddNoteForm(e) {
        e.preventDefault();
        const title = document.querySelector('#title').value;
        const text = tinyMCE.activeEditor.getContent();
        const pinned = document.querySelector('#pinned').checked;
        const color = document.querySelector('#color').value;
        console.log(text);
        if (this.validateForm(title)) {
            const note = new Note(title, text, pinned, color);
            this.notesArr.push(note);
            localStorage.setItem('notes', JSON.stringify(this.notesArr))
            this.resetForm();
        } else {
            document.querySelector('.validate').innerHTML = "Notatka musi zawierać nazwę";
        }
    }

    validateForm(title) {
        if (title.length === 0)
            return false;
        return true;
    }

    resetForm() {
        document.querySelector('#title').value = '';
        document.querySelector('#text').value = '';
        document.querySelector('#pinned').checked = false;
        document.querySelector('#color').value = '#fb0000';
    }



}
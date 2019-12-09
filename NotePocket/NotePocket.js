class NotePocket {
    constructor() {
        this.notesArr = this.getnoteArr();
        this.noteList = new NoteList();
        this.noteList.displayNotesShorts('shorts');
        this.editName = '';
        document.querySelector('#createInput').addEventListener('click', (e) => this.handleAddNoteForm(e));
        document.querySelector('#editInput').addEventListener('click', (e) => this.handleEditNoteForm(e));
        document.querySelector('.addBtn')
            .addEventListener('click', this.showForm);
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
        const color = document.querySelector('#color');
        const color2 = document.querySelector('#color2');
        const color3 = document.querySelector('#color3');
        let colorChoosen;
        if (color.checked) {
            colorChoosen = color.value;
        } else if (color2.checked) {
            colorChoosen = color2.value;
        } else if (color3.checked) {
            colorChoosen = color3.value;
        } else {
            colorChoosen = "#ffffff";
        }
        if (this.validateForm(title)) {
            const note = new Note(title, text, pinned, colorChoosen);
            this.notesArr.push(note);
            localStorage.setItem('notes', JSON.stringify(this.notesArr))
            this.resetForm();
            location.reload();
        } else {
            document.querySelector('.validate').innerHTML = "Notatka musi zawierać nazwę";
        }

    }

    handleEditNoteForm(e) {
        e.preventDefault();
        const title = document.querySelector('#title').value;
        const text = tinyMCE.activeEditor.getContent();
        const pinned = document.querySelector('#pinned').checked;
        const color = document.querySelector('#color');
        const color2 = document.querySelector('#color2');
        const color3 = document.querySelector('#color3');
        let colorChoosen;
        if (color.checked) {
            colorChoosen = color.value;
        } else if (color2.checked) {
            colorChoosen = color2.value;
        } else if (color3.checked) {
            colorChoosen = color3.value;
        } else {
            colorChoosen = "#ffffff";
        }
        this.notesArr.forEach(element => {
            if (this.editName === element.title) {
                element.title = title;
                element.text = text;
                element.pinned = pinned;
                element.color = colorChoosen;
            }

        });
        localStorage.setItem('notes', JSON.stringify(this.notesArr));
        location.reload();
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

    showForm(e, title = "", text = "", pinned = false, color = null, edit = false) {
        document.querySelector("#addForm").classList.toggle("active");
        const noteActive = document.querySelector('.note-wrap');
        console.log(title);

        const titleForm = document.querySelector('#title').value = title;
        const textForm = tinyMCE.activeEditor.setContent(text);
        const pinnedForm = document.querySelector('#pinned').checked = pinned;
        const colorForm = document.querySelector('#color');
        const color2Form = document.querySelector('#color2');
        const color3Form = document.querySelector('#color3');

        if (colorForm.value === color) {
            colorForm.checked = true;
        } else if (color2Form.value === color) {
            color2Form.checked = true;
        } else if (color3Form.value === color) {
            color3Form.checked = true;
        } else {
            color3Form.checked = false;
            color2Form.checked = false;
            colorForm.checked = false;
        }

        if (edit) {
            document.querySelector('#createInput').style.display = 'none';
            document.querySelector('#editInput').style.display = 'block';
            this.editName = title;
        } else {
            this.editName = '';
            document.querySelector('#createInput').style.display = 'block';
            document.querySelector('#editInput').style.display = 'none';
        }

        if (noteActive !== null)
            document.querySelector('body').removeChild(noteActive);
    }

}
class Note {
    constructor(title = '', text = '', pinned = false, color = "red") {
        this.title = title;
        this.text = text;
        this.color = color;
        this.created = new Date().toISOString();
        this.pinned = pinned;
    }

}

// localStorage.setItem('notes', JSON.stringify(notesArr))
document.addEventListener('DOMContentLoaded', startApp);

function resetForm(){
    document.querySelector('#title').value = '';
    document.querySelector('#text').value = '';
    document.querySelector('#pinned').checked = false;
    document.querySelector('#color').value = '#fb0000';
}

function startApp(){
    const submitInput = document.querySelector('#createInput');
    submitInput.addEventListener('click', (e)=> {
        e.preventDefault();
        const title = document.querySelector('#title').value;
        const text = document.querySelector('#text').value;
        const pinned = document.querySelector('#pinned').checked;
        const color = document.querySelector('#color').value;
        const note = new Note(title, text, pinned, color);
        notesArr.push(note);
        localStorage.setItem('notes', JSON.stringify(notesArr))
        resetForm();
    })

    
}


class NoteList {
    constructor() {
        this.noteList = JSON.parse(localStorage.getItem('notes'));
        this.index = 0;
    }

    displayNote(title, text, created) {
        document.querySelector("#addForm").classList.remove("active");
        const note = document.querySelector('.note-wrap');
        if (note !== null) {
            document.querySelector('body').removeChild(note);
        }
        const wrap = document.createElement('div');
        wrap.classList.add('note-wrap');
        const h1 = document.createElement('h1');
        h1.innerHTML = title;
        const p = document.createElement('p');
        p.innerHTML = text;
        const date = document.createElement('span');
        date.innerHTML = created;
        wrap.appendChild(h1);
        wrap.appendChild(p);
        wrap.appendChild(date);
        document.querySelector('body').appendChild(wrap);
    }



    displayNotesShorts(localisation) {
        const divLocal = document.querySelector("." + localisation);
        this.noteList.sort((item) => {
            if (item.pinned)
                return -1
            else return 1
        });

        this.noteList.forEach(element => {
            const descLimit = 50;
            const divElementWrap = document.createElement('li');
            divElementWrap.classList.add('short-item')
            //create data element
            const dataWraper = document.createElement('div');
            const data = document.createElement('span');
            dataWraper.classList.add('data');
            data.innerHTML = element.created.substr(0, 10)
            dataWraper.appendChild(data);
            // create time element
            const time = document.createElement('span');
            time.classList.add('time');
            time.innerHTML = element.created.substr(11, 8)
            dataWraper.appendChild(time);
            // create control panel
            const controlPanel = document.createElement('div');
            controlPanel.classList.add('control-panel');
            // create delete
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('deleteNote');
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
            deleteBtn.addEventListener('click', () => this.deleteNote(element));
            // create edit
            const editBtn = document.createElement('button');
            editBtn.classList.add('editNote');
            editBtn.innerHTML = '<i class="fas fa-pen"></i>';
            editBtn.addEventListener('click', () => this.editNote(element));
            // create short content
            const content = document.createElement('div')
            content.classList.add('short-content')
            content.addEventListener('click', () => {
                this.displayNote(element.title, element.text, element.created);
            })
            const titleElementH2 = document.createElement('h2');
            const desc = document.createElement('div');
            titleElementH2.innerHTML = element.title;
            let shortDesc = '';
            for (let i = 0; i < element.text.length; i++) {
                if (i < descLimit) {
                    shortDesc += element.text[i];
                }
                if (i == descLimit) {
                    shortDesc += '...';
                }
            }
            desc.innerHTML = shortDesc;
            // create flag
            const flag = document.createElement('span');
            flag.classList.add('flag');
            flag.style.background = element.color;
            //create pinned
            if (element.pinned) {
                const pinned = document.createElement('span');
                pinned.classList.add('pinned');
                pinned.innerHTML = '<i class="fas fa-thumbtack"></i>';
                divElementWrap.appendChild(pinned);
            }
            content.appendChild(titleElementH2);
            content.appendChild(desc);
            divElementWrap.appendChild(flag);
            divElementWrap.appendChild(dataWraper);
            divElementWrap.appendChild(content);
            controlPanel.appendChild(deleteBtn);
            controlPanel.appendChild(editBtn);
            divElementWrap.appendChild(controlPanel);
            divLocal.appendChild(divElementWrap);
        });
    }

    deleteNote(element) {
        console.log(element);
        const newTab = [];
        this.noteList.forEach(item => {
            if (item !== element) {
                newTab.push(item);
            }
        })
        console.log(newTab);
        localStorage.setItem('notes', JSON.stringify(newTab));
        location.reload();
    }

    editNote(element) {
        notePocket.showForm(null, element.title, element.text, element.pinned, element.color, true);
    }
}
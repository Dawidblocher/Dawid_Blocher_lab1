class NoteList {
    constructor() {
        this.noteList = JSON.parse(localStorage.getItem('notes'));
        this.index = 0;
    }

    displayNote(title, text, created) {
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
            // create short content
            const content = document.createElement('div')
            content.classList.add('short-content')
            divElementWrap.addEventListener('click', () => {
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
            divLocal.appendChild(divElementWrap);
        });
    }
}
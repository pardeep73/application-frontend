document.addEventListener('click', (e) => {
    const nav = document.getElementById('nav')
    const users = document.getElementById('users')

    const li = users.children[1]
   /*  console.log(users,li) */
    if (nav) {
        if (e.target == nav) {
            users.classList.remove('hidden')
            /* users.classList.add('nav') */
        }
        /* if (e.target !== nav && !(users.contains(e.target))) {
            users.classList.add('hidden')
            users.classList.remove('nav')
        } */
        const listitem = e.target.closest('li')

        /* console.log(listitem) */
            
        if(listitem && listitem.contains(e.target)){
            users.classList.add('hidden')
        }
    }
})
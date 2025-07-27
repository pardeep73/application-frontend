document.addEventListener('click', (e) => {
    const nav = document.getElementById('nav')
    const users = document.getElementById('users')  
    /* console.log('users',users,nav) */
    if (nav) {
        if (e.target == nav) {
            users.classList.remove('hidden')
           /*  users.classList.add('nav') */
        }
        /* if (e.target !== nav && !(users.contains(e.target))) {
            users.classList.add('hidden')
            users.classList.remove('nav')
        } */
       else{
            users.classList.add('hidden')
            users.classList.remove('nav')
        }
    }
})



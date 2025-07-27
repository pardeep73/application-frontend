document.addEventListener('click', (e) => {
    const nav = document.getElementById('nav')
    const users = document.getElementById('users')

    if (nav) {
        const li = users.children[1]
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


document.addEventListener('load',()=>{
    const height = window.innerHeight
    console.log('height',height)

    const parent = document.getElementById('parent')

    if(parent){
        console.log('parent received')
        parent.style.height = `${height}px`
    }
})
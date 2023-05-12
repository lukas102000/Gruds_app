const Cards = async (id,title,context,dates)=>{
    let article = document.createElement('article')
    article.setAttribute('class', "app-card")
    article.setAttribute('onclick',"openView(this)")

    article.innerHTML = 
    `   
        <div class="app-card-content ${id} ${title} ${context} ${dates}">
        <h1>${title.slice(0, 50)}</h1>
        <p>
            ${context.slice(0, 200)} 
        </p>
        </div>
    `

    await document.querySelector('.app-content').appendChild(article)
}

const openView = (e)=>{
    let div = e.querySelector('div')
    localStorage.setItem('itemId', div.classList.item(1))
    setTimeout(()=>{
        window.location.href = './Pages/view.html'
    }, 500)
}
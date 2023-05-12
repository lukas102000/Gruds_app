selectOne(localStorage.getItem('itemId'))
const deletItems = ()=>{
    deleteGudsItems(localStorage.getItem('itemId'))
    window.location.href = '../index.html'
}

const updateHoçds = ()=>{
    let title = document.getElementById('titles').value
    let context = document.getElementById('contexts').value
    let date = new Date().toLocaleDateString()
    let time = new Date().toLocaleTimeString()
    let dates = "Last change in "+date +" at "+time

    document.getElementById('lastTimes').innerHTML = 'Last change at '+time

    updateGrudItemsHold(title, context, dates, localStorage.getItem('itemId'))
}
selectAll()

function openSearchBar (){
    document.querySelector(".search-bar").classList.toggle('active')
    document.querySelector(".nav-left").classList.toggle('active')
    document.querySelector(".searsh-input").value =""

}
function searchItem (e){
    let menu = document.querySelector('.app-container')
    let item = menu.querySelectorAll(".card-container")
    for(let i=0; i< item.length; i++){
        let h1 = item.item(i).querySelector("h1")
        let p = item.item(i).querySelector("p")
        if(
            h1.innerHTML.toLowerCase().indexOf(e.value.toLowerCase()) > -1 ||
            p.innerHTML.toLowerCase().indexOf(e.value.toLowerCase()) > -1
        ){
            item.item(i).style.display = "flex"
        }else{
            item.item(i).style.display = "none"
        }

    }
}
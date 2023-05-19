selectOne(window.localStorage.getItem("ids"))
const setItems =  (id, title,titleColor,titlePosition,titleWeight,titleStyle,context,contextColor,contextPosition,contextWeight,contextStyle,image,time,date)=>{
    document.getElementById("inputTitle").value = title
    document.getElementById("inputTitle").style.color = titleColor
    document.getElementById("inputTitle").style.textAlign = titlePosition
    document.getElementById("inputTitle").style.fontWeight = titleWeight
    document.getElementById("inputTitle").style.fontStyle = titleStyle

    document.getElementById("textarea").value = context
    document.getElementById("textarea").style.color = contextColor
    document.getElementById("textarea").style.textAlign = contextPosition
    document.getElementById("textarea").style.fontWeight = contextWeight
    document.getElementById("textarea").style.fontStyle = contextStyle
    document.querySelector(".setDatas").innerHTML = `Last change time: ${time}`
    document.querySelector(".setTime").innerHTML = `Last change date:  ${date}`
    let img = document.querySelector(".img-vies")
   
    if(image !== ""){
        img.setAttribute("src", image)
        document.querySelector("#setImg").value = image
    }
}
// save
function SavesChanges (){
    let title = document.getElementById("inputTitle").value
    let titleColor = document.getElementById("inputTitle").style.color
    let titlePosition = document.getElementById("inputTitle").style.textAlign
    let titleWeight = document.getElementById("inputTitle").style.fontWeight
    let titleStyle = document.getElementById("inputTitle").style.fontStyle

    let context = document.getElementById("textarea").value
    let contextColor = document.getElementById("textarea").style.color
    let contextPosition = document.getElementById("textarea").style.textAlign
    let contextWeight = document.getElementById("textarea").style.fontWeight
    let contextStyle = document.getElementById("textarea").style.fontStyle
    
    let file = document.querySelector("#setImg").value

    let time = new Date().toLocaleTimeString()
    let date = new Date().toLocaleDateString()
   

    update(
            title,titleColor,titlePosition,titleWeight,titleStyle,context,contextColor,
            contextPosition,contextWeight,contextStyle,file,time,date,window.localStorage.getItem("ids")
        )
    
       
    document.querySelector(".paletes").classList.remove("active")
}
// auto save
function autoSave2 (){
    setInterval( async () => {
        let title = document.getElementById("inputTitle").value
        let titleColor = document.getElementById("inputTitle").style.color
        let titlePosition = document.getElementById("inputTitle").style.textAlign
        let titleWeight = document.getElementById("inputTitle").style.fontWeight
        let titleStyle = document.getElementById("inputTitle").style.fontStyle

        let context = document.getElementById("textarea").value
        let contextColor = document.getElementById("textarea").style.color
        let contextPosition = document.getElementById("textarea").style.textAlign
        let contextWeight = document.getElementById("textarea").style.fontWeight
        let contextStyle = document.getElementById("textarea").style.fontStyle
        
        let file = document.querySelector("#setImg").value

        let time = new Date().toLocaleTimeString()
        let date = new Date().toLocaleDateString()
    
        update(
            title,titleColor,titlePosition,titleWeight,titleStyle,context,contextColor,
            contextPosition,contextWeight,contextStyle,file,time,date,window.localStorage.getItem("ids")
        )
        

    }, 100);
}

function deleteEle (){
    deletes(window.localStorage.getItem("ids"), "")
    window.location.href = "../index.html"
}

function goToViewsImg (){
    
    let file = document.querySelector("#setImg").value
    window.localStorage.setItem("imgs", file)
    setTimeout(()=>{
        window.location.href = "../Pages/viewImg.html"
    },500)
}



autoSave2()
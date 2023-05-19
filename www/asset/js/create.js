let ids = "";

function custonMark (e){
    ids = e.id
}

/// style for texts

const setStylesBold = ()=>{
    let obj = document.getElementById(ids)
    if(obj.style.fontWeight === "bold"){ obj.style.fontWeight = `normal`}else{ obj.style.fontWeight = `bold` }
}
function setStylesTextAlign (e){
    let obj = document.getElementById(ids)
    if(obj.style === null){}
    else{
        obj.style.textAlign = `${e.id}`
    }
}
function setFontStyle (){
    let obj = document.getElementById(ids)
    if(obj.style.fontStyle === "italic"){ obj.style.fontStyle = `normal`}
    else
    { obj.style.fontStyle = `italic` }
}
function setColor (e){
    let obj = document.getElementById(ids)
    if(obj.style === null){}
    else{
        obj.style.color = `${e.id}`
    }
}
function openPaletes (e){
    document.querySelector(".paletes").classList.toggle("active")
    if(e.classList.item(0) === "bi-chevron-up"){ 
        e.classList.replace('bi-chevron-up','bi-chevron-down')
    }else{
        e.classList.replace('bi-chevron-down', 'bi-chevron-up')
    }
}
function setImages (e){
    let box = document.querySelector(".my-img")
    document.querySelector(".my-img").style.display = 'block'
    let div = document.querySelector('.img-view')
   
    let file = URL.createObjectURL(e.files[0])
    div.style.backgroundImage = `url('${file}')`
}
// save
function Saves (){
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
    
    let file = document.getElementById("setImgae").files[0]

    let time = new Date().toLocaleTimeString()
    let date = new Date().toLocaleDateString()
   

    if(title === "" && context === ""){}
    else{

        const reader = new FileReader()
        

        if(file === undefined){
            updateRealTime(title,titleColor,titlePosition,titleWeight,titleStyle,context,contextColor,contextPosition,contextWeight,contextStyle,"",time,date)
            //saveButton(title,titleColor,titlePosition,titleWeight,titleStyle,context,contextColor,contextPosition,contextWeight,contextStyle,"",time,date)            
        }else{
            reader.addEventListener("load",()=>{
                updateRealTime(title,titleColor,titlePosition,titleWeight,titleStyle,context,contextColor,contextPosition,contextWeight,contextStyle,reader.result,time,date)
            })
    
            reader.readAsDataURL(file)
        }
        document.querySelector(".modal").style.display = "flex"
        setTimeout(()=>{
            document.querySelector(".modal").style.display = "none"
        },500)
        
        
        
    }

    document.querySelector(".paletes").classList.remove("active")
    
}

// auto save
function autoSave (){
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
        
        let file = document.getElementById("setImgae").files[0]

        let time = new Date().toLocaleTimeString()
        let date = new Date().toLocaleDateString()
    

        if(title === ""){}
        else{

            const reader = new FileReader()
            

            if(file === undefined){
                updateRealTime(title,titleColor,titlePosition,titleWeight,titleStyle,context,contextColor,contextPosition,contextWeight,contextStyle,"",time,date)
                //saveButton(title,titleColor,titlePosition,titleWeight,titleStyle,context,contextColor,contextPosition,contextWeight,contextStyle,"",time,date)            
            }else{
                reader.addEventListener("load",()=>{
                    updateRealTime(title,titleColor,titlePosition,titleWeight,titleStyle,context,contextColor,contextPosition,contextWeight,contextStyle,reader.result,time,date)
                })
        
                reader.readAsDataURL(file)
            }        
            
        }

    }, 500);
}

function deletetITLE (){
    let title = document.getElementById("inputTitle").value
    deletes("", title)
    window.location.href = "../index.html"
}

function openDelete (){
    document.querySelector(".modal-alert").classList.toggle("active")
}
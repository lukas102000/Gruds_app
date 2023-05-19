const db = window.openDatabase("noteStorage", "1.0","com.note_app_storage", 20*2052*2052)
db.transaction((ex)=>{
    ex.executeSql(
        `CREATE TABLE IF NOT EXISTS NotesDB 
        (
            id INTEGER PRIMARY KEY, title TEXT, titleColor TEXT, titlePosition TEXT, titleWeight TEXT, titleStyle TEXT,
            context TEXT,contextColor TEXT,contextPosition TEXT, contextWeight TEXT, contextStyle TEXT,image TEXT, 
            time TEXT, date TEXT
        )`)
})
/*
db.transaction((ex)=>{
    ex.executeSql("DROP TABLE NotesDB")
})
*/
const saveButton = (title,titleColor,titlePosition,titleWeight,titleStyle,context,contextColor,contextPosition,contextWeight,contextStyle,image,time,date) =>{
    db.transaction((ex)=>{
        ex.executeSql(
        "INSERT INTO NotesDB (title,titleColor,titlePosition,titleWeight,titleStyle,context,contextColor,contextPosition,contextWeight,contextStyle,image,time,date) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)",[
                title,
                titleColor,
                titlePosition,
                titleWeight,
                titleStyle,
                context,
                contextColor,
                contextPosition,
                contextWeight,
                contextStyle,
                image,
                time,
                date
            ]
        )
    })
}

const updateRealTime = (title,titleColor,titlePosition,titleWeight,titleStyle,context,contextColor,contextPosition,contextWeight,contextStyle,image,time,date)=>{
    db.transaction((ex)=>{
        ex.executeSql(`SELECT * FROM NotesDB WHERE title='${title}' `,[],(err, result)=>{
            if(result.rows.length > 0){
                console.log(result.rows)
                updates(title,titleColor,titlePosition,titleWeight,titleStyle,context,contextColor,contextPosition,contextWeight,contextStyle,image,time,date)
            }else{
                saveButton(title,titleColor,titlePosition,titleWeight,titleStyle,context,contextColor,contextPosition,contextWeight,contextStyle,image,time,date)
            }
        })
    })
}

const update = (title,titleColor,titlePosition,titleWeight,titleStyle,context,contextColor,contextPosition,contextWeight,contextStyle,image,time,date, id)=>{
    db.transaction((ex)=>{
        ex.executeSql("UPDATE NotesDB SET title=?, titleColor=?,titlePosition=?,titleWeight=?,titleStyle=?,context=?,contextColor=?,contextPosition=?,contextWeight=?,contextStyle=?,image=?,time=?,date=? WHERE id=?",
            [title, titleColor,titlePosition,titleWeight,titleStyle,context,contextColor,contextPosition,contextWeight,contextStyle,image,time,date, id])
    })
}

function updates (title,titleColor,titlePosition,titleWeight,titleStyle,context,contextColor,contextPosition,contextWeight,contextStyle,image,time,date){
    db.transaction((ex)=>{
        ex.executeSql("UPDATE NotesDB SET titleColor=?,titlePosition=?,titleWeight=?,titleStyle=?,context=?,contextColor=?,contextPosition=?,contextWeight=?,contextStyle=?,image=?,time=?,date=? WHERE title = ?",
            [titleColor,titlePosition,titleWeight,titleStyle,context,contextColor,contextPosition,contextWeight,contextStyle,image,time,date, title])
    })
}

// select all notes 
const selectAll = ()=>{
    

    let small = document.createElement("small")
    small.setAttribute("class", "dates")
    
    db.transaction((ex)=>{
        ex.executeSql("SELECT * FROM NotesDB ",[],(err, res)=>{
            for(let i=0; i < res.rows.length; i++){
                appenHome(
                    res.rows[i].id,
                    res.rows[i].title,
                    res.rows[i].titleColor,
                    res.rows[i].titlePosition,
                    res.rows[i].titleWeight,
                    res.rows[i].titleStyle,
                    res.rows[i].context,
                    res.rows[i].contextColor,
                    res.rows[i].contextPosition,
                    res.rows[i].contextWeight,
                    res.rows[i].contextStyle,
                    res.rows[i].image,
                    res.rows[i].time,
                    res.rows[i].date
                )
            }
            
        })
    })

}




const selectOne = (id)=>{
    db.transaction((ex)=>{
        ex.executeSql(`SELECT * FROM NotesDB WHERE id ='${id}' `,[],(err, res)=>{


            for(let i=0; i < res.rows.length; i++){
                setItems(
                        res.rows[i].id,
                        res.rows[i].title,
                        res.rows[i].titleColor,
                        res.rows[i].titlePosition,
                        res.rows[i].titleWeight,
                        res.rows[i].titleStyle,
                        res.rows[i].context,
                        res.rows[i].contextColor,
                        res.rows[i].contextPosition,
                        res.rows[i].contextWeight,
                        res.rows[i].contextStyle,
                        res.rows[i].image,
                        res.rows[i].time,
                        res.rows[i].date
                    )
            }
            
        })
    })
}
const deletes = (id, title)=>{
    db.transaction((ex)=>{
        ex.executeSql(`DELETE FROM NotesDB WHERE id ='${id}' OR title ='${title}' `)
    })
}

const appenHome  = (id, title,titleColor,titlePosition,titleWeight,titleStyle,context,contextColor,contextPosition,contextWeight,contextStyle,image,time,date)=>{
    let img;
    if(image === ""){img = "none"}else{ img = "block";}
    
    let article = document.createElement("article")
    article.setAttribute('class', 'card-container')
    article.innerHTML = 
    `
    <article id="${id}" onclick="goToViews(${id})">
        <h1 style="color:${titleColor};text-align:${titlePosition};font-weight:${titleWeight};font-style:${titleStyle};">${title}</h1>
        <img src="${image}" style="display:${img}">
        <p style="color:${contextColor};text-align:${contextPosition};font-weight:${contextWeight};font-style:${contextStyle};"> ${context.slice(0, 150)} </p>
    </article>
    `
    document.querySelector(".app-container").prepend(article)
}

function goToViews (id){
    window.localStorage.setItem("ids", id)
    setTimeout(()=>{
        window.location.href = "../Pages/views.html"
    },500)
}

const viewsImgs = (image)=>{
    let art = document.createElement("article")
    db.transaction((ex)=>{
        ex.executeSql(`SELECT * FROM NotesDB WHERE image='${image}'`,[],(err, res)=>{
            for(let i =0; i< res.rows.length; i++){
                art.setAttribute("style", `background-image: url('${res.rows[i].image}')`)
                document.querySelector(".views").prepend(art)
            }
        })
        ex.executeSql(`SELECT * FROM NotesDB `,[],(err, res)=>{
            for(let i =0; i< res.rows.length; i++){
                if(res.rows[i].image === image){}
                else if(res.rows[i].image !== ""){
                    appenImhas(res.rows[i].image)
                }
                
            }
        })
    })
}

function appenImhas (image){
    let art = document.createElement("article")
    art.setAttribute("style", `background-image: url('${image}')`)

    document.querySelector(".views").append(art)
}
const storage = window.openDatabase("gruds", "1.0","com.lucas_veraz_grud.app", 16*2025*2025)

storage.transaction((ex)=>{
    ex.executeSql(
        "CREATE TABLE IF NOT EXISTS MyGruds (id INTEGER PRIMARY KEY, title TEXT,context TEXT, date TEXT )"
        )
})

// save items
const savesItems = async ()=>{
    let title = document.querySelector('#title').value
    let context = document.querySelector('#context').value
    let time = new Date().toLocaleTimeString()
    

    if(title === "" && context === "" ){}
    else{
        storage.transaction((ex)=>{
            ex.executeSql(`SELECT * FROM MyGruds WHERE title='${title}'`,[], (err, result)=>{
                console.log(result.rows.length)
                if(result.rows.length === 1){
                    updateGrudItems()
                }else{
                    createGrud()
                }
            })
        })


        document.querySelector('.modal').classList.add('active')
        setTimeout(()=>{
            document.querySelector('.modal').classList.remove('active')
        }, 1500)


        document.querySelector('#lastTime').innerHTML = 'Last change at '+time
        window.focus()


    }
    
    //
    
}
// create new items 
const createGrud = async ()=>{
    let title = document.querySelector('#title').value
    let context = document.querySelector('#context').value
    let date = new Date().toLocaleDateString()
    let time = new Date().toLocaleTimeString()
    let dates = "Last change in "+date +" at "+time

    await storage.transaction((ex)=>{
        ex.executeSql("INSERT INTO MyGruds (title,context,date) VALUES(?,?,?)",[title,context,dates])
    })

}

// update oline 
const updateGrudItems = async ()=>{
    let title = document.querySelector('#title').value
    let context = document.querySelector('#context').value
    let date = new Date().toLocaleDateString()

    await storage.transaction((ex)=>{
        ex.executeSql(
                "UPDATE MyGruds SET context=?, date=? WHERE title=?",[context, date, title]
            )
    })
}
const updateGrudItemsHold = async (title, context, date, id)=>{
    await storage.transaction((ex)=>{
        ex.executeSql(
                "UPDATE MyGruds SET title=?, context=?, date=? WHERE id=?",[title, context, date, id]
            )
    })
}

// delete gruds
const deleteGudsItems = async (id)=>{
    storage.transaction((ex)=>{
        ex.executeSql(`DELETE FROM MyGruds WHERE id="${id}"`)
    })
}

// const select items
const selectItems = async ()=>{
    storage.transaction((ex)=>{
        ex.executeSql("SELECT * FROM MyGruds ORDER BY id DESC ",[],async (err, res) =>{
            const rows = res.rows
            for(let i =0; i<rows.length; i++){
                await Cards(rows[i].id, rows[i].title, rows[i].context,  rows[i].dates)
            }
            
        })
    })
}

// select on 
const selectOne = (id)=>{
    storage.transaction((ex)=>{
        ex.executeSql(`SELECT * FROM MyGruds WHERE id="${id}"`,[],(err, res)=>{
            let rows = res.rows
            document.getElementById('lastTimes').innerHTML = rows[0].date
            document.getElementById('titles').value = rows[0].title
            document.getElementById('contexts').value = rows[0].context
        })
    })
}


selectItems()

//GET
axios.get('/getStudents')
.then(res=>{
    console.log(res.data)
    renderData(res.data.students)
})

//POST
function handleSubmit(ev){
    ev.preventDefault();
    let {name, id} = ev.target.elements;
    name = name.value;
    id= id.value;
    ev.target.reset();
    axios.post('/addStudent',{name, id})
    .then(res=>renderData(res.data.students))
}

function renderData(data){
    const html = data.map(person=>{
        return `<div class='person'>
            <input id='${person.id}name' class='person__name' value='${person.name}'>
         <div class='button button--update' onclick='updateRecord("${person.id}")'>UPDATE</div>
        <div class='button button--delete' onclick='deleteRecord("${person.id}")'>DELETE</div>
        </div>`
    }).join('');

    document.getElementById('root').innerHTML = html
}

//DELETE
function deleteRecord(personId){
    axios.post('/deleteStudent',{id:personId})
    .then(res=>{
        renderData(res.data.students)
    })
}

//UPDATE
function updateRecord(personId){
    const newName = document.getElementById(`${personId}name`).value;
    console.dir(newName)
    axios.put('/updateStudent',{id:personId, name:newName})
    .then(res=>{
        console.log(res.data.message)
        renderData(res.data.students)
    })
}
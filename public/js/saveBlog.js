function saveToRead(id){
    axios.post('/api/blogs/save' , {id}).then(data => {
        if(data.status == 200){
            alert(data.data)
            location.reload()
        }
    })
}

function deleteFromToRead(id) {
    axios.delete(`/api/blogs/save/${id}`).then(data => {
        if(data.status == 200){
            alert(data.data)
            location.reload()
        }
    })
}
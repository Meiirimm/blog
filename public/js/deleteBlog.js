function deleteBlogs(id, userId){
    axios.delete(`/api/blogs/${id}`).then(data => {
        alert(data.data)
        if(data.status == 200){
            location.replace(`/admin/${userId}`)
        }else if (data.status == 404){
            location.replace('/not-found')
        }
    })
}

function deleteBlogsUser(id, userId){
    axios.delete(`/api/blogs/${id}`).then(data => {
        if(data.status == 200){
            alert(data.data)
            location.replace(`/profile/${userId}`)
        }else if (data.status == 404){
            location.replace('/not-found')
        }
    })
}
// let bun = document.querySelectorAll('.ban')

function banUser(userId, index) {
    // bun[index].style.color = "red"
    axios.post(`/banUser/${userId}`).then(data => {
        if(data.status == 200){
            alert(data.data)
            location.reload()
        }
    })
}
 
function unbanUser(userId, index) {
    axios.post(`/unbanUser/${userId}`).then(data => {
        if(data.status == 200){
            alert(data.data)
            location.reload()
        }
    })
}

function sendComment(e){
    e.preventDefault()
    const comment_text = document.querySelector('#comment-text').value
    const author = document.querySelector('#comment_author').value
    const blog = document.querySelector('#comment_blog').value

    if(comment_text.length > 0){
        axios.post('/api/comment' , {text: comment_text, authorId: author, blogId: blog}).then(data => {
            if(data.data){
                location.reload()
            }
        })
    }
}

function deleteComment(commentId, blogId){
    // console.log(commentId);
    // console.log(blogId);

    axios.delete(`/api/comment/${commentId}`).then(data => {
        if(data.status == 200){
            location.replace(`/view/${blogId}`)
        }else if (data.status == 404){
            location.replace('/not-found')
        }
    })
}
const User = require('../auth/User')
const fs = require('fs')
const path = require('path')


const editUser = async(req, res) => {
    if(req.body.email.length > 0 && req.body.full_name.length > 0){
            const user = await User.findById(req.body.id)
            // fs.unlinkSync(path.join(__dirname + '../../../public' + user.image))

            user.email = req.body.email;
            user.full_name = req.body.full_name;
            user.osebe = req.body.osebe;
            // user.image = `/images/users/${req.file.filename}`;
            user.save()
            if(req.user.isAdmin){
                res.redirect('/admin/' + req.user._id)
            }else{
                res.redirect('/profile/' + req.user._id)
            }
    }else{
        res.redirect(`/edit/${req.body.id}?error=1`)
    }
}

const deleteUser = async(req, res) => {
    const user = await User.findById(req.params.id)
    if(user){
        await User.deleteOne({_id: req.params.id})
        res.status(200).send('Вы хотите удалить аккаунт?')
    }else{
        res.status(404).send('Not found')
    }
}

async function banUser(req, res) {
    const userId = req.params.userId;
    if(userId){
        const user = await User.findByIdAndUpdate(userId, { isBanned: true });
        res.status(200).send('Вы хотите заболкировать пользователя?')
    }else{
        res.status(404).send('Not found')
    }
}

async function unbanUser(req, res) {
    const userId = req.params.userId;
    if(userId){
        const user = await User.findByIdAndUpdate(userId, { isBanned: false });
        res.status(200).send('Вы хотите разболкировать пользователя?')
    }else{
        res.status(404).send('Not found')
    }
}

  
const saveToRead = (req, res) => {
    console.log(req.body);
}

module.exports = {
    editUser,
    deleteUser,
    saveToRead,
    banUser,
    unbanUser
}
//import express
const express = require('express')
//import express router
const router = express.Router()
//import user model
const User = require('../models/user')

//Get all routes
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({message: err.message}) //code 500 means an error occurred on the server
    }
})

//Getting a single route
router.get('/:id', getUser, (req, res) => {
    res.json(res.user)
})

//Creating a route
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        topic: req.body.topic
    })

    try {
        const newUser = await user.save()
        res.status(201).send(newUser) //code 201 means successfully created an object
    } catch (err) {
        res.status(400).json({ message: err.message})  //code 400 means an error occurred on the client side
    }
})

//Updating a route
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name
    }
    if (req.body.topic != null) {
        res.user.topic = req.body.topic
    }
    try {
        const updateUser = await res.user.save()
        res.json(updateUser)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})

//Deleting a route
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: 'User deleted!!'})
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

//setup middleware
async function getUser(req, res, next){
    let user 
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: 'User does not exist!' })  //code 404 means data does not exist
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.user = user
    next()
}


module.exports = router
const router = require('express').Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator/check')

const User = require('../models/User')
const Post = require('../models/Post')
const { route } = require('moongose/routes')

// @route   POST api/posts
// @desc    Create a Post
// @access  Private

router.post(
    '/',
    [
        [auth], 
        [
            check('text', 'Text is required')
                .not()
                .isEmpty()
        ]
    ], 
    async (req, res)=> {

        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const user = await User.findById(req.user.id).select('-password') // not return the password
        
            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id  // from the middlware
            })

            const post = await newPost.save()
            res.json(post)

        } catch (err) {
            console.log(err.message)
            res.status(500).json('Internal Server Error')
        }

        
    }
)

// @route   GET api/posts
// @desc    Get all post
// @access  Private

router.get('/', auth, async(req, res)=> {
    try {

        const posts = await Post.find().sort({ date: -1}) // sort dal piu recente
        res.json(posts)
        
    } catch (err) {
        console.log(err.message)
        res.status(500).json('Internal Server Error')
    }
})

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Private

router.get('/:id', auth, async(req, res)=> {

    try {

        const post = await Post.findById(req.params.id)

        if(!post) return res.status(404).json({ msg:'Post not found' })

        res.json(post)
        
    } catch (err) {

        console.log(err.message)
        if(err.kind === 'ObjectId') return res.status(404).json({ msg:'Post not found' })
        res.status(500).json('Internal Server Error')

    }
})

// @route   DELETE api/posts/:id
// @desc    Delete post by ID
// @access  Private

router.delete('/:id', auth, async(req, res)=> {
    try {

        const post = await Post.findById(req.params.id)
        
        // CHECK USER
        if(post.user.toString() !== req.user.id) {
            return res.status(404).json({ msg: 'User not authorized' })
        }
        // REMOVE POST 
        await post.remove()
        res.json({ msg: 'Post Removed' })
        
    } catch (err) {
        console.log(err.message)
        if(err.kind === 'ObjectId') return res.status(404).json({ msg:'Post not found' })
        res.status(500).json('Internal Server Error')
    }
})

// @route   PUT api/posts/like/:id
// @desc    Like a post by ID
// @access  Private

router.put('/like/:id', auth, async(req, res)=>{

    try {
        
        const post =  await Post.findById(req.params.id)

        // CHECK IF THE POST HAS BEEN LIKED
        if(post.likes.filter(like=>like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post alreadky been liked' })
        }

        post.likes.unshift({ user: req.user.id })

        await post.save()

        res.json(post.likes)

    } catch (err) {
        console.log(err.message)
        res.status(500).json('Internal Server Error')
    }
})

// @route   PUT api/posts/unlike/:id
// @desc    Unike a post by ID
// @access  Private

router.put('/unlike/:id', auth, async(req, res)=>{

    try {
        
        const post =  await Post.findById(req.params.id)

        // CHECK IF THE POST ALREADY HAS BEEN LIKED
        if(post.likes.filter(like=>like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post has not been liked' })
        }

        // GET REMOVE INDEX
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)

        post.likes.splice(removeIndex, 1)
        await post.save()

        res.json(post.likes)

    } catch (err) {
        console.log(err.message)
        res.status(500).json('Internal Server Error')
    }
})

// @route   POST api/posts/comment/:id
// @desc    Comment a post
// @access  Private

router.post(
    '/comment/:id', // ID del post ovviamente
    [
        [auth], 
        [
            check('text', 'Text is required')
                .not()
                .isEmpty()
        ]
    ], 
    async (req, res)=> {

        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const user = await User.findById(req.user.id).select('-password') // not return the password
            const post = await Post.findById(req.params.id)
        
            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id  // from the middlware
            }

            post.comments.unshift(newComment)

            await post.save()
            res.json(post.comments)

        } catch (err) {
            console.log(err.message)
            res.status(500).json('Internal Server Error')
        }

        
    }
)

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete a comment
// @access  Private

router.delete('/comment/:id/:comment_id', auth, async (req, res)=> {

        try {

            const post = await Post.findById(req.params.id)

            // PULL OUT THE COMMENT
            const comment = post.comments.find(comment=>comment.id === req.params.comment_id)

            // COMMENT EXIST?
            if(!comment) {
                return res.status(404).json({ msg: 'comment does not exist' })
            }

            // CHECK USER
            if(comment.user.toString() !== req.user.id) {
                return res.status(401).json({ msg: 'user not authorized' })
            }

            // GET REMOVE INDEX
            const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id)

            post.comments.splice(removeIndex, 1)
            await post.save()

            res.json(post.comments)
           
        } catch (err) {
            console.log(err.message)
            res.status(500).json('Internal Server Error')
        }

        
    }
)


module.exports = router
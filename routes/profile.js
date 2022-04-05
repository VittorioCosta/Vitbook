const router = require('express').Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator/check')

const User = require('../models/User')
const Profile = require('../models/Profile')

// @route   GET api/profile/me
// @desc    Get current profile
// @access  Private

router.get('/me', auth, async (req, res)=> {

    try {
        
        const profile = await Profile.findOne({ user: req.user.id }).populate('user',
        ['name','avatar']) // populate from user with [name and avatar]

        if(!profile) {
            return res.status(400).json({ msg: `Profile doesn't exist` })
        }
        
        // profile exist
        res.json(profile)
        
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Internal Server Error')
    }
})

// @route   POST api/profile
// @desc    Create or update a user profile
// @access  Private

router.post(
    '/',
    [ 
        auth,
        [
            check('instruments', 'instruments is required')
                .not()
                .isEmpty(),
            check('location', 'location is required')
                .not()
                .isEmpty(),
            check('status', 'stauts is required')
                .not()
                .isEmpty(),
            check('skills', 'skills is required')
                .not()
                .isEmpty(),
            check('genre', 'genre is required')
                .not()
                .isEmpty(),
            check('skills', 'skills is required')
                .not()
                .isEmpty()
        ]
    ], 
    async (req, res)=> {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            instruments,
            location,
            status,
            skills,
            genre,
            description,
            youtube,
            twitter,
            facebook,
            instagram
        } = req.body

        // Build Profile Object
        const profileFields = {}
        profileFields.user = req.user.id
        if(instruments){
            profileFields.instruments = instruments.split(',').map(instruments=>instruments.trim())
        }
        if(location){profileFields.location = location}
        if(status){profileFields.status = status}
        if(skills){
            profileFields.skills = skills.split(',').map(skills=>skills.trim())
        }
        if(genre){
            profileFields.genre = genre.split(',').map(genre=>genre.trim())
        }
        if(description){profileFields.description = description}
        
        // Build social object
        profileFields.social = {}
        if(youtube){profileFields.youtube = youtube}
        if(twitter){profileFields.twitter = twitter}
        if(facebook){profileFields.facebook = facebook}
        if(instagram){profileFields.instagram = instagram}
        
        // Update data
        try {

            let profile = await Profile.findOne({ user: req.user.id })

            if(profile) {

                //Update
                profile = await Profile.findOneAndUpdate(

                    { user: req.user.id }, 
                    { $set: profileFields },
                    { new: true, upsert: true, setDefaultsOnInsert: true }
                )
                
                return res.json(profile)
            }

            // Create
            profile = new Profile(profileFields)

            await profile.save()
            
            return res.json(profile)
            
        } catch (err) {
            console.log(err.message)
            res.status(500).send('Internal Server Error')
        }
    }
)

module.exports = router
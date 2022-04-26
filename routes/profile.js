const router = require('express').Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

const User = require('../models/User')
const Profile = require('../models/Profile')
const Post = require('../models/Post')

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
        if(skills){profileFields.skills = skills}
        if(genre){profileFields.genre = genre}
        if(description){profileFields.description = description}
        if(facebook){profileFields.facebook = facebook}
        if(instagram){profileFields.instagram = instagram}
        
        /* // Build social object
        profileFields.social = {}
        if(youtube){profileFields.youtube = youtube}
        if(twitter){profileFields.twitter = twitter}
        if(facebook){profileFields.facebook = facebook}
        if(instagram){profileFields.instagram = instagram} */

        // Build socialFields object
        const socialFields = { twitter, facebook };

        // normalize social fields to ensure valid url
        for (const [key, value] of Object.entries(socialFields)) {
        if (value && value.length > 0)
            socialFields[key] = normalize(value, { forceHttps: true });
        }
        // add to profileFields
        profileFields.social = socialFields;
        
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

// @route   GET api/profile
// @desc    Get all profile
// @access  Public

router.get('/', async (req,res)=> {
    try {
        
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles)

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Internal Server Error')
    }
})

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', async (req,res)=> {
    try {
        
        const profile = await Profile.findOne({ user:req.params.user_id }).populate('user', ['name', 'avatar'])
        // l'ID dell user e NON di mongoDB!!!

        if(!profile) return res.status(400).json({ msg: 'Profile not found' })

        res.json(profile)

    } catch (err) {
        console.log(err.message)

        // Per non mostrare se l'ID e' valido
        if(err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' })
        }

        res.status(500).send('Internal Server Error')
    }
})

// @route   DELETE api/profile
// @desc    Delete profile, user & posts
// @access  Private

router.delete('/', auth, async (req,res)=> {
    try {
        // Remove users posts
        Post.deleteMany({ user: req.user.id }),
        // Remove Profile
        await Profile.deleteOne({ user: req.user.id })
        // Remove User
        await User.deleteOne({ _id: req.user.id })

        res.json({ msg: 'user deleted' })
        

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Internal Server Error')
    }
})

// @route   PUT api/profile/experience
// @desc    Add Profile Experience
// @access  Private

router.put(

    '/experience', 
    [ 
        auth, 
        [
            check('band', 'Band is required')
                .not()
                .isEmpty(),
            check('from', 'Date is required')
                .not()
                .isEmpty(),
            check('description', 'Description is required')
                .not()
                .isEmpty(),
        ] 
    ], 
    async(req, res)=> {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {

        band,
        from,
        to,
        current,
        description

    } = req.body

    const newExp = {

        band,
        from,
        to,
        current,
        description

    }

    try {

        const profile = await Profile.findOne({ user: req.user.id })

        profile.experience.unshift(newExp)

        await profile.save()

        res.json(profile)
        
    } catch (err) {
        console.log(err.message)
        res.status(500).json('Internal Server Error')
    }

        

})

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experiece from profile
// @access  Private

router.delete('/experience/:exp_id', auth, async(req, res)=> {

    try {

        const profile = await Profile.findOne({ user: req.user.id })
        console.log(profile);
        // Get remove index of experience
        const removeIndex = await profile.experience.map(x=>x.id).indexOf(req.params.exp_id)
        profile.experience.splice(removeIndex, 1)
            /* indexOf() ritorna l'indice dell'experience che coincide con x.id, splice 
            rimuove dall'array l'experience a quell'indice, per una posizione
            */

        await profile.save()
        res.json(profile)

    } catch (err) {
        console.log(err.message)
        res.status(500).json('Internal Server Error')
    }
})

// @route   PUT api/profile/education
// @desc    Add Profile Education
// @access  Private

router.put(

    '/education', 
    [ 
        auth, 
        [
            check('course', 'Course is required')
                .not()
                .isEmpty(),
            check('from', 'Date is required')
                .not()
                .isEmpty(),
            check('description', 'Description is required')
                .not()
                .isEmpty(),
        ] 
    ], 
    async(req, res)=> {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {

        course,
        from,
        to,
        current,
        description

    } = req.body

    const newEdu = {

        course,
        from,
        to,
        current,
        description

    }

    try {

        const profile = await Profile.findOne({ user: req.user.id })

        profile.education.unshift(newEdu)

        await profile.save()

        res.json(profile)
        
    } catch (err) {
        console.log(err.message)
        res.status(500).json('Internal Server Error')
    }

        

})

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private

router.delete('/education/:exp_id', auth, async(req, res)=> {

    try {

        const profile = await Profile.findOne({ user: req.user.id })
        
        // Get remove index of education
        const removeIndex = await profile.education.map(x=>x.id).indexOf(req.params.exp_id)
        profile.education.splice(removeIndex, 1)
            /* indexOf() ritorna l'indice dell'education che coincide con x.id, splice 
            rimuove dall'array l'education a quell'indice, per una posizione
            */

        await profile.save()
        res.json(profile)

    } catch (err) {
        console.log(err.message)
        res.status(500).json('Internal Server Error')
    }
})


module.exports = router
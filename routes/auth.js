const router = require('express').Router()
const  auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')

const User = require('../models/User')

// @route   GET api/auth
// @desc    Test route
// @access  Public

router.get('/', auth, async(req, res)=>{

    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Internal server error')

    }
})

// @route   POST api/auth
// @desc    Autheniticate user & get token
// @access  Public

router.post(
    '/',
    [
        check('email', 'Email is invalid').isEmail(),
        check(
            'password',
            'Password is required'
        ).exists()
    ], 
    async (req, res)=> {  

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() })
        }

        const {email, password} = req.body


        try {

            //user exist
            let user = await User.findOne({email})

            if(!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials'}]})
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials'}]})
            }

            // jwt
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload, 
                process.env.JWTSECRET,
                {
                    expiresIn:3600
                },
                (err, token) => {
                    if(err) throw err
                    res.status(200).json({ token })
                }
            )

        }catch(err){
            console.log(err.message);
            res.status(500).send('Internal Server Error')
        }

        
    }
)

module.exports = router
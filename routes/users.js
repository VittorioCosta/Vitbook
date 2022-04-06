const router = require('express').Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator/check')


// To make DB query
const User = require('../models/User')


// @route   GET api/users
// @desc    Register User
// @access  Public

router.post(
    '/',
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('email', 'Email is invalid').isEmail(),
        check(
            'password',
            'Enter a password with more of 6 characters'
        ).isLength({ min:6 })
    ], 
    async (req, res)=> {  

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() })
        }

        const {name, email, password} = req.body


        try {

            //user exist
            let user = await User.findOne({email})

            if(user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'User already exist'}]})
            }

            // avatar
            let avatar = gravatar.url(email, {
                s: '200',    // defaul size
                r: 'pg',     // people
                d: 'mm'      // defaul image... if '404' it return an error
            })

            // intance new User
            user = new User({
                name,
                email,
                avatar,
                password
            })

            // encript password
            const salt = await bcrypt.genSalt(10)

            user.password = await bcrypt.hash(password, salt)
            
            await user.save()

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
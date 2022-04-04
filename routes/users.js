const router = require('express').Router()
const { check, validationResult } = require('express-validator/check')

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
    (req, res)=> {  
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() })
        }

        res.send('users route')
    }
)

module.exports = router
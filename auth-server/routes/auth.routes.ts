import { Router } from 'express';
import { check } from 'express-validator';
import { createUser, login, renewToken } from '../controllers/auth.controller';

import { validateFields } from '../middlewares/fields-validations';
import { validateJWT } from '../middlewares/jwt-validation';

const router = Router();


// Create new user
router.post(
    '/new',
    [
        check('first_name', 'First Name field is mandatory').not().isEmpty(),
        check('last_name', 'Last Name field is mandatory').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('vat', 'Vat is required and must be minimum of 10 characters').isLength({min:10}),
        check('password', 'Password is required and must be minimum of 6 characters').isLength({min: 6}),
        validateFields
    ],
    createUser
);

// Login
router.post(
    '/',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required and must be minimum of six characters').isLength({min: 6}),
        validateFields
    ], 
    login
);

// Validate and revalidate token
router.get(
    '/renew',
    [
        validateJWT
    ],
    renewToken
);


export default router;
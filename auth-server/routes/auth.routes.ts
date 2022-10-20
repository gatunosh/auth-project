import { Router } from 'express';
import { createUser, login, renewToken } from '../controllers/auth.controller';

const router = Router();


// Create new user
router.post('/new', createUser);

// Login
router.post('/', login);

// Validate and revalidate token
router.get('/renew', renewToken);


export default router;
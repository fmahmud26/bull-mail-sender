import express from 'express';

import { getUserInfo, postUserInfo } from '../controllers/userController.js';

const router = express.Router();

router.get('/user', getUserInfo);
router.post('/user', postUserInfo);

export default router;



import express from 'express';
import {Login, Signup,getProfile} from '../controller/userController.js';
import { auth } from '../middleware/auth.js';
const Router = express.Router();


Router.post('/login', Login);
Router.post('/signup', Signup);
Router.get('/getProfile',auth, getProfile);

export default Router;

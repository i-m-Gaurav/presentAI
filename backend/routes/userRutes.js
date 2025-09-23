import express from 'express';
import {Login, Signup} from '../controller/userController.js';
const Router = express.Router();


Router.post('/login', Login);
Router.post('/signup', Signup);

export default Router;

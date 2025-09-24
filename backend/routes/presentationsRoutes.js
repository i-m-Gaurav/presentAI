import express from "express";
import { generatePresentation , uploadPDF,convertToPPT} from "../controller/presentationController.js"
import multer from 'multer';

const Router = express.Router();

// Simple stub endpoint to accept generation requests


const storage = multer.diskStorage({
    destination: (req,file,cb) => cb(null, 'uploads/'),
    filename : (req,file,cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage: storage });



Router.post('/generate', generatePresentation);
Router.post('/uploadpdf',upload.single("pdf"), uploadPDF);
Router.post('/convert', convertToPPT);


export default Router;

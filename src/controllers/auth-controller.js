import { Router } from "express";
import authService from "../services/auth-service";

const authController = Router();

authController.get('/register', (req, res) => 
    {
        res.render('auth/register')
    });

authController.post('/register', async (req, res) => {
        const userData = req.body;
        
       await authService.register(userData)
        
    })
export default authController;
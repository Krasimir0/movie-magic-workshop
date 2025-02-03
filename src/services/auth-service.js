import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = 'da3wd$10$OdNWcPEjkkP4fTjKE0N9DeaMU42WgHQLIQMT9iQrgYqrkawYo62'

export default {
    register(userData) {
        return User.create(userData)
    },
   async login(email, password){
       const user = await User.findOne({ email });
    // Check if user exists
       if (!user) {
        throw new Error('Invalid email or password')
       }

    // Check if password is correct
       const isValid = await bcrypt.compare(password, user.password)
       if (!isValid) {
        throw new Error('Invalid password or password')
       }

       const payload = {
        id: user.id,
        email: user.email,
       }
       const token = jwt.sign(payload, SECRET, {expiresIn: '2h'});

       return token;
    }
}
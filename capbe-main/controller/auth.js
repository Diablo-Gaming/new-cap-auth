import {User} from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export async function signUp(req, res) {
    const {name, email, password} = req.body;
    if(!name || !email || !password) return res.status(400).json({success: false, message: 'All fields are required'});

    const userExist = await User.find({email: {$eq: email}});
    if(userExist.length) return res.status(409).json({success: false, message: 'Email already in use'});
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = new User({name, email, password: hashedPassword});
    try{
        const newUser = await userData.save();
        res.status(201).json({success: true, message: 'User Created Successfully', data: newUser});
    } catch(error){
        console.error('Signup Error:', error);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
}

export async function login(req, res) {
    
    const { email, password } = req.body;
    if (!email || !password) return res.send('No Email or Password provided');
    
    const user = await User.findOne({email: {$eq: email}});
    if (!user) res.send('User with this email does not exist');
    const passwordMatched = await bcrypt.compare(password, user.password);
    
    if(!passwordMatched) res.send('Password does not match');
    const SECRET = process.env.JWT_SECRET_KEY;
    
    const token = jwt.sign({ id: user.id, email: user.email}, SECRET, {expiresIn: "1h"});
    res.cookie('secret', token, {maxAge: 3600000, httpOnly: true});
    delete user.password;
    res.json({success: true, message: "Login Success", data: user});
}

export async function forgotPassword(req, res) {
    const {email} = req.body;
    User.findOne({email: email})
    .then(user => {
        if(!user) {
            return res.send({Status: "User does not exist"})
        } 
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1d"})
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'auditeur.mailer@gmail.com',
              pass: 'bvmk rmwo qote dlfw'
            }
          });
          
          var mailOptions = {
            from: 'auditeur.mailer@gmail.com',
            to: user.email,
            subject: 'Reset Password Link',
            text: `http://localhost:3000/auth/reset_password/${user._id}/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              return res.send({Status: "Success"})
            }
          });
    })
};

export async function resetPassword(req, res) {
    const {id, token} = req.params;
    const {password} = req.body;

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if(err) {
            return res.json({Status: "Error with token"})
        } else {
            bcrypt.hash(password, 10)
            .then(hash => {
                User.findByIdAndUpdate({_id: id}, {password: hash})
                .then(u => res.send({Status: "Success"}))
                .catch(err => res.send({Status: err}))
            })
            .catch(err => res.send({Status: err}))
        }
    })
}
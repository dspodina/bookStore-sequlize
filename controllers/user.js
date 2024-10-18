import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import db from '../models/index.js';
import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';
import matchPasswords from '../utils/matchPasswords.js';
import hashPassword from '../utils/hashPassword.js';

const User = db.users;

const userControllers = {
    getRegisterForm: (req, res) => {
        res.status(200).render('register-form');
    },
    getRegister: async (req, res) => {
        const { email, password, rePassword } = req.body;
        // Check if the user exist
        const userExist = await User.findOne({ where: { email: email } });
        if (userExist) {
            return res.status(400).render('404', {
                title: 'Error',
                message: 'User already exist'
            });
        } else {
            // Validate email, password, rePassword
            const isValidEmail = validateEmail(email);
            const isValidPassword = validatePassword(password);
            const doMathPassword = matchPasswords(password, rePassword);

            if (isValidEmail && isValidPassword && doMathPassword) {
                const hashedPassword = await hashPassword(password);

                const newUser = {
                    email: email,
                    password: hashedPassword
                };

                const user = await User.create(newUser);
                return res.status(302).redirect('/api/login');
            }
        }
    },
    getLoginForm: (req, res) => {
        res.status(200).render('login-form');
    },
    getLogin: async (req, res) => {
        const { email, password } = req.body;
        const userExist = await User.findOne({ where: { email: email } });

        if (!userExist) {
            return res.status(404).render('404', {
                title: 'Error',
                message: 'User not found, please register'
            });
        }
        bcrypt.compare(password, userExist.password, (err, isValid) => {
            if (err) {
                console.error(err);
            }

            if (isValid) {
                const token = jwt.sign(
                    { email: userExist.email },
                    process.env.TOKEN_SECRET
                );
                res.cookie('token', token, { httpOnly: true });
                res.status(302).redirect('/api/books');
            }
        });
    },
    getLogout: (req, res) => {
        res.clearCookie('token');
        res.status(302).redirect('/api/books');
    }
};

export default userControllers;

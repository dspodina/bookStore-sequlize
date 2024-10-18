import db from '../models/index.js';

const User = db.users;

const userControllers = {
    getRegisterForm: (req, res) => {}, 
    getRegister: async (req, res) => {}, 
    getLoginForm: (req, res) => {}, 
    getLogin: (req, res) => {}, 
    getLogout: (req, res) => {}
};

export default userControllers;

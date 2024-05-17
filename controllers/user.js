const User = require('../models/users');
const ChatHistory = require('../models/chat-history')
const Group = require('../models/groups')
const awsService = require('../services/awsservices');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;



exports.userSignup = async (request, response, next) => {
    try {
        const { name, email, phonenumber, imageUrl, password } = request.body;
        let userExist = await User.findOne({
            where: {
                [Op.or]: [{ email }, { phonenumber }]
            }
        });
        if (!userExist) {
            const hash = await bcrypt.hash(password, 10);
            const user = await User.create({ name, email, phonenumber, imageUrl, password: hash });
            const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
            response.cookie('token', token, { maxAge: 3600000 });
            return response.status(201).json({ message: "user Account created successfully" });
        } else {
            return response.status(409).json({ message: 'Email or Phone Number already exist!' })
        }


    } catch (error) {
        console.log(error);
    }
}
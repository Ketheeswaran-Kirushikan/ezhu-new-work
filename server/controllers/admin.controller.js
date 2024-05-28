const express = require("express");
const mongoose = require("mongoose");
const Admin = require('../models/admin.model.js');
const createAdmin = async (req, res) => {
    try {
        const {name,email,password,role} = req.body;
        const newUser = new Admin({
            name,
            email,
            password,
            role
        });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'User failed to create' });
    }
};

const getAdmin = async (req, res) => {
    const { email, password} = req.body;
    try {
        const user = await Admin.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const match = password === user.password;
        if (match) {
            const data = user.role;
            return res.status(200).json(data);
        } else {
            return res.status(401).send('Password incorrect');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
};


module.exports = {getAdmin,createAdmin};


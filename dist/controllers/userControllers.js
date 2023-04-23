"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const users = JSON.parse(fs.readFileSync(`${__dirname}/../../dev-data/data/users.json`));
exports.getAllUsers = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            users,
        },
    });
};
exports.getOneUser = (req, res) => {
    const { id } = req.params;
    const userId = +id;
    const user = users.find((user) => user.id === userId);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestedTime,
        data: {
            user,
        },
    });
};
exports.createNewUser = (req, res) => {
    const { name, email } = req.body;
    console.log('loggerrr');
    const newUserId = users[users.length - 1].id + 1;
    const newUser = {
        id: newUserId,
        name: name,
        email: email,
    };
    users.push(newUser);
    fs.writeFile(`${__dirname}/../../dev-data/data/users.json`, JSON.stringify(users), (err) => {
        if (err) {
            res.status(500).send('Can not create a new user at this moment.');
            return;
        }
        res.status(201).send({
            status: 'success',
            requestedAt: req.requestedTime,
            data: {
                newUser,
            },
        });
    });
};
exports.updateUser = (req, res) => { };
exports.deleteUser = (req, res) => { };

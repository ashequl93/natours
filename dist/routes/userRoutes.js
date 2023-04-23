"use strict";
const express = require('express');
const router = express.Router();
const { getAllUsers, getOneUser, createNewUser, updateUser, deleteUser, } = require('./../controllers/userControllers');
router.route('/').get(getAllUsers).post(createNewUser);
router.route('/:id').get(getOneUser).patch(updateUser).delete(deleteUser);
module.exports = router;

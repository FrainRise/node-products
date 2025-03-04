const express = require('express');
const {getAllUsers, createUser, getUser, updateUser, deleteUser} = require('../controllers/users')
const {verifyBodyReq} = require('../utils/verifyUsersRoute')

const router = express.Router();

router.route('/')
    .get(getAllUsers)
    .post(verifyBodyReq, createUser);
router.route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = router;

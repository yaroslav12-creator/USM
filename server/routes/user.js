const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// home
router.get('/', UserController.view);
router.post('/', UserController.findUsers);
//add user routes
router.get('/adduser', UserController.showForm);
router.post('/adduser', UserController.createUser);
//edit user routes
router.get('/edituser/:id', UserController.showEditUser)
router.post('/edituser/:id', UserController.updateUser);
//delete user routes 
router.get('/:id', UserController.deteleUser);
//view user routes
router.get('/viewuser/:id', UserController.getUserDetails);


module.exports = router;

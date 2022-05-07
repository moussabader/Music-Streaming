const express = require('express')
const User = require('../../../models/User')
const router = express.Router()
const createError = require('http-errors')
const { authSchema } = require('../helpers/validationSchema')
const mongoose = require('mongoose')

const ProfileController = require('../Controllers/profile.Controller')

router.get('/getAll',ProfileController.getAll )
router.get('/getOne/:id',ProfileController.getOne )

router.delete("/deleteUser/:id",ProfileController.delete);
router.patch('/update/:id', ProfileController.update )

router.put('/follow/:idUser/:idUserToFollow',ProfileController.follow )
router.put('/unfollow/:idUser/:idUserToFollow',ProfileController.unfollow )

router.get("/followers/:userId",ProfileController.getFollowers );
router.get("/following/:userId", ProfileController.getFollowing );

router.post("/confirmPasswordUpdate/:id",ProfileController.confirmPasswordUpdate );
router.post("/resetPassword/:id",ProfileController.resetPassword );



module.exports = router
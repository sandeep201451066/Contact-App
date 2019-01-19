const express = require("express");
const router = express.Router();

const UserController = require('../controllers/contact');

router.post("/add-new-contact", UserController.AddNewContact);

router.get("/contact-list", UserController.ContactList);

router.post("/send-sms", UserController.SendSMSToContact);

router.get("/sms-contact-list", UserController.SMSContactList);

module.exports = router;
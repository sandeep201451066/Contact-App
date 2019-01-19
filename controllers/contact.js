const mongoose = require("mongoose");
const Contact = require("../models/contact");
const SmsContact = require("../models/sms_contacts");
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
    apiKey: '0f6ee00e',
    apiSecret: '0thAXmQc7uZagpKL'
})




exports.AddNewContact = (req, res, next) => {
    console.log('hiiiii', req.body)
    Contact.find({ mobile: req.body.mobile })
        .exec()
        .then(contact => {
            console.log('contact', contact)
            if (contact.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                });
            } else {
                const contact = new Contact({
                    _id: new mongoose.Types.ObjectId(),
                    f_name: req.body.f_name,
                    l_name: req.body.l_name,
                    mobile: req.body.mobile,
                    date: new Date(),
                    sms: []

                });
                contact
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: "contact created"
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
            }
        });
};
exports.ContactList = (req, res, next) => {
    Contact.find({})
        .exec()
        .then(contact => {
            res.status(201).json({
                message: contact
            });
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({
                error: err
            });
        });
}
exports.SendSMSToContact = (req, res, next) => {
    const from = '919574764019'
    const to = '919664907533'
    const text = 'Hello from Nexmo'
    Contact.findOne({ mobile: req.body.mobile })
        .exec()
        .then(contact => {
            if(!contact){
                res.status(200).json({
                    error: 'Not found'
                });
            } else{
            console.log('_iiiiii',contact)
            nexmo.message.sendSms(from, '91'+req.body.mobile, req.body.text,
                (err, responseData) => {
                    if (err) {
                        console.log(err);
                    } else {
                        // const Smscontact = new Contact({
                        //     _id: contact._id,
                        //     sms: req.body.text,
                        //     date: new Date(),
                        //     mobile:req.body.mobile

                        // });
                        contact.sms.push(req.body.text)
                        contact
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: result
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(200).json({
                                    error: err
                                });
                            });
                    }
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({
                error: err
            });
        });

};
exports.SMSContactList = (req, res, next) => {
   
    SmsContact.aggregate([{
            $lookup: {
                from: "Contacts", // collection name in db
                localField: "mobile",
                foreignField: "mobile",
                as: "sms"
            }
        }]).exec(function(err, students) {
            // students contain WorksnapsTimeEntries
            res.status(201).json({
                message: students
            });
        });
};
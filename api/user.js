const alert = require('alert');
const express = require('express');
const router = express.Router();

const user = require('./../models/user');
const userVerification = require('./../models/userVerification');

const bcrypt = require('bcrypt');
const path = require("path");

const cors = require('cors');
const corsOptions = {
  credentials: true,
  origin: ['https://mpsplayerportal-client.vercel.app', 'https://mpsplayerportal-server.vercel.app'],
  methods: 'GET, PUT, OPTIONS, POST, DELETE, PATCH',
  optionsSuccessStatus: 204
}


//nodemailer

const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require("uuid");
const Session = require('../models/session');

require("dotenv").config();

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
    }

});

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Email Verification Ready");
        console.log(success);
    }
});

//signup
router.post('/signup', cors(corsOptions),  (req, res) => {
    let { username, email, password } = req.body;

    if (username == "" || email == "" || password == "" || username == undefined || password == undefined || email == undefined) {
        res.json({
            status: "FAILED",
            message: "Empty input fields."
        });
    } else
        username = username.trim();
    email = email.trim();
    password = password.trim();

    if (!/^[a-zA-Z ]*$/.test(username)) {
        res.json({
            status: "FAILED",
            message: "Invalid User."
        })
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        res.json({
            status: "FAILED",
            message: "Invalid Email."
        })
    } else if (password.length < 5) {
        res.json({
            status: "FAILED",
            message: "Please insert a password longer than 4 characters."
        })
    } else {
        user.find({ email }).then(result => {
            if (result.length) {
                res.json({
                    status: "FAILED",
                    message: "User already exists."
                })
            } else {
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    const newUser = new user({
                        username,
                        email,
                        password: hashedPassword,
                        verified: false,
                    });

                    newUser
                        .save()
                        .then(result => {
                            /* res.json({
                                status: "SUCCESS",
                                message: "Signed Up.",
                                data: result,
                            }); */
                            sendVerificationEmail(result, res);
                        })
                        .catch(err => {
                            res.json({
                                status: "FAILED",
                                message: "An error occurred while creating user."
                            })
                        })
                        .catch(err => {
                            res.json({
                                status: "FAILED",
                                message: "An error occurred while hashing password."
                            })
                        })
                })
            }
        }).catch(err => {
            console.log(err);
            res.json({
                status: "FAILED",
                message: "An error occurred while checking for existing user."
            })
        })
    }
});

//send ver email
const sendVerificationEmail = ({ _id, email }, res) => {
    const currentUrl = "https://mpsplayerportal-server.vercel.app/";
    const uniqueString = uuidv4() + _id;
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Verify your MPS Character Portal account",
        html: `<p>Verify your account to sign up in the App.</p><p>The link will <b>expire</b> in 1 hour.</p><p><a href = ${currentUrl + "user/verify/" + _id + "/" + uniqueString}>Press this link</a> to verify your account.</p>`,
    };

    const saltRounds = 10;
    bcrypt.hash(uniqueString, saltRounds)
        .then((hashedUniqueString) => {
            const newVerification = new userVerification({
                userID: _id,
                uniqueString: hashedUniqueString,
                createdAt: Date.now(),
                expiresAt: Date.now() + 3600000
            });
            newVerification.save()
                .then(() => {
                    transporter
                        .sendMail(mailOptions)
                        .then(() => {
                            res.json({
                                status: "PENDING",
                                message: "Waiting for Verification."
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                            res.json({
                                status: "FAILED",
                                message: "An error occurred."
                            });
                        })
                })
                .catch((error) => {
                    console.log(error);
                    res.json({
                        status: "FAILED",
                        message: "An error occurred."
                    });
                })
        })
        .catch(() => {
            res.json({
                status: "FAILED",
                message: "An error occurred."
            });
        })

};

//verify email
router.get('/verify/:userID/:uniqueString', cors(corsOptions),  (req, res) => {
    let { userID, uniqueString } = req.params;
    userVerification.find({ userID })
        .then((result) => {
            if (result.length > 0) {

                const { expiresAt } = result[0];
                const hashedUniqueString = result[0].uniqueString;

                if (expiresAt < Date.now()) {
                    userVerification.deleteOne({ userID })
                        .then(result => {
                            user.deleteOne({ _id: userID })
                                .then(() => {
                                    console.log(error);
                                    let message = "Link has Expired";
                                    res.redirect(`/user/verified?error=true&message=${message}`);
                                })
                                .catch((error) => {
                                    console.log(error);
                                    let message = "An error occurred while clearing expired link";
                                    res.redirect(`/user/verified?error=true&message=${message}`);
                                })
                        })
                        .catch((error) => {
                            console.log(error);
                            let message = "An error occurred while checking for user verification";
                            res.redirect(`/user/verified?error=true&message=${message}`);
                        })
                } else {
                    bcrypt.compare(uniqueString, hashedUniqueString)
                        .then(result => {
                            if (result) {
                                user.updateOne({ _id: userID }, { verified: true })
                                    .then(() => {
                                        userVerification
                                            .deleteOne({ userID })
                                            .then(() => {
                                                res.sendFile(path.join(__dirname, "./../models/verified.html"));
                                            })
                                            .catch((error) => {
                                                console.log(error);
                                                let message = "An error occurred while verifying";
                                                res.redirect(`/user/verified?error=true&message=${message}`);
                                            })
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                        let message = "An error occurred while updating verification token";
                                        res.redirect(`/user/verified?error=true&message=${message}`);
                                    })
                            } else {
                                console.log(error);
                                let message = "An error occurred before verifying";
                                res.redirect(`/user/verified?error=true&message=${message}`);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            let message = "Link Expired";
                            res.redirect(`/user/verified?error=true&message=${message}`);
                        })
                }

            } else {
                let message = "Account doesn't exist or already verified";
                res.redirect(`/user/verified?error=true&message=${message}`);
            }
        })
        .catch((error) => {
            console.log(error);
            let message = "An error occurred while checking for user verification";
            res.redirect(`/user/verified?error=true&message=${message}`);
        })
});

//route for custom html
router.get("/verified", cors(corsOptions),  (req, res) => {
    res.sendFile(path.join(__dirname, "./../models/verified.html"));
});

//signin
router.get('/signin', cors(corsOptions),  (req, res) => {
    let { username, password } = req.query;
    if (username == "" || password == "" || username == undefined || password == undefined) {
        res.json({
            status: "FAILED",
            message: "Empty Credentials."
        })
    } else {
        username = username.trim();
        password = password.trim();

        user.find({ username })
            .then(data => {
                if (data.length) {

                    //verify?
                    if (!data[0].verified) {
                        res.json({
                            status: "FAILED",
                            message: "User hasn't been verified."
                        });
                    } else {
                        const hashedPassword = data[0].password;
                        bcrypt.compare(password, hashedPassword).then(result => {
                            if (result) {
                                res.json({
                                    status: "SUCCESS",
                                    message: "Signed In",
                                    data: data
                                })
                            } else {
                                res.json({
                                    status: "FAILED",
                                    message: "Invalid Password."
                                });
                            }
                        })
                            .catch(err => {
                                res.json({
                                    status: "FAILED",
                                    message: "Error occurred while comparing passwords."
                                })
                            })
                    }

                } else {
                    res.json({
                        status: "FAILED",
                        message: "Invalid Credentials."
                    })
                }
            })
            .catch(err => {
                res.json({
                    status: "FAILED",
                    message: "Error occurred while checking for user."
                })
            })
    }

});

//auth login
router.post('/logsession', cors(corsOptions),  (req, res) => {
    let { user, userID } = req.body;

    const newSession = new Session({
        user,
        userID,
    });

    newSession
        .save()
        .then(result => {
            res.json({
                status: "SUCCESS",
                message: "Session Created.",
                data: result
            });
        })
        .catch(err => {
            res.json({
                status: "FAILED",
                message: "An error occurred while creating session."
            })
        })
});


//logout
router.delete('/logout', cors(corsOptions),  (req, res) => {
    Session.findByIdAndDelete(req.query.tokenID)
        .then(result => {
            res.json({
                status: "SUCCESS",
                message: "Session Created.",
                data: result
            });
        })
        .catch(err => {
            res.json({
                status: "FAILED",
                message: "An error occurred while deleting session.",
                data: err
            })
        })


});


//rememberuser
router.get('/remember', cors(corsOptions),  (req, res) => {
    Session.findById(req.query.remembertoken)
        .then(result => {
            res.json({
                status: "SUCCESS",
                message: "Session Found.",
                data: result
            });
        })
        .catch(err => {
            res.json({
                status: "FAILED",
                message: "An error occurred while looking for session.",
                data: err
            })
        })


});


//forgotpassword
router.get('/forgotpassword', cors(corsOptions),  (req, res) => {
    user.find({ email: req.query.email })

        .then
        (result => {

            //console.log(result[0]._doc.email);
            const uniqueString = uuidv4() + result[0]._doc._id;

            //Send Email with de-hashed password
            const mailOptions = {
                from: process.env.AUTH_EMAIL,
                to: result[0]._doc.email,
                subject: "MPS Forgot Password",
                html: `<p>The link to change the password for the account ${result[0]._doc.username}, linked to this email, is: <a href = ${"https://mpsplayerportal-client.vercel.app/resetpassword/:" + result[0]._doc._id + "/:" + uniqueString}>THIS</a> </p> <p>If you weren't the one requesting your credentials, please check your mail account for any sign of hacking or send us a mail at mechaphoenixstudio@gmail.com</p>`,
            };

            transporter.sendMail(mailOptions)

            result[0]._doc.resettoken = uniqueString;

            res.json({
                status: "SUCCESS",
                message: "User Found. Mail Sent.",
                data: result
            });
        })
        .catch(err => {
            res.json({
                status: "FAILED",
                message: "An error occurred while looking for user.",
                data: err
            })
        })

});

//updatepassword
router.patch('/passwordupdate', cors(corsOptions),  (req, res) => {
    id = req.body.params.userID;
    newpassword = req.body.params.newpassword;

    const saltRounds = 10;
    bcrypt.hash(newpassword, saltRounds).then(hashedPassword => {
        user.findByIdAndUpdate(id, { password: hashedPassword })
            .then(result => {
                res.json({
                    status: "SUCCESS",
                    message: "Password Changed.",
                    data: result
                });
            })
            .catch(err => {
                res.json({
                    status: "FAILED",
                    message: "An error occurred while changing password.",
                    data: err
                })
            })
    })
        .catch(err => {
            res.json({
                status: "FAILED",
                message: "An error occurred while hashing password.",
                data: err
            })
        })

})

module.exports = router;

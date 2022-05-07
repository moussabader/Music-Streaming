const nodemailer = require('nodemailer');
const User = require('../../../models/User')
const { verifyRefreshToken } = require('../helpers/jwt_helper')

let sender = async (userMail, token, host, username) => {

    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'yassine5255@gmail.com',
                pass: 'uxlvsblrvqidodsv'
            },
        });
        let link = '\nhttp:\/\/' + host + '\/mailing\/confirmation\/' + token 
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"BeatzZ 👻" <yassine5255@gmail.com>', // sender address
            to: userMail, // sender addresslist of receivers
            subject: "'Account Verification Link'", // Subject line
           // text: 'Hello ' + username + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + host + '\/mailing\/confirmation\/' + token + '\n\nThank You!\n',
            html: '<h1 style="color: #5e9ca0;">Welcome to BeatzZ</h1> <h2 style="color: #2e6c80;">Please click <a href='+link+'>here</a> to confirm changing password</h2>'

        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log("Error: %s", error.message);
    }

}

let confirmEmail = async (req, res, next) => {
    const token = (req.params.token)

    try {
        
        if (!token) {
            return res.status(401).send({ msg: 'Your verification link may have expired. Please click on resend for verify your Email.' });
        } else {
            const userId = await verifyRefreshToken(token)
            console.log(userId)
            let user = await User.findById(userId)
    
            if (!user) {
                return res.status(401).send({ msg: 'We were unable to find a user for this verification. Please SignUp!' });
            } else if (user.isVerified) {
                return res.status(200).send('Link already used');
            } else {
                user.isVerified = true;
                await user.save(function (err) {
                    if (err) {
                        return res.status(500).send({ msg: err.message });
                    }else {
                        return res.status(200).send('Your password has been updated successfully');
                    }
                });
            }
    
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }


}

let resendLink = function (req, res, next) {

    User.findOne({ email: req.body.email }, function (err, user) {
        // user is not found into database
        if (!user) {
            return res.status(400).send({ msg: 'We were unable to find a user with that email. Make sure your Email is correct!' });
        }
        // user has been already verified
        else if (user.isVerified) {
            return res.status(200).send('This account has been already verified. Please log in.');

        }
        // send verification link
        else {
            // generate token and save
            var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
            token.save(function (err) {
                if (err) {
                    return res.status(500).send({ msg: err.message });
                }

                // Send email (use credintials of SendGrid)
                var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
                var mailOptions = { from: 'no-reply@example.com', to: user.email, subject: 'Account Verification Link', text: 'Hello ' + user.name + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + user.email + '\/' + token.token + '\n\nThank You!\n' };
                transporter.sendMail(mailOptions, function (err) {
                    if (err) {
                        return res.status(500).send({ msg: 'Technical Issue!, Please click on resend for verify your Email.' });
                    }
                    return res.status(200).send('A verification email has been sent to ' + user.email + '. It will be expire after one day. If you not get verification Email click on resend token.');
                });
            });
        }
    });
}

module.exports = {
    sender,
    confirmEmail,
    resendLink
}
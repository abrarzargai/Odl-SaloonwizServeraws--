const userModel = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const argon2 = require('argon2');
const nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const ImgBase = 'https://api.salonwizz.co.uk/images/'
const EmailHandler = require('../utils/EmailHandler');
//******Generatingg token****/

const signToken = (user) => {
    const payload = {
        userdata: {
            id: user._id,
        },
    };
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
    });
};
/***************Services************/

//SignUp
exports.SignUp = catchAsync(async (req, res, next) => {

    const User = await userModel.find({ Email: req.body.Email })
    console.log("User===>",User);
    if (!User[0]) {
        console.log({...req.body})
        const Record = await userModel.create(req.body)
        console.log(Record)
        if (!Record) {
            throw new Error('Error! User cannot be created');
        }
        else {
            const Email =  EmailHandler.EmailHandler('SalonWizz New User',`${req.body.Email} New User has created Account`);
           console.log('Email',Email)
            return res.status(201).json({
                success: true, message: "New User Account Created Successfully", Record
            })
        }
    }
    else {
        return next(new Error('Error! User with this Email already exist'))

    }

})

//Login
exports.Login = catchAsync(async (req, res, next) => {
    const User = await userModel.find({ Email: req.body.Email })
    if (User[0]) {
        if (await argon2.verify(User[0].Password, req.body.Password)) {
            console.log('hit')
           
            return res.status(200).json({
                success: true, message: "Login Successfully", User
            })
        }
        else {
            throw new Error('Error! Invalid Password');
        }
    }
    else {
        return next(new Error('User Not Found'))

    }
})


exports.Update = catchAsync(async (req, res, next) => {
    delete req.body['Password']

    const User = await userModel.find({ Email: req.body.Email })
    if (User[0]) {
        const Record = await userModel.update({ Email: req.body.Email }, { ...req.body,
                                                                     
                                                                         });

        if (Record.nModified > 0) {
            return res.status(200).json({
                success: true, message: "User Updated Successfully"
            })
        }
        return res.status(500).json({
            success: false, message: "Error!  User Not-Updated Successfully"
        })
    }
    else {
        return next(new Error('User with this Email Not Found'))

    }

})

//Password Update
exports.Updatepassword = catchAsync(async (req, res, next) => {

    const User = await userModel.find({ Email: req.body.Email })
    console.log("user===>", User[0])
    if (User[0]) {
        if (await argon2.verify(User[0].Password, req.body.OldPassword)) {

            const Record = await userModel.updateOne({ Email: req.body.Email }, { Password: req.body.NewPassword });

            if (Record.nModified > 0) {
                return res.status(200).json({
                    success: true, message: "Password Updated Successfully"
                })
            }
            return res.status(500).json({
                success: false, message: "Error!  User Not-Updated Successfully"
            })
        }
        else {
            throw new Error('Error!  Old Password is not Valid');
        }
    }
    else {
        return next(new Error('User with this Email Not Found'))

    }
})


exports.RestPassword = catchAsync(async (req, res, next) => {
    console.log('Email hit',req.body);
    if(req.body.Email === 'admin@salonwizz.com'){
        console.log('admin Email hit');
        return next(new Error('Admin account password cannot be reset'))
    }
    const User = await userModel.find({ Email: req.body.Email })

    if (User[0]) {
        const RandomPassword = Math.floor(Math.random() * 987654321);
        console.log("RandomPassword", RandomPassword)
        console.log("RandomPassword", RandomPassword.toString())
        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
                user: 'odl.saloonwizz@gmail.com',
                pass: 'odl.saloonwizz@123'
            },
        });

        var mailOptions = {
            from: process.env.Gmail,
            to: req.body.Email,
            subject: 'SaloonWizz App ',
            html: `<html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <meta http-equiv="content-type" content="text/html; charset=utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0;">
                 <meta name="format-detection" content="telephone=no"/>
            
                <!-- Responsive Mobile-First Email Template by Konstantin Savchenko, 2015.
                https://github.com/konsav/email-templates/  -->
            
                <style>
            /* Reset styles */ 
            body { margin: 0; padding: 0; min-width: 100%; width: 100% !important; height: 100% !important;}
            body, table, td, div, p, a { -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse !important; border-spacing: 0; }
            img { border: 0; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
            #outlook a { padding: 0; }
            .ReadMsgBody { width: 100%; } .ExternalClass { width: 100%; }
            .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }
            
            /* Rounded corners for advanced mail clients only */ 
            @media all and (min-width: 560px) {
                .container { border-radius: 8px; -webkit-border-radius: 8px; -moz-border-radius: 8px; -khtml-border-radius: 8px;}
            }
            
            /* Set color for auto links (addresses, dates, etc.) */ 
            a, a:hover {
                color: #127DB3;
            }
            .footer a, .footer a:hover {
                color: #999999;
            }
            
                 </style>
            
                <!-- MESSAGE SUBJECT -->
                <title>Saloon Wizz</title>
            
            </head>
            
            <!-- BODY -->
            <!-- Set message background color (twice) and text color (twice) -->
            <body topmargin="0" rightmargin="0" bottommargin="0" leftmargin="0" marginwidth="0" marginheight="0" width="100%" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%;
                background-color: #F0F0F0;
                color: #000000;"
                bgcolor="#F0F0F0"
                text="#000000">
            
            <!-- SECTION / BACKGROUND -->
            <!-- Set message background color one again -->
            <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%;" class="background"><tr><td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;"
                bgcolor="#F0F0F0">
            
            <!-- WRAPPER -->
            <!-- Set wrapper width (twice) -->
            <table border="0" cellpadding="0" cellspacing="0" align="center"
                width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
                max-width: 560px;" class="wrapper">
            
               
            
            <!-- End of WRAPPER -->
            </table>
            
            <!-- WRAPPER / CONTEINER -->
            <!-- Set conteiner background color -->
            <table border="0" cellpadding="0" cellspacing="0" align="center"
                bgcolor="#FFFFFF"
                width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
                max-width: 560px;" class="container">
            
                <!-- HEADER -->
                <!-- Set text color and font family ("sans-serif" or "Georgia, serif") -->
                <br/><br/><br/><br/><br/>
                <tr>
                    <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 24px; font-weight: bold; line-height: 130%;
                        padding-top: 25px;
                        color: #000000;
                        font-family: sans-serif;" class="header">
                            SalonWizz
                    </td>
                </tr>
                
                <!-- SUBHEADER -->
                <!-- Set text color and font family ("sans-serif" or "Georgia, serif") -->
                <tr>
                    <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-bottom: 3px; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 18px; font-weight: 300; line-height: 150%;
                        padding-top: 5px;
                        color: #000000;
                        font-family: sans-serif;" class="subheader">
                            Thank you for using SalonWizz App
                    </td>
                </tr>
            
                <!-- HERO IMAGE -->
                <!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2 (wrapper x2). Do not set height for flexible images (including "auto"). URL format: http://domain.com/?utm_source={{Campaign-Source}}&utm_medium=email&utm_content={{Ìmage-Name}}&utm_campaign={{Campaign-Name}} -->
                <tr>
                    <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
                        padding-top: 20px;" class="hero"><a target="_blank" style="text-decoration: none;"
                        href="https://github.com/konsav/email-templates/"><img border="0" vspace="0" hspace="0"
                        src="https://react-saloonwiz.s3.amazonaws.com/saloonwizlogo.png"
                        alt="Please enable images to view this content" title="Hero Image"
                        width="560" style="
                        width: 100%;
                        max-width: 400px;
                        color: #000000; font-size: 13px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;"/></a></td>
                </tr>
            
                <!-- PARAGRAPH -->
                <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
                <tr>
                    <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
                        padding-top: 25px; 
                        color: #000000;
                        font-family: sans-serif;" class="paragraph">
                        Your Verification code is : ${RandomPassword}
                              </td>
                </tr>
            
                <!-- BUTTON -->
                <!-- Set button background color at TD, link/text color at A and TD, font family ("sans-serif" or "Georgia, serif") at TD. For verification codes add "letter-spacing: 5px;". Link format: http://domain.com/?utm_source={{Campaign-Source}}&utm_medium=email&utm_content={{Button-Name}}&utm_campaign={{Campaign-Name}} -->
                <!-- <tr>
                    <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
                        padding-top: 25px;
                        padding-bottom: 5px;" class="button"><a
                        href="https://github.com/konsav/email-templates/" target="_blank" style="text-decoration: underline;">
                            <table border="0" cellpadding="0" cellspacing="0" align="center" style="max-width: 240px; min-width: 120px; border-collapse: collapse; border-spacing: 0; padding: 0;"><tr><td align="center" valign="middle" style="padding: 12px 24px; margin: 0; text-decoration: underline; border-collapse: collapse; border-spacing: 0; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; -khtml-border-radius: 4px;"
                                bgcolor="#E9703E"><a target="_blank" style="text-decoration: underline;
                                color: #FFFFFF; font-family: sans-serif; font-size: 17px; font-weight: 400; line-height: 120%;"
                                href="https:/">
                                    Get the template
                                </a>
                        </td></tr></table></a>
                    </td>
                </tr> -->
            
                <!-- LINE -->
                <!-- Set line color -->
                <tr>	
                    <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
                        padding-top: 25px;" class="line"><hr
                        color="#E0E0E0" align="center" width="100%" size="1" noshade style="margin: 0; padding: 0;" />
                    </td>
                </tr>
            
              
            
            
                <!-- PARAGRAPH -->
                <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
                <tr>
                    <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
                        padding-top: 20px;
                        padding-bottom: 25px;
                        color: #000000;
                        font-family: sans-serif;" class="paragraph">
                            Have a&nbsp;question? <a href="mailto:salonwizz@gmail.com" target="_blank" style="color: #127DB3; font-family: sans-serif; font-size: 17px; font-weight: 400; line-height: 160%;">salonwizz@gmail.com</a>
                    </td>
                </tr>
            <br/><br/>
            <!-- End of WRAPPER -->
            </table>
            
       
            
            <!-- End of SECTION / BACKGROUND -->
            </td></tr></table>
            
            </body>
            </html> 
            `
        };

        transporter.sendMail(mailOptions, async function (error, info, cb) {
            if (error) {
                console.log("error==>", error);
                return next(new Error('Email Not Valid Please enter valid Email'))
            } else {
                console.log('Email sent: ' + info.response);
                const Record = await userModel.updateOne({ Email: req.body.Email }, { Password: RandomPassword.toString() });
                console.log("modified", Record.nModified)
                if (Record.nModified > 0) {
                    return res.status(200).json({
                        success: true, message: "Your Password has been reset Successfully.Please check your Email for new password"
                    })
                }
                return res.status(500).json({
                    success: false, message: "Error!  User Not-Updated Successfully"
                })
            }
        });             
    }
        else {
            return next(new Error('User with this Email Not Register yet with Saloonwizz App'))

        }
    })


//GetAll
exports.GetAllUsers = catchAsync(async (req, res, next) => {

    const Data = await userModel.aggregate([
        {
            $match: {
                Role: "user"
            }
        }
    ])

    if (Data[0]) {

        return res.status(200).json({
            success: true, message: "Users Found", Data
        })

    }
    else {
        return next(new Error('No User Found'))

    }
})

//Getoneuser

exports.Getoneuser = catchAsync(async (req, res, next) => {

    const Data = await userModel.aggregate([
        {
            $match: {
                Email: req.body.Email
            }
        }
    ])

    if (Data[0]) {

        return res.status(200).json({
            success: true, message: "Users Found", Data
        })

    }
    else {
        return next(new Error('No User Found'))

    }
})


exports.AddSocialMediaAccount = catchAsync(async (req, res, next) => {
  const User = await userModel.find({ Email: req.body.Email });
  if (User[0]) {
    console.log('req.body', req.body);
    const index = User[0].SocialMedia.find((x) => x.Title == req.body.Title);
    console.log('index', index);
    if (!index) {
      //   User[0].SocialMedia.push({
      //     Title: req.body.Title,
      //     URL: req.body.URL,
      //   });
      //   await User[0].save();
      //   let Data = User[0];
      let Id = uuidv4();
      const newObject = {
        Id: Id,
        Title: req.body.Title,
        URL: req.body.URL,
      };
      const Data = await userModel.findOneAndUpdate(
        { Email: req.body.Email },
        { $push: { SocialMedia: newObject } },
        {
          new: true,
          useFindAndModify: false,
        },
      );
     
      return res.status(200).json({
        success: true,
        message: 'Social Media Account Added Successfully',
        Data,
      });
    }
    throw new Error(`Error!  You Have Already added ${req.body.Title} Link  `);
  } else {
    return next(new Error('User with this Email Not Found'));
  }
});



exports.UpdateSocialMediaAccount = catchAsync(async (req, res, next) => {

    const User = await userModel.find({ Email: req.body.Email })
    if (User[0]) {
        console.log("req.body", req.body)
        const index = User[0].SocialMedia.findIndex((x) => x.Title == req.body.Title)
        console.log("index", index)
        if (index>-1) {
            User[0].SocialMedia[index].URL = req.body.URL
            await User[0].save()
            let Data = User[0]
            return res.status(200).json({
                success: true, message: "Social Media Account Added Successfully", Data
            })
        }
        throw new Error(`Error!  No ${req.body.Title} Link added yet `);


    }
    else {
        return next(new Error('User with this Email Not Found'))

    }

})

exports.DeleteSocialMediaAccount = catchAsync(async (req, res, next) => {
  const User = await userModel.find({ Email: req.body.Email });
  if (User[0]) {
    console.log('req.body', req.body);
    const index = User[0].SocialMedia.findIndex((x) => x.Title == req.body.Title);
    console.log('index', index);
    if (index > -1) {
         User[0].SocialMedia.splice(index, 1);
         console.log(User[0])
        // await User[0].save();
        // let Data = User[0];
      await userModel.findOneAndUpdate(
        { Email: req.body.Email },
        { SocialMedia: User[0].SocialMedia  },
       
      );
      const Data = await userModel.findOne({ Email: req.body.Email });
      return res.status(200).json({
        success: true,
        message: 'Social Media Account Deleted Successfully',
        Data,
      });
    }
    throw new Error(`Error!  No ${req.body.Title} Link added yet `);
  } else {
    return next(new Error('User with this Email Not Found'));
  }
});

exports.AddFile = catchAsync(async (req, res, next) => {
 
    if(!req.files[0]){
        throw new Error(`Error!  No file uploaded yet  `);
    }

    const User = await userModel.find({ Email: req.body.Email })
    let Id = uuidv4();
    if (User[0]) {     
        const newObject = {
            Id: Id,
            Title: req.body.Title,
            Type: req.body.Type,
            URL: ImgBase+req.files[0].filename,
        Date: new Date(req.body.Date)
        }
        console.log('hit saving',newObject)
      const filingsave =   await userModel.findOneAndUpdate(
            { Email: req.body.Email },
            { $push: { Filling: newObject }},
            { 
                new: true, 
                useFindAndModify: false 
            }
          );
          console.log(filingsave)
            return res.status(200).json({
                success: true, message: "File Added Successfully", filingsave 
            })
       

    }
    else {
        return next(new Error('User with this Email Not Found'))

    }

})

exports.DeleteFile = catchAsync(async (req, res, next) => {

    const User = await userModel.find({ Email: req.body.Email })
    if (User[0]) {
        console.log("req.body", req.body)
        const index = User[0].Filling.findIndex((x) => x._id == req.body.Id)
        console.log("index", index)
        if (index > -1) {
            User[0].Filling.splice(index, 1)
            await userModel.findOneAndUpdate(
                    { Email: req.body.Email },
                    { Filling: User[0].Filling  },
                   );
      const Data = await userModel.findOne({ Email: req.body.Email });
            return res.status(200).json({
                success: true, message: "File Deleted Successfully", Data
            })
        }
        throw new Error(`Error!  No file Found `);


    }
    else {
        return next(new Error('User with this Email Not Found'))

    }

})

//pagination query 
exports.Get = catchAsync(async (req, res, next) => {
    console.log(req.query.page)
    const start = (req.query.page * 10) - 9;
    const end = req.query.page * 10
    console.log(start, end)
    const Data = await userModel.find().limit(end).skip(start - 1)
    if (Data[0]) {

        return res.status(200).json({
            success: true, message: "Files Found", Data
        })

    }
    else {
        return next(new Error('No File Found'))

    }

})

//pagination UserFilling 
exports.getFilling = catchAsync(async (req, res, next) => {
    console.log(req.query)

    const Data = await userModel.find({Email:req.query.email})
    console.log("dTA", Data[0].Filling)
    if (Data[0].Filling[0]) {

        return res.status(200).json({
            success: true, message: "Files Found", Data: Data[0].Filling
        })

    }
    else {
        return next(new Error('No File Found'))

    }

})

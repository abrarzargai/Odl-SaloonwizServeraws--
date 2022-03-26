const userModel = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const argon2 = require('argon2');
const nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const ImgBase = 'https://odl-saloonwizz-app.herokuapp.com/images/'
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
    console.log(req.body)
    const User = await userModel.find({ Email: req.body.Email })
    console.log(User);
    if (!User[0]) {
        console.log({...req.body})
        const Record = await userModel.create(req.body)
        console.log(Record)
        if (!Record) {
            throw new Error('Error! User cannot be created');
        }
        else {
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
                                                                     ...(req.files[0] && { Image: ImgBase + req.files[0].filename }),
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
    console.log('Email hit');
    const User = await userModel.find({ Email: req.body.Email })

    if (User[0]) {
        const RandomPassword = Math.floor(Math.random() * 987654321);
        console.log("RandomPassword", RandomPassword)
        console.log("RandomPassword", RandomPassword.toString())
        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
                user: process.env.Gmail,
                pass: process.env.Password
            },
        });

        var mailOptions = {
            from: process.env.Gmail,
            to: req.body.Email,
            subject: 'SaloonWizz App ',
            text: `
            
             Thank you for Using SaloonWizz App!
             Your Password has been reset Successfully.
             Your new password is : ${RandomPassword}
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

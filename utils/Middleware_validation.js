const { check, validationResult } = require('express-validator');

exports.validationFunction = async (req, res, next) => {
	const errors = validationResult(req);
	errors.type = 'expressValidationError';
	if (!errors.isEmpty()) {
		return res.status(500).json(errors.array());
	}
	next();
};
/******User ******/

exports.UserSignupValidation = [
	check('FirstName')
	    .notEmpty()
		.withMessage("Must Enter FirstName"),
	check('LastName')
		.notEmpty()
		.withMessage("Must Enter LastName"),
	check('Email')
	    .notEmpty()
		.withMessage("Must Enter Email"),
	check('Password')
		.notEmpty()
		.withMessage("Must Enter Password"),
	check('ContactNumber')
		.notEmpty()
		.withMessage("Must Enter ContactNumber"),
	check('BusinessName')
		.notEmpty()
		.withMessage("Must Enter BusinessName"),
	check('BusinessAddress')
		.notEmpty()
		.withMessage("Must Enter BusinessAddress"),
	check('PostCode')
		.notEmpty()
		.withMessage("Must Enter PostCode"),
];

exports.UserLoginValidation = [

	check('Email')
		.notEmpty()
		.withMessage("Must Enter Email"),
	check('Password')
		.notEmpty()
		.withMessage("Must Enter Password")
];

exports.UserUpdateValidation = [
	check('Email')
		.notEmpty()
		.withMessage("Must Enter Email")
];

exports.UserUpdatePasswordValidation = [
	check('Email')
		.notEmpty()
		.withMessage("Must Enter Email"),
	check('OldPassword')
		.notEmpty()
		.withMessage("Must Enter OldPassword"),
	check('NewPassword')
		.notEmpty()
		.withMessage("Must Enter NewPassword")
];

exports.UserPasswordResetValidation = [
	check('Email')
		.notEmpty()
		.withMessage("Must Enter Email"),
];

exports.AddSocialMediaAccountValidation = [
	check('Email')
		.notEmpty()
		.withMessage("Must Enter Email"),
	check('Title')
		.notEmpty()
		.withMessage("Must Enter Title"),
	check('URL')
		.notEmpty()
		.withMessage("Must Enter URL")
];

exports.UpdateSocialMediaAccountValidation = [
	check('Email')
		.notEmpty()
		.withMessage("Must Enter Email"),
	check('Title')
		.notEmpty()
		.withMessage("Must Enter Title"),
	check('URL')
		.notEmpty()
		.withMessage("Must Enter URL")
];

exports.DeleteSocialMediaAccountValidation = [
	check('Email')
		.notEmpty()
		.withMessage("Must Enter Email"),
	check('Title')
		.notEmpty()
		.withMessage("Must Enter Title")
];

exports.AddFileValidation = [
	check('Email')
		.notEmpty()
		.withMessage("Must Enter Email"),
	check('Title')
		.notEmpty()
		.withMessage("Must Enter Title"),
	check('Type')
		.notEmpty()
		.withMessage("Must Enter Type")
];

exports.DeleteFileValidation = [
	check('Email')
		.notEmpty()
		.withMessage("Must Enter Email"),
	check('Id')
		.notEmpty()
		.withMessage("Must Enter Id of File"),
];

//  KnowledgedBase

exports.AddKnowledgedBaseValidation = [
	check('Title')
		.notEmpty()
		.withMessage("Must Enter Title"),
	check('Description')
		.notEmpty()
		.withMessage("Must Enter Description"),
	check('Type')
		.notEmpty()
		.withMessage("Must Enter Type")
];

exports.UpdateKnowledgedBaseValidation = [
	check('Id')
		.notEmpty()
		.withMessage("Must Enter Id "),
];

exports.DeleteKnowledgedBaseValidation = [
	check('Id')
		.notEmpty()
		.withMessage("Must Enter Id "),
];

//  Packages

exports.AddPackagesValidation = [
	check('Title')
		.notEmpty()
		.withMessage("Must Enter Title"),
	check('Description')
		.notEmpty()
		.withMessage("Must Enter Description"),
	check('Type')
		.notEmpty()
		.withMessage("Must Enter Type"),
	check('Amount')
		.notEmpty()
		.withMessage("Must Enter Amount"),
	check('Duration')
		.notEmpty()
		.withMessage("Must Enter Duration")
];

exports.UpdatePackagesValidation = [
	check('Id')
		.notEmpty()
		.withMessage("Must Enter Id"),
];

exports.DeletePackagesValidation = [
	check('Id')
		.notEmpty()
		.withMessage("Must Enter Id "),
];

//  Packages

exports.AddUtilitiesValidation = [
	check('Title')
		.notEmpty()
		.withMessage("Must Enter Title"),
	check('Supplier')
		.notEmpty()
		.withMessage("Must Enter Supplier"),
];

exports.UpdateUtilitiesValidation = [
	check('Id')
		.notEmpty()
		.withMessage("Must Enter Id "),
];

exports.DeleteUtilitiesValidation = [
	check('Id')
		.notEmpty()
		.withMessage("Must Enter Id "),
];

exports.AddSupplierUtilitiesValidation = [
	check('Id')
		.notEmpty()
		.withMessage("Must Enter Id"),
	check('Supplier')
		.notEmpty()
		.withMessage("Must Enter Supplier"),
];
exports.RemoveSupplierUtilitiesValidation = [
	check('Id')
		.notEmpty()
		.withMessage("Must Enter Id"),
	check('Supplier')
		.notEmpty()
		.withMessage("Must Enter Supplier"),
];

//  Reminder

exports.AddReminderValidation = [
	check('Title')
		.notEmpty()
		.withMessage("Must Enter Title"),
	check('Description')
		.notEmpty()
		.withMessage("Must Enter Description"),
	check('Date')
		.notEmpty()
		.withMessage("Must Enter Date"),
];

exports.UpdateReminderValidation = [
	check('Id')
		.notEmpty()
		.withMessage("Must Enter Id "),
];

exports.DeleteReminderValidation = [
	check('Id')
		.notEmpty()
		.withMessage("Must Enter Id "),
];


//  Reminder

exports.AddDigitalAssistanceValidation = [
	check('UserName')
		.notEmpty()
		.withMessage("Must Enter UserName"),
	check('isRead')
		.notEmpty()
		.withMessage("Must Enter isRead"),
];

exports.UpdateDigitalAssistanceValidation = [
	check('Id')
		.notEmpty()
		.withMessage("Must Enter Id "),
	check('isRead')
		.notEmpty()
		.withMessage("Must Enter isRead Boolean option"),
];

//  UserUtilities

exports.AddUserUtilitieseValidation = [
	check('UtilitiesTitle')
		.notEmpty()
		.withMessage("Must Enter UtilitiesTitle "),
	check('User')
		.notEmpty()
		.withMessage("Must Enter User "),
];
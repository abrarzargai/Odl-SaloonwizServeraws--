## API Details

BaseURL: http://localhost:8080
BaseURL: https://odl-saloonwizz-app.herokuapp.com/ (Deployed)

## ############################################################################# Api ==>>

## ################### User ==>>

## logIn

     URL: /api/user/login  (Post)
    @Access Public


    -Request :It need
                    Email*(String) Required,
                    Password*(String) Required

    -RequestExample: {
                    "Email": "admin@gmail.com",
                    "Password": "12345",
                     }
    -Response : And you get success,message token, UserData

## SignUp

    URL: /api/user/signup  (Post)
    @Access Public

    -Request :It need
                    {
                    "FirstName":(String)Required,
                    "LastName": (String)Required,
                    "Email": (String)Required,
                    "Password": (String)Required,
                    "ContactNumber": (String)Required,
                    "BusinessName": (String)Required,
                    "BusinessAddress": (String)Required,
                    "PostCode": (String)Required,
                    }
     -RequestExample: {
                    "FirstName": "Admin",
                    "LastName": "Super",
                    "Email": "admin@gmail.com",
                    "Password": "12345",
                    "ContactNumber": "0123456789",
                    "BusinessName": "SaloonWiz",
                    "BusinessAddress": "G-13",
                    "PostCode": "44000"
                    }

    -Response : And you get success,message, UserData

## Update

    URL: /api/user/update  (Post)
    @Access Public

    -Request :It need
                    {
                    "FirstName":(String)Optional,
                    "LastName": (String)Optional,
                    "Email": (String)Required,
                    "ContactNumber": (String)Optional,
                    "BusinessName": (String)Optional,
                    "BusinessAddress": (String)Optional,
                    "PostCode": (String)Optional,
                    }
     -RequestExample: {
                    "FirstName": "Admin",
                    "LastName": "Super",
                    "Email": "admin@gmail.com",
                    "ContactNumber": "0123456789",
                    "BusinessName": "SaloonWiz",
                    "BusinessAddress": "G-13",
                    "PostCode": "44000"
                    }

    -Response : And you get success,message

## UpdatePassword

    URL: /api/user/updatepassword  (Post)
    @Access Public

    -Request :It need
                    {
                    "Email": (String)Required,
                    "OldPassword": (String)Required,
                    "NewPassword": (String)Required,
                    }
     -RequestExample: {
                    "Email": "admin@gmail.com",
                    "OldPassword": "0123456789",
                    "NewPassword": "SaloonWiz",
                    }

    -Response : And you get success,message

## GetAllUsers

    URL: /api/user/GetAllUsers  (Get)
    @Access Public


    -Response : And you get success,message,UsersData

## ResetPassword

URL: /api/user/resetpassword (Post)
@Access Public

    -Request :It need
                    {
                    "Email": (String)Required,
                    }
     -RequestExample: {
                    "Email": "admin@gmail.com",
                    }

    -Response : And you get success,message

## AddSocialMediaLink

URL: /api/user/addlink (Post)
@Access Public

    -Request :It need
                    {
                    "Email": (String)Required,
                    "Title": (String)Required,
                    "URL": (String)Required,
                    }
     -RequestExample: {
                    "Email": "admin@gmail.com",
                    "Title": "whatsapp",
                    "URL": "www.whatsapp.com",
                    }

    -Response : And you get success,message,UserData

## UpdateSocialMediaLink

URL: /api/user/updatelink (Post)
@Access Public

    -Request :It need
                    {
                    "Email": (String)Required,
                    "Title": (String)Required,
                    "URL": (String)Required,
                    }
     -RequestExample: {
                    "Email": "admin@gmail.com",
                    "Title": "whatsapp",
                    "URL": "www.whatsapp.com",
                    }

    -Response : And you get success,message,UserData

## DeleteSocialMediaLink

URL: /api/user/Deletelink (Post)
@Access Public

    -Request :It need
                    {
                    "Email": (String)Required,
                    "Title": (String)Required,
                    }
     -RequestExample: {
                    "Email": "admin@gmail.com",
                    "Title": "whatsapp",
                    }

    -Response : And you get success,message,UserData

## AddFileinUserFilling

URL: /api/user/addfile (Post)
@Access Public

    -Request :It need
                    {
                    "Email": (String)Required,
                    "Title": (String)Required,
                    "Type": (String)Required,
                    "image":(file)Required
                    }
     -RequestExample: {
                    "Email": "admin@gmail.com",
                    "Title": "whatsapp",
                    "Type": "personal",
                    "image":(file)
                    }

    -Response : And you get success,message,UserData

## DeleteFileinUserFilling

URL: /api/user/deletefile (Post)
@Access Public

    -Request :It need
                    {
                    "Email": (String)Required,
                    "Id": (String)Required,
                    }
     -RequestExample: {
                    "Email": "admin@gmail.com",
                    "Id": "61fe52d8a47e6a3860882f7a",
                    }

    -Response : And you get success,message,UserData

## ################### KnowledgedBase ==>>

## AddKnowledgedBaseFile

URL: /api/KnowledgedBase/add (Post)
@Access Public

    -Request :It need
                    {
                    "Description": (String)Required,
                    "Title": (String)Required,
                    "Type": (String)Required,
                    "image":(file)Required
                    }
     -RequestExample: {
                    "Description": "Description",
                    "Title": "whatsapp",
                    "Type": "personal",
                    "image":(file)
                    }

    -Response : And you get success,message,Data

## GetAllAddKnowledgedBaseFile

    URL: /api/KnowledgedBase/getall (Get)
    @Access Public

    -Response : And you get success,message,Data

## UpdateKnowledgedBaseFile

URL: /api/KnowledgedBase/update (Post)
@Access Public

    -Request :It need
                    {
                    "Description": (String)Optional,
                    "Title": (String)Optional,
                    "Type": (String)Optional,
                    "Id":(file)Required
                    }
     -RequestExample: {
                    "Description": "Description",
                    "Title": "whatsapp",
                    "Type": "personal",
                    "Id":"61fe6745b3080e1e54130b821"
                    }

    -Response : And you get success,message,Data

## DeleteKnowledgedBaseFile

URL: /api/KnowledgedBase/Delete (Post)
@Access Public

    -Request :It need
                    {
                    "Id":(file)Required
                    }
     -RequestExample: {
                    "Id":"61fe6745b3080e1e54130b821"
                    }

    -Response : And you get success,message,Data

## ################### Packages ==>>

## AddPackages

URL: /api/Packages/add (Post)
@Access Public

    -Request :It need
                    {
                    "Description": (String)Required,
                    "Title": (String)Required,
                    "Type": (String)Required,
                    "Duration": (String)Required,
                    "Amount": (Number)Required,
                    }
     -RequestExample: {
                    "Description": "Description",
                    "Title": "whatsapp",
                    "Type": "personal",
                    "Duration": "monthly",
                    "Amount": 20,
                    }

    -Response : And you get success,message,Data

## GetAllPackages

    URL: /api/Packages/getall (Get)
    @Access Public

    -Response : And you get success,message,Data

## UpdatePackages

URL: /api/Packages/update (Post)
@Access Public

    -Request :It need
                    {
                    "Description": (String)Optional,
                    "Title": (String)Optional,
                    "Type": (String)Optional,
                    "Id":(String)Required
                    "Duration": (String)Optional,
                    "Amount": (Number)Optional,
                    }
     -RequestExample: {
                    "Description": "Description",
                    "Title": "whatsapp",
                    "Type": "personal",
                    "Id":"61fe6745b3080e1e54130b821",
                    "Duration": "monthly",
                    "Amount": 20,
                    }

    -Response : And you get success,message,Data

## DeletePackages

URL: /api/Packages/Delete (Post)
@Access Public

    -Request :It need
                    {
                    "Id":(String)Required
                    }
     -RequestExample: {
                    "Id":"61fe6745b3080e1e54130b821"
                    }

    -Response : And you get success,message,Data

## ################### Utilities ==>>

## AddUtilities

URL: /api/Utilities/add (Post)
@Access Public

    -Request :It need
                    {
                    "Title": (String)Required,
                    "Supplier": [(String)]Required,
                    "image":(file)Required
                    }
     -RequestExample: {
                        "Title":"Gass",
                        "Supplier":[
                            "USA",
                            "Russia"
                        ]
                    }

    -Response : And you get success,message,Data

## GetAllUtilities

    URL: /api/Utilities/getall (Get)
    @Access Public

    -Response : And you get success,message,Data

## UpdateUtilities

URL: /api/Utilities/update (Post)
@Access Public

    -Request :It need
                    {
                    "Title": (String)Required,
                    "Id":(String)Required
                    
                    }
     -RequestExample: {
                    "Id": "620146add346133694345f95",
                    "Title": "whatsapp",
                    }

    -Response : And you get success,message,Data

## DeleteUtilities

URL: /api/Utilities/Delete (Post)
@Access Public

    -Request :It need
                    {
                    "Id":(String)Required
                    }
     -RequestExample: {
                    "Id":"61fe6745b3080e1e54130b821"
                    }

    -Response : And you get success,message,Data

## addSuppliertoUtilities

URL: /api/Utilities/addSupplier (Post)
@Access Public

    -Request :It need
                    {
                    "Supplier": (String)Required,
                    "Id":(String)Required
                    }
     -RequestExample: {
                    "Id": "620146add346133694345f95",
                    "Supplier": "name",
                    }

    -Response : And you get success,message,Data

## deleteSuppliertoUtilities

URL: /api/Utilities/deleteSupplier (Post)
@Access Public

    -Request :It need
                    {
                    "Supplier": (String)Required,
                    "Id":(String)Required
                    }
     -RequestExample: {
                    "Id": "620146add346133694345f95",
                    "Supplier": "name",
                    }

    -Response : And you get success,message,Data

## ################### reminder ==>>

## Addreminder

URL: /api/reminder/add (Post)
@Access Public

    -Request :It need
                    {
                    "Description": (String)Required,
                    "Title": (String)Required,
                    "Date": (Date)Required,
                    }
     -RequestExample: {
                    "Description": "Description",
                    "Title": "title",
                    "Date": "03-02-2022",

    -Response : And you get success,message,Data

## GetAllreminder

    URL: /api/reminder/getall (Get)
    @Access Public

    -Response : And you get success,message,Data

## Updatereminder

URL: /api/reminder/update (Post)
@Access Public

    -Request :It need
                    {
                    "Description": (String)Required,
                    "Title": (String)Required,
                    "Date": (Date)Required,
                    "Id":(String)Required
                    }
     -RequestExample: {
                    "Description": "Description",
                    "Title": "title",
                    "Date": "03-02-2022",
                    "Id":"61fe6745b3080e1e54130b821",
                    }

    -Response : And you get success,message,Data

## Deletereminder

URL: /api/reminder/Delete (Post)
@Access Public

    -Request :It need
                    {
                    "Id":(String)Required
                    }
     -RequestExample: {
                    "Id":"61fe6745b3080e1e54130b821"
                    }

    -Response : And you get success,message,Data

## ################### DigitalAssistance ==>>

## AddDigitalAssistance

URL: /api/DigitalAssistance/add (Post)
@Access Public

    -Request :It need
                    {
                    "UserName": (String)Required,
                    "isRead": (Boolean)Required,
                    }
     -RequestExample: {
                    "UserName": "testUser",
                    "isRead": "false",

    -Response : And you get success,message,Data

## GetAllDigitalAssistance

    URL: /api/DigitalAssistance/getall (Get)
    @Access Public

    -Response : And you get success,message,Data

## UpdateDigitalAssistance

URL: /api/DigitalAssistance/update (Post)
@Access Public

    -Request :It need
                    {
                    "isRead": (String)Required,
                    "Id":(String)Required
                    }
     -RequestExample: {
                    "isRead": "true",
                    "Id":"61fe6745b3080e1e54130b821",
                    }

    -Response : And you get success,message,Data

## ################### UserUtilities ==>>

## Add-UserUtilities

URL: /api/Userutilities/add (Post)
@Access Public

    -Request :It need
                    {
                    "UtilitiesTitle": (String)Required,
                    "UtilitiesSupplier": (String)Optional,
                    "User": (mongoDB Id of User)Required,
                    "LastBill": (file1)Optional,
                    "ContractExpiryDate": (String)Optional,
                    "IsPaid": (String)Optional,
                    "LOAForm": (file2)Optional,
                    }

    -Response : And you get success,message,Data

## Update-UserUtilities

URL: /api/Userutilities/update (Post)
@Access Public

    -Request :It need
                    {
                    "Id": (mongoDB Id of UserUtility)Required,
                    "UtilitiesTitle": (String)Optional,
                    "UtilitiesSupplier": (String)Optional,
                    "User": (mongoDB Id of User)Optional,
                    "LastBill": (file1)Optional,
                    "ContractExpiryDate": (String)Optional,
                    "IsPaid": (String)Optional,
                    "LOAForm": (file2)Optional,
                    }

    -Response : And you get success,message,Data

## Delete-UserUtilities

URL: /api/Userutilities/Delete (Post)
@Access Public

    -Request :It need
                    {
                    "Id": (mongoDB Id of UserUtility)Required
                    }

    -Response : And you get success,message,Data

## getAll Utilities for a specif User-UserUtilities

URL: /api/Userutilities/getone (Post)
@Access Public

    -Request :It need
                    {
                    "User": (mongoDB Id of User)Required
                    }

    -Response : And you get success,message,Data

## getAll UserUtilities

URL: /api/Userutilities/getall (Get)
@Access Public


    -Response : And you get success,message,Data

## AddDeal-UserUtilities

URL: /api/Userutilities/AddDeal (Post)
@Access Public

    -Request :It need
                    {
                    "Id": (mongoDB Id of UserUtility)Required,
                    "Title": (String)Required,
                    "Description": (String)Required,
                    }

    -Response : And you get success,message,Data
## DeleteDeal-UserUtilities

URL: /api/Userutilities/DeleteDeal (Post)
@Access Public

    -Request :It need
                    {
                    "Id": (mongoDB Id of UserUtility)Required,
                    "Title": (String)Required,
                    }

    -Response : And you get success,message,Data
## AcceptDeal-UserUtilities

URL: /api/Userutilities/AcceptDeal (Post)
@Access Public

    -Request :It need
                    {
                    "Id": (mongoDB Id of UserUtility)Required,
                    "Title": (String)Required,
                    "Description": (String)Required,
                    }

    -Response : And you get success,message,Data

## ###################Fetching Data query#######>>

## KnowledgedBase

URL: /api/KnowledgedBase/get (Get)
@Access Public

    -Params :It need
                    {
                    "Type": (String)optional,
                    "page": (Number)optional,
                    }

    -Response : And you get success,message,Data

## Users

URL: /api/user/get (Get)
ExampleURL: /api/user/get?page=2 (Get request with params)
@Access Public

    -Params :It need
                    {
                    "page": (Number)optional,
                    }

    -Response : And you get success,message,Data

## Users==>GetuserFiles

URL: /api/user/getfilling (Get)
ExampleURL: /api/user/getfilling?email=admin@gmail.com(Get request with params)
@Access Public

    -Params :It need
                    {
                    "email": (string)Required,
                    }

    -Response : And you get success,message,Data

## ################### UserServices ==>>

## Add
URL: /api/UserServices/add (Post)
@Access Public

    -Request :It need
                    {
                    "User": (mongoDB Id of User)Required,
                    "Status": (String)Required,
                    "Package": (String)Required
                    }

    -Response : And you get success,message,Data

## Getall
URL: /api/UserServices/getall (Post)
@Access Public


    -Response : And you get success,message,Data

## update
URL: /api/UserServices/update (Post)
@Access Public

    -Request :It need
                    {
                    "Id": (mongoDB Id of UserServices)Required,
                    "Status": (String)Required
                    }

    -Response : And you get success,message,Data
## ################### Notification ==>>
## Add
URL: /api/notification/add (Post)
@Access Public

    -Request :It need
                    {
                    "User": (mongoDB Id of User)Required,
                    "For": (mongoDB Id of User)Required,
                    "message": (String)Required,
                    "isRead": (boolean)Required,
                    "Role": (String)Required,
                    }

    -Response : And you get success,message,Data

## Getall
URL: /api/notification/getall (Post)
@Access Public


    -Response : And you get success,message,Data

## GetOne
URL: /api/notification/GetOne (Post)
@Access Public

    -Request :It need
                    {
                    "For": (mongoDB Id of User)Required,
                    }

    -Response : And you get success,message,Data
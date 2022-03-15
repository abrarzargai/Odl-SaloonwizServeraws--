## Package ---->

-Title (String)
-Amount (Number)
-Description (String)
-Duration ['monthly','yearly']

## KnowledgedBase --->

-Type ['faqs','articles','tutorial']
-Title (String)
-Description (String)
-URL (String)

## Reminder --->

-Title (String)
-Description (String)
-Date (Date)

## UtilitiesDisplay --->

-Title (String)
-Supplier [String]

## User---->

-InitLogin (Boolean)
-FirstName (String)
-LastName (String)
-Email (String)
-Password (String)
-ContactNumber (String)
-BusinessName (String)
-BusinessAddress (String)
-PostCode (String)
-Filling[String]

## UserUtilities

-Utilities (mongodbID) ------ref
-User (mongodbID) --------ref
-LastBill (String)
-ContractExpiryDate (Date)
-isPaid (Boolean)
-LOAForm (String)
-DealList [{
    -Title (String)
    -Description (String)
    }]

## UserPackage

Package: (mongodbID) ------ref
StartingDate (Date)
EndingDate (Date)
Status:['Pending','approved']


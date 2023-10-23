const User = require("../Models/userModel.js");
const bcrypt = require("bcrypt");
const expressAsyncHandler = require("express-async-handler");
const {
  generateVerificationMailAndSend,
  validateEmail,
} = require("../common.js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cloudinaryConfig = require("../cloudinary.config.js");
const Product = require("../Models/productModel.js");
const { default: axios } = require("axios");
dotenv.config();

// look into the error middleware and why it is not working
exports.LoginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const error = new Error("Please provide credentials!")
    error.statusCode = 404;
    throw error
  }

  const UserDetailsOnDatabase = await User.findOne({ email });
  const isPasswordCorrect =
    UserDetailsOnDatabase &&
    bcrypt.compareSync(password, UserDetailsOnDatabase?.password);

  if (!UserDetailsOnDatabase || !isPasswordCorrect) {
    const error = new Error("These credentials do not match our records!")
    error.statusCode = 404;
    throw error
  }

  const accessToken = UserDetailsOnDatabase.generateAccessToken();
  const refreshToken = UserDetailsOnDatabase.generateRefreshToken();

  return res.status(200).json({
    Message: "User Logged in successfully",
    accessToken,
    refreshToken,
  });
});

exports.LogoutUser = expressAsyncHandler((req, res) => {
  res.status(200).json({ message: "User Logged Out Successfully" });
});

exports.ResetPassword = expressAsyncHandler(async (req, res) => {
  const data = req.body;
  if (data?.Email) {
    const { Email, oneTimeOTP } = data;
    const UserDetailsOnDatabase = await User.findOne({ Email });

    if (!UserDetailsOnDatabase) {
      throw new Error("User Not Found");
    }

    if (oneTimeOTP) {
      if (oneTimeOTP == UserDetailsOnDatabase.oneTimeOTP) {
        return res.status(200).json({ message: "You can reset your password" });
      }
      throw new Error("Please Provide correct OTP");
    }
    await generateVerificationMailAndSend(User, Email);
    return res.status(200).json({ message: "Email sent successfully" });
  }

  return res.status(500).json({ Error: "Please provide details" });
});

exports.RegisterUser = expressAsyncHandler(async (req, res) => {
  const userDetails = req.body;
  const user = new User(userDetails);
  const isValidEmail = validateEmail(userDetails?.email);
  const UserDetailsOnDatabase = await User.findOne({
    email: userDetails?.email,
  });
  if (!isValidEmail || UserDetailsOnDatabase) {
    const error = new Error("User already exist!")
    error.statusCode = 404;
    throw error
  }

  try {
    await user.save();
    res.status(200).json({ Message: "User created successfully" });
  } catch (error) {
    res.status(404).json({ Error: error?.message });
  }
});

exports.refreshAccessToken = expressAsyncHandler((req, res) => {
  const refreshToken = req?.headers['authorization'].split(" ")[1]
  if (!refreshToken) {
    return res.status(404).json({ error: "Token has not been provided" });
  }
  jwt.verify(
    refreshToken,
    process.env.JSON_WEB_TOKEN_SECURITY_KEY,
    (err, userDetails) => {
      if (err) {
        return res.status(403).json({ error: "Token has been expired" });
      }
      const accessToken = jwt.sign(
        { userId: userDetails.id },
        process.env.JSON_WEB_TOKEN_SECURITY_KEY,
        {
          expiresIn: "45m",
        }
      );
      res.status(200).json({ accessToken });
    }
  );
  // if refreshToken is not present
  // if refreshToken is present then verify the refresh token if it is correct then send a new accesstoken that he can store in the storage
});


exports.EditUserProfile = expressAsyncHandler(async(req, res)=>{
  const userId = req.userId
  const userDetails = req.body
  const updateValues = {}
  userDetails?.firstname?.length !== 0 && (updateValues['firstname'] = userDetails.firstname)
  userDetails?.lastname?.length !== 0 && (updateValues['lastname'] = userDetails.lastname)
  userDetails?.dob?.length !== 0 && (updateValues['dob'] = userDetails.dob)
  userDetails?.phone?.length !== 0 && (updateValues['phone'] = userDetails.phone)
  
  if(userDetails?.avatar){   
    const imageDetails = await cloudinaryConfig.uploader.upload(userDetails.avatar, {
      public_id : 'ecommerce'
    })
    updateValues['avatar'] = imageDetails.url
  }

  const response = await User.findOneAndUpdate({_id : userId}, updateValues)
  if(!response){
    const error = new Error("there is an error")
    error.statusCode = 404
    throw error
  }
  res.status(200).json({message : "Details update successfully"})
})


exports.GetUserDetails = expressAsyncHandler(async(req, res) => {
    const id = req.userId
    const userDetails = await User.findById(id)
    if(!userDetails){
      throw new Error("There is some error!")
    }
    res.status(200).json({
      firstname : userDetails.firstname,
      lastname : userDetails.lastname,
      email : userDetails.email,
      phone : userDetails.phone,
      avatar : userDetails.avatar || null,
      dob : userDetails.dob || null
    })
})

exports.SolveRecaptcha = expressAsyncHandler(async(req, res)=>{
  const { token } = req.body;
  console.log(req.body, "----token")
  const secretKey = process.env.RECAPTCHA_SECRET; // Replace with your actual secret key

  const url = 'https://www.google.com/recaptcha/api/siteverify';
  const response = await axios.post(url, null, {
    params: {
      secret: secretKey,
      response: token,
    },
})
  console.log(response.data, "-----------response")
  res.json({message : "this"})
})
import { createOrUpdateStreamUser } from "../lib/Stream.js";
import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";

export async function signup(req, res) {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ message: "all fields are required for sign-up" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must have atleast 6 characters" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    //now checking email already exists or not
    const existedUser = await User.findOne({ email });
    // console.log(existedUser)
    if (existedUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    //for avatar we are using a free api => gives 100 avatar
    //for randomly generates an avatar

    const idx = Math.floor(Math.random() * 100 + 1);
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    //creating user
    const newUser = await User.create({
      fullName,
      email,
      password,
      profilePic: randomAvatar,
    });

    if (!newUser) {
      return res.status(400).json({ message: "Can not create new user" });
    }

    //*******todo : create user in stream as well
    try {
      await createOrUpdateStreamUser({
        id: newUser?._id.toString(),
        name: newUser?.fullName,
        image: newUser?.profilePic || "",
      });
      console.log(`Stream user created for ${newUser.fullName}`);
    } catch (error) {
      console.log("Error while creating Stream user : ", error);
    }

    //jwt token
    const token = jwt.sign(
      { userId: newUser?._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    //note : to generate secret-key through terminal
    //cmd : openssl rand -base64 32

    //xss => cross site scripting (XSS attacks involve injecting malicious scripts into a web page)
    //csrf => A CSRF (Cross-Site Request Forgery) attack is a type of malicious exploit where
    // an attacker tricks a user into performing actions on a website they are already
    // authenticated to, without their knowledge or consent

    const options = {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, //prevent xss attacks
      sameSite: "strict", //prevent csrf attacks
      secure: process.env.NODE_ENV === "production",
    };

    //cookie
    res.cookie("jwt", token, options);

    return res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.log("Error is signup controller : ", error.message);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "invalid email or password" });
    }

    const isPasswordCOrrect = await user.comparePassword(password);
    if (!isPasswordCOrrect) {
      return res.status(401).json({ message: "invalid password" });
    }

    //token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    const options = {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    };

    res.cookie("jwt", token, options);

    return res.status(200).json({ success: true, user: user });
  } catch (error) {
    console.log("Error in login controller : ", error.message);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("jwt");
    return res
      .status(200)
      .json({ success: true, message: "user log out successfully" });
  } catch (error) {
    console.log("Error in logout controller : ", error.message);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function onboard(req, res) {
  try {
    console.log(req.user)
    const userId = req.user?._id;

    const { fullName, bio, nativeLanguage, interestTag, location } =
      req.body;

    if (
      !fullName ||
      !bio ||
      !nativeLanguage ||
      !interestTag ||
      !location
    ) {
      return res.status(400).json({
        message: "all fields are required",
        missingFields: [
          !fullName && "fullName",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !interestTag && "learningLanguage",
          !location && "location",
        ].filter(Boolean),
      });
    }
    //response
    // {
    //     "message": "all fields are required",
    //     "missingFields": [
    //         false,
    //         "bio",
    //         "nativeLanguage",
    //         "learningLanguage",
    //         "location"
    //     ]
    // } //we can also filter, so that it only shows the true fields

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        isOnBoarded: true,
      },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "user not found" });
    }

    //***TODO: update the stream user => we are doing this, because there is a chance that user update the fullname
    try {
      await createOrUpdateStreamUser({
        id: updatedUser?._id.toString(),
        name: updatedUser?.fullName,
        image: updatedUser?.profilePic || "",
      });
      console.log(`Stream user updated after onboarding for ${updatedUser.fullName}`);
    } catch (error) {
      console.log("Error while updating Stream user : ", error);
    }

    return res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.log("Error in onboard controller : ", error.message);
    res.status(500).json({ message: "internal server error" });
  }
}

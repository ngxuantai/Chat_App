const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signupUser = async (req, res) => {
  try {
    const {username, email, password} = req.body;

    const userNameCheck = await User.findOne({username});
    if (userNameCheck)
      return res.json({msg: 'Username already exists', status: false});

    const emailCheck = await User.findOne({email});
    if (emailCheck)
      return res.json({msg: 'Email already exists', status: false});

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const newUserWithoutPassword = {...newUser.toObject()};
    delete newUserWithoutPassword.password;

    const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);

    return res.json({
      msg: 'Signup successful',
      status: true,
      user: newUserWithoutPassword,
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const {username, password} = req.body;
    const user = await User.findOne({username});

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const UserWithoutPassword = {...user.toObject()};
        delete UserWithoutPassword.password;

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

        return res.json({
          msg: 'Login successful',
          status: true,
          user: UserWithoutPassword,
          token: token,
        });
      } else {
        return res.json({
          msg: 'Your password was incorrect',
          status: false,
        });
      }
    } else {
      return res.json({
        msg: 'Your password was incorrect',
        status: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.setAvatar = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const avatarImage = req.body.avatarImage;
    console.log(avatarImage);
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      {new: true}
    );
    return res.json({
      msg: 'Set avatar successful',
      status: 'true',
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const allUser = await User.find({_id: {$ne: userId}}).select([
      'username',
      'email',
      'avatarImage',
      '_id',
    ]);
    return res.json(allUser);
  } catch (error) {
    next(error);
  }
};

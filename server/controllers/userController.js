const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.CreateUser = async (req, res) => {
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
    return res.json({
      msg: 'User created',
      status: true,
      user: newUserWithoutPassword,
    });
  } catch (error) {
    console.log(error);
  }
};

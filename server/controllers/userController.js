const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.Signup = async (req, res) => {
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
      msg: 'Signup successful',
      status: true,
      user: newUserWithoutPassword,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.LoginUser = async (req, res) => {
  try {
    const {username, password} = req.body;
    const user = await User.findOne({username});

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const UserWithoutPassword = {...user.toObject()};
        delete UserWithoutPassword.password;
        return res.json({
          msg: 'Login successful',
          status: true,
          user: UserWithoutPassword,
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

const User = require("../models/User");

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password"); //exclude password

    if (!user) {
      return res.status(404).json({ message: "User not Foung" });
    }

    console.log(user);
    res.json(user);
  } catch (error) {
    console.error(error);
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.error(error);
  }
};

module.exports = { getUserProfile, updateUserProfile };

const userModel = require("../../models/userModel");

async function updateUser(req, res) {
  try {
    const sessionUser = req.userId;

    const { userId, email, name, role, address, profilePic } = req.body;

    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
      ...(address && { address: address }),
      ...(profilePic && { profilePic: profilePic }),
    };

    const updatedUser = await userModel.findByIdAndUpdate(userId, payload, {
      new: true,
    });

    if (!updatedUser) {
      console.error("User not found or not updated");
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    res.json({
      data: updatedUser,
      message: "User Updated",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = updateUser;

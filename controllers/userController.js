const { User } = require("../models");

module.exports = {
  getUsers(req, res) {
    User.find({})
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User does not Exist" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((newUser) => res.status(200).json(newUser))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    )
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "User does not Exist" })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User does not Exist" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() =>
        res.json({ message: "User thoughts successfully deleted :)" })
      )
      .catch((err) => res.status(500).json(err));
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User does not Exist" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User does not Exist" })
          : res.json({ message: "Friend successfully removed :) " })
      )
      .catch((err) => res.status(500).json(err));
  },
};

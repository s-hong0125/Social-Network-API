const { Thought, User } = require("../models");

module.exports = {
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Thought does not exist" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.status(200).json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "User does not Exist" })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thought.findByIdAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Thought is not updated" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Thought does not Exist" })
          : res.json({ message: "Thought removed:)" })
      )
      .catch((err) => res.status(500).json(err));
  },

  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Thought does not Exist" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Thought does not Exist" })
          : res.json({ message: "Reaction removed :)" })
      )
      .catch((err) => res.status(500).json(err));
  },
};

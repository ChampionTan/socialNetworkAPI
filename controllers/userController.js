const { User, Thoughts } = require('../models');



module.exports = {
  // Get all students
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single student
  getSingleUser(req, res) {
    User.findOne({ id: req.params.userId })
      //.select('-__v')
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new student
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  createUser(req, res) {
    User.create(req.body)
    .then((user) => res.json(user))
    .catch((err)=> res.status(500).json(err));
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      {id: req.params.userId},
      { $set: req.body},
      {
        runValidators: true,
        new: true
      }
    )
    .then(user =>
      !user
      ? res.status(404).json({message: 'No user with this id'})
      : res.json(user)
      )
      
      .catch((err) => res.status(500).json(err));
  },
  // Delete a student and remove them from the course
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : User.findOneAndUpdate(
              { users: req.params.userId },
              { $pull: { user: req.params.userId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'User deleted, but no thoughts found',
            })
          : res.json({ message: 'User successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

 // Add an assignment to a student
  addFriend(req, res) {
   console.log('You are adding a Friend');
   console.log(req.body);
    User.findOneAndUpdate(
     { _id: req.params.userId },
     { $addToSet: {friends: req.body.friendId}},
     { runValidators: true, new: true }
   )
     .then((user) =>
       !user
         ? res
             .status(404)
             .json({ message: 'No user found with //that ID :(' })
         : res.json(user)
     )
     .catch((err) => res.status(500).json(err));
 },
  //Remove assignment from a student
 removeFriend(req, res) {
   User.findOneAndUpdate(
     { _id: req.params.userId },
     { $pull: { friend: req.body}},
     { runValidators: true, new: true }
   )
     .then((user) =>
       !user
         ? res
             .status(404)
             .json({ message: 'No user found with //that ID :(' })
         : res.json(user)
      )
     .catch((err) => res.status(500).json(err));
 },
};

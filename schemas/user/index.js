const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const saltRounds = 10

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  type: { type: String }
})

userSchema.pre('save', function(next) {
  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified('password')) {
    // Saving reference to this because of changing scopes
    const document = this

    console.log(document)
    bcrypt.hash(document.password, saltRounds, function(err, hashedPassword) {
      if (err) {
        next(err)
      } else {
        document.password = hashedPassword
        console.log(document)
        next()
      }
    })
  } else {
    next()
  }
})

userSchema.methods.isCorrectPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, same) {
    if (err) {
      callback(err)
    } else {
      callback(err, same)
    }
  })
}

module.exports = mongoose.model('User', userSchema)

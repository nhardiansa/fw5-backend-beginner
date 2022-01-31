const usersModel = require('../models/users')

module.exports = {
  getUser: (req, res) => {
    const {
      id
    } = req.params

    usersModel.getUser(id, (result) => {
      if (result.length < 1) {
        return res.status(404).json({
          success: false,
          message: `User with id ${id} not found`
        })
      }
      return res.status(200).json({
        success: true,
        message: `Success getting user with id ${id}`,
        result: result[0]
      })
    })
  }
}

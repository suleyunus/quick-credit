import usersModel from '../models/users';

class UpdateVerification {
  static verifyStatus(req, res) {
    const email = req.params.userEmail;
    const user = usersModel.findUser(email);

    if (!user) {
      res.status(404).json({
        status: 404,
        message: 'No user matching that email',
      });
    } else {
      const verificationStatus = req.body.status;
      const updatedUser = usersModel.updateVerificationStatus(verificationStatus, user);
      res.status(200).json({
        status: 200,
        data: updatedUser,
      });
    }
  }
}

export default UpdateVerification;

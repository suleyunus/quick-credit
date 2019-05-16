import moment from 'moment';

class Users {
  constructor() {
    this.users = [];
  }

  generateUserID() {
    return (this.users.length + 1);
  }

  signUp(input) {
    const newUser = {
      id: this.generateUserID(),
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      password: input.password,
      address: input.address,
      status: 'unverified',
      isAdmin: false,
      dateJoined: moment.now(),
    };
    this.users.push(newUser);
    return newUser;
  }

  findUser(input) {
    return this.users.find(user => user.email === input);
  }

  updateVerificationStatus(newStatus, userObject) {
    const updatedUser = {
      id: userObject.id,
      email: userObject.email,
      firstName: userObject.firstName,
      lastName: userObject.lastName,
      password: userObject.password,
      address: userObject.address,
      status: newStatus,
      isAdmin: false,
      dateJoined: userObject.dateJoined,
      dateVerified: moment.now(),
    };
    this.users.splice(userObject.id - 1, 1, updatedUser);
    return updatedUser;
  }
}

export default new Users();

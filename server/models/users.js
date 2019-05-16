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

  finduser(input) {
    return this.users.find(user => user.email === input.email);
  }
}

export default new Users();

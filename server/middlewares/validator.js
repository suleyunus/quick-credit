const signup = (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    address,
  } = req.body;

  if (!firstName
          || !lastName
          || !email
          || !password
          || !address) {
    res.status(400).json({
      status: 400,
      message: 'All fields are required',
    });
  }

  if (email) {
    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(email)) {
      res.status(400).json({
        status: 400,
        message: 'Enter a valid email',
      });
    }
  }

  next();
};

export default {
  signup,
};

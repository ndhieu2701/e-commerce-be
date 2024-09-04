import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
};

const comparePassword = async (password, receivePassword) => {
  const isMatch = await bcrypt.compare(receivePassword, password);
  return isMatch;
};

export { hashPassword, comparePassword };

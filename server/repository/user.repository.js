import User from "../models/user.schema.js";

export const createUser = async ({
  name,
  email,
  phone,
  password,
  role,
  skills,
  location,
  available,
  language,
}) => {
  if (!name || !email || !phone || !password) {
    throw new Error("Please fill all required fields!");
  }
  try {
    const newUser = await User.create({
      name,
      email,
      phone,
      password,
      role: role || "worker",
      skills: skills || [],
      location: location,
      available: available ?? false,
      language: language || "Hindi",
    });
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw new Error(`Could not create user: ${error.message}`);
  }
};

export const allUsers = async () => {
  const users = await User.find();
  return users;
};

export const singleUser = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found with this id");
  }
  return user;
};

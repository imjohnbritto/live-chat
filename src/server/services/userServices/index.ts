import { UserRequestBody, DBUser, AuthUser } from "../../types/user";
import { User, validateUserObject } from "./model";

export const createUser = async (payload: UserRequestBody) => {
  const { val, error } = validateUserObject(payload);
  if (error) {
    throw { validation: error };
  }
  try {
    return await new User(val).save();
  } catch (e) {
    throw e;
  }
};

export const login = async ({ phone, password }: UserRequestBody) => {
  const user = await User.findOne({ phone }).lean();
  if (user && user.isActive) {
    const isValidPass = verifyPassword(password, user.password);
    if (isValidPass) {
      return convertToAuthUser(user);
    }
  }
  return null;
};

export const getUsers = async () => {
  return await User.find({}).select("username phone isAdmin isActive");
};

export const updateInfo = async ({
  phone,
  isActive,
}: {
  phone: string;
  isActive: boolean;
}) => {
  return await User.findOneAndUpdate({ phone }, { phone, isActive });
};

const verifyPassword = (password: string, dbPassword: string) => {
  return dbPassword === password;
};

const convertToAuthUser = (user?: DBUser | null) => {
  if (!user) return null;

  const authUser: AuthUser = {
    id: user._id.toString(),
    username: user.username,
    phone: user.phone,
    isAdmin: user.isAdmin,
    isActive: user.isActive,
  };
  return authUser;
};

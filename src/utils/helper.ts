import { AuthUser } from "@server/types/user";

const maskEmail = (str: string) => {
  return str.replace(/([\w.]+)@([\w.]+)(\.[\w.]+)/g, (_, p1, p2, p3) => {
    return p1.charAt(0) + '*'.repeat(6) + '@' + p2 + p3;
  });
};

const maskPhone = (str: string) => {
  return str.substring(0, 2) + '*'.repeat(6) + str.slice(-2);
};

export const getMaskedUsername = (username: string) => {
  if (username.includes('@')) {
    return maskEmail(username);
  } else {
    return maskPhone(username);
  }
};

export const getInitials = (name: string) => {
  const names = name.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

export const loggedInUser = () => {
  console.log()
  const user = globalThis.window && globalThis.window.localStorage ? globalThis.window.localStorage.getItem("userDetails") : null;
  if(!!user) {
      return JSON.parse(user);
  }
  return null;
}

export const setUserData = (data: AuthUser) => {
  globalThis.window.localStorage.setItem("userDetails", JSON.stringify(data));
}

export const clearUserData = () => {
  globalThis.window.localStorage.removeItem("userDetails");
}

exports.userSignup = (payload) => {
  if (!payload.role) throw { message: "Role is missing" };
  if (payload.role == "Admin") payload.role = "Client";
  return payload;
};
exports.userLogin = (payload) => {
  if (!payload.ID) throw { message: "phone or email is missing" };
  if (!payload.password) throw { message: "password is missing" };
  if (payload.ID.includes("@")) payload.email = payload.ID;
  else payload.phone = payload.ID;
  delete payload.ID;
  return payload;
};

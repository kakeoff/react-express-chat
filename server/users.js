let users = [];

const addUser = (user) => {
  const userName = user.name.trim().toLowerCase();
  const userRoom = user.room.trim().toLowerCase();

  const isExist = users.find(
    (u) =>
      u.name.trim().toLowerCase() === userName &&
      u.room.trim().toLowerCase() === userRoom
  );
  if (!isExist) {
    users.push(user);
  }
  const currentUser = isExist || user;

  return {
    isExist: !!isExist,
    user: currentUser,
  };
};

module.exports = { addUser };

let users = [];

const findUser = (user) => {
  const { name, room } = user;
  const userName = name.trim().toLowerCase();
  const userRoom = room.trim().toLowerCase();

  return users.find(
    (u) =>
      u.name.trim().toLowerCase() === userName &&
      u.room.trim().toLowerCase() === userRoom
  );
};

const addUser = (user) => {
  const foundUser = findUser(user);
  if (!foundUser) {
    users.push(user);
  }
  const currentUser = foundUser || user;

  return {
    isExist: !!foundUser,
    user: currentUser,
  };
};

const getRoomUsers = (room) => users.filter((user) => user.room === room);

const removeUser = (user) => {
  const foundUser = findUser(user);
  if (foundUser) {
    users = users.filter(
      ({ room, name }) => room === foundUser.room && name !== foundUser.name
    );
  }
  return foundUser;
};

module.exports = { addUser, findUser, getRoomUsers, removeUser };

interface User {
  name: string;
  room: string;
}

let users: User[] = [];

const findUser = (user: User): User | undefined => {
  const { name, room } = user;
  const userName = name.trim().toLowerCase();
  const userRoom = room.trim().toLowerCase();

  return users.find(
    (u) =>
      u.name.trim().toLowerCase() === userName &&
      u.room.trim().toLowerCase() === userRoom
  );
};

const addUser = (user: User): { isExist: boolean; user: User } => {
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

const getRoomUsers = (room: string): User[] => users.filter((user) => user.room === room);

const removeUser = (user: User): User | undefined => {
  const foundUser = findUser(user);
  if (foundUser) {
    users = users.filter(
      ({ room, name }) => room === foundUser.room && name !== foundUser.name
    );
  }
  return foundUser;
};

export { addUser, findUser, getRoomUsers, removeUser };

const userToken = ({ user }) => user.token;

const isLogged = ({ user }) => !!user.token;

export default {
  userToken,
  isLogged,
};

const getters = {
  id: state => state.user.id,
  nickname: state => state.user.nickname,
  token: state => state.user.token,
  showMessageTip: state => state.app.showMessageTip,
  messageNumbers: state => state.app.messageNumbers
};
export default getters

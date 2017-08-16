const getters = {
  id: state => state.user.id,
  nickname: state => state.user.nickname,
  token: state => state.user.token,
  showMessageTip: state => state.message.showMessageTip,
  messageNumbers: state => state.message.messageNumbers,
  unReadMessageNumber: state => state.message.messageNumbers.reduce((sum, i) => sum + i.unReadTotal, 0)
};
export default getters

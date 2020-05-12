const createLog = ({ dispatch }) => {
  //dispatch é usado para invocar outras actions
  dispatch('setNewLog');
};

const loadLogs = () => {
  //esse método invocará um service que buscará os registros no backend
};

const setNewLog = ({ commit }) => {
  //demonstração
  const logs = [
    {
      Titulo: 'ERR0R',
      Detalhes: 'Infos detalhadas',
      Local: 1,
      Origem: 'localhost',
      Level: 1,
      Frequencia: 3,
      Data: '2020-05-11',
      TokenUsuario:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiYWRtaW4iLCJuYmYiOjE1ODkyNDMzNTUsImV4cCI6MTU4OTMyOTc1NSwiaWF0IjoxNTg5MjQzMzU1fQ.Z7U6J3PT_6hvtmXzBgfscQTZBWDTZkjCmJpBR5OaRJ8',
    },
    {
      Titulo: 'ERR0R2',
      Detalhes: 'Infos detalhadas2',
      Local: 2,
      Origem: 'localhost',
      Level: 2,
      Frequencia: 1,
      Data: '2020-05-11',
      TokenUsuario:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiYWRtaW4iLCJuYmYiOjE1ODkyNDMzNTUsImV4cCI6MTU4OTMyOTc1NSwiaWF0IjoxNTg5MjQzMzU1fQ.Z7U6J3PT_6hvtmXzBgfscQTZBWDTZkjCmJpBR5OaRJ8',
    },
  ];
  //o commit seta dados no state, através de uma mutation
  commit('SET_LOGS', logs);
};

export default {
  loadLogs,
  createLog,
  setNewLog,
};

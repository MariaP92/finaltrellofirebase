import createStore from 'redux-zero'

const initialState = {
   stages: [ ],
   tasks: [ ],
   boards: [ ],
   successLogin : false,
   user : {
      id : null,
      email :  null,
      userName :  null,
      lastName :  null,
      pass :  null,
      userStages : [],
      userTasks: [],
      boards: []      
   }  
};

const store = createStore (initialState);
export default store;   
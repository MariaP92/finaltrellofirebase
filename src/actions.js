import store from "./store";
import firebase from "firebase"

var config = {
    apiKey: "AIzaSyBZPDF1kdD28vCy--aZXHjK_VJcx2VU1uk",
    authDomain: "trello-c3837.firebaseapp.com",
    databaseURL: "https://trello-c3837.firebaseio.com",
    projectId: "trello-c3837",
    storageBucket: "trello-c3837.appspot.com",
    messagingSenderId: "828700090026"
};
firebase.initializeApp(config);

const database = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();
let userID = null;

export function readBoard() {
    firebase.database().ref('stages').on('value', res => {
        let stages = []
        res.forEach(snap => {
            const stage = snap.val();
            stages.push(stage);
        })

        store.setState({

            stages: stages

        })

        // store.setState({
        //     user: {
        //         userStages : stages
        //     }
        // })
    });

    firebase.database().ref('tasks').on('value', res => {
        let tasks = [];
        res.forEach(snap => {
            const task = snap.val();
            tasks.push(task)
        })
        store.setState({
            tasks: tasks
        })
    });

    firebase.database().ref('boards').on('value', res => {
        let boards = [];
        res.forEach(snap => {
            const board = snap.val();
            boards.push(board)
        })
        store.setState({
            boards: boards
        })
    });
}

export function addStage(text) {


    let stages = [...store.getState().stages];
    stages.push(text)
    firebase.database().ref('stages').push(text);

    firebase.database().ref('users/' + userID + '/stages/').push({
        title: text,
        user_id: userID
    }).then(res => {
        console.log('board id: ', res.key)
    });

}

export function addTask(stage, text) {

    // let userTasks = [...store.getState().user.userTasks];
    // let newUserTask = {
    //     id: store.getState().user.userTasks.length,
    //     title: text,
    //     stage: stage
    // }
    // console.log(userID);

    /**ttttt */
    console.log('addTask:', stage + ' - ' + text);

    let tasks = [...store.getState().tasks];
    let newTask = {
        id: store.getState().tasks.length,
        title: text,
        stage: stage,
        userID : userID
    }

    database.ref('users/' + userID + '/tasks/' + newTask.id).set(newTask);

    firebase.database().ref('tasks/' + newTask.id).set(newTask);
    console.log("addtask" + userID);
}

/**LOG IN -LOG OUT -SIGN IN */
export function signUp(UserName, fullname, email, pass) {
    console.log('signUp ' + fullname + email + pass);

    auth.createUserWithEmailAndPassword(email, pass).then(user => {
        let newuser = {
            UserName, fullname, email, pass
        }
        database.ref('users/' + user.uid).set(newuser);


        // database.ref ('users/' + user.uid + '/options').update ( 'option1, option2, option3...');   
        //  database.ref ('users/').push (newuser);   

        database.ref('users/' + user.uid).once('value').then(res => {
            const fullUserInfo = res.val();

            console.log('full info ', fullUserInfo);
            store.setState({
                user: {
                    id: user.uid,
                    email: fullUserInfo.email,
                    userName: fullUserInfo.UserName,
                    lastName: fullUserInfo.fullname
                }
            })
        })

    })

}

export function signOut() {
    auth.signOut();
    store.setState({
        successLogin: false,
        user: {
            id: '',
            email: ''
        }
    })
}

export function signIn(user, pass) {
    auth.signInWithEmailAndPassword(user, pass).then(userObj => {

        database.ref('users/' + userObj.uid).once('value').then(res => {
            const fullUserInfo = res.val();

            console.log('full info ', fullUserInfo);
            store.setState({
                user: {
                    id: user.uid,
                    email: fullUserInfo.email,
                    userName: fullUserInfo.UserName,
                    lastName: fullUserInfo.fullname
                }
            })
        })
    })
}


auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user', user);
        userID = user.uid;
        console.log(userID);
        let usersRef = database.ref('/users');
        let userRef = usersRef.child(user.uid);
        store.setState({
            successLogin: true
        })
    }
});
export function addBoard(text) {


    let boardsUser = [...store.getState().boards];
    console.log("before", store.getState().boards);

    store.getState().boards.push({ text, userID });
    console.log("after", store.getState().boards);
    firebase.database().ref('boards').push(text);
    firebase.database().ref('users/' + userID + '/boards/').push({
        title: text,
        user_id: userID
    }).then(res => {
        console.log('board id: ', res.key)
    });

}
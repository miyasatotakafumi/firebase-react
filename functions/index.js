const functions = require('firebase-functions');

//Expressの読み込み
const express = require("express");
const requestPromise = require('request-promise-native');
const cors = require('cors');


const app = express();

app.use(cors());

//APIにリクエストを送る関数を定義
const getDataFromApi = async keyword =>{
    const requestUrl = 'https://www.googleapis.com/books/v1/volumes?country=JP&q=intitle:';
    const result = await requestPromise(`${requestUrl}${keyword}`);
    return result
}

app.get('/hello',(req,res)=>{
    res.send('Hello Express');
});

//エンドポイントを追加
app.get('/user/:userId',(req,res)=>{
    const users =[
        {id:1, name:'ジョナサン'},
        {id:2, name:'ジョセフ'},
        {id:3, name:'承太郎'},
        {id:4, name:'与助'},
        {id:5, name:'ジョルノ'},
    ];
    //const targetUser.useIdで後ろにつけた値をとれる
    const targetUser = users.find(user => user.id === Number(req.params.userId));
    res.send(targetUser);
});

app.get('/gbooks/:keyword', async (req,res)=>{
    //APIリクエストの関数を実行
    const response = await getDataFromApi(req.params.keyword);
    res.send(response);
})

//出力
const api = functions.https.onRequest(app);
module.exports = {api};


//local
// http://localhost:5000/react-nodejs-firebase/us-central1/helloWorld

//deploy
// https://us-central1-react-nodejs-firebase.cloudfunctions.net/helloWorld

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
//  exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
//  });

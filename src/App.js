import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { json } from 'body-parser';

function Login(props) {
  const [id, setId] = useState("");
  const [studentid, setStudentid] = useState("");

  return <>
    <h2>로그인</h2>

    <div className="form">
      <p><input className="login" type="text" name="username" placeholder="이름" onChange={event => {
        setId(event.target.value);
      }}/></p>
      <p><input className="login" type="studentid" name="std" placeholder="학번" onChange={event => {
        setStudentid(event.target.value);
      }}/></p>

      <p><input className='btn' type="submit" value="로그인" onClick={() => {
        const userData = {
          userId: id,
          userStd: studentid,
        };
        fetch("http://localhost:3001/login", {//auth 주소에서 받을 예정
          method: "post", //method: 통신방법
          headers: {      //headers: API 응답에 대한 정보를 담음
            "content-type": "application/json",
          },
          body: JSON.stringify(userData), //userData라는 객체를 보냄})
      })
        .then((res) => res.json())
        .then((json) => {
          if(json.isLogin==="True"){
            props.setMode("WELCOME");
          }
          else {
            alert(json.isLogin)
          }
        });
      }} /></p>
    </div>

    <p>계정이 없으신가요? <button onClick={() => {
      props.setMode("SINGIN");
    }}>회원가입</button></p>
  </>
}

function Signin(props) {
  const [id, setId] = useState("");
  const [studentid, setStudentid] = useState("");
  const [studentid2, setStudentid2] = useState("");

  return <>
    <h2>회원가입</h2>

    <div className='form'>
      <p><input className='login' type="text" placeholder='이름' onChange={event => {
        setId(event.target.value);
      }} /></p>
      <p><input className='login' type="studentid" placeholder='학번' onChange={event => {
        setStudentid(event.target.value);
      }}/></p>
      <p><input className='login' type="studentid" placeholder='학번 확인' onChange={event => {
        setStudentid2(event.target.value);
      }}/></p>

      <p><input className='btn' type="submit" value="회원가입" onClick={() => {
        const userData = {
          userId: id,
          userStd: studentid,
          userStd2: studentid2,
        };
        fetch("http://localhost:3001/singin", { //signin 주소에서 받을 예정
          method: "post", //method: 통신방법
          headers: { //headers: API 응답에 대한 정보를 담음
            "content-type": "application/json",
          },
          body: JSON.stringify(userData), //userData라는 객체를 보냄
        })
          .then((res) => res.json())
          .then((json) => {
            if(json.isSuccess == "True"){
              alert('회원가입이 완료되었습니다!')
              props.setMode("LOGIN");
            }
            else{
              alert(json.isSuccess)
            }
          });
      }} /></p>
    </div>

    <p>로그인 화면으로 돌아가기 <button onClick={()=> {
      props.setMode("LOGIN");
    }}>로그인</button></p>
  </>
}

function App() {
  const [mode, setMode] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/authcheck")
    .then((res) => res.json())
    .then((json) => {
      if(json.isLogin === "True") {
        setMode("WELCOME");
      }
      else {
        setMode("LOGIN");
      }
    });
  },[]);
  let content = null;

  if(mode==="LOGIN"){
    content = <Login setMode={setMode}></Login>
  }
  else if(mode === 'SINGIN') {
    content = <Signin setMode={setMode}></Signin>
  }
  else if(mode === 'WELCOME'){
    content = <>
    <h2>메인 페이지에 오신 것을 환영합니다.</h2>
    <p>로그인에 성공하셨습니다.</p>
    <a href='/logout'>로그아웃</a>
    </>
  }
  return (
    <>
    <div className='background'>
      {content}
    </div>
    </>
  );
 }

export default App;

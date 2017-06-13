/**
 * Created by mkhong on 2017-06-13.
 * 중복로그인 제어 socket.io 스크립트
 */
let login = {};

// 현재 로그인 세션 정보
login.loginInfo = {};

// 로그인 초기화
login.init = (email, key, socket) => {
  if (!email) {
    return;
  }

  if (!login.loginInfo[email]) {
    login.loginInfo[email] = {};
  }
  if (!login.loginInfo[email][key]) {
    login.loginInfo[email][key] = [];
  }

  Object.keys(login.loginInfo[email]).forEach(k => {
    if (k === key) {
      login.login(socket, email, k);
    } else {
      login.logout(socket, email, k);
    }
  });
};

// 로그인 처리
login.login = (socket, email, key) => {
  try{
    login.loginInfo[email][key].push(socket.id);
  }catch (e) {
    console.error('Login Error', e);
  }
};

// 로그아웃 처리
login.logout = (socket, email, key) => {
  try {
    login.loginInfo[email][key].forEach(id => {
      console.log('Logout To email : ' + email + ' / id : ' + id);
      socket.broadcast.to(id).emit('logout');
    });
    delete login.loginInfo[email][key];
  } catch (e) {
    console.error('Logout Error' , e);
  }
};

// 접속 해제시 LoginInfo 데이터 정리
login.disConnect = (socket) => {
  Object.keys(login.loginInfo).forEach(email => {
    let keysArr = Object.keys(login.loginInfo[email]);
    if (keysArr.length > 0) {
      keysArr.forEach(key => {
        if (login.loginInfo[email][key].length > 0) {
          login.loginInfo[email][key] = login.loginInfo[email][key].filter(row_id => {
            if (row_id !== socket.id) {
              return true;
            } else {
              delete login.loginInfo[email];
              return false;
            }
          });
        }
      });
    }
  });
};

module.exports = login;
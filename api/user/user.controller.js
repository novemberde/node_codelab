const models = require('../../models');

exports.create = (req, res) => {
  const name = req.body.name || '';
  
  if (!name.length) {
    return res.status(400).json({error: 'Incorrenct name'});
  }

  models.User.create({
    name: name
  }).then((user) => res.status(201).json(user));
};

exports.index = (req, res) => {
  models.User.findAll()
      .then(users => res.json(users));
};

exports.show = (req, res) => {
  const id = req.params.id || '';

  models.User.findOne({
    where: {
      id: id
    }
  }).then(user => {
    if (!user) {
      return res.status(404).json({error: 'No User'});
    }

    return res.json(user);
  });
};

exports.destroy = (req, res) => {
  const id = req.params.id || '';

  models.User.destroy({
    where: {
      id: id
    }
  }).then( result => {
    console.log(result);//삭제된 갯수
    res.status(204).send()
  });
};

/*
let users = [
  {
    id: 1,
    name: 'aaa'
  },
  {
    id: 2,
    name: 'bbb'
  },
  {
    id: 3,
    name: 'ccc'
  }
];


exports.index = (req, res) => {
  res.json(users);//json으로 보내주는 역할
}

exports.show = (req, res) => {
  //id// params에 있는 값은 모두 문자열이다!. 정수형으로 바꾸어 주어야 한다.
  const id = parseInt(req.params.id, 10);//10진법 수로 바꾼다.

  if ( !id ){ //NaN은 false임! 즉, 아이디 값이 없을때
    return res.status(400)//함수 체이닝. 함수를 사용하고 res를 리턴하기 때문!!
              .json({error: 'Invalid id'});//상태코드 응답 Bad Request
      //return; 이렇게 해도됨. 위에 return도 되고.
  }

  //users //filter는 순회하면서 콜백함수가 동작한다. 유저객체를 리턴함. // 새로운 유저 배열을 리턴함
  //const user = users.filter( user => user.id === id )[0];//이것도 가능
  const user = users.filter( user => user.id === id ).pop();//못찾아서 빈 배열일 경우는 pop()은 undefined를 리턴한다.
  if ( !user ){//유저가 없다면
    return res.status(404)
              .json({error: 'No user'});//에러 처리는 확실히 해야한다.
  }

  //response
  res.status(200).json(user);//200은 디폴트이기 때문에 안써도 무방하다.
};

exports.destroy = (req,res) => {
  //id// params에 있는 값은 모두 문자열이다!. 정수형으로 바꾸어 주어야 한다.
  const id = parseInt(req.params.id, 10);//10진법 수로 바꾼다.

  if ( !id ){ //NaN은 false임! 즉, 아이디 값이 없을때
    return res.status(400)//함수 체이닝. 함수를 사용하고 res를 리턴하기 때문!!
              .json({error: 'Invalid id'});//상태코드 응답 Bad Request
      //return; 이렇게 해도됨. 위에 return도 되고.
  }

  //index
  const userIndex = users.findIndex( user => {
    return user.id === id;
  });//사용할 수 없을 때 -1을 리턴한다.
  if (userIndex === -1) {
    return res.status(404)
              .json({error: 'No user'});
  }

  //remove
  users.splice( userIndex, 1 );//어느위치에서 몇개를 삭제할 것인가.

  //response
  res.status(204).send();//No content
}

exports.create = (req, res) => {
  const name = req.body.name.trim() || false;//좌우 공백 제거.

  if (!name) {
    return res.status(400)
              .json({error: 'Invalid name'});
  }

  const id = users.reduce( (maxId, user) => {//result은 return할 값. user는 초기값!
    return maxId = user.id > maxId ? user.id :maxId;
    /*if (user.id > maxId) {
      maxId = user.id;
    }
    return maxId;
  }, 0) + 1;//최대 id +1

  const newUser = {
    id: id,
    name: name
  };

  users.push(newUser);

  res.status(201).json(newUser);
}
*/

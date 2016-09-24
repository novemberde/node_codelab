
/*
const assert = require('assert');


describe('GET /users', () => {
  it('true is true', () => {
    assert.equal(true, true);//두 값이 같으면 그냥 진행, 다르면 에러 발생
  });
});
*/
/*
const should = require('should');

describe('GET /users', () => {
  it('Should return 200 status code', (done) => {
    (true).should.be.euqal(true);
  });
});
*/
const should =require('should');
const request = require('supertest');
const app = require('../../app');//app.js를 가져오기!!

describe('GET /users', () => {
  it('should return 200 status code', (done) => {//done은 또 다른 콜백함수임.
    request(app)//비동기 방식으로 동작된다.
        .get('/users')
        .expect(200)
        .end((err, res) => {
          if (err) throw err;

          console.log(res.body);
          res.body.should.be.instanceof(Array);//body의 형태는 Array형태이어야만 한다.
          res.body.should.be.have.length(3);
          res.body.forEach( (user) => { //배열을 순회하면서 user를 반환
            user.should.have.properties( 'id', 'name');
            user.id.should.be.a.Number();
            user.name.should.be.a.String();
          });
            // [{id: 1, name: 'Alice'} ... ]

          done();//매개변수가 함수이다. 이것을 실행함!!
        })
  });
});

describe('GET /users/:id', () => {
  it( 'should return user object',done => {
    request(app)//비동기 방식으로 동작된다.
        .get('/users')
        .expect(200)
        .end((err, res) => {
          if (err) throw err;

          res.body.forEach( (user) => { //배열을 순회하면서 user를 반환
            user.should.have.properties( 'id', 'name');
            user.id.should.be.a.Number();
            user.name.should.be.a.String();
          });

          done();//매개변수가 함수이다. 이것을 실행함!!
        })
  });
  it( 'should return 400 on invalid id',done => {
    request(app)
        .get('/users/abs')
        .expect(400)
        .end( (err, res) => {
          if (err) throw err;
          res.body.should.have.property('error');
          done();
        });
  });
  it( 'should return 404 on no id',done => {
    request(app)
        .get('/users/abs')
        .expect(404)
        .end( (err, res) => {
          if (err) throw err;
          res.body.should.have.property('error');
          done();
        });
    done();
  });
});

describe('DELETE /users/:id', () => {
  it( 'should return status 204 no content', done => {
    request(app)
      .delete('/users/1')
      .expect(204)
      .end( (err, res) => {
        if (err) throw err;

        done();
      });
  });

  it( 'should return status 400 bad request', done => {
    request(app)
      .delete('/users/aa')
      .expect(400)
      .end( (err, res) => {
          if (err) throw err;

          res.body.should.have.property('error');
          done();
      });
  });

  it( 'should return status 404 no user', done => {
    request(app)
      .delete('/users/7')
      .expect(404)
      .end( (err, res) => {
          if (err) throw err;

          res.body.should.have.property('error');

          done();
      });
  });
});

describe/*.only*/( 'POST /users', () => {
  it( 'should return 201 created', done => {
    request(app)
      .post('/users')
      .send( { name: "ddd" } )
      .expect(201)
      .end( (err, res) => {
        if (err) throw err;
        done();
      });
  });

  it( 'sould return 400 invalid name', () => {
    request(app)
      .post('/users')
      .send( { name: "     "})
      .expect(400)
      .end( (err, res) => {
        if (err) throw err;
        res.body.should.have.property('error');
        done();
      });
  });
});

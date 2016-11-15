import Account from '../models/account';
import Access from '../models/access';
import passport from 'passport';

import uuid from 'uuid';


/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function registerUser(req, res, next) {
  console.log('registering user');
  Account.register(new Account({username: req.body.username, profile:req.body.profile}), req.body.password, function(err) {
    if (err) {
      console.log('error while user register!', err);
      res.json({error:err, token:false});
      return next(err);
    }
    console.log('user registered!');

    ///Du exp

    ///Du end

    var randomKey = uuid.v1();
    const access = new Access({username: req.body.username, key:randomKey});
    access.save((err, token) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      else {
        res.json({error: false, token: token});
      }
    });
  });
}

export function loginUser(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      res.status(500).send(err);
      return next(err);
    }
    if (!user) {
      res.json({error: 'Authentification failed!', token: false});
      return;
    }

    Access.findOne({username: req.body.username}).exec((err, token) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return next(err);
      }
      else {
        var randomKey = uuid.v1();
        token.key = randomKey;
        token.save((err, token) => {
          if (err) {
            console.log(err);
            res.status(500).send(err);
            return next(err);
          }
          else {
            res.json({error: false, token: token});
          }
        });
      }
    });
  })(req, res, next);
}


export function userProfile(req, res) {
  Access.findOne({username: req.body.token.username}).exec((err, token) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
      return next(err);
    }
    else {
      if (token.key === req.body.token.key) {
        Account.findOne({username: req.body.token.username}).exec((err, user) => {
          if (err) {
            console.log(err);
            res.status(500).send(err);
            return next(err);
          }
          if (!user) {
            res.json({error: 'fatal: no record for valid user', message: false});
            return;
          }
          res.json({error: false, message: user.profile});
        })
      }
      else {
        res.json({error: 'you are not logged in!', token: false});
      }
    }
  });
}


export function logoutUser(req, res) {
  Access.findOne({username: req.body.token.username}).exec((err, token) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
      return next(err);
    }
    else {
      if (token.key === req.body.token.key) {
        var randomKey = uuid.v1();
        token.key = randomKey;
        token.save((err, token) => {
          if (err) {
            console.log(err);
            res.status(500).send(err);
            return next(err);
          }
          else {
            res.json({error: false, token: false});
          }
        });
      }
      else {
        res.json({error: 'you are not logged in!', token: false});
      }
    }
  });
}

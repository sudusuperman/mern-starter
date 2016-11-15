import Account from '../models/account';
import Access from '../models/account';

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function registerUser(req, res) {
  /*Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ posts });
  });*/
  res.json({error:false, token:{username:req.body.username, key:'registerUser'}});
  //or res.json({error:false, token:false});
}


export function loginUser(req, res) {
  /*Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ posts });
  });*/
  var token = {
    key:'loginUser',
    username: req.body.username,
  }
  res.json({error:false, token:token});
}


export function userProfile(req, res) {
  /*Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });
  });*/
  var token = {
    key:'userProfile',
    username: req.body.username,
  }
  res.json({error:false, token:token});
}


export function logoutUser(req, res) {
  /*Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ posts });
  });*/
  res.json({error:false, token:{username:req.body.username, key:'logoutUser'}});
}

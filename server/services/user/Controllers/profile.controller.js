const User = require('../../../models/User')
const createError = require('http-errors')
const { authSchema } = require('../helpers/validationSchema')
const { signAccessToken, signRefreshToken, verifyRefreshToken, verifyUserRole } = require('../helpers/jwt_helper')

module.exports = {

        getAll: async (req, res) => {
            await User.find()
            .then(data => {
              res.send({users : data});
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving users."
              });
            });
        },

        getOne:async (req, res, next) => {
            try {
              const user = await User.findById(req.params['id'])
              if (!user) throw createError.BadRequest("User not found")
              else res.send({data : user})
            } catch (error) {
              next(error);
            }
          },

        delete:  async (req, res) => {
            try {
              const user = await User.findById(req.params['id'])
              if (!user) throw createError.BadRequest("User not found")
              
              else{
                user.delete();
                res.status(200).json("Account has been deleted");
              } 
            } catch (err) {
              return res.status(500).json(err);
            } 
        },

        update: async (req, res, next) => {

            try {
              await authSchema.validateAsync(req.body)
             
              const user = await User.findById(req.params['id'])
              if (!user) throw createError.BadRequest("User not found")

                  if ({ email } = req.body) {
                   
                     const exist = await User.findOne({email : email}) 
                    
                  if(exist) 
                      throw createError.Conflict(`${email} is already been registered`)
                  }
        
                  if ({ username } = req.body) {
                    const exist = await User.findOne({username : username})
                 if(exist) 
                     throw createError.Conflict(`${username} is already been registered`)
                 }
                     
              await user.set(req.body) 
              await user.save()
        
              res.send({ data: user });
        
            } catch (error) {
              if (error.isJoi === true) error.status = 422
                    next(error)
            }
               
        },

        follow: async (req, res, next)=>{
            try {
              if(req.params['idUser'] != req.params['idUserToFollow']){
          
                const user = await User.findById(req.params['idUser'])
                if (!user) throw createError.BadRequest("User not found")
          
                const userToFollow = await User.findById(req.params['idUserToFollow'])
                if (!userToFollow) throw createError.BadRequest("User not found")
                
                if (!user.follows.includes(userToFollow._id)){
                  
                user.follows.push(userToFollow._id)
                userToFollow.followers.push(user._id)
          
                await userToFollow.save()
                await user.save()
                res.status(200).json("User followed");
                }else{
                res.status(403).json("User already followed")
                }
              }else{
                res.status(403).json("You can't follow yourself")
              }
          
            } catch (error) {
              next(error)
            }
          
          
          },

          unfollow: async (req, res, next) => {
            try {
                if(req.params['idUser'] != req.params['idUserToFollow']){
          
                  const user = await User.findById(req.params['idUser'])
                  if (!user) throw createError.BadRequest("User not found")
            
                  const userToUnfollow = await User.findById(req.params['idUserToFollow'])
                  if (!userToUnfollow) throw createError.BadRequest("User not found")
          
                  if (user.follows.includes(userToUnfollow._id)){
                  
                    user.follows.pull(userToUnfollow._id)
                    userToUnfollow.followers.pull(user._id)
              
                    await userToUnfollow.save()
                    await user.save()
                    res.status(200).send({ data: user });
                  }else{
                    res.status(403).json("User not followed")
                  }
          
                }else{
                  res.status(403).json("You can't unfollow yourself")
                }
            }catch (error) {
              next(error)
            }
          },

          getFollowers:async (req, res) => {
            try {
              const user = await User.findById(req.params['id'])
              if (!user) throw createError.BadRequest("User not found")
              
              const followers = await Promise.all(
                user.followers.map((followerId) => {
                  return User.findById(followerId);
                })
              );
              let friendList = [];
              followers.map((follower) => {
                const { _id, username, profile } = follower;
                friendList.push({ _id, username, profile });
              });
          
              res.status(200).json(friendList)
            } catch (err) {
              res.status(500).json(err.message);
            }
          },

          getFollowing:async (req, res) => {
            try {
             const user = await User.findById(req.params['id'])
              if (!user) throw createError.BadRequest("User not found")
              
              const follows = await Promise.all(
                user.follows.map((followerId) => {
                  return User.findById(followerId);
                })
              );
              let friendList = [];
              follows.map((follows) => {
                const { _id, username, profile } = follows;
                friendList.push({ _id, username, profile });
              });
             
              res.status(200).json(friendList)
            } catch (err) {
              res.status(500).json(err.message);
            }
          },

          confirmPasswordUpdate: async (req, res) =>{
            try {
              const user = await User.findById(req.params['id'])
              if (!user) throw createError.BadRequest("User not found")

              const refreshToken = await signRefreshToken(savedUser.id)
              sender(user.email,refreshToken,req.headers.host,user.username)
            } catch (error) {
              
            }
          },

          resetPassword: async (req, res) =>{
            // try {
            //   const user = await User.findById(req.params['id'])
            //   if (!user) throw createError.BadRequest("User not found")

            //   const refreshToken = await signRefreshToken(savedUser.id)
            //   sender(user.email,refreshToken,req.headers.host,user.username)
            // } catch (error) {
              
            // }
          }


    
}
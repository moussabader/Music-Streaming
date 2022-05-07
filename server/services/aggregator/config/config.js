const serverSettings = {
    port: process.env.PORT || 3000
    //ssl: require('./ssl')
  }

const servicesSettings = {
  services:{
    auth:{
      url:"http://localhost",
      port:3001
    },
    streaming:{
    url:"http://localhost",
    port:3002
    },
    user:{
    url:"http://localhost",
    port:3003
    }
  }
}
  
export default Object.assign({}, {serverSettings, servicesSettings })
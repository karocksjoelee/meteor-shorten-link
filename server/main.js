import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/links'
import { WebApp } from 'meteor/webapp';
import ConnectRoute from 'connect-route';

Meteor.startup(() => {
  // code to run on server at startup
  // Setup the publish (offer the data)
  Meteor.publish('links',function(){
    return Links.find({});
  });
});

// Executed whenever a user visited a route like localhost:3000/abcd
// next is a reference to the next middleware to run
function onRoute(req,res,next){ 
  // Take the token out of the url and try to find a matching link in the Links collections
  const link = Links.findOne({token:req.params.token});
  if(link){
    // We have to update to the Mongo Data Base , $inc = increment
    Links.update(link,{ $inc:{clicks:1} });
    // If we find a link object, redirect the user to the long url
    res.writeHead(307,{'Location': link.url });
    res.end(); 
  }else{
    // If we don't find a link object , send the user to our normal React App
    next();
  }
}

// We watch anyone attempting want to visit the link by Middleware .Middleware handles every http.request
const middleware = ConnectRoute(function(router){
  // localhost:3000/ -- NO MATCH
  // localhost:3000/books/harry_porter -- NO MATCH
  // localhost:3000/abcd -- MATCHED !!
  router.get('/:token',onRoute);
});

// WebApp is part of Meteor
WebApp.connectHandlers.use(middleware);
import { Mongo} from 'meteor/mongo';
import validUrl from 'valid-url';
import { check , Match } from 'meteor/check';

// The purpose of meteor method is to update our collection/data in a secure way !
Meteor.methods({
    'link.insert': function(url){
        console.log('Attemption to save ',url);
        // Check it it is a URL (Using npm package:valid-url)
        // Valid -> Return the URL , Invalid -> Return Undefined
        check( url, Match.Where(url => validUrl.isUri(url)) );

        // Ready to Save the Url - (1)Generating a short token
        const token = Math.random().toString(36).slice(-5);
        Links.insert({ url:url, token:token , clicks:0 });

    }


});

export const Links = new Mongo.Collection('links');
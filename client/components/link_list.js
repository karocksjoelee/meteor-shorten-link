import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Links } from '../../imports/collections/links';

class LinkList extends Component {

    renderRows(){
        return this.props.links.map(link =>{
            const {url,clicks,token} = link;
            const shortLink = 'http://localhost:3000/'+token;

            return (
                <tr key={token}>
                    <td>{url}</td>
                    <td>
                        <a href={shortLink}>{shortLink}</a>
                    </td>
                    <td>
                        {clicks}
                    </td>
                </tr>
            );
        })
    }

    render(){
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>URL</th>
                        <th>Address</th>
                        <th>Clicks</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        );
    }
}

// Whenever we are consuming a publication with a subscrition . We need to turn a react-component into a container
// > import createContainer & Links Colleciton from MongoDB

// First Arg : fat arrow function , Second Arg : The Component we want inject date to 
export default createContainer( ()=> {
    Meteor.subscribe('links');
    return { links: Links.find({}).fetch() }; // Find { all the link } ,then fetch them 
},LinkList);

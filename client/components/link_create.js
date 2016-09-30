import React , { Component } from 'react';

class LinkCreate extends Component {

    constructor(props){
        super(props);
        // Whenever we use Component state , we have to initalize it in our constructor !
        this.state = {error:''};

    }

    handleSubmit(event){
        // using event argument to prevent browser reload
        event.preventDefault();

        console.log(this.refs.input.value);
        Meteor.call('link.insert',this.refs.input.value, (error) =>{
            if(error){
                // Whenever we called setState , it cause our Component instant rerender !!
                this.setState({error:'Please Enter A Valid URL !'});
            }else{
                this.setState({ error:''});
                // Clear the input field !
                this.refs.input.value= '';
            }
        });

    }

    render(){
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                    <label>Link To Shorten</label>
                    <input ref="input" className="form-control" />
                </div>
                <button className="btn btn-primary">Shorten It !</button>
                <div className="text-danger">{this.state.error}</div>
            </form>
        );
    }

}

export default LinkCreate;
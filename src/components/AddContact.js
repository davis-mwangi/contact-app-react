import React from "react";
import { useNavigate } from 'react-router-dom';

class AddContact extends React.Component {
    state = {
        name: "",
        email: ""
    }

    add = (e) => {
        e.preventDefault();

        if (this.state.name === "" || this.state.email === "") {
            alert("All the fields are manadatory");
            return;
        }
        this.props.addContactHandler(this.state);
        //clear the state
        this.setState({ name: "", email: "" });

        // You can now use navigate to programmatically navigate to different routes
        const navigate = useNavigate();
        navigate("/", { replace: true } );
    }

    render() {
        return (
            <div className="ui main">
                <h2>Add Contact</h2>
                <form className="ui form" onSubmit={this.add}>
                    <div className="field">
                        <label>Name</label>
                        <input type="text" name="name"
                            placeholder="Name"
                            value={this.state.name}
                            onChange={(e) => this.setState({ name: e.target.value })}></input>
                    </div>

                    <div className="field">
                        <label>Email</label>
                        <input type="text" name="email" placeholder="xyx@yopmail.com"
                            value={this.state.email}
                            onChange={(e) => this.setState({ email: e.target.value })}></input>
                    </div>
                    <button className="ui button blue">
                        Add
                </button>

                </form>
            </div>
        )
    };
};

export default AddContact;
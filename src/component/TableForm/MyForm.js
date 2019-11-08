import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

export default class MyForm extends React.Component {
    state = {
        name: "",
        responseData: "",
        Access: "",
        usernameError: "",
        Resolve: "",
    };

    change = e => {
        // this.props.onChange({ [e.target.name]: e.target.value });
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    validate = () => {
        let isError = false;
        const errors = {
            usernameError: "",
        }

        this.setState({
            ...this.state,
            ...errors
        });

        return isError;
    };

    onSubmit = e => {
        e.preventDefault();
        const err = this.validate();
        if (!err) {
            this.props.onSubmit(this.state);
            // clear form
            this.setState({
                name: "",
                firstNameError: "",
                responseData: "",
                lastNameError: "",
                Access: "",
                usernameError: "",
                Resolve: "",
                emailError: "",
                password: "",
                passwordError: ""
            });
        }
    };

    render() {
        return (
            <form style={{textAlign: 'center'}}>
                <TextField
                    name="name"
                    hintText="Название"
                    floatingLabelText="Название"
                    value={this.state.name}
                    onChange={e => this.change(e)}
                    errorText={this.state.firstNameError}
                    floatingLabelFixed
                />
                <br />
                <TextField
                    name="responseData"
                    hintText="Получаемые данные"
                    floatingLabelText="Получаемые данные"
                    value={this.state.responseData}
                    onChange={e => this.change(e)}
                    errorText={this.state.lastNameError}
                    floatingLabelFixed
                />
                <br />
                <TextField
                    name="Access"
                    hintText="Доступ"
                    floatingLabelText="Доступ"
                    value={this.state.Access}
                    onChange={e => this.change(e)}
                    errorText={this.state.usernameError}
                    floatingLabelFixed
                />
                <br />
                <TextField
                    name="Resolve"
                    hintText="Реализован"
                    floatingLabelText="Реализован"
                    value={this.state.Resolve}
                    onChange={e => this.change(e)}
                    floatingLabelFixed
                />
                <br />
                <RaisedButton label="Submit" onClick={e => this.onSubmit(e)} primary />
            </form>
        );
    }
}
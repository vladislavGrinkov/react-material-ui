import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import MyForm from './TableForm/MyForm';
import ReactTable from "./TableForm/ReactTable";
import Button from "@material-ui/core/Button";
import NativeSelect from "@material-ui/core/NativeSelect";
import TextField from "material-ui/TextField";
import orderBy from "lodash/orderBy";

class PrivatePage extends Component {
    state = {
        data: [
            {
                name: "Tann",
                responseData: "Gounin",
                Access: "tgounin0",
                Resolve: "tgounin0@wordpress.com",
            },
            {
                name: "Elana",
                responseData: "Ricioppo",
                Access: "ericioppo1",
                Resolve: "ericioppo1@timesonline.co.uk",
            },
            {
                name: "Bentlee",
                responseData: "Decourt",
                Access: "bdecourt2",
                Resolve: "bdecourt2@about.me",
            },
            {
                name: "Hyacintha",
                responseData: "Choudhury",
                Access: "hchoudhury3",
                Resolve: "hchoudhury3@va.gov",
            },
            {
                name: "Ari",
                responseData: "Spedroni",
                Access: "aspedroni4",
                Resolve: "aspedroni4@sun.com",
            },
            {
                name: "Abelard",
                responseData: "Rodriguez",
                Access: "arodriguez5",
                Resolve: "arodriguez5@shutterfly.com",
            },
        ],
        editIdx: -1,
        isOpen: false,
        sortDirection: 'desc',
        query: '',
        columnToQuery: 'names'
    };

    tokenOut = () => {
        console.log('here');
        localStorage.clear();
        window.location.reload();
    };

    handleRemove = (i) => {
      this.setState(state => ({
        data: state.data.filter((row, j) => j !== i)
      }));
    };

    startEditing = (i) => {
        this.setState({editIdx: i})
    };

    stopEditing = () => {
        this.setState({editIdx: -1})
    };

    handleChange = (e, name, i) => {
        const {value} = e.target;
        this.setState(state => ({
            data: state.data.map((row, j) => j === i ? ({...row, [name]: value})  : row)
        }));
    };

    render() {
        return (
            <div>
                <Button variant="contained" color="secondary" onClick={this.tokenOut}>
                    Logout
                </Button>
                <MuiThemeProvider>
                    <div className="App">
                        <Button variant="contained" color="primary" onClick={() =>
                            this.setState({isOpen: !this.state.isOpen})}>
                            Добавить
                        </Button>
                        {this.state.isOpen ?
                            <MyForm
                                onSubmit={submission =>
                                    this.setState({
                                        data: [...this.state.data, submission]
                                    })}
                            />
                            : null
                        }
                        <div style={{textAlign: "right"}}>

                            <TextField
                                hintText="Query"
                                floatingLabelText="Query"
                                value={this.state.query}
                                onChange={(event) => this.setState({ query: event.target.value })}
                                floatingLabelFixed
                            />


                        <NativeSelect
                            id="demo-customized-select-native"
                            value={this.state.columnToQuery}
                            onChange={(event, index) => {
                                this.setState({columnToQuery: event.target.value});
                                console.log(event.target.value);
                            }}
                        >
                            <option value={'name'}>Название</option>
                            <option value={'responseData'}>Получаемые данные</option>
                            <option value={'Access'}>Доступ</option>
                            <option value={'Resolve'}>Реализован</option>
                        </NativeSelect>
                        </div>

                        <ReactTable
                            handleRemove={this.handleRemove}
                            startEditing={this.startEditing}
                            editIndex={this.state.editIdx}
                            handleChange={this.handleChange}
                            stopEditing={this.stopEditing}
                            data={
                                orderBy(
                                    this.state.query && this.state.query !== ''
                                        ? this.state.data.filter(x =>
                                            x[this.state.columnToQuery].includes(this.state.query))
                                        :
                                        this.state.data,
                                    this.state.columnToQuery,
                                    this.state.sortDirection
                                )
                            }
                            header={[
                                {
                                    name: "Название",
                                    prop: "name"
                                },
                                {
                                    name: "Получаемые данные",
                                    prop: "responseData"
                                },
                                {
                                    name: "Доступ",
                                    prop: "Access"
                                },
                                {
                                    name: "Реализован",
                                    prop: "Resolve"
                                }
                            ]}
                        />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default PrivatePage;

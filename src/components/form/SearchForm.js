import React, { Component } from "react";
import OutLinedSelect from "./OutlinedSelect";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const classes = {
    mainSearchContainer: {
        width: "70%",
        margin: "auto",
    },
    mainSearchContainer__form: {
        width: "100%",
        margin: "auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    mainSearchContainer__searchText: {
        width: "60%",
    },
    mainSearchContainer__searchType: {
        width: "30%",
    },
    label: {
        backgroundColor: "white",
    },
};

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: {
                searchText: "",
                searchType: "movie",
            },
            isSearchClicked : false
        };
    }

    searchTypeData = {
        name: "Search Type",
        options: ["movie", "multi", "tv"],
        value: "movie",
    };
    changeSelectedValue = (value) => {
        this.setState({
            search : { ...this.state.search, searchType: value }
        })
    };

    getSearchResults = () => {
        this.props.handler(
            this.state.search.searchText,
            this.state.search.searchType,
        );
    };

    inputChange = (e) =>{
            this.setState({
                search : {
                ...this.state.search,
                searchText: e.target.value
            }
        }) 
        this.props.updateSearchText(e.target.value)
    }

    
    render() {
        return (
            <div style={classes.mainSearchContainer}>
                <form style={classes.mainSearchContainer__form}>
                    <TextField
                        label="Search"
                        name="searchQuery"
                        style={classes.mainSearchContainer__searchText}
                        onChange={this.inputChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <OutLinedSelect
                        data={this.searchTypeData}
                        style={classes.mainSearchContainer__searchType}
                        changeSelectedValue={this.changeSelectedValue}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.getSearchResults}
                    >
                        SEARCH
                    </Button>
                </form>
            </div>
        );
    }
}

export default React.memo(SearchForm);

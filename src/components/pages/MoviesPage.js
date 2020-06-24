import React, { Component } from "react";
import SearchForm from "../form/SearchForm";
import TabContainer from "../container/TabContainer";

class MoviesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: {},
            updateSearch:''
        };
        this.handler = this.handler.bind(this);
        this.updateSearchText = this.updateSearchText.bind(this);
    }
    updateSearchText(inputText){
        // console.log(inputText)
        this.setState({
            updateSearch:inputText
        })
    }

    handler(searchText, searchType) {
        this.setState({
            search: {
                ...this.state.search,
                searchText: searchText,
                searchType: searchType,
            },
        });
    }

    render() {
        return (
            <div>
                <SearchForm handler={this.handler} updateSearchText={this.updateSearchText} />
                <TabContainer search={this.state.search} updateSearch={this.state.updateSearch}/>
            </div>
        );
    }
}

export default React.memo(MoviesPage);

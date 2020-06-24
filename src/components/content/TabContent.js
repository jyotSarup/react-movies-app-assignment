import React, { Component } from "react";

import OutLinedSelect from "../form/OutlinedSelect";
import Pagination from "@material-ui/lab/Pagination";
import { getMoviesOrTv } from "../../services/api";
import { getSearchResults } from "../../services/api";

const classes = {
    TabContentContainer: {
        width: "80%",
        margin: "auto",
        boxShadow: "3px 5px 8px -8px black",
        display: "flex",
        flexDirection: "row",
        position: "relative",
        marginBottom: "3em",
    },
    selectBox: {
        margin: "2em auto ",
        paddingBottom: "2em",
    },
    Pagination: {
        margin: "auto",
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
    },
};

class TabContent extends Component {

    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            resultData: [],
            otherData: [],
            subType: this.props.tabOptions.options
                ? this.props.tabOptions.options[0]
                : "",
            page: 1,
            search: !this.props.tabOptions.isSubMenu
                ? this.props.search
                : false,
            searchPrompt: !this.props.tabOptions.isSubMenu
                ? "Please enter a search"
                : "",
            noResultPrompt: "",
        };
    }
    changeSelectedValue = (value) => {
        this.setState({
            subType: value,
        });
    };
    changePage = (event, pageNo) => {
        this.setState({
            page: pageNo,
        });
    };

    componentDidMount() {
        if (!this.props.tabOptions.isSubMenu ) {
            if (this.props.search.searchText !== undefined) {
                getSearchResults(
                    this.props.search.searchText,
                    this.props.search.searchType,
                    this.state.page
                )
                    .then((res) => {
                        return res;
                    })
                    .then((resData) => {
                        this.setState({
                            resultData: resData.data.results,
                            otherData: resData.data,
                            searchPrompt: "",
                            noResultPrompt: resData.data.results.length
                                ? ""
                                : "Sorry, there were no results",
                            _isMounted :true
                        });
                    })
                    .catch((err) => {
                        console.log("err", err);
                    });
            }
        } else {
            getMoviesOrTv(
                this.props.tabOptions.type,
                this.state.subType,
                this.state.page
            )
                .then((res) => {
                    return res;
                })
                .then((resData) => {
                    this.setState({
                        resultData: resData.data.results,
                        otherData: resData.data,
                    });
                })
                .catch((err) => {
                    console.log("err", err);
                });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.props.tabOptions.isSubMenu) {
            if (this.props.search.searchText !== undefined) {
                if (prevState === this.state) {
                    getSearchResults(
                        this.props.search.searchText,
                        this.props.search.searchType,
                        this.state.page
                    )
                        .then((res) => {
                            return res;
                        })
                        .then((resData) => {
                            this.setState({
                                resultData: resData.data.results,
                                otherData: resData.data,
                                searchPrompt: "",
                                noResultPrompt: resData.data.results.length
                                    ? ""
                                    : "Sorry, there were no results",
                                    _isMounted :true
                            });
                        })
                        .catch((err) => {});
                }
            }
        } else {
            getMoviesOrTv(
                this.props.tabOptions.type,
                this.state.subType,
                this.state.page
            )
                .then((res) => {
                    return res;
                })
                .then((resData) => {
                    this.setState({
                        resultData: resData.data.results,
                        otherData: resData.data,
                    });
                })
                .catch((err) => {
                    console.log("err", err);
                });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        return (
            <div style={classes.selectBox}>
                {this.props.tabOptions.isSubMenu && (
                    <OutLinedSelect
                        data={{
                            name: "Category",
                            options: this.props.tabOptions.options,
                            value: this.props.tabOptions.options[0],
                        }}
                        changeSelectedValue={this.changeSelectedValue}
                    />
                )}

                {this.state.searchPrompt && this.props.updateSearch ? (<h1>Please Initiate a search</h1>) : (this.state.searchPrompt && <h1>{this.state.searchPrompt}</h1>)}
                {this.state.noResultPrompt && (
                    <h1>{this.state.noResultPrompt}</h1>
                )}
                {this.state.resultData &&
                    this.state.resultData.map((show, index) => (
                        <div style={classes.TabContentContainer} key={index}>
                            <div>
                                {show.poster_path && (
                                    <img
                                        src={`http://image.tmdb.org/t/p/w185/${show.poster_path}`}
                                        alt="Not Found"
                                    />
                                )}
                            </div>
                            <div
                                style={{
                                    textAlign: "center",
                                    width: "60%",
                                    margin: "auto",
                                }}
                            >
                                <h3>{show.original_title}</h3>
                                <h6>
                                    Release Date: {show.release_date} |
                                    Popularity : {show.popularity}
                                </h6>
                                <small>{show.overview}</small>
                            </div>
                        </div>
                    ))}

                <Pagination
                    count={this.state.otherData.total_pages}
                    shape="rounded"
                    onChange={this.changePage}
                    style={classes.Pagination}
                />
            </div>
        );
    }
}

export default React.memo(TabContent);

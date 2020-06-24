import React,{Component} from 'react'
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import TabContent from "../content/TabContent";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box div={3}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`,
    };
}

const classes={
    root: {
        width: "90%",
        margin: "auto",
        marginTop: "3em",
        border: "2px solid black",
        marginBottom: "2em",
    }
}

class TabContainer extends Component {
    constructor(props){
        super(props)
        this.state ={
            value : 0
        }
    }
    tabOptions = [
        {
            type: "movie",
            options: ["now_playing", "popular", "top_rated", "upcoming"],
            isSubMenu: true,
        },
        {
            type: "search",
            isSubMenu: false,
        },
        {
            type: "tv",
            options: ["airing_today", "on_the_air", "popular", "top_rated"],
            isSubMenu: true,
        },
    ];
    handleChange = (event, newValue) => {
        this.setState({
            value : newValue
        });
    };

    render() {
        // console.log("tab container",this.props.updateSearch)
        return (
            <div style={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Movies" {...a11yProps(0)} />
                        <Tab label="Search Results" {...a11yProps(1)} />
                        <Tab label="TV SHOWS" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
    
                <TabPanel value={this.state.value} index={0}>
                    <TabContent tabOptions={this.tabOptions[0]} />
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    <TabContent tabOptions={this.tabOptions[1]} search={this.props.search} updateSearch={this.props.updateSearch} />
                </TabPanel>
                <TabPanel value={this.state.value} index={2}>
                    <TabContent tabOptions={this.tabOptions[2]} />
                </TabPanel>
            </div>
        );
    }
}

export default React.memo(TabContainer)
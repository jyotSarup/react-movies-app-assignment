import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const getStyles = makeStyles({
    headerContainer: {
        margin: "2em",
        border: "3px solid black",
    },
    header: {
        margin: "10px",
    },
});

function Header() {
    const classes = getStyles();
    return (
        <div className={classes.headerContainer}>
            <h1 className={classes.header}>React Movies App</h1>
        </div>
    );
}

export default Header;

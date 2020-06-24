import React, { Component } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const classes = {
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {},
    label: {
        backgroundColor: "white",
    },
};

class OutlinedSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labelData: this.props.data,
        };
        this.changeSelectedValue = this.props.changeSelectedValue;
    }

    handleChange = (event) => {
        this.changeSelectedValue(event.target.value);
        this.setState({
            labelData: { ...this.state.labelData, value: event.target.value },
        });
    };

    render() {
        return (
            <div>
                <FormControl variant="outlined" style={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">
                        {this.state.labelData.name}
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state.labelData.value}
                        onChange={this.handleChange}
                        label={this.state.labelData.name}
                    >
                        {this.state.labelData.options.map((option, index) => (
                            <MenuItem value={option} key={index}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        );
    }
}

export default React.memo(OutlinedSelect);

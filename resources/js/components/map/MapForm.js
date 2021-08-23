import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
    IconButton,
    Typography,
    Button,
    TextField,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
} from "@material-ui/core";
import * as storeActions from "./../../stores/actions";
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import SyncIcon from '@material-ui/icons/Sync';

const styles = theme => ({
    field: {
        width: '100%',
    },
});

class MapForm extends Component {
    constructor(props) {
        super(props);

        this.refFields = {
            width: createRef(),
            height: createRef(),
        };
        this.focused = false;
        this.focusTimer = 0;

        this.fieldMessages = {
            width: "map width; min: 100, max: 999",
            height: "map height; min: 100, max: 999",
        };
    }

    componentDidMount() {
        if (this.focused) {
            return;
        }

        clearTimeout(this.focusTimer);
        this.focusTimer = setTimeout(() => {
            this.focused = true;
            this.refFields.width.current.focus();
        }, 700);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.map.formErrors && this.props.map.checkErrors) {
            Object.keys(this.props.map.formErrors).every((field) => {
                this.focusField(field);
                return false;
            });
        }

        if (this.focused) {
            return;
        }
    }

    getFieldState(field) {
        const result = {
            error: false,
            message: this.fieldMessages[field],
        };

        if (!this.props.map.formErrors) {
            return result;
        }

        if (Object.keys(this.props.map.formErrors).includes(field)) {
            result.error = true;
            result.message = this.props.map.formErrors[field];
        }

        return result;
    }

    saveHandler() {
        if (this.props.map.loading) {
            return;
        }

        this.props.save();
    }

    fieldChanged(fieldName, event) {
        let fieldValue = event.target.value;

        this.props.changeFieldValue(fieldName, fieldValue);
    }

    focusField(field) {
        if (!field) {
            return;
        }

        clearTimeout(this.focusTimer);
        this.focusTimer = setTimeout(() => {
            this.refFields[field].current.focus();
        }, 500);
    }

    submitButton() {
        let buttonText = "create new map";
        let buttonIcon = <DoubleArrowIcon />;

        if (this.props.map.loading) {
            buttonIcon = <SyncIcon className={"spinIcon"} />;
            buttonText = "Loading...";
        }

        return (
            <Button
                variant={"contained"}
                color={"secondary"}
                className={clsx("mapButton", this.props.classes.field)}
                size={"large"}
                onClick={this.saveHandler.bind(this)}
                startIcon={buttonIcon}>
                {buttonText}
            </Button>
        );
    }

    render() {
        const dimensionProps = {
            step: 10,
            min: 0,
            max: 999,
        };

        const fieldState = {
            width: this.getFieldState('width'),
            height: this.getFieldState('height'),
        };

        return (
            <form noValidate autoComplete={"off"} className={"mapForm"}>
                <FormControl className="formRow" error={fieldState.width.error}>
                    <TextField
                        inputRef={this.refFields.width}
                        className={this.props.classes.field}
                        label={"width"}
                        value={this.props.map.form.width}
                        onChange={this.fieldChanged.bind(this, 'width')}
                        color={"primary"}
                        inputProps={dimensionProps}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        type="number"
                    />
                    <FormHelperText>{ fieldState.width.message }</FormHelperText>
                </FormControl>
                <FormControl className="formRow" error={fieldState.height.error}>
                    <TextField
                        inputRef={this.refFields.height}
                        className={this.props.classes.field}
                        label={"height"}
                        value={this.props.map.form.height}
                        onChange={this.fieldChanged.bind(this, 'height')}
                        color={"primary"}
                        inputProps={dimensionProps}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        type="number"
                    />
                    <FormHelperText>{ fieldState.height.message }</FormHelperText>
                </FormControl>
                <div className={clsx("formRow","buttonRow")}>
                    { this.submitButton() }
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        map: state.map,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changeFieldValue: (fieldName, fieldValue) => dispatch(storeActions.changeMapFieldValue(fieldName, fieldValue)),
        save: () => dispatch(storeActions.saveMapSettings()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MapForm));

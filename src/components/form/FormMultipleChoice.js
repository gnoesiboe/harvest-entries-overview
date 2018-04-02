// @flow

import React from 'react';
import ReactSelect from 'react-select';
import FormElementState from '../../lib/forms/model/FormElementState';
import 'react-select/dist/react-select.css';

type FormChoiceOption = {
    label: string,
    value: any
};

export type FormChoiceOptionList = Array<FormChoiceOption>;

type Props = {
    element: FormElementState,
    options: FormChoiceOptionList,
    value: Array<any>,
    [string]: any
};

export default class FormMultipleChoice extends React.Component<Props> {

    _onFieldChange = (options: FormChoiceOptionList): void => {
        var values = options.map(option => option.value);

        this.props.element.applyChange(values);
    }

    _onFieldBlur = (): void => {
        this.props.element.flagTouched();
    }

    render() {
        var { options, value, ...otherProps } = this.props;

        return (
            <ReactSelect
                { ...otherProps }
                multi={ true }
                onChange={ this._onFieldChange }
                onBlur={ this._onFieldBlur }
                options={ options }
                value={ value }
            />
        );
    }
}

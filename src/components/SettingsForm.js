// @flow

import React from 'react';
import { createSettingsFormState } from '../form/formStateFactory';
import type { FormData } from '../lib/forms/model/FormState';
import FormState from '../lib/forms/model/FormState';
import type { OnChangeCallbackType, OnFormValidCallback } from '../lib/forms/model/FormState';
import Form from '../lib/forms/component/Form';
import FormInput from '../lib/forms/component/FormInput';
import FormGroup from './form/FormGroup';
import FormErrorList from './form/FormErrorList';

export type OnSubmitCallback = (harvestAccessToken: string) => void;

type Props = {
    onSubmit: OnSubmitCallback,
    harvestAccessToken: ?string
};

type State = {
    form: FormState
};

export default class SettingsForm extends React.Component<Props, State> {

    _onFormStateChange: OnChangeCallbackType = (newFormState: FormState, key: ?string) => {
        this.setState(currentState => {
            return {
                ...currentState,
                form: newFormState
            };
        });
    };

    _onFormStateValid: OnFormValidCallback = (data: FormData) => {
        this.props.onSubmit(data.harvestAccessToken);
    }

    state: State = {
        form: createSettingsFormState(
            this._onFormStateChange,
            this._onFormStateValid,
            this.props.harvestAccessToken || ''
        )
    };

    _renderHarvestAccessTokenFormGroup() {
        var fieldState = this.state.form.getElementState('harvestAccessToken');

        return (
            <FormGroup element={ fieldState }>
                <label htmlFor="harvest_access_token_field" className="form-label">Harvest Access Token</label>
                <FormInput
                    type="text"
                    autoFocus={ true }
                    id="harvest_access_token_field"
                    element={  fieldState }
                    className="form-control"
                />
                { fieldState.hasErrors() ? <FormErrorList errors={ fieldState.errors } /> : null }
            </FormGroup>
        );
    }

    render() {
        var { form } = this.state;

        return (
            <div>
                <Form formState={ form } className="form">
                    { this._renderHarvestAccessTokenFormGroup() }
                    <div>
                        <button type="submit" className="btn btn-success">Opslaan</button>
                    </div>
                </Form>
            </div>
        );
    }
}
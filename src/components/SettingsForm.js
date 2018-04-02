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
import FormMultipleChoice from './form/FormMultipleChoice';
import { convertUsersCollectionToFormChoiceOptions } from '../utility/collectionToFormChoiceOptionsConverter';
import type { UsersReducerState } from '../redux/reducer/usersReducer';

export type OnSubmitCallback = (harvestAccessToken: string, harvestAccountId: string, userIds: Array<Number>) => void;

type Props = {
    onSubmit: OnSubmitCallback,
    harvestAccessToken: ?string,
    harvestAccountId: ?string,
    userIds: Array<Number>,
    users: UsersReducerState
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
        this.props.onSubmit(
            data.harvestAccessToken,
            data.harvestAccountId,
            data.userIds
        );
    }

    state: State = {
        form: createSettingsFormState(
            this._onFormStateChange,
            this._onFormStateValid,
            this.props.harvestAccessToken,
            this.props.harvestAccountId,
            this.props.userIds
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

    _renderHarvestAccountIdFormGroup() {
        var fieldState = this.state.form.getElementState('harvestAccountId');

        return (
            <FormGroup element={ fieldState }>
                <label htmlFor="harvest_account_id_field" className="form-label">Harvest Account Id</label>
                <FormInput
                    type="text"
                    autoFocus={ true }
                    id="harvest_account_id_field"
                    element={  fieldState }
                    className="form-control"
                />
                { fieldState.hasErrors() ? <FormErrorList errors={ fieldState.errors } /> : null }
            </FormGroup>
        );
    }

    _renderUserIdsChoice() {
        var fieldState = this.state.form.getElementState('userIds');

        var { users } = this.props;

        return (
            <FormGroup element={ fieldState }>
                <label htmlFor="user_ids_field" className="form-label">User ids</label>
                <FormMultipleChoice
                    id="user_ids_field"
                    element={ fieldState }
                    options={ convertUsersCollectionToFormChoiceOptions(users) }
                    value={ fieldState.data }
                />
                { fieldState.hasErrors() ? <FormErrorList errors={ fieldState.errors } /> : null }
            </FormGroup>
        );
    }

    render() {
        var { form } = this.state;

        return (
            <Form formState={ form } className="form">
                { this._renderHarvestAccessTokenFormGroup() }
                { this._renderHarvestAccountIdFormGroup() }
                { this._renderUserIdsChoice() }
                <div>
                    <button type="submit" className="btn btn-success">Opslaan</button>
                </div>
            </Form>
        );
    }
}

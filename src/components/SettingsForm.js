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

export type OnSubmitCallback = (harvestAccessToken: string, harvestAccountId: string, userIds: Array<number>, jiraUrl: string, jiraUsername: string, jiraPassword: string) => void;

type Props = {|
    onSubmit: OnSubmitCallback,
    harvestAccessToken: ?string,
    harvestAccountId: ?string,
    userIds: Array<number>,
    jiraUrl: ?string,
    jiraUsername: ?string,
    jiraPassword: ?string,
    users: UsersReducerState
|};

type State = {|
    form: FormState
|};

export default class SettingsForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            form: createSettingsFormState(
                this._onFormStateChange,
                this._onFormStateValid,
                props.harvestAccessToken,
                props.harvestAccountId,
                props.userIds,
                props.jiraUrl,
                props.jiraUsername,
                props.jiraPassword
            )
        };
    }

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
            data.userIds,
            data.jiraUrl,
            data.jiraUsername,
            data.jiraPassword
        );
    }

    _renderHarvestAccessTokenFormGroup() {
        var fieldState = this.state.form.getElementState('harvestAccessToken');

        return (
            <FormGroup element={ fieldState }>
                <label htmlFor="harvest_access_token_field" className="form-label">Harvest Access Token</label>
                <FormInput
                    type="text"
                    id="harvest_access_token_field"
                    element={ fieldState }
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
                    id="harvest_account_id_field"
                    element={ fieldState }
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

    _renderJiraUrlFormGroup() {
        var fieldState = this.state.form.getElementState('jiraUrl');

        return (
            <FormGroup element={ fieldState }>
                <label htmlFor="jira_url_field" className="form-label">JIRA Url</label>
                <FormInput
                    type="text"
                    id="jira_url_field"
                    element={ fieldState }
                    className="form-control"
                />
                { fieldState.hasErrors() ? <FormErrorList errors={ fieldState.errors } /> : null }
            </FormGroup>
        );
    }

    _renderJiraLoginCredentialsFormGroup() {
        var usernameFieldState = this.state.form.getElementState('jiraUsername'),
            passwordFieldState = this.state.form.getElementState('jiraPassword');

        return (
            <div className="row">
                <div className="col-md-6">
                    <FormGroup element={ usernameFieldState }>
                        <label htmlFor="jira_username_field" className="form-label">JIRA Username</label>
                        <FormInput
                            type="text"
                            id="jira_username_field"
                            element={ usernameFieldState }
                            className="form-control"
                        />
                        { usernameFieldState.hasErrors() ? <FormErrorList errors={ usernameFieldState.errors } /> : null }
                    </FormGroup>
                </div>
                <div className="col-md-6">
                    <FormGroup element={ passwordFieldState }>
                        <label htmlFor="jira_password_field" className="form-label">JIRA Password</label>
                        <FormInput
                            type="text"
                            id="jira_password_field"
                            element={ passwordFieldState }
                            className="form-control"
                        />
                        { passwordFieldState.hasErrors() ? <FormErrorList errors={ passwordFieldState.errors } /> : null }
                    </FormGroup>
                </div>
            </div>
        );
    }

    render() {
        var { form } = this.state;

        return (
            <Form formState={ form } className="form">
                { this._renderHarvestAccessTokenFormGroup() }
                { this._renderHarvestAccountIdFormGroup() }
                <hr />
                { this._renderJiraUrlFormGroup() }
                { this._renderJiraLoginCredentialsFormGroup() }
                <hr />
                { this._renderUserIdsChoice() }
                <div>
                    <button type="submit" className="btn btn-success">Opslaan</button>
                </div>
            </Form>
        );
    }
}

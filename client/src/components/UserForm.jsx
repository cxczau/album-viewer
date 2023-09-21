import React, { useState } from "react";
import styled from 'styled-components';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

import { Card, PageContainer } from "../styled";
import { USERS_API_ROUTE } from "../constants/httpRoutes";

const DEFAULT_FORM_STATE = {
  name: '',
  username: '',
  email: '',
}

const UserForm = () => {
  const [form, setForm] = useState(DEFAULT_FORM_STATE);
  const [inflight, setInflight] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setInflight(true);

    fetch(USERS_API_ROUTE, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(() => setInflight(false))
      .then(() => setSuccess(true));
  }

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const handleReset = () => {
    setForm(DEFAULT_FORM_STATE);
    setSuccess(false);
  }

  return (
    <>
      <PageContainer>
        <div>
          <h1>Create User Form</h1>
        </div>
        <Card>
          <form onSubmit={handleSubmit} action={handleSubmit}>
            {FORM_FIELDS.map(field => (
              <StyledTextField
                type={field.type}
                variant='outlined'
                color='secondary'
                label={field.label}
                name={field.name}
                onChange={handleFormChange}
                value={form[field.name]}
                fullWidth
                required={field.required}
              />
            ))}
            <Button variant="outlined" color="secondary" type="submit" disabled={inflight}>Register</Button>
          </form>
          {success && <Alert severity="success">User successfully created! Click <Button color="secondary" onClick={handleReset}>here</Button> to reset the form!</Alert>}
        </Card>
      </PageContainer>
    </>
  );
}

const FORM_FIELDS = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    required: true,
  },
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    required: true,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'text',
    required: false,
  },
]

const StyledTextField = styled(TextField)`
  margin-bottom: 20px !important;
`;

export default UserForm;
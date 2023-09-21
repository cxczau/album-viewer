import React, { useEffect, useState } from "react";
import styled from 'styled-components';

import Button from '@mui/material/Button';
import ImageListItem from '@mui/material/ImageListItem';

import { PageContainer } from "../styled";
import { USERS_API_ROUTE } from "../constants/httpRoutes";

const UserForm = () => {
  const [form, setForm] = useState({
    name: 'Charles',
    username: 'charles',
    email: 'charles@gmail.com',
  });
  const [inflight, setInflight] = useState(false);
  
  const handleSubmit = () => {
    setInflight(true);
    fetch(USERS_API_ROUTE, {
    // fetch('https://jsonplaceholder.typicode.com/users', {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => console.log(json));
  }

  return (
    <PageContainer>
      <div>
        <h1>Create User Form</h1>
      </div>
      <div>
        <button onClick={handleSubmit}>submit</button>
      </div>
    </PageContainer>
  );
}

export default UserForm;
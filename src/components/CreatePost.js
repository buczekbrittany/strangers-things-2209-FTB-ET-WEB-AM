import React, { useState } from 'react';

const COHORT_NAME = '2209-ftb-et-web-am'

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2I1NDUwMWU4Y2VjNjAwMTczMGM1ZTMiLCJ1c2VybmFtZSI6InRoZW8iLCJpYXQiOjE2NzI4MjUwNTB9.ILDbaHqU3BjFlLqx2FA_QsFY_ngHUMY4GUyvd7-OHjA

const CreatePost = async (title, description, price, token) => {
    try {
        const response = await fetch(`https://strangers-things.herokuapp.com/api/${COHORT_NAME}/posts`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                 `Bearer ${token}`
            },
            body: JSON.stringify({
                post: {
                title: title,
                description: description,
                price: price
                },
  }),
 });
    const result = await response.json();
    console.log(response);
    console.log(result);
    } catch (error) {
        console.error(error);
    }
};

export default CreatePost;
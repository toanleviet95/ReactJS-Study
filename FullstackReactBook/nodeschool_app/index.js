import React from 'react';
import { render } from 'react-dom';
import SignUpForm from './components/SignUpForm';

const container = document.createElement('div');
document.body.appendChild(container);

const element = <SignUpForm />;

render(element, container);

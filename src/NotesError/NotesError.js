/*
Define an error boundary component.
Add this component to specific points in your component structure.
*/

import React, { Component } from 'react';

export default class NotesError extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <h2>Could not display this component.</h2>
            );
        }
        return this.props.children;
    }
}
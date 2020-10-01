import React, { createContext, Component } from 'react';

export const SelectedContext = createContext();

class SelectedContextProvider extends Component {
    state = {
        selected: 'none',
    }

    changeSelected = (newSelected) => {
        this.setState({ selected: newSelected })
    }

    render() {
        return (
            <SelectedContext.Provider value={{...this.state, changeSelected: this.changeSelected}}>
                {this.props.children}
            </SelectedContext.Provider>
        );
    }
}

export { SelectedContextProvider };
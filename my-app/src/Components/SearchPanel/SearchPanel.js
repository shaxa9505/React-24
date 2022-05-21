import React from 'react';
import "./SearchPanel.css"



class SearchPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ""
        }
        this.onUpdateSearch = this.onUpdateSearch.bind(this)
    }

    onUpdateSearch (e) {
        const term = e.target.value;
        this.setState({term})
        this.props.onUpdateSearch(term)
    }
    
    render() {
        return (
            
                <input
                    type="text"
                    className="form-control search-input"
                    placeholder="Search by posts about"
                    onChange={this.onUpdateSearch}
                    // value={this.state.term}
                />
            
        );
    }
}

export default SearchPanel
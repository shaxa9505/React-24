import React, { PureComponent } from 'react'

class PostStatusFilter extends PureComponent {
    constructor(props) {
        super(props)
        this.buttons = [
            { name: "all", label: "All" },
            { name: "like", label: "Liked" },
        ]
    }

    render(props) {
        const buttons = this.buttons.map(({ name, label }) => {
            const active = this.props.filter === name;
            const clazz = active ? "btn-info" : "btn-outline-secondary";
            return (
                <button onClick={() => this.props.onFilterSelect(name)} key={name} type="button" className={`btn ${clazz}`}>
                    {label}
                </button>
            )
        })

        return (
            <div className="btn-group">
                {buttons}
            </div>
        )
    }
}

export default PostStatusFilter

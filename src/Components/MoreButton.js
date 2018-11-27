import React from 'react'


export default class MoreButton extends React.Component {


    render(){
        return <div>
            <input type="button" value="Load more entries"
                onClick = {this.props.handleMore}>
            </input>
        </div>
    }

}


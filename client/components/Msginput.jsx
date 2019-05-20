import React from 'react';

function Msginput(){
    return (
        <div>
            <input
                type="text"
                name="msgContent"
                value={this.props.content}
                placeholder="What's on your mind?"
                onChange={this.handleChange} 
            />
            <button type="submit"/> 
        </div>
    )
}

export default Msginput;

import React from 'react'
import deleteIcon from './delete.png'
import editIcon from './edit.png'


class CardView extends React.Component{
    render(){
        return(
            <div
            style={{
                backgroundColor:'whitesmoke',
                padding:5,
                justifyContent:'center'
            }}
            >
                <p>{this.props.Name}</p>
                <p>{this.props.Email}</p>
                <img src={deleteIcon} height="30px" width="30px" onClick={() => {
                    this.props.Delete()
                }} />
                <img src={editIcon} height="27px" width="27px" onClick={() => {
                    this.props.ShowEdit()
                }} />
            </div>
        );
    }
}

export default CardView

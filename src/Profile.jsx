import React from 'react'

class Profile extends React.Component{
    render(){
        let artist = {
            name : '',
            followers : {
                total: ''
            }
        }
        // this.props.artist !== null ? artist = this.props.artist : null
        if (this.props.artist !== null){
            artist = this.props.artist
        }
        return(
            <div>
                <div className="profile">
                    <div>{artist.name}</div>
                    <div>{artist.followers.total}</div>
                </div>
            </div>
        )
    }
}

export default Profile
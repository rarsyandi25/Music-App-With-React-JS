import React from 'react'

class Profile extends React.Component{
    render(){
        // console.log(this.props)

        let artist = {
            name : '',
            followers : {
                total: ''
            },
            images : [{
                url:''
            }],
            genres : []
        }
        artist = this.props.artist !== null ? this.props.artist : artist
        // if (this.props.artist !== null){
        //     artist = this.props.artist
        // }

        return(
            <div className="profile">
                <img 
                    alt="Profile" 
                    className="profile-img" 
                    src={artist.images[0].url}                    
                />
                <div className="profile-info">
                    <div className="profile-name">{artist.name}</div>
                    <div className="profile-followers">{artist.followers.total} Followers</div>
                    <div className="profile-genre">
                        {
                            artist.genres.map((genre, id) => {
                                genre = genre !== artist.genres[artist.genres.length-1] ? ` ${genre},` : ` ${genre}` /* kondisi jika genre lebih dari 1*/
                                return(
                                    <span key={id}>{genre}</span>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile
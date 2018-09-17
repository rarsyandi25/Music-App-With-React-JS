import React from 'react'

class Gallery extends React.Component {
    render() {
        // console.log('this.props',this.props)
        const tracks = this.props.tracks
        // const { tracks } = this.props  --> ini ge bisa
        return(
            <div>
                {tracks.map((track, id) => {
                    const trackImg = track.album.images[0].url
                    return(
                        <div 
                            key={id} 
                            className="track"
                        >
                            <img 
                                alt="track"
                                className="track-img"
                                src={trackImg}
                            />
                            <p className="track-text">
                                {track.name}
                            </p>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Gallery
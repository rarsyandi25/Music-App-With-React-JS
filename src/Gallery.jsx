import React from 'react'

class Gallery extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playingUrl: '',
            audio: null,
            playing: false
        }
    }
    
    playAudio(previewUrl) {
        let audio = new Audio(previewUrl)
        
        if (!this.state.playing) {
            audio.play()
            this.setState({
                playing: true,
                playingUrl: previewUrl,
                audio: audio
            })
        }else {
            if (this.state.playingUrl === previewUrl) {
                this.state.audio.pause()
                this.setState({
                    playing: false
                })
            }else {
                this.state.audio.pause()
                audio.play()
                this.setState({
                    playing: true,
                    playingUrl: previewUrl,
                    audio: audio
                })
            }
        }
    }
    render() {
        // console.log('this.props',this.props)
        const tracks = this.props.tracks
        // const { tracks } = this.props  --> ini ge bisa
        return(
            <div>
                {tracks.map((track, id) => {
                    console.log(track)
                    const trackImg = track.album.images[0].url
                    return(
                        <div 
                            key={id} 
                            className="track"
                            onClick={() => {
                                this.playAudio(track.preview_url)
                            }}
                        >                
                            <img 
                                alt="track"
                                className="track-img"
                                src={trackImg}
                            />
                            <div className="track-play">
                                <div className="track-play-inner">
                                    {
                                        this.state.playingUrl === track.preview_url
                                        ? <span>| |</span>
                                        : <span>&#9654;</span>
                                    }
                                </div>
                            </div>
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
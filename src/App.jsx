import React from 'react'
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap'
import Profile from './Profile'
import Gallery from './Gallery'

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            query: '',
            artist: null,
            tracks: []
            
        }
    }
    
    onSearch(){
        // console.log(this.state)
        const BASE_URL = 'https://api.spotify.com/v1/search?'
        let FECTH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1'
        const ALBUM_URL = '	https://api.spotify.com/v1/artists'
                        //`${BASE_URL}q=${this.state.query}&type=artist&limit=1`   ==>  es6
        var accessToken = 'BQDmQ-PVVvthf2tQ9j9G3gjI5kl_tm95GtI-e4rbctJCGe7jWiXrAqjUEBo0BNmBPDrN2KYryItcx5JNqxC1H9eughWga1H60pFDkZ8AsP1os2Y0W8mFgVeNn1JN68KjfHRKFw4g0d30OuljRcj50-OPmS6E7tf2yE5eCL33HxdzMoIBuuC2&refresh_token=AQD5cIpN--aOpKdG0cjAe9wdzEBUqnBUT00S7YKKvqILokY22s76WVC900UL8ZbeOjs1yDVMmHiWQYmuOGJo439ARHklDQkuDawqVYAYV65MZKGZhrghJcFnDnZsiLp8lISjJA'

        var myOptions = {
            method: 'GET',
            headers: {
            'Authorization': 'Bearer ' + accessToken
            },
            mode: 'cors',
            cache: 'default'
        };
        // console.log(FECTH_URL)
        fetch(FECTH_URL, myOptions)
            .then(response => response.json())
            .then(json => {
                const artist = json.artists.items[0]
                
                this.setState({ 
                    artist 
                })

                FECTH_URL = `${ALBUM_URL}/${artist.id}/top-tracks?country=US&`
                fetch(FECTH_URL, myOptions)
                    .then(response => response.json())
                    .then(json => {
                        console.log(json)
                        const tracks = json.tracks
                        // const { tracks } = json   => ini ge bisa
                        this.setState({
                            tracks
                        })
                    })
            })
    }

    render() {
        return (
            <div className="App">
                <div className="App-title">Music App</div>
                <FormGroup>
                    <InputGroup>
                        <FormControl 
                            type="text" 
                            placeholder="Seacrh for an Artist" 
                            value={this.state.query}
                            onChange={(event) => {
                                this.setState({
                                    query: event.target.value
                                })
                            }}
                            onKeyPress={(event) => {
                                // console.log(event.key)
                                // if(event.key === 'Enter') {
                                //     this.onSearch()
                                // }
                                return event.key === 'Enter' ? this.onSearch() : event.key
                            }}
                        />
                        <InputGroup.Addon onClick={() => {
                            this.onSearch()
                        }}>
                            <Glyphicon glyph="search"/>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                {
                    this.state.artist !== null
                    ? <div>
                        <Profile 
                        artist={this.state.artist}
                        />
                        <Gallery 
                            tracks={this.state.tracks}
                        />
                      </div>
                    : <div></div>
                }
            </div>
        )
    }
}

export default App
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

        //your access token
        var accessToken = 'BQAnGjRq15r7Y3xFX_5TKRTSw0a8i2OA3Y0U6ZKg93Ah2pIYwEo7HoP8xp928800xM4tq6oqhXs9yEncmcj-NzoW-NVEKnh0ydMLiIoTOH1e82DzrAfj_JmzHC_iaX3BoMNHoKMdmAx2WP1ponMWi5KMhEZ6yRNIHhvjhVl81bFWNqyi3ScE&refresh_token=AQBwUz185g4GK2Id46O8Ia9thi1oJ202AxhYk1L8fqNEfp43WymaE_bDr_rZKoFNuWSh-Wft_tBOnWzIutSM8ymOhin9ukT9lA_E-CBuSDeAyVyn7LtI3zCHwtQOTDS9-8EONQ'

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
                        // console.log(json)
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
                            placeholder="Search for an Artist" 
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
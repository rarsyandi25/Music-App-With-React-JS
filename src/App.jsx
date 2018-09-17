import React from 'react'
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap'
import Profile from './Profile'

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            query: '',
            artist: null
        }
    }
    
    onSearch(){
        // console.log(this.state)
        const BASE_URL = 'https://api.spotify.com/v1/search?'
        const FECTH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1'
                        //`${BASE_URL}q=${this.state.query}&type=artist&limit=1`   ==>  es6
        var accessToken = 'BQBYL5NZTgx1snfByvJqNSSK49ZcMZewTenqok5_uu54mKGoOWzrxCr_JRWVr9yblSfaXkquz0GrqTR00_8PT0C74hhpoOEied7JnL_udqIIKfcDh1dmOFv3pGkAtttnrxV0KjMtEeQb1DX6qsXk4A9ZMeSgr8iynDN318ITWJsh6ZRLonWo&refresh_token=AQDETT05p71n7_Y9KO6CZUMYe4dkEb83ptdgLcjdPKrgjJBG-sJfBeGAMvpPiCuvCYR3ECcnhDbNcB-4qoCvJ2igNYQbCENQV7V4zzMQUfyo08P_t8ErVmLBFZ49R9f-Sf9hrg'

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
                this.setState({ artist })
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
                <Profile artist={this.state.artist}/>
                <div className="gallery">Gallery</div>
            </div>
        )
    }
}

export default App
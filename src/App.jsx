import React from 'react'
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap'

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            query: ''
        }
    }

    onSearch(){
        console.log(this.state)
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
                <div className="profile">
                    <div>Artist Picture</div>
                    <div>Artist Name</div>
                </div>
                <div className="gallery">Gallery</div>
            </div>
        )
    }
}

export default App
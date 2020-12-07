import React, {Component} from "react"

/**
 * Initialize state to save the following data:
 *      top text
 *      bottom text
 *      random image (intialize with "http://i.imgflip.com/1bij.jpg")
 */

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state ={
            topText : "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data;
                console.log(memes[0]);
                this.setState({ allMemeImgs: memes })

                })
            }

    handleChange(event){
        const {name, value} = event.target;
        console.log(name + " " + value);

        this.setState({
            [name] : value
        })

        //console.log(value);

    }

    handleSubmit(event){
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({ randomImg: randMemeImg })
        
    }
    
    
    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input 
                        className="meme-form input" 
                        type="text" 
                        name="topText" 
                        value={this.state.topText}
                        placeholder="Top Text"
                        onChange={this.handleChange}
                    />
                    <input 
                        className="meme-form input" 
                        type="text" 
                        name="bottomText" 
                        value={this.state.bottomText}
                        placeholder="Bottom Text"
                        onChange={this.handleChange}
                    />
                
                <button onClick={this.handleClick}>Gen</button> 

                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt="problem" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator
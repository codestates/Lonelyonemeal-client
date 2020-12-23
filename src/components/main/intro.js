import React, { Component } from 'react'
import simbol from '../../components/main/img/simbol.png'




class Intro extends Component {
    render() {
        return (
            <div className = "wrap">
                <div className = 'item'> 
                    <img className="simbol" src={simbol} alt='simbol' />
                </div>
            </div>
        )
    }
}

export default Intro;
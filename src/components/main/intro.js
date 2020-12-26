import simbol from '../../components/main/img/simbol.png'

function Intro(props) {

  return (
    <div className="wrap">
      <div className='item'>
        <img className="simbol" src={simbol} alt='simbol' onClick={props.handleIntroClicked} />
      </div>
    </div>
  )
}

export default Intro;
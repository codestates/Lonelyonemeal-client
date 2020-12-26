import chef from './img/chef.png';

function Chef(props) {
  return(
    <div className={props.isOpenning ? (props.talkingCount >= 6 ? 'main-chefContainer-out' : 'main-chefContainer') : 'main-chefContainer-small'}>
      <img className={props.isOpenning ? 'main-chef' : 'main-chef-small'} src={chef} alt=''/>
      <p className={props.isOpenning ? 'main-chefsTalk' : 'main-chefsTalk-small'}>{props.chefsMessage}</p>
    </div>
  )
}

export default Chef;

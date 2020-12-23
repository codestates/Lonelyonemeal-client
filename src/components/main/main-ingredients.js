import { Component } from "react";

class MainIngre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [
        ['감자','potato'],['계란','egg'],['밥','rice'],['파','g_onion'],
        ['양파','onion'],['두부','tofu'],['스팸','spam'],['식빵','bread'],
        ['고추장','gochujang'],['돼지고기','pork'],['치킨','chicken'],['참치','tuna'],
        ['밀가루','flour'],['김치','kimchi'],['누텔라','nutella'],['포카칩','pocachip']
      ],
      shoppingBag: []
    }
    this.selectOrDeleteIngredient = this.selectOrDeleteIngredient.bind(this);
  }

  selectOrDeleteIngredient(e) {
    let target = e.target.textContent;
    console.log(target);
    
    if(e.target.classList.contains('main-ingredient')) {
      for(let i of this.state.ingredients) {
        if(i[0] === target) {
          target = i[1];
        }
      }

      this.setState({ shoppingBag: [...this.state.shoppingBag, target] });
      e.target.classList.remove('main-ingredient');
      e.target.classList.add('main-ingredient-clicked');
    }
    else {
      const {shoppingBag, ingredients} = this.state;

      for(let i of ingredients) {
        if(i[0] === target) {
          target = i[1];
        }
      }

      let resultShoppingBag = shoppingBag.slice();

      for(let i = 0; i < shoppingBag.length; i ++) {
        if(shoppingBag[i] === target) {
          resultShoppingBag.splice(i, 1);
          this.setState({ shoppingBag: resultShoppingBag });
        }
      }

      e.target.classList.remove('main-ingredient-clicked');
      e.target.classList.add('main-ingredient');
    }
  }

  render() {
    return(
      <div className='main-ingredients'>
        {this.state.ingredients.map(el => {
          return(
            <div key={el[1]} className='main-ingredient' onClick={this.selectOrDeleteIngredient}>
              {el[0]}
            </div>
          )
        })}
      </div>
    )
  }
}






export default MainIngre;

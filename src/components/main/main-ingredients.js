import { Component } from "react";

class MainIngre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [
        ['감자', 'potato'], ['계란', 'egg'], ['밥', 'rice'], ['파', 'g_onion'],
        ['양파', 'onion'], ['두부', 'tofu'], ['스팸', 'spam'], ['식빵', 'bread'],
        ['고추장', 'gochujang'], ['돼지고기', 'pork'], ['치킨', 'chicken'], ['참치', 'tuna'],
        ['밀가루', 'flour'], ['김치', 'kimchi'], ['깻잎', 'sesame'], ['포카칩', 'pocachip']
      ],
      shoppingBag: []  /* 재료 클릭 시 쇼핑백에 담기게 되며, 재 클릭시 쇼핑백에서 사라짐 */,

    }
    this.selectOrDeleteIngredient = this.selectOrDeleteIngredient.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.shoppingBag.length !== this.state.shoppingBag.length) {
      this.props.copyShoppingBag(this.state.shoppingBag); /* 상위 컴포넌트에 복사 */
    }
    else {
      return;
    }
  }

  /* 재료버튼 클릭, 재클릭 핸들링 함수 */
  selectOrDeleteIngredient(e) {
    let target = e.target.textContent;
    console.log(target);

    if (e.target.classList.contains('main-ingredient')) {  /* CSS 스타일 이름을 통해 선택 유/무를 판별하며 */
      for (let i of this.state.ingredients) {  /* 재료목록과 대조하여 영문이름 수집 후 쇼핑백에 담음 */
        if (i[0] === target) {
          target = i[1];
        }
      }

      this.setState({ shoppingBag: [...this.state.shoppingBag, target] });
      e.target.classList.remove('main-ingredient');  /* 재료버튼 스타일을 클릭전 에서 클릭후 상태로 바꿈 */
      e.target.classList.add('main-ingredient-clicked');
    }
    else {
      const { shoppingBag, ingredients } = this.state;

      for (let i of ingredients) {  /* 재료목록과 대조하여 영문이름 수집 */
        if (i[0] === target) {
          target = i[1];
        }
      }

      let resultShoppingBag = shoppingBag.slice();  /* 쇼핑백 얕은복사 */

      for (let i = 0; i < shoppingBag.length; i++) {  /* 쇼핑백과 수집한 영문이름 대조하여 해당이름 쇼핑백에서 제거 */
        if (shoppingBag[i] === target) {
          resultShoppingBag.splice(i, 1);
          this.setState({ shoppingBag: resultShoppingBag });
        }
      }

      e.target.classList.remove('main-ingredient-clicked');  /* 재료버튼 스타일을 클릭후 에서 클릭전 상태로 바꿈 */
      e.target.classList.add('main-ingredient');
    }
    this.props.randomChefTalk();
  }

  render() {
    return (
      <div className='main-ingredients'>
        {this.state.ingredients.map(el => {
          return (
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

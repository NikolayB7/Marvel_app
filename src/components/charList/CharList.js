import {Component} from "react";

import MarvelService from "../../servises/MarvelService";
import Spinner from "../spinner/Spinner";
import './charList.scss';

class CharList extends Component{
    state = {
        charList:[],
        loading:true,
        selectChar: null,
        offset:2
    }

    MarvelService = new MarvelService

    onRequst = (offset)=>{
        this.MarvelService
            .getAllCharacters(offset)
            .then(res=>  this.setState({charList:res,loading:false }))
            .catch(err => console.log(err,'ЕЩЕ ГРУЗИТСЯ'))
    }

    selectChar(id,idx){
        this.setState({selectChar:idx})
        this.props.onCharSelected(id)
    }



    componentDidMount() {
        this.onRequst()
    }

    render() {

        const {charList,loading,selectChar,offset} = this.state
        const spinner = loading ? <Spinner/> : null;
        return (
            <div className="char__list">
                {spinner}
                <ul className="char__grid">
                    {
                        charList.map((item,i) => (
                            // char__item_selected

                            <li key={i} className={(selectChar === i)?'char__item char__item_selected': 'char__item'} onClick={ ()=>this.selectChar(item.id,i)}>
                                <img src={item.thumbnail} alt="abyss"/>
                                <div className="char__name">{item.name}</div>
                            </li>
                        ))
                    }
                </ul>
                <button className="button button__main button__long" onClick={()=>this.onRequst(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}


export default CharList;
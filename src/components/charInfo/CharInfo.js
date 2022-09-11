import {Component} from "react";
import MarvelService from "../../servises/MarvelService";
import './charInfo.scss';
import Spinner from "../spinner/Spinner";
import PropTypes from 'prop-types'

class CharInfo extends Component{

    state={
        char: null,
        loading:true
    }

    MarvelService = new MarvelService

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.charId !== prevProps.charId) {
            this.MarvelService
                .getCharacter(this.props.charId)
                .then(res=> this.setState({char:res,loading:false}))
        }

    }





    render() {
        const {char, loading} = this.state;
        const content = !(loading) ? <View char={char}/> : <Spinner/> ;

        return (
            <div className="char__info">
                {content}
            </div>
        )
    }
}
const View =({char})=>{
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss"/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} target="_blank" className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} target="_blank" className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {
                    comics.map((item, i) => {
                        // eslint-disable-next-line
                        if (i > 9) return;
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes ={
    charId: PropTypes.number
}

export default CharInfo;
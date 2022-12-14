import {Component} from "react";
import './randomChar.scss';
import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from "../../servises/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class RandomChar extends Component  {


    state = {
        char:{},
        loading:true,
        error:false,
        disablebBtn:false
    }

    MarvelService = new MarvelService();
    onCharLoaded = (char)=>{
        this.setState({char,loading:false})
    }

    onError = ()=>{
        this.setState({
            loading:false,
            error:true
        })
    }

    // onRequest= (offset)=>{
    //
    // }

    updateChar = ()=>{
        const id = Math.floor(Math.random()*(1011400 - 1011000)+1011000);

        this.MarvelService
            .getCharacter(id)
            .then(res=>  this.onCharLoaded(res))
    }

    componentDidMount() {
        this.updateChar()
    }


    render() {
        // @TODO поправить обработчик ошибок
        const {char,loading,error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || errorMessage) ? <View char={char}/> : null

        return(
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}
const View = ({char})=>{
    const {thumbnail,description,name,homepage,wiki} = char
    return(
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}
export default RandomChar;
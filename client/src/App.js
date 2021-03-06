import { Component } from 'react';
import {Route, Link, NavLink, Redirect, Switch} from 'react-router-dom';

import * as postService from './services/postService';

import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Main from './components/Main/Main';

import style from './App.module.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            selectedPost: null,
        }

        this.onMenuItemClick = this.onMenuItemClick.bind(this);
    }

    componentDidMount() {
        postService.getAll()
            .then(posts => {
                this.setState({posts})
            });
    }

    onMenuItemClick(id) {
        this.setState({selectedPost: id});
    }

    getPosts () {
        if(!this.state.selectedPost) {
            return this.state.posts;
        } else {
           return [this.state.posts.find(x => x.id == this.state.selectedPost)];

        }
    }

    render() {
        return (
            <div className={style.app}>
                <Header />

                <div className={style.container}>
                    <Menu 
                       onMenuItemClick={this.onMenuItemClick} />

                    <Main posts={this.getPosts()} />
                </div>
            </div>
        )
    }
}

export default App;


// function App() {
//     return (
// <div className={style.app}>
//     <Header />
//     <div className={style.container}>
//         <Menu />
//         <Main />
//     </div>
// </div>
//      )
// }

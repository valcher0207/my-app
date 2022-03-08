import React from 'react';
import { API_URL } from './components/consts'
import { apiCall } from './components/services'
import { IUserRes, IPostRes } from './components/interface'
import './App.css';
// import logo from './logo.svg';

interface IUsersPosts extends IUserRes {
  posts: IPostRes[]
}

interface IAppState {
    allData: IUsersPosts[]
}

class App extends React.Component<{}, IAppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            allData: [],
        }
    }

    componentDidMount() {
        console.log('Did Mount')
        apiCall(API_URL.users)
            .then((data: any) => {

                let users: IUsersPosts[] = data;
                
                users.forEach((user: any) => {
                    let urls = API_URL.posts.replace(`{userId}`, user.id.toString());
                    console.log(urls);

                    apiCall(urls)
                        .then((posts) => {
                            const { allData } = this.state;
                            user.posts = posts as IPostRes[]

                            allData.push(user)

                            this.setState({allData: allData})
                        })
                        .catch((err) => {
                            console.log(err + 'post error');
                        })
                });
            })
            .catch((error) => {
                console.log(error + 'user error')
            })
            .finally(() => {
                console.log('done fetching')
            })
        
        console.log("all data: ", this.state.allData)
    }

    componentDidUpdate() {
        console.log('Did Update')
    }

    renderPosts = (posts: IPostRes[]) => {
        return posts.map((post) => {
            return (
                <div key={post.id}>
                    <h4>{post.title}</h4>
                    <p>{post.body}</p>
                </div>
            )
        })
    }

    renderUsers = () => {
        const { allData } = this.state;
        return allData.map((user) => {
            return (
                <div key={user.id}>
                    <br></br>
                    <h2>{user.id}</h2>
                    <h1>{user.name}</h1>
                    <h2>{user.username}</h2>
                    <h2>{user.email}</h2>
                    {this.renderPosts(user.posts)}
                    <br></br>
                </div>
            )
        })
    }

    render() {
        console.log("render called ...")
        return (
        <div className="app-style">
            {this.renderUsers()}
        </div>
        );
    }
}

export default App;
import React, { Component } from 'react'
import AppHeader from "../AppHeader"
import PostAddForm from "../PostAddForm"
import PostList from "../PostList"
import PostStatusFilter from "../PostStatusFilter"
import SearchPanel from "../SearchPanel"
import './App.css'


export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                { label: "Going to learn React JS", important: false, like: false, id: 1 },
                { label: "That is so good", important: false, like: false, id: 2 },
                { label: "i need a beak...", important: false, like: false, id: 3 },
            ],
            term: "",
            filter: "all"
        }
        this.onDelete = this.onDelete.bind(this)
        this.onAdd = this.onAdd.bind(this)
        this.onToggleImportant = this.onToggleImportant.bind(this)
        this.onToggleLiked = this.onToggleLiked.bind(this)
        this.searchPosts = this.searchPosts.bind(this)
        this.onUpdateSearch = this.onUpdateSearch.bind(this)
        this.onFilterSelect = this.onFilterSelect.bind(this)
        this.maxId = 4
    }

    onDelete(id) {
        this.setState({ data: this.state.data.filter(data => data.id !== id) })
    }

    onAdd(body) {
        const newItem = {
            label: body,
            important: false,
            like: false,
            id: this.maxId++
        }
        this.setState(({ data }) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleImportant(id) {
        // console.log(`Important ${id}`);
        this.setState(({ data }) => {
            const index = data.findIndex(item => item.id === id);
            const oldItem = data[index];
            // console.log(oldItem);
            const newItem = { ...oldItem, important: !oldItem.important };
            // console.log(newItem);
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            return {
                data: newArr
            }
        })
    }

    onToggleLiked(id) {
        // console.log(`Liked ${id}`);
        this.setState(({ data }) => {
            const index = data.findIndex(item => item.id === id);
            const oldItem = data[index];
            // console.log(oldItem);
            const newItem = { ...oldItem, like: !oldItem.like };
            // console.log(newItem);
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            return {
                data: newArr
            }
        })
    }

    searchPosts(items, term) {
        if (term.length === 0) {
            return items
        }
    
        
        return items.filter(item => {
                return  item.label.indexOf(term) > -1
        })
    }

    filterPost(items, filter) {
        if(filter === "like"){
            return items.filter(item => item.like)
        }else{
            return items
        }
    }

    onUpdateSearch(term) {
        this.setState({ term })
    }

    onFilterSelect (filter){
        this.setState({filter})
    }

    render() {
        const { data, term, filter} = this.state
        const like = data.filter(item => item.like).length;
        const important = data.length;
        const visiblePost = this.filterPost(this.searchPosts(data, term), filter)

        return (
            <div className="app">
                <AppHeader important={important} like={like} />
                <div className="search-panel d-flex">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <PostStatusFilter filter={filter} onFilterSelect={this.onFilterSelect} />
                </div>
                <PostList
                    posts={visiblePost}
                    onDelete={this.onDelete}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked={this.onToggleLiked}
                />
                <PostAddForm onAdd={this.onAdd} />
            </div>
        )
    }
}



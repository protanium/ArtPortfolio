"use client"
import React from "react";
import Post from "@/components/postContainerComponents/Post";
import PostCreateContainer from "@/components/postContainerComponents/PostCreateContainer";
import {PlusCircleIcon} from '@heroicons/react/24/solid'

export default class PostContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [
                {
                    id: 4,
                    isMenuBarOpen: false,
                    willBeDeleted: false,
                    text: "Yazı"
                },
                {id: 3, isMenuBarOpen: false, willBeDeleted: false, text: ""},
                {id: 2, isMenuBarOpen: false, willBeDeleted: false, text: ""},
                {id: 1, isMenuBarOpen: false, willBeDeleted: false, text: ""},
            ],
            isPostCreateContainerExpanded: false,
            transition: true,

            added: false
        }
    }

    openCloseMenuBar = id => {
        const {posts} = this.state;

        posts.forEach(item => {
            if (item.id === id) {
                item.isMenuBarOpen = !item.isMenuBarOpen
            }
        })

        this.setState({
            posts
        })
    }

    deletePost = id => {
        const {posts} = this.state;

        posts.forEach(item => {
            if (item.id === id) {
                item.willBeDeleted = true;
                item.isMenuBarOpen = false;
            }
        })

        this.setState({
            transition: true,
            posts,
        })

        setTimeout(() => this.deletePost2(id), 1000)
    }

    deletePost2 = id => {
        const {posts} = this.state;

        posts.forEach(item => {
            if (item.id === id) {
                posts.splice(posts.indexOf(item), 1)
            }
        })

        this.setState({
            transition: false,
            posts
        })


    }

    addPost = (text, selectedFile) => {
        const {posts} = this.state;

        posts.unshift({
            id: posts[0].id + 5,
            isMenuBarOpen: false,
            willBeDeleted: false,
            hasJustAdded: true,
            text: text,
            selectedFile: selectedFile
        });

        this.setState({
            posts,
            added: true
        })

        setTimeout(() => {
            posts[0].hasJustAdded = false;
            this.setState({
                posts,
                added: false
            })
        }, 500)
    }

    openClosePostCreateContainer = () => {
        this.setState({
            isPostCreateContainerExpanded: !this.state.isPostCreateContainerExpanded
        })
    }


    render() {
        return (
            <div style={styles.body}>
                <div style={styles.createPostButtonContainer}>
                    <div
                        style={styles.createPostButton}
                        onClick={this.openClosePostCreateContainer}
                    >
                        <PlusCircleIcon
                            style={{
                                height:"100%"
                            }}
                        />
                    </div>
                </div>
                <PostCreateContainer
                    isPostCreateContainerExpanded={this.state.isPostCreateContainerExpanded}
                    addPost={this.addPost}
                    openClosePostCreateContainer={this.openClosePostCreateContainer}
                />
                {this.state.posts.map((item, index) => {
                    return (
                        <Post
                            key={index} id={item.id} isMenuBarOpen={item.isMenuBarOpen}
                            openCloseMenuBar={this.openCloseMenuBar}
                            hasMarginBottom={
                                index === this.state.posts.length - 1
                            }
                            deletePost={this.deletePost}
                            willBeDeleted={item.willBeDeleted}
                            tabState={this.props.tabState}
                            transition={this.state.transition}
                            hasJustAdded={item.hasJustAdded}
                            added={this.state.added}
                            text={item.text}
                            selectedFile={item.selectedFile}
                            ProfileComp={this.props.ProfileComp}
                        />
                    )
                })

                }
            </div>
        )
    }
}

const styles = {
    body: {
        width: "100%",
        height: "fit-content",
        display: "flex",
        alignItems: "center",

        flexDirection: "column",

        position: "relative",
    },
    createPostButtonContainer: {
        position: "absolute",
        height: 100,
        width: "17%",

        top: 0,
        right: -10,

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    createPostButton: {
        height: 50,
        width: 50,
        borderRadius: 100,

        cursor:"pointer"
    }
}

"use client"
import React from "react";
import PostAndWorkContainerInner from "@/components/PostAndWorkContainerInner";

export default class PostAndWorkContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabState: this.props.slug !== "posts"
        }
    }

    tabToRight = () => {
        this.setState({
            tabState: false
        })
    }

    tabToLeft = () => {
        this.setState({
            tabState: true
        })
    }

    render() {
        return (
            <div style={styles.body}>
                <div style={styles.tabContainer}>
                    <div style={{
                        ...styles.indexer,
                        marginLeft: !this.state.tabState ? "0%" : "50%",
                        transition: "margin-left 0.3s ease-in-out"
                    }}></div>
                    <div
                        style={{...styles.tabs, ...styles.tab1}}
                        onClick={this.tabToRight}
                    >
                        Posts
                    </div>
                    <div
                        style={{...styles.tabs, ...styles.tab2}}
                        onClick={this.tabToLeft}
                    >
                        Works
                    </div>
                </div>
                <div style={styles.container}>
                    <PostAndWorkContainerInner
                        whichTabOn={"posts"}
                        tabState={!this.state.tabState}
                        ProfileComp={this.props.ProfileComponent}
                    ></PostAndWorkContainerInner>
                    <PostAndWorkContainerInner
                        whichTabOn={"works"}
                        tabState={this.state.tabState}
                    >
                    </PostAndWorkContainerInner>
                </div>
            </div>
        )
    }
}

const styles = {
    body: {
        width: "100%",
        height: "100%",
        overflow: "visible"
    },
    tabContainer: {
        position: "relative",
        height: 36,
        width: "100%",
        backgroundColor: "blue",
        overflow: "hidden",
        display: "flex"
    },
    tabs: {
        height: "100%",
        flex: 0.5,
        cursor: "pointer",
        zIndex:2,

        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    tab1: {},
    tab2: {},
    indexer: {
        position: "absolute",
        height: "100%",
        width: "50%",
        backgroundColor:"white",

    },
    container: {
        display: "flex",
    }
}

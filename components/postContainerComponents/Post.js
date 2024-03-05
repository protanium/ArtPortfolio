"use client"
import React from "react";
import {TrashIcon, Bars4Icon} from '@heroicons/react/24/solid'
import Image from "next/image";



export default class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elementHeight: 0,
            myElementRef: new React.createRef(),
        };
    }

    componentDidMount() {
        this.setPostHeight();
        window.addEventListener("resize", this.setPostHeight)
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.setPostHeight)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.tabState !== prevProps.tabState){
            setTimeout(this.setPostHeight, 350) //çünkü tab değişimi süre alıyor
        }

        if(this.props.transition === false && prevProps.transition === true){
            this.setPostHeight();
        }

        if(this.props.added && !prevProps.added){
            console.log("add halinde postheight setlendi")
            this.setPostHeight();
        }

    }

    setPostHeight = () => {
        if(this.state.myElementRef.current){
            this.setState({
                elementHeight: this.state.myElementRef.current.offsetHeight
            })
        }
    }

    render() {
        const {
            id, isMenuBarOpen, openCloseMenuBar,
            hasMarginBottom, willBeDeleted,
            transition, hasJustAdded, selectedFile
        } = this.props

        let image;

        if(Number(id+1) > 5){
            image = require("../../assets/4.jpg");
        }else{
            image = require("../../assets/" + id + ".jpg")
        }



        return (
            <div ref={this.state.myElementRef}
                 style={{
                     ...styles.body,
                     marginBottom: hasMarginBottom ? 120 : 0,
                     marginRight: willBeDeleted ? "200%" : 0,
                     marginTop: willBeDeleted ? -this.state.elementHeight : "5%",
                     marginLeft: hasJustAdded === undefined ? 0 : hasJustAdded === true ? 100: 0,
                     transition: transition ?
                         "margin-right 0.6s ease, margin-top 1s ease, margin-left 0.5s ease" :
                         "margin-left 0.5s ease",

                 }}
            >
                <div style={{
                    ...styles.menuBar,
                    width: isMenuBarOpen ? "20%" : "0%",
                    height: isMenuBarOpen ? "100%" : "0%",
                    minHeight: isMenuBarOpen ? 150 : 0,
                    transition: "width 0.2s ease, height 0.2s ease, min-height 0.2s ease"
                }}
                >
                    <div style={{
                        ...styles.menuBarSection
                    }}
                         onClick={() => this.props.deletePost(id)}
                    >
                        <div style={{
                            ...styles.menuBarItemLogo,
                            ...styles.menuBarItem
                        }}>
                            <TrashIcon
                                style={{
                                    height: "100%",
                                    width: "100%"
                                }}
                            />
                        </div>
                        <div style={{
                            ...styles.menuBarItemText,
                            ...styles.menuBarItem,
                            fontSize: isMenuBarOpen ? 20 : 0
                        }}>
                            Sil
                        </div>
                    </div>
                </div>
                <div style={styles.topBar}>
                    <div style={styles.profileContainer}
                    > {/* burası profil elementi olacak şimdilik böyle kalsın  */}
                        <div style={{
                            height:"100%",
                            width:"100%",
                            borderRadius:100,
                            overflow:"hidden",

                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center"
                        }}
                        >
                            {this.props.ProfileComp}
                        </div>
                    </div>
                    <div style={styles.dateContainer}></div>
                    <div
                        style={styles.menuButton}
                        onClick={() => openCloseMenuBar(id)}
                    >
                        <Bars4Icon
                            style={{height: "100%", width: "100%"}}
                        />
                    </div>
                </div>
                <div style={styles.textSection}>
                    {this.props.text}
                </div>
                <div style={styles.imageSection}>
                    <Image
                        src={
                            selectedFile === undefined ?
                                image : selectedFile
                        }
                        alt={"ke"}
                        height={0}
                        width={0}
                        style={{
                            width: "100%",
                            height: "auto"
                        }}
                    />
                </div>
            </div>
        );
    }
}

const styles = {
    body: {
        width: "75%",
        backgroundColor: "rgb(73,73,73)",
        position: "relative",
        height: "fit-content",
        border: "20px solid rgb(73,73,73)"
    },
    topBar: {
        height: 40,

        display: "flex",
        alignItems: "center"
    },
    profileContainer: {
        height: "100%",
        width:40,
    },
    dateContainer: {
        height: "100%",
        minHeight: 40,
        width: "79%"
    },
    menuButton: {
        height: "100%",
        width: "8%",
        minWidth: 30,
        minHeight: 40,
    },
    menuBar: {
        position: "absolute",
        zIndex: 1,
        left: "100%",

        minHeight: 150,
        maxHeight: 180,

        display: "flex",
        flexDirection: "column"
    },
    menuBarSection: {
        height: 40,
        width: "100%",
        backgroundColor: "pink",
        display: "flex",

        cursor: "pointer",
        userSelect: "none",
    },
    menuBarItem: {},
    menuBarItemLogo: {
        height: "100%",
        width: "35%",

    },
    menuBarItemText: {
        height: "100%",
        width: "65%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    imageSection: {
        width: "100%",
    },
    textSection:{
        width:"100%",
        height:"fit-content",
        marginBottom:12,
        marginTop:12,

        paddingLeft:10
    }
}

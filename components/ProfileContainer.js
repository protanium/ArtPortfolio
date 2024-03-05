"use client"
import React from "react";
import Profile from "@/components/Profile";
import {
    BackspaceIcon, PlusCircleIcon, MagnifyingGlassPlusIcon,
    MagnifyingGlassMinusIcon, XMarkIcon, CheckIcon
} from '@heroicons/react/24/solid'

export default class ProfileContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMouseOverProfile: false,
            isMouseOverAddButton: false,
            isMouseOverDeleteButton: false,

            isDeleted: true,

            hasProfileChangeProcessStarted: false,
            selectedFile: undefined,
            previousSelectedFile: undefined,

            selectedFile2: false,

            previousProfileSize: 130,
            profileSize: 130,

            isMouseOnPlusAdjustButton: false,
            isMouseOnAcceptAdjustButton: false,
            isMouseOnRejectAdjustButton: false,
            isMouseOnMinusAdjustButton: false,
        }
    }

    onMouseOverProfile = () => {
        this.setState({
            isMouseOverProfile: true
        })
    }

    onMouseLeftProfile = () => {
        this.setState({
            isMouseOverProfile: false
        })
    }

    onMouseOverAddButton = () => {
        this.setState({
            isMouseOverAddButton: true
        })
    }

    onMouseLeftAddButton = () => {
        this.setState({
            isMouseOverAddButton: false
        })
    }

    onMouseOverDeleteButton = () => {
        this.setState({
            isMouseOverDeleteButton: true
        })
    }

    onMouseLeftDeleteButton = () => {
        this.setState({
            isMouseOverDeleteButton: false
        })
    }

    handleFileChange = e => {
        const file = e.target.files[0];

        if (file) {
            this.fileInput.value = null
            this.setState((prevState) => {
                return {
                    previousSelectedFile: prevState.selectedFile,
                    previousProfileSize: prevState.previousProfileSize,
                    selectedFile: URL.createObjectURL(file),
                    selectedFile2: true,
                    isDeleted: false,
                }
            })
        }
    }

    sizeAdjust = (value) => {
        let {profileSize} = this.state;
        profileSize += value;

        this.setState({
            profileSize
        });
    }

    onMousePlusAdjustButton = (state) => {
        this.setState({
            isMouseOnPlusAdjustButton: state
        })
    }

    onMouseAcceptAdjustButton = state => {
        this.setState({
            isMouseOnAcceptAdjustButton: state
        })
    }

    onMouseRejectAdjustButton = state => {
        this.setState({
            isMouseOnRejectAdjustButton: state
        })
    }

    onMouseMinusAdjustButton = state => {
        this.setState({
            isMouseOnMinusAdjustButton: state
        })
    }

    render() {
        const {
            isMouseOverProfile, isMouseOverAddButton, isMouseOverDeleteButton,
            hasProfileChangeProcessStarted, selectedFile,
            isMouseOnPlusAdjustButton, isMouseOnAcceptAdjustButton,
            isMouseOnRejectAdjustButton,isMouseOnMinusAdjustButton,
            profileSize, isDeleted
        } = this.state
        return (
            <div style={styles.body}>
                <div
                    style={{
                        position: "absolute",
                        right: -49,
                        zIndex: 1,

                        height: "90%",
                        width: "20%",
                        marginTop:"18%",

                        display:
                            selectedFile !== undefined && hasProfileChangeProcessStarted &&
                            this.state.selectedFile2
                                ? "flex" : "none",
                        flexDirection: "column",
                        justifyContent: "space-around",
                    }}
                >
                    <div
                        style={{
                            position:"absolute",
                            height:"102%",
                            width:"200%",
                            zIndex:-1,

                            borderBottomRightRadius:100,
                            borderTopRightRadius:100,

                            borderBlock: "2px solid orange",
                            borderRight: "2px solid white"
                        }}
                    ></div>
                    <div style={{
                        ...styles.profileAdjustButton,
                    }}
                         onClick={() => this.sizeAdjust(8)}
                         onMouseOver={()=>this.onMousePlusAdjustButton(true)}
                         onMouseLeave={()=>this.onMousePlusAdjustButton(false)}
                    >
                        <MagnifyingGlassPlusIcon
                            style={{
                                height: isMouseOnPlusAdjustButton ?
                                     "120%" : "100%",
                                transition:"height 0.2s linear"
                            }}
                            color={"white"}
                        />
                    </div>
                    <div style={{
                        ...styles.profileAdjustButton,
                        marginLeft: 29
                    }}
                         onClick={() => {
                             this.setState({
                                 hasProfileChangeProcessStarted: false
                             })
                             this.props.setProfile(profileSize, selectedFile, isDeleted)
                         }}
                         onMouseOver={()=>this.onMouseAcceptAdjustButton(true)}
                         onMouseLeave={()=>this.onMouseAcceptAdjustButton(false)}
                    >
                        <CheckIcon
                            style={{
                                height: isMouseOnAcceptAdjustButton ?
                                    "120%" : "100%",
                                transition:"height 0.2s linear"
                            }}
                            color={"white"}
                        />
                    </div>
                    <div style={{
                        ...styles.profileAdjustButton,
                        marginLeft: 29
                    }}
                         onClick={() => {
                             this.setState({
                                 hasProfileChangeProcessStarted: false,
                                 selectedFile: this.state.previousSelectedFile,
                                 profileSize: this.state.previousProfileSize,
                             })
                         }}
                         onMouseOver={()=>this.onMouseRejectAdjustButton(true)}
                         onMouseLeave={()=>this.onMouseRejectAdjustButton(false)}
                    >
                        <XMarkIcon
                            style={{
                                height: isMouseOnRejectAdjustButton ?
                                    "120%" : "100%",
                                transition:"height 0.2s linear"
                            }}
                            color={"white"}
                        />
                    </div>
                    <div style={{
                        ...styles.profileAdjustButton,
                    }}
                         onClick={() => this.sizeAdjust(-8)}
                         onMouseOver={()=>this.onMouseMinusAdjustButton(true)}
                         onMouseLeave={()=>this.onMouseMinusAdjustButton(false)}
                    >
                        <MagnifyingGlassMinusIcon
                            style={{
                                height: isMouseOnMinusAdjustButton ?
                                    "120%" : "100%",
                                transition:"height 0.2s linear"
                            }}
                            color={"white"}
                        />
                    </div>
                </div>
                <div style={styles.profilePictureContainer}
                     onMouseOver={this.onMouseOverProfile}
                     onMouseLeave={this.onMouseLeftProfile}
                >
                    <div style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        backgroundColor: isMouseOverProfile ? "rgba(0,0,0,0.5)" : "",
                        transition: "background-color 0.15s linear",

                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <input
                            type="file"
                            accept=".jpg"
                            onChange={this.handleFileChange}
                            style={{display: 'none'}}
                            ref={fileInput => this.fileInput = fileInput}
                        />
                        <div style={{
                            ...styles.profileButton,
                            marginBottom: 10,
                            display: isMouseOverProfile ? "flex" : "none",
                            backgroundColor: isMouseOverAddButton ? "rgba(0,0,0,0.8)" : "",
                            transition: "background-color 0.15s linear",
                        }}
                             onMouseOver={this.onMouseOverAddButton}
                             onMouseLeave={this.onMouseLeftAddButton}
                             onClick={() => {
                                 if (!hasProfileChangeProcessStarted) {
                                     this.fileInput.click();
                                     this.setState({
                                         hasProfileChangeProcessStarted: true,
                                         selectedFile2: false
                                     })
                                 }
                             }}
                        >
                            <PlusCircleIcon
                                color={"white"}
                                style={{
                                    height: "70%",
                                }}
                            />
                        </div>
                        <div style={{
                            ...styles.profileButton,
                            marginTop: 10,
                            display: isMouseOverProfile ? "flex" : "none",
                            backgroundColor: isMouseOverDeleteButton ? "rgba(0,0,0,0.8)" : "",
                            transition: "background-color 0.15s linear",
                        }}
                             onMouseOver={this.onMouseOverDeleteButton}
                             onMouseLeave={this.onMouseLeftDeleteButton}
                             onClick={() => {
                                 if (!hasProfileChangeProcessStarted) {
                                     this.setState({
                                         isDeleted: true,
                                         selectedFile: undefined,
                                         hasProfileChangeProcessStarted: false
                                     })
                                     this.props.setProfile(profileSize, selectedFile, isDeleted)
                                 }
                             }}
                        >
                            <BackspaceIcon
                                color={"white"}
                                style={{
                                    height: "70%",
                                }}
                            />
                        </div>
                    </div>
                    <Profile
                        isDeleted={this.state.isDeleted}
                        selectedFile={this.state.selectedFile}
                        profileSize={this.state.profileSize}
                    />
                </div>
                <div style={{
                    width: 160,
                    height: "fit-content",
                    backgroundColor: "red"
                }}></div>
            </div>
        );
    }
}

const styles = {
    body: {
        position: "absolute",
        height: "100%",
        width: 160,

        left: 0,
        bottom:-40,

        overflow: "visible",

    },
    profilePictureContainer: {
        height: 200,
        width: 200,
        bottom:0,
        position: "absolute",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "grey",

        borderRadius: 200,
        border: "2px solid white",

        overflow: "hidden"
    },
    profileButton: {
        width: "100%",
        height: "20%",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    profileAdjustButton: {
        width: "100%",
        height: "15%",
        borderRadius: "100%"
    }
}

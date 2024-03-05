"use client"
import React from "react"

import Image from "next/image";
import {CheckCircleIcon, PhotoIcon} from '@heroicons/react/24/solid'

export default class PostCreateContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            textReset: true,

            selectedFile: undefined,
            fileState: false,
        }
    }

    onTextChange = e => {
        let text = e.target.innerHTML;
        this.setState({
            text
        })
    }

    handleFileChange = e => {
        const file = e.target.files[0];

        if (file) {
            this.setState({
                selectedFile: URL.createObjectURL(file),
                fileState: !this.state.fileState,
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.isPostCreateContainerExpanded === false && prevProps.isPostCreateContainerExpanded === true) {
            this.setState({
                text: "",
                textReset: !this.state.textReset,
                selectedFile: undefined,
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.text !== nextState.text) {
            if (this.state.textReset !== nextState.textReset) {
                return true
            }
            return false;
        }
        return true;
    }


    render() {
        const {isPostCreateContainerExpanded, addPost} = this.props
        console.log(this.props.isPostCreateContainerExpanded)
        return (
            <div style={{
                ...styles.body,
                minHeight: isPostCreateContainerExpanded ? 150 : 0,
                marginTop: isPostCreateContainerExpanded ? 25 : 0,
                transition: "min-height 0.5s ease, margin-top 0.2s ease",
            }}
            >
                <div
                    contentEditable={
                        isPostCreateContainerExpanded ?
                            "true" : "false"
                    }
                    style={{
                        ...styles.textSection,
                        minHeight: isPostCreateContainerExpanded ? 60 : 0,
                        padding: isPostCreateContainerExpanded ? 5 : 0,
                        transition: "min-height 0.3s ease, padding 0.3s ease",
                    }}
                    onInput={this.onTextChange}
                    suppressContentEditableWarning={true}
                >
                    {this.state.text}
                </div>
                <div style={{
                    ...styles.imageAndSendSection,
                    minHeight: isPostCreateContainerExpanded ? 90 : 0,
                    transition: "min-height 0.3s ease"
                }}>
                    <div style={{
                        ...styles.imagePick,
                        minHeight: isPostCreateContainerExpanded ? 90 : 0,
                        transition: "min-height 0.3s ease"
                    }}
                         onClick={() => this.fileInput.click()}
                    >
                        <input
                            key={this.state.fileState}
                            type="file"
                            accept=".jpg"
                            onChange={this.handleFileChange}
                            style={{display: 'none'}}
                            ref={fileInput => this.fileInput = fileInput}
                        />
                        {
                            isPostCreateContainerExpanded ?
                                <PhotoIcon style={{
                                    width:50,
                                    height:50
                                }}/> : <></>
                        }

                        {
                            this.state.selectedFile === undefined ?
                                <></> :
                                <Image src={this.state.selectedFile} alt={"a"}
                                       width={0}
                                       height={0}
                                       style={{
                                           width:"100%",
                                           height:"auto"
                                       }}
                                />
                        }
                    </div>
                    <div style={{
                        ...styles.acceptButton,
                        minHeight: isPostCreateContainerExpanded ? 90 : 0,
                        transition: "min-height 0.3s ease"
                    }}
                         onClick={() => {
                             const{selectedFile} = this.state;
                             if(selectedFile !== undefined) {
                                 addPost(this.state.text, this.state.selectedFile);
                                 this.props.openClosePostCreateContainer();
                                 this.setState({
                                     selectedFile: undefined
                                 })
                             }
                         }}
                    >
                        {
                            isPostCreateContainerExpanded ?
                                <CheckCircleIcon
                                    style={{
                                        width:"30%"
                                    }}
                                /> : <></>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    body: {
        width: "65%",
        backgroundColor: "pink",
        display: "flex",
        flexDirection: "column",
        borderRadius: 10,
        height: "fit-content"
    },
    textSection: {
        width: "100%",
        height: "fit-content",
        backgroundColor: "white",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    imageAndSendSection: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        height: "fit-content",
        backgroundColor: "purple",
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    },
    imagePick: {
        width: "80%",
        height: "fit-content",
        backgroundColor: "blue",
        cursor: "pointer",

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    acceptButton: {
        width: "20%",
        height: "fit-content",
        backgroundColor: "purple",
        cursor: "pointer",

        display:"flex",
        justifyContent: "center"
    }
}

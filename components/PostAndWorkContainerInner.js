"use client"
import React from "react"

import WorkContainer from "@/components/WorkContainer";
import PostContainer from "@/components/postContainerComponents/PostContainer";


export default class PostAndWorkContainerInner extends React.Component {
    render() {
        const {whichTabOn, tabState} = this.props;


        return (
            <div style={{
                ...styles.body,
                width: tabState ? "100%" : "0%",
                transition: "width 0.3s ease-in-out",
            }}
            >
                <div style={{
                   ...styles.capsule,
                }}>
                    {
                        whichTabOn === "works" ?
                            <WorkContainer tabState={tabState}></WorkContainer> :
                            <PostContainer tabState={tabState} ProfileComp={this.props.ProfileComp}></PostContainer>
                    }
                </div>
            </div>
        )
    }
}

const styles = {
    body: {
        overflow: "hidden",
        height:"fit-content",
        minHeight:100
    },
    capsule: {
        minWidth: 100,
    }
}

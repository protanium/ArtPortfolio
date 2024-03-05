'use client'

import React from "react";
import PostAndWorkContainer from "@/components/PostAndWorkContainer";
import ProfileSection from "@/components/ProfileSection";
import Profile from "@/components/Profile";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ProfileComponent:
                <Profile
                    isDeleted={true}
                    selectedFile={undefined}
                    profileSize={130}
                    isPostProfile={true}
                 />
        }
    }


    setProfile = (profileSize, selectedFile, isDeleted) => {
        let ProfileComponent = <Profile
            isDeleted={isDeleted}
            selectedFile={selectedFile}
            profileSize={profileSize}
            isPostProile={true}
        />

        this.setState({
            ProfileComponent
        })
    }

    render() {
        const {params} = this.props;

        const {ProfileComponent} = this.state

        return (
            <div style={{
                backgroundColor:"rgb(141,141,141)"
            }}>
                <ProfileSection setProfile={this.setProfile}></ProfileSection>
                <div style={styles.body}>
                    <div style={styles.containerPlus}>
                        <PostAndWorkContainer
                            slug={params.slug}
                            ProfileComponent={ProfileComponent}
                        ></PostAndWorkContainer>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    body: {
        position: "relative",
        height: "100%",
        width: "100%",

        display: "flex",
        justifyContent: "center",
        zIndex: 1,

        marginTop: 68
    },
    containerPlus: {
        width: "50%",
        maxWidth: 600,
        minWidth: 400,
        marginTop: -104
    }
}

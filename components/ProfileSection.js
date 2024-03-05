"use client"
import React from "react";
import ProfileContainer from "@/components/ProfileContainer";
import Image from "next/image";

export default class ProfileSection extends React.Component {
    render() {
        return (
            <div style={styles.body}>
                <ProfileContainer setProfile={this.props.setProfile}/>
                <Image src={require("../assets/cover.jpg")} alt={"a"}
                       style={{
                           width:"50%",
                           height:"auto"
                       }}
                />
            </div>
        );
    }
}

const styles = {
    body:{
        position:"relative",
        width:"100%",
        minHeight:130,
        height:"fit-content",
        zIndex:0,
        backgroundColor:"black",

        display:"flex",
        justifyContent:"flex-end"
    }
}

"use client"
import React from "react";
import Image from "next/image";

export default class Profile extends React.Component {
    render() {
        const{isDeleted, selectedFile, profileSize, isPostProfile} = this.props;

        let image;
        if(isDeleted || selectedFile === undefined){
            image=require("../assets/anonymous.jpg")
        }else{
            image=selectedFile
        }

        let profileSizeV = `${profileSize}%`

        return (
            <Image src={image} alt={"a"}
                   width={0}
                   height={0}
                   style={{
                       width:profileSizeV,
                       height:"auto",
                       marginLeft: isPostProfile ? 0 : 0,
                       marginTop: isPostProfile ? 0 : 0
                   }}
            />
        );
    }
}

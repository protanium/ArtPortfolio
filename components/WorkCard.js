"use client"
import React from "react"
import Image from "next/image";

export default class WorkCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            widthValue: 0,
            displayImages: [
                require("../assets/workAssets/0_4.jpg"),
                require("../assets/workAssets/0_3.jpg"),
                require("../assets/workAssets/0_2.jpg"),
                require("../assets/workAssets/0_1.jpg"),
            ],
            marginRate: 0,

            shouldSetHeight: true
        }
        this.myRef = React.createRef()
    }

    mouseIsOver = () => {
        this.setState({
            marginRate: 20
        })
    }

    mouseHasLeft = () => {
        this.setState({
            marginRate: 0
        })
    }

    mouseHas

    componentDidMount() {
        const {setHeight} = this.props
        if (setHeight !== undefined) {
            this.setClientHeight()
            window.addEventListener("resize", this.setClientHeight)
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.setClientHeight)
    }

    setClientHeight = () => {
        this.props.setHeight(this.myRef.current.clientWidth)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.props.tabState, "A")
        console.log(prevState.tabState, "B")
        if(this.props.tabState === true && prevState.tabState === undefined && this.state.shouldSetHeight){
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa")
            this.setState({
                shouldSetHeight: false
            })
            setTimeout(this.setClientHeight, 350) //çünkü tab değişimi süre alıyor
        }else if(this.props.tabState === false && prevState.tabState === undefined && this.state.shouldSetHeight === false){
            this.setState({
                shouldSetHeight:true
            })
        }
    }


    render() {
        const {height} = this.props

        return (
            <div
                ref={this.myRef}
                style={{
                    ...styles.body,
                    height: height,
                    transition: "height 0.2s linear"

                }}
                onMouseOver={this.mouseIsOver}
                onMouseLeave={this.mouseHasLeft}
            >
                <div style={{
                    marginBottom:"207%"
                }}>Work</div>
                {this.state.displayImages.map((item, index) => {
                    let degree = (index + 1) * 12;
                    degree = index % 2 === 0 ? -degree : degree

                    let marginMultiplier = index === 0 ? 18 :
                        index === 1 ? 18 : index === 2 ? 5 : 5

                    return (
                        <Image src={item} alt={"r"}
                               style={{
                                   height: "80%",
                                   width: "auto",
                                   position: "absolute",
                                   transform: `rotate(${degree}deg)`,
                                   marginBottom: this.state.marginRate*3,
                                   marginRight: degree < 0 ? 0 : this.state.marginRate * (-degree * marginMultiplier / 100),
                                   marginLeft: degree > 0 ? 0 : this.state.marginRate * (degree * marginMultiplier / 100),
                                   transition:
                                       "margin-bottom 0.2s ease,margin-right 0.2s ease, margin-left 0.2s ease"
                               }}
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
        width: "20%",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}

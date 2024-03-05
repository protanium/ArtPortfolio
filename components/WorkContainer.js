"use client"
import React from "react";
import WorkCard from "@/components/WorkCard";
import {SquaresPlusIcon} from '@heroicons/react/24/solid'
export default class WorkContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            works: [
                {id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5},
            ],
            widthValue: 0
        }
    }

    twoBytwo = () => {
        const {works} = this.state;
        const withTwo = []

        let i = 0;
        while (i < works.length) {
            if (!(i + 1 > works.length - 1)) {
                withTwo.push([works[i], works[i + 1]])
            } else {
                let addItem = [works[i], 0]
                withTwo.push(addItem)
            }
            i += 2;
        }

        return withTwo;

    }

    setWidthValue = (value) => {
        this.setState({
            widthValue: value + value * 20 / 100
        })
    }

    render() {
        const workList = this.twoBytwo();

        const {tabState} = this.props

        return (
            <div style={styles.body}>
                {workList.map((item, index) => {
                    return (
                        <div style={
                            styles.workSection}>
                            {
                                item[1] !== 0 ?
                                    (
                                        <>
                                            <WorkCard
                                                ref={this.myRef}
                                                height={this.state.widthValue}
                                                setHeight={
                                                    index === 0 ?
                                                        this.setWidthValue :
                                                        undefined
                                                }
                                                id={item[0].id}
                                                key={item[0].id}
                                                tabState={
                                                    index === 0 ?
                                                        tabState : undefined
                                                }
                                            ></WorkCard>
                                            <WorkCard
                                                height={this.state.widthValue}
                                                id={item[1].id}
                                                key={item[1].id}
                                            ></WorkCard>
                                        </>
                                    ) : (
                                        <>
                                            <WorkCard
                                                height={this.state.widthValue}
                                                id={item[0].id}
                                                key={item[0].id}
                                            ></WorkCard>
                                            <div
                                                style={{
                                                    ...styles.Y,
                                                    height: this.state.widthValue
                                                }}>
                                                <SquaresPlusIcon
                                                    style={{
                                                        width:"50%"
                                                    }}
                                                />
                                            </div>
                                        </>
                                    )
                            }
                        </div>
                    )
                })
                }
                {
                    workList[workList.length - 1][1] !== 0 ?
                        <div style={styles.workSection}>
                            <div
                                style={{
                                    ...styles.Y,
                                    height: this.state.widthValue
                                }}>
                                <SquaresPlusIcon
                                    style={{
                                        width:"50%"
                                    }}
                                />
                            </div>
                        </div> : <></>
                }
            </div>
        )
    }
}

const styles = {
    body: {
        width: "100%",
    },
    workSection: {
        display: "flex",
        width: "100%",
        height: "fit-content",

        justifyContent: "space-evenly",
        alignItems: "center",

        paddingTop: 90,
        paddingBottom: 90
    },

    X: {
        width: "20%",
        backgroundColor: "red"
    },
    Y: {
        width: "20%",
        backgroundColor: "yellow",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor:"pointer"
    }
}

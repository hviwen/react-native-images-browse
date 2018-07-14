import React, {Component} from "react";
import {
    View,
    StyleSheet,
    Animated,
    PanResponder,
} from "react-native";

import PropTypes from "prop-types";

class ImgScrollPage extends Component {

    static propTypes = {
        initPage: PropTypes.number,
        blurredZoom: PropTypes.number,
        blurredOpacity: PropTypes.number,
        animationDuration: PropTypes.number,
        pageStyle: PropTypes.object,
        onImgPageChange: PropTypes.func,
        deltaDelay: PropTypes.number,
        children: PropTypes.array.isRequired
    };


    static defaultProps = {
        initPage: 0,
        blurredZoom: 1,
        blurredOpacity: 0.8,
        animationDuration: 150,
        deltaDelay: 0,
        onImgPageChange: () => {
        }

    };

    state = {
        width: 0,
        height: 0
    };


    _getPosForPage(pageNb) {
        return -pageNb * this._imgSizeInterval;
    }


    _getPageForOffset(offset, diff) {
        let boxPos = Math.abs(offset / this._imgSizeInterval);
        let index;

        if (diff < 0) {
            index = Math.ceil(boxPos);
        } else {
            index = Math.floor(boxPos);
        }

        if (index < 0) {
            index = 0;
        } else if (index > this.props.children.length - 1) {
            index = this.props.children.length - 1;
        }
        return index;
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => {
                const dx = Math.abs(gestureState.dx);
                const dy = Math.abs(gestureState.dy);
                return (dx > this.props.deltaDelay && dx > dy);
            },
            onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                const dx = Math.abs(gestureState.dx);
                const dy = Math.abs(gestureState.dy);
                return (dx > this.props.deltaDelay && dx > dy);
            },
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,

            onPanResponderGrant: (evt, gestureState) => {
            },
            onPanResponderMove: (evt, gestureState) => {
                let suffix = "x";
                this.state.pos.setValue(this._lastPos + gestureState["d" + suffix]);
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                let suffix = "x";
                this._lastPos += gestureState["d" + suffix];
                let page = this._getPageForOffset(this._lastPos, gestureState["d" + suffix]);
                this.animateToPage(page);
            },
            onPanResponderTerminate: (evt, gestureState) => {
            },
            onShouldBlockNativeResponder: (evt, gestureState) => true
        });
    }

    _scrollNextPage = (width, height) => {
        this._imgPageSize = width;
        this._imgSizeInterval = width;

        let initPage = this.props.initPage || 0;
        if (initPage < 0) {
            initPage = 0;
        } else if (initPage >= this.props.children.length) {
            initPage = this.props.children.length - 1;
        }

        this._currentPage = initPage;
        this._lastPos = this._getPosForPage(this._currentPage);

        let viewsScale = [];
        let viewsOpacity = [];
        for (let i = 0; i < this.props.children.length; ++i) {
            viewsScale.push(new Animated.Value(i === this._currentPage ? 1 : this.props.blurredZoom));
            viewsOpacity.push(new Animated.Value(i === this._currentPage ? 1 : this.props.blurredOpacity));
        }

        this.setState({
            width,
            height,
            pos: new Animated.Value(this._getPosForPage(this._currentPage)),
            viewsScale,
            viewsOpacity
        });
    };

    animateToPage = (page) => {
        let animations = [];
        if (this._currentPage !== page) {
            animations.push(
                Animated.timing(this.state.viewsScale[page], {
                    toValue: 1,
                    duration: this.props.animationDuration
                })
            );

            animations.push(
                Animated.timing(this.state.viewsOpacity[page], {
                    toValue: 1,
                    duration: this.props.animationDuration
                })
            );

            animations.push(
                Animated.timing(this.state.viewsScale[this._currentPage], {
                    toValue: this.props.blurredZoom,
                    duration: this.props.animationDuration
                })
            );

            animations.push(
                Animated.timing(this.state.viewsOpacity[this._currentPage], {
                    toValue: this.props.blurredOpacity,
                    duration: this.props.animationDuration
                })
            );
        }

        let toValue = this._getPosForPage(page);

        animations.push(
            Animated.timing(this.state.pos, {
                toValue: toValue,
                duration: this.props.animationDuration
            })
        );

        Animated.parallel(animations).start();

        this._lastPos = toValue;
        this._currentPage = page;
        this.props.onImgPageChange(page);
    };


    render() {
        const {width, height} = this.state;
        if (!width && !height) {
            return (
                <View style={{flex: 1}}>
                    <View
                        style={styles.orgNoPage}
                        onLayout={evt => {
                            let width = evt.nativeEvent.layout.width;
                            let height = evt.nativeEvent.layout.height;
                            this._scrollNextPage(width, height);
                        }}
                    />
                </View>
            );
        }

        let containerStyle = {
            flex: 1,
            left: this.state.pos,
            paddingLeft: 0,
            paddingRight: 0,
            flexDirection: "row"
        };
        let imgPageStyle = {
            width: this._imgPageSize,
            marginRight: 0
        };

        return (
            <View style={styles.orgScrollView}>
                <Animated.View
                    style={containerStyle}
                    {...this._panResponder.panHandlers}
                >
                    {
                        this.props.children.map((imgSource, key) => {
                            return (
                                <Animated.View
                                    key={key}
                                    style={[{
                                        opacity: this.state.viewsOpacity[key],
                                        transform: [{scaleY: this.state.viewsScale[key]}]
                                    }, imgPageStyle, this.props.pageStyle]}
                                >
                                    {imgSource}
                                </Animated.View>
                            );
                        })
                    }
                </Animated.View>

            </View>
        );


    }
}

const styles = StyleSheet.create({
    orgNoPage: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "transparent"
    },

    orgScrollView: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        overflow: "hidden"
    }


});

export default ImgScrollPage;




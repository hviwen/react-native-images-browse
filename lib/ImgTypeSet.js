import React, {Component} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
} from "react-native";

import PropTypes from "prop-types";
import {isEmpty} from "./ImgUtils";
import ImageChild from './ImgChild';

const window = Dimensions.get("window");

class ImgTypeSet extends Component {

    static propTypes = {
        imgSource: PropTypes.array.isRequired
    };

    state = {
        imgSLineTop: [],
        imgSLineMid: [],
        imgSLineBottom: [],
    };


    componentWillMount() {
        const {imgSource} = this.props;

        if (!isEmpty(imgSource)) {
            const _imgSize = imgSource.length;
            const _partSize = Math.ceil(_imgSize / 3);

            let _partArray = [];

            for (let i = 0, j = 1; i < _partSize; i++, j++) {
                _partArray = _partArray.concat(imgSource.slice(i * 3, j * 3 > imgSource.length ? imgSource.length : j * 3));

                if (i === 0) {
                    this.setState({
                        imgLineA: _partArray
                    });
                } else if (i === 1) {
                    this.setState({
                        imgLineB: _partArray
                    });
                } else if (i === 2) {
                    this.setState({
                        imgLineC: _partArray
                    });
                }
                _partArray = [];
            }
        }
    }


    render() {
        const {
            imgSLineTop,
            imgSLineMid,
            imgSLineBottom,
        } = this.state;
        const {imgSource} = this.props;
        let picNum = imgSource.length - 9;

        return (
            <View style={styles.orgView}>
                {
                    isEmpty(imgSLineTop)
                        ? null
                        :
                        <View style={styles.showImgView}>
                            {
                                imgSLineTop.map((imgData, key) => {
                                    return (
                                        <TouchableOpacity key={key}
                                                          style={{flex: 1}}
                                                          activeOpacity={0.8}
                                                          onPress={() => this.props.onPress(key)}>
                                            <ImageChild loadImgUrl={imgData} imgNum={imgSLineTop}/>
                                        </TouchableOpacity>
                                    );
                                })
                            }
                        </View>
                }

                {
                    isEmpty(imgSLineMid)
                        ? null
                        :
                        <View style={styles.showImgView}>
                            {
                                imgSLineMid.map((imgData, key) => {
                                    return (
                                        <TouchableOpacity key={key}
                                                          style={{flex: 1}}
                                                          activeOpacity={0.8}
                                                          onPress={() => this.props.onPress(3 + key)}>
                                            <ImageChild loadImgUrl={imgData} imgNum={imgSLineMid}/>
                                        </TouchableOpacity>
                                    );
                                })
                            }
                        </View>
                }


                {
                    isEmpty(imgSLineBottom)
                        ? null
                        :
                        <View style={styles.showImgView}>
                            {
                                imgSLineBottom.map((imgData, key) => {
                                    return (
                                        <TouchableOpacity key={key}
                                                          style={{flex: 1}}
                                                          activeOpacity={0.8}
                                                          onPress={() => this.props.onPress(6 + key)}>
                                            <ImageChild loadImgUrl={imgData} imgNum={imgSLineBottom}/>
                                        </TouchableOpacity>
                                    );
                                })
                            }
                        </View>
                }

                {
                    picNum >= 0
                        ?
                        <View style={styles.visBaView}>
                            <Text style={styles.visText}>
                                {`+ ${picNum}`}
                            </Text>
                        </View>
                        : null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    orgView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    showImgView: {
        width: window.width,
        height: window.width / 3,
        flexDirection: "row",
        flexWrap: "wrap",
    },

    visBaView: {
        alignItems: "flex-end",
        justifyContent: "center",
        padding: 10,
        width: window.width - 4,
        height: window.width * 0.12,
        marginLeft: 2,
        marginRight: 2,
        marginTop: -window.width * 0.12,
        backgroundColor: "rgba(255,255,255,0.75)"
    },

    visText: {
        fontSize: 25,
        color: '#666',
    },

});

export default ImgTypeSet;
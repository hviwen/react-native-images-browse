import React, {Component} from "react";
import {
    View,
    Image,
    Modal,
    Dimensions,
    StyleSheet,
    ActivityIndicator,
    TouchableWithoutFeedback,
} from "react-native";
import PropTypes from "prop-types";

import ImgTypeSet from "./ImgTypeSet";
import ImgScrollPage from "./ImgScrollPage";
import {isEmpty} from "./ImgUtils";

const window = Dimensions.get("window");


class ImageBorwseCard extends Component {

    static propTypes = {
        imgSource: PropTypes.array.isRequired
    };


    constructor(props) {
        super(props);
        this.state = {
            imgVis: false,
            visPage: 0,
            _imgHeight: [],
            copyImgSource: [],
            sortKey: [],
        };
    }

    componentWillMount() {
        const {imgSource} = this.props;
        imgSource.forEach((urlImg, key) => {
            Image.getSize(urlImg, (oWidth, oHeight) => {
                this.state.copyImgSource.push(imgSource[key]);
                this.state._imgHeight.push(Math.ceil(window.width * (oHeight / oWidth)));
                this.state.sortKey.push(key);
            })
        })
    }

    _modalClose() {

    }

    _imgClick = (key) => {
        const {sortKey} = this.state;

        for (let i = 0; i < sortKey.length; i++) {
            if (key === sortKey[i]) {
                this.setState({
                    imgVis: !this.state.imgVis,
                    visPage: i,
                })
            }
        }
    };


    render() {
        const {imgVis, visPage, _imgHeight, copyImgSource} = this.state;
        const {imgSource} = this.props;

        if (isEmpty(this.props.imgSource)) {
            return (
                <ActivityIndicator
                    size='large'
                    color={"#19A2FF"}
                    style={{margin: window.width * 0.2}}
                />
            );
        }

        return (
            <View style={styles.container}>
                <Modal
                    animationType={"fade"}
                    transparent={false}
                    visible={imgVis}
                    onRequestClose={() => this._modalClose()}>
                    <View style={styles.modalBgView}>
                        {
                            isEmpty(copyImgSource)
                                ?
                                <View style={styles.perBgView}>
                                    <ActivityIndicator
                                        color={'#F2F2F2'}
                                        size={'large'}
                                    />
                                </View>
                                :
                                <ImgScrollPage
                                    initPage={visPage || 0}
                                    pageStyle={{
                                        justifyContent: "center"
                                    }}>
                                    {
                                        copyImgSource.map((netImg, key) => {
                                            return (
                                                <TouchableWithoutFeedback key={key}
                                                                          onPress={() => this._imgClick(key)}>
                                                    <Image
                                                        style={{
                                                            width: window.width,
                                                            height: _imgHeight[key],
                                                        }}
                                                        source={{uri: netImg}}
                                                    />
                                                </TouchableWithoutFeedback>
                                            )
                                        })
                                    }
                                </ImgScrollPage>
                        }
                    </View>
                </Modal>

                <ImgTypeSet
                    imgSource={imgSource}
                    imgClick={this._imgClick}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    modalBgView: {
        flex: 1,
        backgroundColor: `rgba(0,0,0,0.85)`,
    },

    perBgView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.15)',
        justifyContent: 'center',
    },


});

export default ImageBorwseCard;

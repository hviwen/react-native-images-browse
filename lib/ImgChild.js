import React, {Component} from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
    Platform,
} from 'react-native';

import PropTypes from "prop-types";

const window = Dimensions.get('window');

class ImageChild extends Component {

    static propTypes = {
        loadImgUrl: PropTypes.string,
        imgNum: PropTypes.number,
    };

    state = {
        loadStatus: 'pending',
        imageVis: false,
    };


    constructor(props) {
        super(props);
        this.state = {
            loadStatus: 'pending',
            imageVis: false,
        }
    }

    handleImageProgress = ({nativeEvent: event}) => {
        let _total = event.total;
        let _load = event.loaded;

        if (_load / _total === 1) {
            this.setState({
                imageVis: true,
            })
        }
    };


    handleImageLoaded() {
        this.setState({
            loadStatus: 'success',
        })
    }

    handleImageErrored() {
        this.setState({
            loadStatus: 'error',
        })
    }


    render() {
        const {loadStatus, imageVis} = this.state;
        const {imgNum, loadImgUrl} = this.props;

        if (loadStatus === 'error') {
            return (
                <Image
                    source={require('../images/iv_default.png')}
                    style={{
                        width: window.width / imgNum.length - 5,
                        height: window.width * 0.32,
                        margin: 2
                    }}
                    resizeMode={'cover'}
                />
            )
        }

        return (
            <View>
                <Image
                    style={{
                        width: window.width / imgNum.length - 5,
                        height: window.width * 0.32,
                        margin: 2
                    }}
                    source={{uri: loadImgUrl}}
                    resizeMode={'cover'}
                    onProgress={this.handleImageProgress}
                    onLoad={this.handleImageLoaded.bind(this)}
                    onError={this.handleImageErrored.bind(this)}
                />

                {
                    !imageVis &&
                    <View style={{
                        width: window.width / imgNum.length - 5,
                        height: window.width * 0.32,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: -window.width * 0.32,
                        margin: 2
                    }}>
                        <ActivityIndicator
                            color={'#666'}
                            size={'large'}
                        />
                    </View>
                }
            </View>
        )
    }
}


export default ImageChild




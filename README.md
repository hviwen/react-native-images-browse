# react-native-images-browse

#### Scope of application

📱*Android / ios*



#### A brief description

🌁 A maximum number of image viewers that can be placed in a nine-square grid for ReactNative

 A maximum number of image viewers that can be placed in a nine-square grid. It supports zooming in on a single page. The number of images viewed in a single page is allowed to be greater than nine, and the number of images will be prompted. Support for dynamic loading and temporary replacement of incorrect address images.



#### Characteristic

- <u>Web image dynamic loading</u>
- <u>Local replacement of the wrong picture address</u>
- <u>Skip the single image of the wrong image</u>



#### Install

Using npm:

```javascript
npm install --save react-native-images-browse
```



#### Usage

```javascript
import ImageBrowse from 'react-native-images-browse';

constructor(props) {
        super(props);
        this.state = {
            iSource: [
                "https://i.imgur.com/UYiroysl.jpg",
                "https://i.imgur.com/UPrs1EWl.jpg",
                "https://i.imgur.com/MABUbpDl.jpg",
                "https://i.imgur.com/gwYhgmW.jpg",
                "https://i.imgur.com/KZsmUi2l.jpg",
                "https://i.imgur.com/CpihD0u.jpg",
            ]
        }
    }

render(){
    return(
    	<View>
       <ImageBrowse imgSource={this.state.iSource}/>
      </View>
    )
}
```



| Type      | Value | Description                   |
| --------- | ----- | ----------------------------- |
| imgSource | N/A   | Array of images when browsing |



#### Future

- Zoom in to images when browsing images



**MIT Licensed**

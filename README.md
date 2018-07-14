# react-native-images-browse

#### Scope of application

📱_Android_ / _ios_



#### A brief description

🌁 A maximum number of image viewers that can be placed in a nine-square grid for ReactNative

 A maximum number of image viewers that can be placed in a nine-square grid. It supports zooming in on a single page. The number of images viewed in a single page is allowed to be greater than nine, and the number of images will be prompted. Support for dynamic loading and temporary replacement of incorrect address images.



#### Characteristic

- Web image dynamic loading
- Local replacement of the wrong picture address
- Skip the single image of the wrong image



#### Demo

- arrangement

<center class="half">

<img src="http://pbu5ubzxu.bkt.clouddn.com/18-7-14/82328238.jpg" width="370"/>  <img src="http://pbu5ubzxu.bkt.clouddn.com/18-7-14/11150044.jpg" width="370" />

</center>

<center class="falf">

<img src="http://pbu5ubzxu.bkt.clouddn.com/18-7-14/8817691.jpg" width="370"/> <img src="http://pbu5ubzxu.bkt.clouddn.com/18-7-14/5003688.jpg" width="370"/>

</center>

- Browse

<center class="half">

<img src="http://pbu5ubzxu.bkt.clouddn.com/18-7-14/87589636.jpg" width="370"/> <img src="http://pbu5ubzxu.bkt.clouddn.com/18-7-14/85088044.jpg" width="370"/>  

</center>





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

 <ImageBrowse imgSource={this.state.iSource}/>
```



| Type      | Value | Description                   |
| --------- | ----- | ----------------------------- |
| imgSource | N/A   | Array of images when browsing |



#### Future

- Zoom in to images when browsing images



**MIT Licensed**
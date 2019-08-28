import React from 'react';
import { ActivityIndicator, Text, View, Image, StatusBar, TouchableWithoutFeedback } from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { FullscreenImage } from './Components/FullscreenImage.js';

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://www.reddit.com/r/mobilewallpapers/top.json')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          i: 0,
          dataSource: responseJson.data.children,
          data: responseJson.data.children[0].data.url,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render(){

    if (this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
 
    return(
      <View style={{flex: 1, backgroundColor: 'lightSkyBlue', justifyContent: "center", alignContent: "center"}}>
        <StatusBar hidden={true} />
        <View style={{flex: 1, justifyContent: "center", alignContent: "center"}}>
        <GestureRecognizer style={{flex: 1, padding: 20}} onSwipeLeft={() => {this.onSwipeLeft()}} onSwipeRight={() => this.onSwipeRight()}>
          <TouchableWithoutFeedback style={{flex: 1}}>
            <Image source={{uri: this.state.data}} style={{height: 500, width: 300, alignSelf: "center"}} onPress = {this.fullscreen()} />
          </TouchableWithoutFeedback>
        </GestureRecognizer>
        </View>
      </View>
    );
  }

  onSwipeLeft= () => {
    if (this.state.i < 24) {
      this.setState((i) => ({i: this.state.i + 1, data: this.state.dataSource[this.state.i + 1].data.url}));
    }
  }
 
  onSwipeRight= () => {
    if (this.state.i > 0) {
      this.setState((i) => ({i: this.state.i - 1, data: this.state.dataSource[this.state.i - 1].data.url}));
    }
  }

  fullscreen = () => {

  }

}

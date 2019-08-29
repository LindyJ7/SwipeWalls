import React from 'react';
import { ActivityIndicator, Text, View, Image, StatusBar, TouchableWithoutFeedback } from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { createStackNavigator, createAppContainer } from 'react-navigation';


class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state = { isLoading: true }
  }

  componentDidMount(){
    return fetch('https://www.reddit.com/r/mobilewallpapers/new.json')
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
        <GestureRecognizer style={{flex: 1, padding: 150}} onSwipeLeft={() => {this.onSwipeLeft()}} onSwipeRight={() => this.onSwipeRight()}>
          <TouchableWithoutFeedback style={{flex: 1}} onPress = {() => this.props.navigation.navigate('FullscreenWall', {'imgURL': this.state.data})} >
            <Image source= {{uri: this.state.data}} style={{height: 500, width: 300, alignSelf: "center"}} onPress = {() => this.props.navigation.navigate('FullscreenWall', {'imgURL': this.state.data})}  />
          </TouchableWithoutFeedback>
        </GestureRecognizer>
        </View>
      </View>
    );
  }

  onSwipeLeft = () => {
    if (this.state.i < 24) {
      var imgNum = this.state.i + 1;
      var imgURL = this.state.dataSource[imgNum].data.url;
      this.setState((i) => ({i: imgNum, data: imgURL}));
    }
  }
 
  onSwipeRight = () => {
    if (this.state.i > 0) {
      var imgNum = this.state.i - 1;
      var imgURL = this.state.dataSource[imgNum].data.url;
      this.setState((i) => ({i: imgNum, data: imgURL}));
    }
  }
}

class FullscreenImage extends React.Component {

  constructor(props) {
      super(props);
      this.state = {isLoaded: false, isError: false, data: this.props.navigation.getParam('imgURL', 'http://www.dumpaday.com/wp-content/uploads/2018/09/photos-21-3.jpg')};
  }

  render() {
      return (
          <View style = {{flex: 1}}>
              <Image source = {{uri: this.state.data}} style = {{flex: 1}} />
          </View>
      );
  };
}


const AppNavigator = createStackNavigator({
  WallSwiper: { screen: FetchExample },
  FullscreenWall: { screen: FullscreenImage }},
  {
    initialRouteName: 'WallSwiper',
    defaultNavigationOptions: {
      header: null,
      
    },
  }
);

const App = createAppContainer(AppNavigator);
export default App;
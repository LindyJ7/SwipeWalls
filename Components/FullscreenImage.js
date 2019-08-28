import React from 'react';
import Image from 'react-native';

export default class FullscreenImage extends React.Component {

    constructor(props) {
        super(props);
        this.setState({isLoaded: false, isError: false});
    }

    render() {
        const {imageURL} = this.props;
        return (
            <View style = {{flex: 1}}>
                <Image source = {imageURL} style = {{flex: 1}} />
            </View>
        );
    };
}
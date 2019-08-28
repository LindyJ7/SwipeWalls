import React, {Component, PropTypes} from 'react';
import Image from 'react-native';

class FullscreenImage extends Component {

    constructor(props) {
        super(props);
        this.setState({isLoaded: false, isError: false});
    }

    render() {
        const {imageURL} = this.props;
        return (
            <Image source = {imageURL} style = {{flex: 1}} />
        );
    };
}
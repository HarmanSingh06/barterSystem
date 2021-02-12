import * as React from 'react';
import {Header} from 'react-native-elements';

const MyHeader = props =>{
        return(
            <Header 
            centerComponent = {{text:props.title, style:{fontSize:25,color:"#00003a",fontWeight:'bold'}}}
            backgroundColor = "#8fd1d7"/>
        );
}
export default MyHeader;
import React, {Component} from 'react';
import {View, Text, Animated, Dimensions, StyleSheet, TouchableHighlight} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import db from '../config';

export default class SwipableFlatList extends Component{
    constructor(props){
        super(props)
        this.state={
            allNotifications:this.props.allNotifications,
        };
    }
    render(){
        return(
            <View style={styles.container}>
                <SwipeListView 
                    disableRightSwipe
                    data={this.state.allNotifications}
                    renderItem={this.renderItem}
                    renderHiddenItem={this.renderHiddenItem}
                    rightOpenValue={-Dimensions.get('window').width}
                    previewRowKey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                    onSwipeValueChange={this.onSwipeValueChange}
                />
                <Text>Swipable Flat List</Text>

            </View>
        )
    }


updateMarkAsRead=notification=>{
    db.collection("all_notifications").doc(notification.doc_id).update({
        notification_status: "read"
    });
};

onSwipeValueChange=swipeData=>{
    var allNotifications=this.state.allNotifications;
    const {key, value}=swipeData;
    if (value<-Dimensions.get("window").width){
        const newData=[...allNotifications];
        this.updateMarkAsRead(allNotifications[key]);
        newData.splice(key,1);
    }
}

renderItem=data=>{
    <ListItem
        leftElement={<Icon name="book" type="font-awesome" color="#696969"/>}
        title={data.item.book_name}
        titleStyle={{color: 'black', fontWeight: 'bold'}}
        subtitle={data.item.message}
        bottomDivider
    />
}

renderHiddenItem=()=>{
    <View style={styles.rowBack}>
        <View style={[styles.backRightButton, styles.backRightBtnRight]}>
            <Text style={styles.backTextWhite}></Text>
        </View>
    </View>
};

}

const styles=StyleSheet.create({
    
})
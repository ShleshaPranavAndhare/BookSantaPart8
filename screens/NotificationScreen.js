import React ,{Component} from 'react'
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet, ImageComponent} from 'react-native';
import {Card,Icon,ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'
import firebase from 'firebase';
import db from '../config.js';
import SwipableFlatList from '../components/SwipableFlatList.js';

export default class NotificationScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            userId: firebase.auth().currentUser.email,
            allNotifications: []
        },
        this.notificationRef=null
        //this.props.allNotifications
    }
    getNotifications=()=>{
        this.notificationRef=db.collection("all_notifications")
        .where("notification_status", "==", "unread")
        .where("targeted_user_id", "==", this.state.userId)
        .onSnapshot((snapshot)=>{
            var allNotifications=[]
            snapshot.docs.map((doc)=>{
                var notification=doc.data()
                notification["doc_id"]=doc.id 
                allNotifications.push(notification)
            })
            this.setState({
                allNotifications: allNotifications
            });
        });
    };
    componentDidMount(){
        this.getNotifications()
    }
    componentWillUnmount(){
        this.notificationRef()
    }
    keyExtractor=(item, index)=>index.toString()

    renderItem=({item, index})=>{
        return(
            <ListItem
                key={index}
                leftElement={<Icon name="book" type="font-awesome" color="#696969"/>}
                title={item.book_name}
                titleStyle={{color: "black", fontWeight: "bold"}}
                subtitle={item.message}
                bottomDivider
            />
        )
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <View style={{flex: 0.1}}>
                    <MyHeader Title={"Notificatios"}
                    navigation={this.props.navigation}
                    />

                </View>

                <View style={{flex: 0.9}}>
                    {
                        this.state.allNotifications.length===0?
                        (
                            <view style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: '25'}}>
                                    You have no Notifications
                                </Text>
                            </view>
                        )
                        :
                        (
                            <SwipableFlatList allNotifications={this.state.allNotifications}
                            />
                        )
                    }
                </View>
            </View>
        );    
    }
}

const styles=StyleSheet.create({
    container:{
        flex: 1
    }
})
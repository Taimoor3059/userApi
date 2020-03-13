import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator } from 'react-native';
import { Card, CardItem } from 'native-base';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: []
    }
  }

  getUserFromApi = () => {
    return(
      fetch('https://randomuser.me/api/?results=50')
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            isLoading: false,
            dataSource: this.state.dataSource.concat(responseJson.results)
          })
          console.log(this.state.dataSource)
        })
        
        .catch(error => {
          console.log(error)
        })
    )
  }

  _keyExtractor = (datasource, index) => dataSource.email;



  componentDidMount() {
    this.getUserFromApi();
    
  }
  


  render() {
    if (this.state.isLoading) {
      return (
        <FlatList
        data= {this.state.dataSource}
        keyExtractor={this._keyExtractor}
        renderItem={ (item) => (
          <Card>
            <CardItem>
              <View style={styles.container}>
                <Image
                   style={styles.profilepic}
                   source={{uri: item.picture.medium}}
                />
              </View>
              <View style={styles.userinfo}>
                <Text>
                  Name: {item.name.title} {item.name.first} {item.name.last}
                </Text>
                <Text>
                  Email: {item.email}
                </Text>
                <Text>
                  City: {item.location.city}
                </Text>
                <Text>
                  Phone: {item.phone}
                </Text>
              </View>
            </CardItem>
          </Card>
        )  } 
        ></FlatList>
      );
    }
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start  hello working on your app!</Text>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilepic: {
    flex: 2,
    height: 100,
    width: 100,
    marginEnd: 10
  },
  userinfo: {
    flex: 5,
    flexDirection: "column",
    
  },
});










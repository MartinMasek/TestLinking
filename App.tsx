import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Linking } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

// const AUTH_URL = "https://pocsecurity1234.azurewebsites.net/auth"
const AUTH_URL = "http://localhost:1338/renderHTML"
// const AUTH_URL = "https://localhost:3001"
const TENANT_ID = "3926f5f4-ca60-46de-b9f8-72639d55232d"
const CLIENT_ID = "909caae4-5065-438a-afb3-afd01c2ff8dc"

export default class App extends Component {
  componentDidMount() {
    Linking.addEventListener('url', this._handleUrl);
    Linking.getInitialURL().then((url) => {
      console.log('Linking got url');
      console.log(url);
      if (url) {
        console.log('Initial url is: ' + url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  _handleUrl = url => {
    console.log(url);
    // this.setState({ url });
    // let { path, queryParams } = Linking.parse(url);
    // alert(`Linked to app with path: ${path} and data: ${JSON.stringify(queryParams)}`);
  };

  _openWebBrowserAsync = async (url?) => {
    try {
      // this._addLinkingListener();
      let result = await WebBrowser.openBrowserAsync(
        // We add `?` at the end of the URL since the test backend that is used
        // just appends `authToken=<token>` to the URL provided.
        `https://login.microsoftonline.com/${TENANT_ID}/oauth2/authorize?client_id=${CLIENT_ID}`
        + `&redirect_uri=${encodeURIComponent(AUTH_URL)}&response_type=code`
      );
      console.log(result);
      // this._removeLinkingListener();
      this.setState({ result });
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  _openAuthBrowserAsync = async () => {
    try {
      // this._addLinkingListener();
      let result = await WebBrowser.openAuthSessionAsync(
        // We add `?` at the end of the URL since the test backend that is used
        // just appends `authToken=<token>` to the URL provided.
        `https://login.microsoftonline.com/${TENANT_ID}/oauth2/authorize?client_id=${CLIENT_ID}`
        + `&redirect_uri=${encodeURIComponent(AUTH_URL)}&response_type=code`
      );
      console.log(result);
      // this._removeLinkingListener();
      this.setState({ result });
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  render() {
    console.log(" > >Render");
    // this._openWebBrowserAsync();
    // let redirectUrl = Linking.makeUrl('path/into/app', { hello: 'world', goodbye: 'now' });
    // console.log(redirectUrl);
    return (
      <View style={styles.container} >
        <Text>OPEN up App.tsx to start sworking on your app!</Text>
        <Button title="Open AUTH"
          onPress={async () => {
            await this._openWebBrowserAsync();
          }}
        />
        <Button title="Open AUTH Browser"
          onPress={async () => {
            await this._openAuthBrowserAsync();
          }}
        />
        <Button title="Open through linking"
          onPress={async () => {
            Linking.openURL(`http://localhost:1338/renderHTML`)
          }}
        />
      </View >
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
});

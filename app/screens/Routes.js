import React, { Component } from 'react';
import {Router,Stack, Scene } from 'react-native-router-flux';
import Homepage from './Homepage';
//import About from './About';
//import Recorderscreen from './Recorderscreen';
//import Export from './Export';
import Import from './Import';
//import Page from './Page';
import RecorderScreen1 from './RecorderScreen1';

export default class Routes extends Component {
    render() {
        return(
            <Router>
                <Stack key="root" hideNavBar={true}>
                    <Scene key="homepage" component={Homepage} title="Homepage" />
                    {/* <Scene key="about" component={About} title="About" /> */}
                    {/* <Scene key='recordscreen' component={Recorderscreen} title="Recorderscreen" /> */}
                    {/* <Scene key='exportsong' component={Export} title="Export" /> */}
                    <Scene key='importsong' component={Import} title="Import" />
                    {/* <Scene key='page' component={Page} title="Page" /> */}
                    <Scene key='recorderscreen1' component={RecorderScreen1} title="RecorderScreen1" />
                </Stack>
            </Router>            
        );
    }
}


import React, { Component } from 'react';
import {Router,Stack, Scene } from 'react-native-router-flux';
import Homepage from './Homepage';
import Record from './Record';
import Settingscreen from './Settingscreen';
import Recorderscreen from './Recorderscreen';
import Export from './Export';
import Import from './Import';

export default class Routes extends Component<{}> {
    render() {
        return(
            <Router>
                <Stack key="root" hideNavBar={true}>
                    <Scene key="homepage" component={Homepage} title="Homepage" />
                    <Scene key="record" component={Record} title="Record" />
                    <Scene key="setting" component={Settingscreen} title="Settingscreen" />
                    <Scene key='recordscreen' component={Recorderscreen} title="Recorderscreen" />
                    <Scene key='exportsong' component={Export} title="Export" />
                    <Scene key='importsong' component={Import} title="Import" />
                </Stack>
            </Router>            
        );
    }
}


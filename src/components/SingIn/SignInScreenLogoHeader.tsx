import React from 'react';
import { Image } from 'react-native';

export default function SingInScreenLogoHeader(): React.ReactElement {
    return (
        <Image
            source={require('../../assets/images/splash2.png')}
            style={{ width: 200, height: 200 }}
        />
    );
}

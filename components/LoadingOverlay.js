import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Overlay } from 'react-native-elements';
import { moderateScale } from '../constants/Scale';

const LoadingOverlay = ({ visible, toggleFunc }) => {
	return (
		<Overlay
			overlayStyle={{ backgroundColor: 'lightgrey', width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
			isVisible={visible}
			onBackdropPress={toggleFunc}>
			<View>
				<ActivityIndicator size='large' color='#000000' />
				<Text style={{ marginTop: moderateScale(10), fontSize: moderateScale(17) }}>Configuring Group...</Text>
			</View>
		</Overlay>
	);
};

export { LoadingOverlay };

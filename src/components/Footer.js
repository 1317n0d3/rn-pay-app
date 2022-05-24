import React from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { styles } from '../../constants'

const Footer = () => {
	return (
		<View
			style={{
				...styles.flexDefault,
				justifyContent: 'space-around',
				marginTop: 80,
			}}
		>
			<Icon name='home' size={30} color='#4B4B4B' />
			<Icon name='bolt' size={30} color='#fff' />
			<Icon name='user' size={30} color='#4B4B4B' />
			<Icon name='bell' size={30} color='#4B4B4B' />
		</View>
	)
}

export default Footer

import React from 'react'
import { Image, Linking, Text, TouchableHighlight, View } from 'react-native'
import { colors } from '../../constants'
import { useAuth } from '../useAuth'

const Header = () => {
	const { user } = useAuth()

	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<View>
				<Text
					style={{
						color: 'white',
						fontSize: 24,
						fontWeight: '700',
						marginBottom: 6,
					}}
				>
					Hi {user?.email}
				</Text>
				<Text style={{ color: colors.TEXT_GRAY }}>Welcome Back</Text>
			</View>
			<View>
				<TouchableHighlight
					onPress={() => Linking.openURL('https://google.com')}
				>
					<Image
						source={{
							uri: 'https://pbs.twimg.com/profile_images/1353826388898410496/VQyCqZD7_400x400.jpg',
						}}
						style={{
							width: 50,
							height: 50,
							borderRadius: 50,
						}}
					/>
				</TouchableHighlight>
			</View>
		</View>
	)
}

export default Header

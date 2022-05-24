import React from 'react'
import { Text, View } from 'react-native'
import { colors } from '../../constants'

const Balance = ({ cards }) => {
	const balance = cards.reduce((acc, card) => acc + card.balance, 0)

	return (
		<View style={{ marginBottom: 40 }}>
			<Text
				style={{
					color: colors.TEXT_GRAY,
					fontSize: 20,
					marginBottom: 6,
				}}
			>
				Balance
			</Text>
			<Text
				style={{
					color: 'white',
					fontSize: 28,
					fontWeight: '700',
				}}
			>
				${balance.toLocaleString()}
			</Text>
		</View>
	)
}

export default Balance

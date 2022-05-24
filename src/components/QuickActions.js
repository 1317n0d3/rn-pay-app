import {
	addDoc,
	collection,
	doc,
	getDocs,
	serverTimestamp,
} from '@firebase/firestore'
import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors, styles } from '../../constants'
import { db } from '../utils/firebase'

const QuickActions = () => {
	const makeTransaction = async value => {
		const collectionRef = collection(db, 'transactions')
		const payload = {
			card_from: '5562 1122 4595 7852',
			card_to: '1233 2312 2343 1241',
			created_at: serverTimestamp(),
			value,
		}

		try {
			await addDoc(collectionRef, payload)

			alert('✅ Transaction completed!')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<View style={{ ...styles.flexDefault, justifyContent: 'space-around' }}>
			<TouchableHighlight
				underlayColor={colors.ACCENT}
				style={{
					justifyContent: 'center',
					borderRadius: 30,
					padding: 20,
					backgroundColor: '#2C2C2C',
				}}
				onPress={() => makeTransaction(100)}
			>
				<View style={{ alignItems: 'center' }}>
					<Icon name='money' size={35} color='#fff' />
					<Text
						style={{
							color: 'white',
							fontSize: 16,
							marginTop: 12,
							marginBottom: 4,
							fontWeight: '700',
						}}
					>
						Salary
					</Text>
					<Text style={{ color: colors.TEXT_GRAY, fontSize: 12 }}>
						Belong Interactive
					</Text>
					<Text
						style={{
							color: 'white',
							fontSize: 18,
							marginTop: 10,
							fontWeight: '700',
						}}
					>
						$100
					</Text>
				</View>
			</TouchableHighlight>
			<TouchableHighlight
				underlayColor={colors.ACCENT}
				style={{
					justifyContent: 'center',
					borderRadius: 30,
					padding: 20,
					backgroundColor: '#2C2C2C',
				}}
				onPress={() => makeTransaction(610)}
			>
				<View style={{ alignItems: 'center' }}>
					<Icon name='user' size={35} color='#fff' />
					<Text
						style={{
							color: 'white',
							fontSize: 16,
							marginTop: 12,
							marginBottom: 4,
							fontWeight: '700',
						}}
					>
						Paypal
					</Text>
					<Text style={{ color: colors.TEXT_GRAY, fontSize: 12 }}>
						Freelance payment
					</Text>
					<Text
						style={{
							color: 'white',
							fontSize: 18,
							marginTop: 10,
							fontWeight: '700',
						}}
					>
						$610
					</Text>
				</View>
			</TouchableHighlight>
		</View>
	)
}

export default QuickActions

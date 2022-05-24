import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { colors } from './constants'
import Balance from './src/components/Balance'
import Header from './src/components/Header'
import Footer from './src/components/Footer'
import Cards from './src/components/Cards'
import QuickActions from './src/components/QuickActions'
import { useAuth } from './src/useAuth'
import { db } from './src/utils/firebase'
import Logout from './src/components/Logout'
import { collection, onSnapshot, query, where } from '@firebase/firestore'
import AuthForm from './src/components/AuthForm'

export default function App() {
	const { isLoggedIn, user } = useAuth()

	const [cards, setCards] = useState([])

	useEffect(() => {
		if (user?.uid) {
			const collectionRef = collection(db, 'cards')
			const q = query(collectionRef, where('user_id', '==', user.uid))

			const unSub = () => {
				onSnapshot(q, snapshot => {
					console.log(snapshot, 'wedf')
					setCards(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
				})
			}

			return unSub
		}
	}, [])

	return (
		<View
			style={{
				padding: 24,
				paddingTop: 55,
				paddingBottom: 90,
				backgroundColor: colors.BG_GRAY,
				height: '100%',
			}}
		>
			<View>
				{isLoggedIn ? (
					<>
						<Header />
						<Cards cards={cards} />
						<Balance cards={cards} />
						<QuickActions />
						<Logout />
						<Footer />
					</>
				) : (
					<AuthForm />
				)}
			</View>
		</View>
	)
}

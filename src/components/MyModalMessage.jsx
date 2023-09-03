import { Text, StyleSheet, View } from 'react-native'
import colors from '../global/colors'

export default function ModalMessage({
    message
}) {
    return (
        <View>
            <Text style={styles.text}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontFamily: 'Nunito',
        color: colors.FONT,
    }
})
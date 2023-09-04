import { Text, StyleSheet, View } from 'react-native'
import {colors} from '../global/colors'

export default function ModalMessage({
    children
}) {
    return (
        <View>
            <Text style={styles.text}>{children}</Text>
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
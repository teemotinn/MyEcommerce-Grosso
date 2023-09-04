import { Pressable, StyleSheet, Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import InputForm from "../components/InputForm"
import { colors } from "../global/colors"
import { useSignInMutation } from "../services/authServices"
import { isAtLeastSixCharacters, isValidEmail } from "../validations/auth"
import { useDispatch } from "react-redux"
import { setUser } from "../features/user/userSlice"
import { insertSession } from "../SQLite"
import PrimaryButton from "../components/PrimaryButton"
import MyModal from "../components/MyModal"
import ModalMessage from "../components/ModalMessage"
import { ERROR_TITLE } from "../global/constants"

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')

    const [isErrorModalVisivle, setIsErrorModalVisivle] = useState(false)

    const dispatch = useDispatch()

    const [triggerSignIn, resultSignIn] = useSignInMutation()
    const onSubmit = () => {
        try {
            const isValidVariableEmail = isValidEmail(email)
            const isCorrectPassword = isAtLeastSixCharacters(password)

            if (isValidVariableEmail && isCorrectPassword) {
                triggerSignIn({
                    email,
                    password,
                    returnSecureToken: true,
                })
            }

            if (!isValidVariableEmail) setErrorEmail('Email is not correct')
            else setErrorEmail('')
            if (!isCorrectPassword) setErrorPassword('Password must be at least 6 characters')
            else setErrorPassword('')

        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        (async () => {
            try {
                if (resultSignIn.isSuccess) {

                    const response = await insertSession({
                        idToken: resultSignIn.data.idToken,
                        localId: resultSignIn.data.localId,
                        email: resultSignIn.data.email,
                    })

                    dispatch(setUser({
                        email: resultSignIn.data.email,
                        idToken: resultSignIn.data.idToken,
                        localId: resultSignIn.data.localId,
                        profileImage: "",
                    }))
                }
                if (resultSignIn.isError) {
                    setIsErrorModalVisivle(true)
                }
            } catch (error) {
                console.log(error.message)
            }
        })()
    }, [resultSignIn])

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Text style={styles.title}>Login to start!</Text>
                <InputForm
                    label={"Email"}
                    onChange={(email) => setEmail(email)}
                    error={errorEmail}
                />
                <InputForm
                    label={"Password"}
                    onChange={(password) => setPassword(password)}
                    error={errorPassword}
                    isSecure={true}
                />
                <PrimaryButton
                    onPress={onSubmit}
                    title="Login"
                    loading={resultSignIn.isLoading}
                />
                <Text style={styles.sub}>Not have an account?</Text>
                <Pressable onPress={() => navigation.navigate("Signup")}>
                    <Text style={styles.subLink}>Sign up</Text>
                </Pressable>
            </View>
            <MyModal
                isVisible={isErrorModalVisivle}
                title={ERROR_TITLE}
                onMainButtonPress={() => setIsErrorModalVisivle(false)}
            >
                <ModalMessage>
                    Try again or contact our support.
                </ModalMessage>
            </MyModal>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    main: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "90%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 14,
    },
    title: {
        fontSize: 22,
        fontFamily: "NunitoBold",
    },
    sub: {
        fontSize: 14,
        color: colors.FONT,
        fontFamily: 'Nunito'
    },
    subLink: {
        fontSize: 14,
        fontFamily: 'Nunito',
        color: colors.LINK
    },
})
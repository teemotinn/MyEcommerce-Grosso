import React, { useEffect, useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"

import { useDispatch } from "react-redux"
import { setUser } from "../features/user/userSlice"

import { useSignUpMutation } from "../services/authServices"
import { isAtLeastSixCharacters, isValidEmail } from "../validations/auth"

import InputForm from "../components/InputForm"
import SubmitButton from "../components/SubmitButton"
import { colors } from "../global/colors"
import PrimaryButton from "../components/PrimaryButton"

const SignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [errorMail, setErrorMail] = useState("");
    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

    const [triggerSignUp, result] = useSignUpMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        if (result.isSuccess) {
            dispatch(
                setUser({
                    email: result.data.email,
                    idToken: result.data.idToken,
                    localId: result.data.localId,
                    profileImage: "",
                    location: {
                        latitude: "",
                        longitude: "",
                    }
                })
            )
        }
    }, [result])

    const onSubmit = () => {
        try {
            const isValidVariableEmail = isValidEmail(email)
            const isCorrectPassword = isAtLeastSixCharacters(password)
            const isRepeatedPasswordCorrect = password === confirmPassword

            if (isValidVariableEmail && isCorrectPassword && isRepeatedPasswordCorrect) {
                const request = {
                    email,
                    password,
                    returnSecureToken: true
                }
                triggerSignUp(request)
            }

            if (!isValidVariableEmail) setErrorMail('Email is not correct')
            else setErrorMail('')
            if (!isCorrectPassword) setErrorPassword('Password must be at least 6 characters')
            else setErrorPassword('')
            if (!isRepeatedPasswordCorrect) setErrorConfirmPassword('Passwords must match')
            else setErrorConfirmPassword('')

        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Text style={styles.title}>Signup!</Text>
                <InputForm label={"email"} onChange={setEmail} error={errorMail} />
                <InputForm
                    label={"password"}
                    onChange={setPassword}
                    error={errorPassword}
                    isSecure={true}
                />
                <InputForm
                    label={"confirm password"}
                    onChange={setconfirmPassword}
                    error={errorConfirmPassword}
                    isSecure={true}
                />
                <PrimaryButton onPress={onSubmit} title="Send" />
                <Text style={styles.sub}>Already have an account?</Text>
                <Pressable onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.subLink}>Login</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default SignUpScreen;

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
});
import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import { colors } from "../global/colors";
import { useSignInMutation } from "../services/authServices";
import { isAtLeastSixCharacters, isValidEmail } from "../validations/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')

    const dispatch = useDispatch()

    const [triggerSignIn, resultSignIn] = useSignInMutation();
    const onSubmit = () => {
        try {
            const isValidVariableEmail = isValidEmail(email)
            const isCorrectPassword = isAtLeastSixCharacters(password)

            if (isValidVariableEmail && isCorrectPassword) {
                triggerSignIn({
                    email,
                    password,
                    returnSecureToken: true,
                });
            }

            if (!isValidVariableEmail) setErrorEmail('Email is not correct')
            else setErrorEmail('')
            if (!isCorrectPassword) setErrorPassword('Password must be at least 6 characters')
            else setErrorPassword('')

        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        if (resultSignIn.isSuccess) {
            dispatch(setUser({
                email: resultSignIn.data.email,
                idToken: resultSignIn.data.idToken,
                localId: resultSignIn.data.localId,
                profileImage: "",
                location: {
                    latitude: "",
                    longitude: "",
                }
            }))
        }
    }, [resultSignIn])

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Text style={styles.title}>Login to start</Text>
                <InputForm
                    label={"email"}
                    onChange={(email) => setEmail(email)}
                    error={errorEmail}
                />
                <InputForm
                    label={"password"}
                    onChange={(password) => setPassword(password)}
                    error={errorPassword}
                    isSecure={true}
                />
                <SubmitButton onPress={onSubmit} title="Send" />
                <Text style={styles.sub}>Not have an account?</Text>
                <Pressable onPress={() => navigation.navigate("Signup")}>
                    <Text style={styles.subLink}>Sign up</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default LoginScreen;

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
        backgroundColor: colors.lightPink,
        gap: 15,
        paddingVertical: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 22,
        fontFamily: "Nunito",
    },
    sub: {
        fontSize: 14,
        color: "black",
    },
    subLink: {
        fontSize: 14,
        color: "blue",
    },
});
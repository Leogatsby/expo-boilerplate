import CustomButton from '@/components/ui/CustomButton'
import { useAuthStore } from '@/store/useAuthStore'
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import SafeAreaContainer from '../../components/ui/SafeAreaContainer'

export default function Login() {
    const login = useAuthStore((state) => state.login);

    return (
        <SafeAreaContainer style={styles.container}>
            <Text style={styles.title}>로그인</Text>
            <CustomButton onPress={login}>
                로그인 하기
            </CustomButton>
        </SafeAreaContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
});

import CustomButton from '@/components/ui/CustomButton'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { useAuthStore } from '@/store/useAuthStore'
import React from 'react'
import { StyleSheet, Text } from 'react-native'

export default function Profile() {
    const logout = useAuthStore((state) => state.logout);

    return (
        <SafeAreaContainer style={styles.container}>
            <Text style={styles.title}>프로필</Text>
            <CustomButton
                onPress={logout}
                style={styles.logoutButton}
            >
                로그아웃
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
    logoutButton: {
        backgroundColor: '#FF3B30',
    },
});


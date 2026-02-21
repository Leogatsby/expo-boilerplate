//1-0)시스템로직_라우팅
//1-1)퍼블리싱로직_기초엘리먼트 퍼블리싱
import React from 'react'
import { StyleSheet, Text } from 'react-native'
//1-2)퍼블리싱로직_콤포넌트UI
import CustomButton from '@/components/ui/CustomButton'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
//2.데이터바인딩 로직
import { useAuthStore } from '@/store/useAuthStore'

export default function Profile() {
    const { logout } = useAuthStore((AuthStore) => AuthStore.Actions);

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


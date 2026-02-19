import CustomButton from '@/components/ui/CustomButton'
import { useAuthStore } from '@/store/useAuthStore'
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import SafeAreaContainer from '../components/ui/SafeAreaContainer'

export default function Onboarding() {
    const onBoardingDone = useAuthStore((state) => state.onBoardingDone);

    return (
        <SafeAreaContainer style={styles.container}>
            <Text style={styles.title}>온보딩 페이지임</Text>
            <CustomButton onPress={onBoardingDone}>
                온보딩 완료
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


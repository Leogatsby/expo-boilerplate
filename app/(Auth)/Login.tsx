import CustomButton from '@/components/ui/CustomButton'
import { useAuthStore } from '@/store/useAuthStore'
import { useRouter } from 'expo-router'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import SafeAreaContainer from '../../components/ui/SafeAreaContainer'

export default function Login() {
    const login = useAuthStore((state) => state.login);
    const router = useRouter();


    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = (data: any) => {
        console.log("Login Data:", data);
        login();
    };

    return (
        <SafeAreaContainer style={styles.container}>
            <Text style={styles.title}>로그인</Text>

            <View style={styles.form}>
                {/*이메일 입력창*/}
                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="이메일"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    )}
                    name="email"
                />
                {errors.email && <Text style={styles.errorText}>이메일을 입력해주세요.</Text>}

                {/*비밀번호 입력창*/}
                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="비밀번호"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry
                        />
                    )}
                    name="password"
                />
                {errors.password && <Text style={styles.errorText}>비밀번호를 입력해주세요.</Text>}

                <CustomButton onPress={handleSubmit(onSubmit)} style={styles.loginButton}>
                    로그인 하기
                </CustomButton>
            </View>

            <View style={styles.linkContainer}>
                <TouchableOpacity onPress={() => router.push('/(Auth)/Register')}>
                    <Text style={styles.linkText}>회원가입하러 가기</Text>
                </TouchableOpacity>

                <View style={styles.policyLinks}>
                    <TouchableOpacity onPress={() => router.push('/(Auth)/Term')}>
                        <Text style={styles.policyText}>약관보기</Text>
                    </TouchableOpacity>
                    <Text style={styles.separator}>|</Text>
                    <TouchableOpacity onPress={() => router.push('/(Auth)/Privacy')}>
                        <Text style={styles.policyText}>개인정보처리방침</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
    },
    form: {
        gap: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        borderRadius: 8,
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: -10,
    },
    loginButton: {
        marginTop: 10,
    },
    linkContainer: {
        marginTop: 30,
        alignItems: 'center',
        gap: 15,
    },
    linkText: {
        color: '#007AFF',
        fontSize: 16,
        fontWeight: '500',
    },
    policyLinks: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    policyText: {
        color: '#666',
        fontSize: 14,
    },
    separator: {
        color: '#ddd',
    }
});

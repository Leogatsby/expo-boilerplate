//1-0)시스템로직_라우팅
import { useRouter } from 'expo-router'
//1-1)퍼블리싱로직_기초엘리먼트 퍼블리싱
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
//1-2)퍼블리싱로직_콤포넌트UI
import CustomButton from '@/components/ui/CustomButton'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
//2.데이터바인딩 로직
import { useAuthStore } from '@/store/useAuthStore'
import { Controller, useForm } from 'react-hook-form'

export default function Register() {
    const { registerWithEmail } = useAuthStore((AuthStore) => AuthStore.Actions);
    const router = useRouter();

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit = async (payload: any) => {
        console.log("Register Payload:", payload);

        if (payload.password !== payload.confirmPassword) {
            Alert.alert("오류", "비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            // Zustand 스토어의 가입 로직 호출
            await registerWithEmail(payload.email, payload.password);

            // Success alert is handled in store, navigate to login
            router.push('/(Auth)/Login');
        } catch (error: any) {
            // Error alert is handled inside the store
            console.error("Registration component error:", error);
        }
    };

    return (
        <SafeAreaContainer style={styles.container}>
            <Text style={styles.title}>회원가입</Text>

            <View style={styles.form}>
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

                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="비밀번호 확인"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry
                        />
                    )}
                    name="confirmPassword"
                />
                {errors.confirmPassword && <Text style={styles.errorText}>비밀번호 확인을 입력해주세요.</Text>}

                <CustomButton onPress={handleSubmit(onSubmit)} style={styles.registerButton}>
                    회원가입 하기
                </CustomButton>
            </View>

            <View style={styles.linkContainer}>
                <TouchableOpacity onPress={() => router.push('/(Auth)/Login')}>
                    <Text style={styles.linkText}>이미 계정이 있나요? 로그인</Text>
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
    registerButton: {
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
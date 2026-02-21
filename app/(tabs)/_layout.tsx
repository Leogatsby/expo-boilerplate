//1-0)시스템로직_라우팅
import { Tabs } from 'expo-router';
//1-1)퍼블리싱로직_기초엘리먼트 퍼블리싱
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
//1-2)퍼블리싱로직_콤포넌트UI
//2.데이터바인딩 로직

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#007AFF',
            }}
        >
            <Tabs.Screen
                name="Home"
                options={{
                    title: '홈',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Add"
                options={{
                    title: '추가',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Profile"
                options={{
                    title: '프로필',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}

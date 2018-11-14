<template>
    <v-toolbar dark color="primary">
        <v-toolbar-side-icon/>
        <router-link v-bind:to="{ name: 'home-page'}">
            <v-toolbar-title class="white--text">
                Single Page App
            </v-toolbar-title>
        </router-link>

        <v-spacer></v-spacer>

        <v-toolbar-items>
            <v-btn flat v-bind:to="{ name: 'sign-up' }">Sign Up</v-btn>
            <v-btn flat v-bind:to="{ name: 'about-us' }">About Us</v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

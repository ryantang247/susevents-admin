// @vitest-environment jsdom
import {mount } from '@vue/test-utils';
import { test, describe, beforeEach, afterEach, expect } from 'vitest';
import MenuList from '../components/dashboard/MenuList.vue';
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import {createVuetify} from "vuetify";
import vuetify from "vite-plugin-vuetify";
import ResizeObserver from 'resize-observer-polyfill'
global.ResizeObserver = ResizeObserver

describe('MenuList.vue', () => {
    let wrapper;

    const vuetify = createVuetify({ components, directives });
    const AppWrapper = {
        components: { MenuList },
        template: `
          <template>
            <v-app>
                <MenuList />
            </v-app>
          </template>
        `,
    };
    beforeEach(() => {
        wrapper = mount(AppWrapper, {
            global: {
                plugins: [vuetify],
            },
        });
    });

    afterEach(() => {
        wrapper.unmount();
    });
    test('renders the component correctly', () => {
        expect(wrapper.exists()).toBe(true);
    });

    test('renders the v-app-bar-nav-icon on small and medium screens', async () => {
        wrapper.vm.$vuetify.display.mdAndDown = true;
        await wrapper.vm.$nextTick();
        const navIcon = wrapper.findComponent({ name: 'v-app-bar-nav-icon' });
        expect(navIcon.exists()).toBe(true);
    });

    // test when resizing, the app navigation bar is rendered
    test('renders the v-app-bar-nav-icon on small and medium screens, and not the v-card', async () => {
        wrapper.vm.$vuetify.display.mdAndDown = true;
        await wrapper.vm.$nextTick();

        const navIcon = wrapper.findComponent({ name: 'v-app-bar-nav-icon' });
        expect(navIcon.exists()).toBe(true);

        const card = wrapper.findComponent({ name: 'v-card' });
        expect(card.exists()).toBe(false);

        const navDrawer = wrapper.findComponent({ name: 'v-navigation-drawer' });
        expect(navDrawer.exists()).toBe(true);
    });

    test('renders the correct titles for navigation items', () => {
        const items = [
            { text: 'Users', icon: 'mdi-account', link: '/user' },
            { text: 'Venues', icon: 'mdi-home', link: '/venue' },
            { text: 'Events', icon: 'mdi-ticket', link: '/events' },
            { text: 'Notification', icon: 'mdi-speaker', link: '/notification' },
            { text: 'Customer Services', icon: 'mdi-phone-classic', link: '/customers' },
            { text: 'Transaction History', icon: 'mdi-cash-multiple', link: '/transaction' },
        ];

        const navItems = wrapper.findAllComponents({ name: 'v-list-item' });
        items.forEach((item, index) => {
            expect(navItems.at(index).text()).toContain(item.text);
        });
    });

    test('renders the correct icons for navigation items', () => {
        const items = [
            { text: 'Users', icon: 'mdi-account', link: '/user' },
            { text: 'Venues', icon: 'mdi-home', link: '/venue' },
            { text: 'Events', icon: 'mdi-ticket', link: '/events' },
            { text: 'Notification', icon: 'mdi-speaker', link: '/notification' },
            { text: 'Customer Services', icon: 'mdi-phone-classic', link: '/customers' },
            { text: 'Transaction History', icon: 'mdi-cash-multiple', link: '/transaction' },
        ];

        const navItems = wrapper.findAllComponents({ name: 'v-list-item' });
        items.forEach((item, index) => {
            const icon = navItems.at(index).findComponent({ name: 'v-icon' });
            expect(icon.props('icon')).toBe(item.icon);
        });
    });

});

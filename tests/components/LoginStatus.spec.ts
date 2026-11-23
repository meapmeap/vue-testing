import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import LoginStatus from '../../src/components/LoginStatus.vue';

describe('LoginStatus', () => {
    it('should show welcome class when status is loggedIn', () => {
        // Arrange
        const status = 'loggedIn';

        // Act
        const wrapper = shallowMount(LoginStatus, { props: { status } });

        // Assert
        expect(wrapper.find('.welcome').exists()).toBe(true);
        expect(wrapper.find('.logged-out').exists()).toBe(false);
        expect(wrapper.find('.loading').exists()).toBe(false);
    });

    it('should show the welcome message when status is loggedIn', () => {
        // Arrange
        const status = 'loggedIn';

        // Act
        const wrapper = shallowMount(LoginStatus, { props: { status } });

        // Assert
        expect(wrapper.text()).toContain('✓ Welkom! Je bent ingelogd');
    });

    it('should show logged-out class when status is loggedOut', () => {
        // Arrange
        const status = 'loggedOut';

        // Act
        const wrapper = shallowMount(LoginStatus, { props: { status } });

        // Assert
        expect(wrapper.find('.logged-out').exists()).toBe(true);
        expect(wrapper.find('.welcome').exists()).toBe(false);
        expect(wrapper.find('.loading').exists()).toBe(false);
    });

    it('should show the logged-out message when status is loggedOut', () => {
        // Arrange
        const status = 'loggedOut';

        // Act
        const wrapper = shallowMount(LoginStatus, { props: { status } });

        // Assert
        expect(wrapper.text()).toContain('⚠ Niet ingelogd');
    });

    it('should show loading class when status is loading', () => {
        // Arrange
        const status = 'loading';

        // Act
        const wrapper = shallowMount(LoginStatus, { props: { status } });

        // Assert
        expect(wrapper.find('.loading').exists()).toBe(true);
        expect(wrapper.find('.welcome').exists()).toBe(false);
        expect(wrapper.find('.logged-out').exists()).toBe(false);
    });

    it('should show the loading message when status is loading', () => {
        // Arrange
        const status = 'loading';

        // Act
        const wrapper = shallowMount(LoginStatus, { props: { status } });

        // Assert
        expect(wrapper.text()).toContain('⏳ Laden...');
    });

    it('should fall back to loading when status is incorrect', () => {
        // Arrange
        const status = 'invalid';

        // Act
        const wrapper = shallowMount(LoginStatus, { props: { status } });

        // Assert
        expect(wrapper.find('.loading').exists()).toBe(true);
        expect(wrapper.find('.welcome').exists()).toBe(false);
        expect(wrapper.find('.logged-out').exists()).toBe(false);
        expect(wrapper.text()).toContain('⏳ Laden...');
    });
});

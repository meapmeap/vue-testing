import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import StatusBadge from '../../src/components/StatusBadge.vue';

describe('StatusBadge', () => {
    it('should show success badge when status is success', () => {
        // Arrange
        const status = 'success';

        // Act
        const wrapper = shallowMount(StatusBadge, { props: { status } });

        // Assert
        expect(wrapper.find('.badge-success').exists()).toBe(true);
        expect(wrapper.find('.badge-warning').exists()).toBe(false);
        expect(wrapper.find('.badge-error').exists()).toBe(false);
        expect(wrapper.findAll('.badge').length).toBe(1);
    });

    it('should show error badge when status is error', () => {
        // Arrange
        const status = 'error';

        // Act
        const wrapper = shallowMount(StatusBadge, { props: { status } });

        // Assert
        expect(wrapper.find('.badge-error').exists()).toBe(true);
        expect(wrapper.find('.badge-success').exists()).toBe(false);
        expect(wrapper.find('.badge-warning').exists()).toBe(false);
        expect(wrapper.findAll('.badge').length).toBe(1);
    });

    it('should show warning badge when status is warning', () => {
        // Arrange
        const status = 'warning';

        // Act
        const wrapper = shallowMount(StatusBadge, { props: { status } });

        // Assert
        expect(wrapper.find('.badge-warning').exists()).toBe(true);
        expect(wrapper.find('.badge-success').exists()).toBe(false);
        expect(wrapper.find('.badge-error').exists()).toBe(false);
        expect(wrapper.findAll('.badge').length).toBe(1);
    });

    it('should render no badge when status is unknown', () => {
        // Arrange
        const status = 'pending';

        // Act
        const wrapper = shallowMount(StatusBadge, { props: { status } });

        // Assert
        expect(wrapper.find('.badge-success').exists()).toBe(false);
        expect(wrapper.find('.badge-warning').exists()).toBe(false);
        expect(wrapper.find('.badge-error').exists()).toBe(false);
        expect(wrapper.findAll('.badge').length).toBe(0);
        expect(wrapper.find('.status-badge').exists()).toBe(true);
    });

    it('should render no badge when status is empty', () => {
        // Arrange
        const status = '';

        // Act
        const wrapper = shallowMount(StatusBadge, { props: { status } });

        // Assert
        expect(wrapper.find('.badge-success').exists()).toBe(false);
        expect(wrapper.find('.badge-warning').exists()).toBe(false);
        expect(wrapper.find('.badge-error').exists()).toBe(false);
        expect(wrapper.findAll('.badge').length).toBe(0);
        expect(wrapper.find('.status-badge').exists()).toBe(true);
    });
});

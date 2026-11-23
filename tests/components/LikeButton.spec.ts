import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import LikeButton from '../../src/components/LikeButton.vue';

describe('LikeButton', () => {
    it('should start in the unliked state', () => {
        // Arrange
        const wrapper = shallowMount(LikeButton);

        // Assert
        expect(wrapper.text()).toContain('🤍 Like');
        expect(wrapper.text()).not.toContain('❤️ Liked');
    });

    it('should toggle to liked after 1 click and emit like', async () => {
        // Arrange
        const wrapper = shallowMount(LikeButton);

        // Act
        await wrapper.find('button').trigger('click');

        // Assert
        expect(wrapper.text()).toContain('❤️ Liked');
        expect(wrapper.emitted('like')).toHaveLength(1);
        expect(wrapper.emitted('unlike')).toBeUndefined();
    });

    it('should toggle back to unliked after 2 clicks and emit unlike', async () => {
        // Arrange
        const wrapper = shallowMount(LikeButton);

        // Act
        await wrapper.find('button').trigger('click');
        await wrapper.find('button').trigger('click');

        // Assert
        expect(wrapper.text()).toContain('🤍 Like');
        expect(wrapper.emitted('like')).toHaveLength(1);
        expect(wrapper.emitted('unlike')).toHaveLength(1);
    });

    it('should be liked again after 3 clicks with correct event sequence', async () => {
        // Arrange
        const wrapper = shallowMount(LikeButton);

        // Act
        await wrapper.find('button').trigger('click');
        await wrapper.find('button').trigger('click');
        await wrapper.find('button').trigger('click');

        // Assert
        expect(wrapper.text()).toContain('❤️ Liked');
        expect(wrapper.emitted('like')).toHaveLength(2);
        expect(wrapper.emitted('unlike')).toHaveLength(1);
    });

    it('should not render count when count prop is not provided', () => {
        // Arrange
        const wrapper = shallowMount(LikeButton);

        // Assert
        expect(wrapper.text()).not.toMatch(/\(\d+\)/);
        expect(wrapper.text()).toContain('🤍 Like');
    });

    it('should render count when count prop is provided', () => {
        // Arrange
        const wrapper = shallowMount(LikeButton, { props: { count: 5 } });

        // Assert
        expect(wrapper.text()).toContain('🤍 Like (5)');
    });
});
